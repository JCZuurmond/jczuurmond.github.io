---
title: Soda - get ahead of silent data issues
tags: [data quality, Soda]
---

It is a topic you can not avoid when working with data: **data quality**. It
is due to
[the law of bad data](https://towardsdatascience.com/data-quality-youre-measuring-it-wrong-8863e5ae6491){:target="_blank"}
\- there is always more of it. You have to deal with bad data.

Like [Andrew Ng](https://www.andrewng.org/){:target="_blank"} (co-founder of
Coursera, Google Brain, deeplearning.ai, landing.ai) who recently started a
[data-centric AI competition](https://https-deeplearning-ai.github.io/data-centric-comp/){:target="_blank"}.
The motivation for this competition: if you want to improve the performance of
your machine learning model, then focus on engineering your data set because
_"high-performance model architectures are widely available"_.

At [GoDataDriven](https://godatadriven.com/){:target="_blank"} we partnered with
[Soda](https://soda.io){:target="_blank"} to add a data quality tool to our
[data platform proposition](https://godatadriven.com/what-we-do/build/){:target="_blank"}.

> Full disclosure: I develop the
> [soda-spark](https://github.com/sodadata/soda-spark) package.
> See my [bio](/about) to read more about what I do.

# Data quality 101

The essence of data quality is simple: you have assumptions about the
data which you want to validate. If you do not validate your assumptions, your
data product is likely to show unexpected behavior.

A common starting point is to add data tests to your data processing pipeline:

``` python
assert (0 <= df["percentage_column"] <= 100).all()
```

This is good! It is a good start to add these checks. You will see that even the
_most basic_ checks fail \- in the beginning.

# Data observability

In a professional setting you are working within a team that operates within an
organization. It is not _just_ you and your pipelines. In such a setting we need a
tool which makes the data tests visible. This makes it easier to:

1. update the data tests as your data models change;
2. document and share knowledge about the data models;
3. inform downstream products that rely on your data models when tests do not
   pass.

There are
[various](https://docs.getdbt.com/docs/building-a-dbt-project/tests/){:target="_blank"}
[data quality](https://greatexpectations.io/){:target="_blank"}
[tools](https://github.com/awslabs/deequ){:target="_blank"}
that help you with this, but I want to introduce you to one in specific:
[soda-sql](https://github.com/sodadata/soda-sql).

# Get ahead of silent data issues

The problem with the example 	above is that we can not formulate all data
tests in such a manner. For example, let's think of a data test for the number
of rows that are processed:

1. a negative row count is impossible by definition (something would be very off!);
2. most likely you want it to be non-zero;
3. and maybe it should not be too large.

``` python
assert 0 < df.count() <= 1_000_000_000
```

Ok, this is a rudimentary test, but... **what if the row count of your
daily processing batch suddenly drops with 90% while it was mostly stable
before???**

I would like to receive a warning about this!!!

These kind of issues are _silent_ data issues. These issues are not
seen by looking at one batch of data at a specific point in time. It is
something that is detected when looking at multiple data batches over time.

# Introducing Soda

This is where Soda comes into play. Their (paid) [Soda
cloud](https://cloud.soda.io/){:target="_blank"} allows you to detect these
silent data issues by looking at the difference between  [data
scans](https://docs.soda.io/soda/scan.html){:target="_blank"}.

![anomaly detection](/assets/img/blogs/2021-09-24-soda-get-ahead-of-silent-data-issues/soda-anomaly-detection.png)

They offer various features that support your data quality workflow. I will talk
more about the data quality workflow in another blog post.
