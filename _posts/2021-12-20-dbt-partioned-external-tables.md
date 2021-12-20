---
title: Reading partitioned data sources in Databricks with dbt
tags: [dbt, Databricks]
---

I use
[dbt](https://www.getdbt.com/){:target="_blank"}
with
[Databricks](https://databricks.com/){:target="_blank"}
a lot! It is a great combination of tools to process large amounts of data.
dbt allows you to define the transformations and Databricks helps you with
the execution of them. In this blog post I explain how you define your data
sources before you start transforming them!

# dbt's assumption

Dbt is a data **transformation** tool, therefor it assumes you already have data tables,
which are the input for your transformations - dbt calls this
["sources"](https://docs.getdbt.com/docs/building-a-dbt-project/using-sources/){:target="_blank"}.

> From these source tables you create new tables by defining transformations -
> dbt calls these
> ["models"](https://docs.getdbt.com/docs/building-a-dbt-project/building-models){:target="_blank"}.

In the case of Databricks this assumption is slightly different: most
Databricks users do not start with **tables**, they start with data **files**. These
files contain the data you want to process, for example a bunch of CSV files.

> The files are often stored in a cloud storage, like
> [Amazon's S3](https://aws.amazon.com/s3/){:target="_blank"} or
> [Azure's blob storage](https://azure.microsoft.com/nl-nl/services/storage/blobs/){:target="_blank"}.
> The cloud storage is
> [mounted](https://docs.databricks.com/data/databricks-file-system.html#mount-object-storage-to-dbfs){:target="_blank"}
> within Databricks. Although, Databricks also has it's own storage "dbfs", I
> would recommend to store large volumes of data in a cloud storage.

We need to tell dbt somehow where it can find these data files. As dbt
operates on tables, we do this by
[creating a table](https://spark.apache.org/docs/latest/sql-ref-syntax-ddl-create-table-datasource.html){:target="_blank"}
with a `location` that points to your data.

The [dbt external table](https://github.com/dbt-labs/dbt-external-tables){:target="_blank"}
package is created to do just this! This concept of "external" is not Databricks
specific, it also applies to other data warehouses like
[Snowflake](https://www.snowflake.com/){:target="_blank"}
and
[Bigquery](https://cloud.google.com/bigquery/){:target="_blank"}.

# Data partitioning

A common optimization strategy is to partition your data. This means that we
create subfolders in which we group our data files. For example, we can group
our data files by upload date:

``` bash
$ tree data/
data
├── upload_date=2021-12-18/
│   ├── <data file>.csv
│   ├── <data file>.csv
│   └── <data file>.csv
├── upload_date=2021-12-19/
│   ├── <data file>.csv
│   ├── <data file>.csv
│   ├── <data file>.csv
│   └── <data file>.csv
├── upload_date=2021-12-20/
...
```

When we filter our data using the partition column, like _"only read the data
uploaded yesterday"_, we read the files from (a couple) subfolder(s). This
is more efficient than reading **all** the files, which would be needed if the
partition column `upload_date` is defined **inside** the data files.

dbt actually encourages this way of processing data through its
[incremental models](https://docs.getdbt.com/docs/building-a-dbt-project/building-models/configuring-incremental-models/){:target="_blank"}.
Especially for very big (source) data models, this is an useful optimization
technique!

# The typo that started it all

In the
[dbt external table](https://github.com/dbt-labs/dbt-external-tables){:target="_blank"}
package, there was a typo that caused the partition definitions to be skipped. I created
a
[pull request](https://github.com/dbt-labs/dbt-external-tables/pull/116){:target="_blank"}
to solve this issue. "A quick fix!" I thought.

After the typo was fixed, the partitions were added to the table definition as
intended. However, my Spark processing job started complaining about unknown
partitions. To understand this, we need to dive a bit into how Spark SQL works.

Spark SQL keeps a register of the table definitions, this register is called the
[Hive metastore](https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/spark-sql-hive-metastore.html){:target="_blank"}.
In this register Spark stores information like the table name and schema. It
also keeps track of which partitions a table has. This is where the information
for optimizing your queries comes from: the metastore knows which folders should
be read when a user filters the data with a partition column!

The problem was that the new partitions are created **outside** Spark. So, the metastore
is not aware about the new partitions, therefore it complained about unknown partitions.
We need to tell Spark somehow to add new partitions to the metastore.

# Recover partitions

The solution is to run a `ALTER TABLE <table name> RECOVER PARTITIONS`
[command]((https://docs.microsoft.com/en-us/azure/databricks/sql/language-manual/sql-ref-syntax-ddl-alter-table){:target="_blank"}).
This will _"scan the table’s location and add any files to the table which have
been added directly to the file system"_.

You need to do this **every time new data has been added**. And, it can be easily
done by using
[dbt external table v0.8.0](https://github.com/dbt-labs/dbt-external-tables/releases/tag/0.8.0){:target="_blank"}.

However, the downside of this package is that it loops through all your external
sources one by one. So, if you want to process the new data of one source, you
do more work than needed. And, dbt external table does not use threading
where dbt [does](https://docs.getdbt.com/docs/contributing/slack-rules-of-the-road#rule-9-use-threads){:target="_blank"}.

# Recover partitions only when you need to

I use a
[pre-hook](https://docs.getdbt.com/reference/resource-configs/pre-hook-post-hook/){:target="_blank"}
to only recover the partitions for the sources I want to process. This pre-hook is added to
[staging models](https://discourse.getdbt.com/t/how-we-structure-our-dbt-projects/355#staging-raw-data-2){:target="_blank"},
for example:

``` sql
pre_hook="ALTER TABLE source('source_name', 'source_table') RECOVER PARTITIONS"
```

The pre-hook is executed right before the model is executed. In this way we
are sure that we always process the newly ingested data and that we only recover
the partitions when required!
