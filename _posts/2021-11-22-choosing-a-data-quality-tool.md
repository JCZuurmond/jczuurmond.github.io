---
title: Choosing a data (quality) tool
tags: [data quality]
---

How do you choose which data tool to use? And specifically, how do I choose
between various data quality tools:
[Datafold](https://www.datafold.com/){:target="_blank"};
[dbt tests](https://docs.getdbt.com/docs/building-a-dbt-project/tests/){:target="_blank"};
[deequ](https://github.com/awslabs/deequ){:target="_blank"};
[great expectations](https://greatexpectations.io/){:target="_blank"};
[monte carlo](https://www.montecarlodata.com/){:target="_blank"};
[soda-sql](https://github.com/sodadata/soda-sql){:target="_blank"}.

> Full disclosure: I develop the
> [soda-spark](https://github.com/sodadata/soda-spark) package.
> See my [bio](/about) to read more about what I do.

# Fit for purpose

The first question we ask: does the tool solve the problem you have? For
example, if you would like to have [column level
lineage](https://www.datafold.com/column-level-lineage){:target="_blank"},  you
should have a look at [Datafold](https://www.datafold.com/){:target="_blank"}.
An awesome feature! This is particularly interesting if you want to audit your
data models for GDPR compliance.

However, most likely there will be multiple tools that solve your problem.
Especially if you have a general use case, like "improving data observability"
or "apply data testing". Again, how do you choose which data tool to use?

# Simple is better than complex

I have a strong preference for simple solutions. This is based on the believe
that a big portion of the cost goes into _maintaining_ software rather than
_creating_ it. If your system becomes too complex, you lose a lot of time on
putting out fires. Time you would rather spend on improving or creating data
products.

# Lowering technical barriers

We - [GoDataDriven](https://godatadriven.com){:target="_blank"} - have a check
list for easy to use tools (page 9 of [this white
paper](https://godatadriven.com/topic/data-democratization-whitepaper/){:target="_blank"}).
In the white paper we talk about a trend that we see amongst newer data tools:
modern data tools lower technical barriers. These tools are easy to use and
target a broad audience. The check list contains four key aspects:

- **Managed and serverless**: No custom solutions, no need to maintain the tool
  yourself, there is a managed cloud offering instead.
- **Low-code configuration**: configuration should be easy.
- **Out-of-the-box integration**: use the tools you love, integration should simply work.
- **SQL first**: an easy, versatile language which many data users understand.

# Open source

I prefer open source tools! I am definitely biased here. I am part of the open
source community (see my
[Github](https://github.com/JCZuurmond/){:target="_blank"}) and believe in the
culture of sharing knowledge. However, I believe there is more to it: open
source tools have great adoption and a community that offers a first line of
support. If you have a question, you can ask the community for help -
politely of course!

# Best practices

Moreover, the tool of choice should fit with the best practices you have. A
commonly accepted best practice: write your data product as code. And version
control your code (with git). A version control systems gives you traceability
of changes, it allows you to collaborate on a project and to automate various
parts with CICD. It is a key part of scaling your product!

# Costs

Finally, costs are important too. The benefit of the tool should be in balance
with the (relative) cost of a tool. Obviously, a monitoring tool should not cover
80% of your bill.

# The data quality tool of choice

Going back to the data quality tools mentioned above, I have the following
verdict:

- [Datafold](https://www.datafold.com/){:target="_blank"}:
	- has managed proposition;
	- easy to configure;
	- has many integrations;
	- data testing is SQL first;
	- not open source;
	- data tests are not easily kept in version control;
- [dbt tests](https://docs.getdbt.com/docs/building-a-dbt-project/tests/){:target="_blank"};
	- has managed proposition (paid);
	- easy to configure;
	- has many integrations;
	- SQL first;
	- open source, with large community;
	- version control;
	- OS tool is free of charge; managed proposition is paid;
	- note: dbt is a data transformation tool with testing capabilities. I use it
    for data testing too, but another tool is needed for more extensive
    functionality
- [deequ](https://github.com/awslabs/deequ){:target="_blank"};
	- no managed proposition;
	- integrates with your (py)spark application;
	- Apache spark only;
	- SQL via the Spark SQL module;
	- open source;
	- version control;
	- free of charge;
- [great expectations](https://greatexpectations.io/){:target="_blank"};
	- no managed proposition;
	- quite hard to configure;
	- many integrations;
	- **not** SQL first;
	- open source;
	- version control;
	- free of charge;
- [monte carlo](https://www.montecarlodata.com/){:target="_blank"};
	- not open source;
- [soda-sql](https://github.com/sodadata/soda-sql){:target="_blank"}.
	- has managed proposition (paid)
	- easy to configure;
	- has many integrations;
	- SQL first;
	- open source;
	- version control;
	- OS tool is free of charge; managed proposition is paid;
