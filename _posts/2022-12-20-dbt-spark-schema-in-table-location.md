---
title: Using schema in the location of Spark external tables
tags: [dbt, Spark]
---

One of DBT's nice developer features is its dynamic schema generation,
which enables multiple users to work on the same data warehouse without
conflicting with each other.

# Developing data models together

Let's say you are working together with another developer on the data models
within a data warehouse. And, one of you is making changes to a data model that
is upstream of the data model on which the other developer is working

The developer working on the downstream data model is getting frustrated because
inexplicable behavior is appearing. When she recreates the data model without
making a change to the definition the results is different! How is this possible?

At some point she learns that you make changes to the upstream model - oops! Now, she at least knows why she saw this magical changes. But, you both want to continue with your development, you do not wait for the other to finish their work before continuing your work. This slows down the speed of your team. You want to work in parallel

# User schemas

This is where DBT comes in. DBT's schema generation feature allows multiple
users to develop and maintain the data warehouse simultaneously without
interfering with each other's work.

Here's how it works:

1. Each user has their own schema, which is a separate area of the data
   warehouse where they can make changes without affecting the rest of the data
   warehouse. This allows users to experiment and test their changes without
   disrupting the rest of the data.

2. DBT [generates the schema name based on the schema in your profile](https://docs.getdbt.com/docs/get-started/connection-profiles#understanding-target-schemas).
   It is common practice to use your name in the development data warehouse so
   that it is clear to whom the schema belongs.

3. When running in production, you name the schema "in a way that makes it clear
   that is is ready for end-users to use for analytics". The dbt docs mention
   `analytics`. I often use `main`, referring to the `main` branch in git.

# External table location

When working with Spark, for example when using the `dbt-spark` or
`dbt-databricks` adapters, only changing the schema name is not sufficient for
external tables.

Spark external tables are tables that are stored outside of Spark's distributed
file system, but can still be accessed and queried by Spark applications.
External tables are useful when working with data that is stored in other
systems, such as a traditional relational database or a cloud storage service.

When creating an external table, the user specifies the location of the data,
which is done by `dbt-spark` when creating a data model that materializes not as
view and when the location root is defined:

```sql
{% macro spark__location_clause() %}
  {%- set location_root = config.get('location_root', validator=validation.any[basestring]) -%}
  {%- set identifier = model['alias'] -%}
  {%- if location_root is not none %}
    location '{{ location_root }}/{{ identifier }}'
  {%- endif %}
{%- endmacro -%}
```

When working with multiple developers a problem arises. Even when using
different schemas as explained above, developers can change the data in
each others tables because they override the data in the underlying location.
This can be avoided by adding the schema to location root, like so:

```sql
{% macro spark__location_clause() %}
  {%- set location_root = config.get('location_root', validator=validation.any[basestring]) -%}
  {%- set schema = model['schema'] -%}
  {%- set identifier = model['alias'] -%}
  {%- if location_root is not none %}
	location '{{ location_root }}/{{ schema }}/{{ identifier }}'
  {%- endif %}
{%- endmacro -%}
```

**NOTE:** When applying this change, the location is not updated for **existing
data models**. You need to run a `--full-refresh` to make sure the location of
all data models is changed.

I opened an 
[issue in `dbt-spark`](https://github.com/dbt-labs/dbt-spark/issues/239) 
to suggest this change and a colleague of mine 
[implemented the fix](https://github.com/dbt-labs/dbt-spark/pull/339).

# Conclusion

DBT's dynamic schema generation allows multiple developers to work
simultaneously. However, depending on the warehouse you are using you need to be
keen about not accidentaly overwriting eachothers table due to the underlying
materalizations.
