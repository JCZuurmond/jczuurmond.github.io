---
title: Developing data models together with dbt
tags: [dbt, Spark]
---

One of DBT's fantastic developer features is its dynamic schema generation, which enables multiple users to work on the same data warehouse without interfering.

# Developing data models together

Let's say you are working with another developer on the data models
within a data warehouse. And you are making changes to a data model upstream of the data model on which the other developer is working.

The developer working on the downstream data model is frustrated because inexplicable behavior appears. For example, when she recreates the data model without changing any logic, the results are different! How is this possible?

At some point, she learns that you make changes to the upstream model - oops! Now, she at least knows why she saw these magical changes. But, you both want to continue with your development; you do not wait for the other to finish their work before continuing. This would slow down your team's speed; you want to work in parallel.

# User schemas

This is where DBT comes in. DBT's schema generation feature allows multiple users to develop and maintain the data warehouse simultaneously without interfering with each other's work.

Here's how it works:

1. Each user has their own schema: a separate data warehouse area where they can make changes without affecting the rest. This allows users to experiment and test their changes without disrupting the rest of the data.

2. DBT [uses the schema in your profile to generate a schema](https://docs.getdbt.com/docs/get-started/connection-profiles#understanding-target-schemas). It is common practice to use your name in the schema when working with the development data warehouse so that it is clear to whom the data models belong.

3. When running in production, you name the schema "in a way that makes it clear that the data is ready for end-users to use for analytics." The dbt docs mention `analytics`. I often use `main`, matching the `main` branch in git.

# External table location

More than changing the schema name is required when working together with Spark.

Spark external tables are tables stored outside of Spark's distributed file system but can still be accessed and queried by Spark applications. External tables are helpful when working with data stored in other systems, such as a traditional relational database or a cloud storage service.

When creating an external table, the user specifies the location of the data, which is done by `dbt` automagically when creating a data model that materializes as a table and when the location root is defined:

{% raw %}
``` sql
{% macro spark__location_clause() %}
  {%- set location_root = config.get('location_root', validator=validation.any[basestring]) -%}
  {%- set identifier = model['alias'] -%}
  {%- if location_root is not none %}
    location '{{ location_root }}/{{ identifier }}'
  {%- endif %}
{%- end macro -%}
```
{% endraw %}

When working with multiple developers, a problem arises. Even when using different schemas, as explained above, developers can change the data in each other's tables because they override the data in the underlying location. This can be avoided by adding the schema to the location root, like so:

{% raw %}
``` sql
{% macro spark__location_clause() %}
  {%- set location_root = config.get('location_root', validator=validation.any[basestring]) -%}
  {%- set schema = model['schema'] -%}
  {%- set identifier = model['alias'] -%}
  {%- if location_root is not none %}
	location '{{ location_root }}/{{ schema }}/{{ identifier }}'
  {%- endif %}
{%- end macro -%}
```
{% endraw %}

**NOTE:** When applying this change, the location is not updated for **existing data models**. You must run a `--full-refresh` to ensure all data models' locations are changed.

I opened an [issue in `dbt-spark`](https://github.com/dbt-labs/dbt-spark/issues/239) to suggest this change, and a colleague of mine [implemented the fix](https://github.com/dbt-labs/dbt-spark/pull/339).

# Recap

DBT's dynamic schema generation allows multiple developers to work
simultaneously. However, depending on the warehouse you are using, you need to avoid accidentally overwriting each other's tables due to the table materializations.
