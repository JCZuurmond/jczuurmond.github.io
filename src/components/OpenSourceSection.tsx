import { Puzzle } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ContributionsCard from "./ContributionsCard";

const OpenSourceSection = () => {
  const databricksProjects = [
    {
      title: "UCX",
      emoji: "✨",
      description: "Your best companion for upgrading to Unity Catalog. Enterprise migration tool streamlining the path to Databricks Unity Catalog for large-scale deployments.",
      tags: ["Python", "Databricks", "Unity Catalog"],
      links: [{ label: "View Project", url: "https://github.com/databrickslabs/ucx" }],
    },
    {
      title: "lsql",
      emoji: "✨",
      description: "Lightweight SQL execution wrapper that enhances developer productivity. Simplifies SQL workflows with elegant Python abstractions for common database operations.",
      tags: ["Python", "SQL"],
      links: [{ label: "View Project", url: "https://github.com/databrickslabs/lsql" }],
    },
  ];

  const dbtProjects = [
    {
      title: "dbt-excel",
      emoji: "🚀",
      description: "An April Fools' project that became a viral community favorite. A playful dbt adapter for Excel that captured hearts across the data community.",
      tags: ["Python", "dbt", "Humor"],
      links: [
        { label: "Demo", url: "https://dbt-excel.com/" },
        { label: "View Project", url: "https://github.com/godatadriven/dbt-excel" },
      ],
    },
    {
      title: "pytest-dbt-core",
      emoji: "🚀",
      description: "Pytest plugin bringing comprehensive testing frameworks to dbt projects. Enables unit testing for dbt models with familiar pytest conventions.",
      tags: ["Python", "pytest", "dbt"],
      links: [{ label: "View Project", url: "https://github.com/godatadriven/pytest-dbt-core" }],
    },
  ];

  const dbtContributions = [
    { title: "dbt-spark", description: "dbt adapter for Apache Spark", links: [{ label: "View Project", url: "https://github.com/dbt-labs/dbt-spark" }] },
    { title: "dbt-core", description: "Core dbt framework contributions", links: [{ label: "View Project", url: "https://github.com/dbt-labs/dbt-core" }] },
    { title: "dbt-external-tables", description: "Macros for staging external sources", links: [{ label: "View Project", url: "https://github.com/dbt-labs/dbt-external-tables" }] },
    { title: "spark-utils", description: "Utility functions for dbt-spark", links: [{ label: "View Project", url: "https://github.com/dbt-labs/spark-utils" }] },
    { title: "docs.getdbt.com", description: "Documentation improvements", links: [{ label: "View Project", url: "https://github.com/dbt-labs/docs.getdbt.com" }] },
  ];

  const dbtMicrosoftContributions = [
    { title: "dbt-sqlserver", description: "dbt adapter for SQL Server", links: [{ label: "View Project", url: "https://github.com/dbt-msft/dbt-sqlserver" }] },
    { title: "dbt-synapse", description: "dbt adapter for Azure Synapse", links: [{ label: "View Project", url: "https://github.com/dbt-msft/dbt-synapse" }] },
  ];

  const sodaProjects = [
    {
      title: "soda-spark",
      emoji: "🚀",
      description: "PySpark library for data quality testing. Enables comprehensive data validation and quality checks directly within Spark workflows.",
      tags: ["Python", "PySpark", "Data Quality"],
      links: [{ label: "View Project", url: "https://github.com/sodadata/soda-spark" }],
    },
    {
      title: "soda-core",
      emoji: "✨",
      description: "Core framework contributions",
      tags: ["Python", "Data Quality"],
      links: [{ label: "View Project", url: "https://github.com/sodadata/soda-core" }],
    },
  ];

  const miscellaneousProjects = [
    {
      title: "scikit-lego",
      emoji: "✨",
      description: "Extra blocks for scikit-learn pipelines, extending ML capabilities with practical utilities.",
      // tags: ["Python", "Machine Learning", "scikit-learn"],
      links: [{ label: "View Project", url: "https://github.com/koaning/scikit-lego" }],
    },
    {
      title: "smelly-rats",
      emoji: "🚀",
      description: "scikit-learn implementation of research on IPLS algorithms.",
      // tags: ["Python", "Machine Learning", "Research"],
      links: [{ label: "View Project", url: "https://github.com/JCZuurmond/smelly-rats" }],
    },
    {
      title: "pyjpeg",
      emoji: "🚀",
      description: "Pure Python implementation of the JPEG compression algorithm.",
      // tags: ["Python", "Image Processing"],
      links: [{ label: "View Project", url: "https://github.com/JCZuurmond/pyjpeg" }],
    },
    {
      title: "emacs-openai",
      emoji: "✨",
      description: "Emacs integration with OpenAI for enhanced productivity.",
      // tags: ["Emacs Lisp", "AI", "OpenAI"],
      links: [{ label: "View Project", url: "https://github.com/JCZuurmond/emacs-openai" }],
    },
  ];

  return (
    <section className="section-alt">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-badge mb-4">
            <Puzzle className="w-4 h-4" />
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Building Tools That Solve Your Data Problems
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Active creator 🚀 and contributor ✨ across the data engineering
            ecosystem, from enterprise migration tools to community-loved
            projects. Focused on making complex data systems more accessible and
            reliable.
          </p>
        </div>

        {/* Databricks Labs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Databricks Labs - Databricks Utilities </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {databricksProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        {/* dbt */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">dbt - Data Transformations </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {dbtProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          
          {/* dbt Microsoft */}
          <div className="grid md:grid-cols-2 gap-6">
            <ContributionsCard
              title="Microsoft Ecosystem"
              items={dbtMicrosoftContributions}
              exploreLink={{ url: "https://github.com/dbt-msft", label: "Explore dbt Microsoft" }}
            />

            <ContributionsCard
              title="More Contributions"
              items={dbtContributions}
              exploreLink={{ url: "https://github.com/dbt-labs", label: "Explore dbt Labs" }}
            />
          </div>
        </div>

        {/* Soda (Data Quality) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Soda - Data Quality</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {sodaProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        {/* Data Science & Beyond */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Data Science & Beyond</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {miscellaneousProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
