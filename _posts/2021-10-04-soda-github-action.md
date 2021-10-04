---
title: Monitor your data quality, every morning
tags: [data quality, Soda, Github]
---

I run a [Soda scan](https://docs.soda.io/soda/scan.html){:target="_blank"} every morning
for a project of mine. The project has a data lake set-up, with
[Azure blob storage](https://azure.microsoft.com/en-us/services/storage/blobs/){:target="_blank"}
for storing the [delta](https://delta.io/){:target="_blank"} tables and
[Databricks](https://databricks.com/){:target="_blank"} for compute. The data transformations are
written in SQL and executed with [dbt](https://www.getdbt.com/){:target="_blank"}.

# What to scan

There are two places where I would start with monitoring the data quality:
1. Data models meant to be used by downstream products;
2. Data right after it is loaded into your system.

The first allows me to be confident about maintaining reliable data models. The
second helps with spotting issues as early as possible.

# How to scan

The following [Github action](https://github.com/features/actions){:target="_blank"}
is used to run the scan every morning.

``` yml
name: "soda"

env:
  PYTHON_VERSION: 3.7
  DATABRICKS_DRIVER: "/opt/simba/spark/lib/64/libsparkodbc_sb64.so"

on:
  workflow_dispatch:
  schedule:
   - cron:  '0 7 * * *'

jobs:
  soda:
    name: "soda"
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: ${ { env.PYTHON_VERSION }}

    - name: Install odbc driver
      shell: bash
      run: |
        wget https://databricks-bi-artifacts.s3.us-east-2.amazonaws.com/simbaspark-drivers/odbc/2.6.16/SimbaSparkODBC-2.6.16.1019-Debian-64bit.zip -O simba-spark.zip
        unzip simba-spark.zip
        # `dpkg` will fail since dependencies are not installed
        sudo dpkg -i ./SimbaSparkODBC-2.6.16.1019-Debian-64bit/simbaspark_2.6.16.1019-2_amd64.deb || true
        # `apt-get` install simba spark with dependencies
        sudo apt-get -f install

    - name: Install soda
      shell: bash
      run: |
        sudo apt-get install libsasl2-dev unixodbc-dev
        pip install soda-sql-spark

    - name: Soda scan
      run: ls -d tables/* | xargs soda scan warehouse.yml
      env:
        DATABRICKS_DRIVER: ${ { env.DATABRICKS_DRIVER }}
        DATABRICKS_TOKEN: ${ { secrets.DATABRICKS_TOKEN }}
        SODA_API_PUBLIC: ${ { secrets.SODA_API_PUBLIC }}
        SODA_API_PRIVATE: ${ { secrets.SODA_API_PRIVATE }}
```
