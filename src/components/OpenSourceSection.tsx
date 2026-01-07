import { Puzzle } from "lucide-react";
import ProjectCard from "./ProjectCard";

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
      description: "An April Fools' project that became a viral community favorite. A playful dbt adapter for Excel that captured hearts across the data community with 400+ GitHub stars.",
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
    { name: "dbt-spark", desc: "dbt adapter for Apache Spark", url: "https://github.com/dbt-labs/dbt-spark" },
    { name: "spark-utils", desc: "Utility functions for dbt-spark", url: "https://github.com/dbt-labs/spark-utils" },
    { name: "dbt-core", desc: "Core dbt framework contributions", url: "https://github.com/dbt-labs/dbt-core" },
    { name: "dbt-external-tables", desc: "Macros for staging external sources", url: "https://github.com/dbt-labs/dbt-external-tables" },
    { name: "docs.getdbt.com", desc: "Documentation improvements", url: "https://github.com/dbt-labs/docs.getdbt.com" },
  ];

  const dbtMicrosoftContributions = [
    { name: "dbt-sqlserver", desc: "dbt adapter for SQL Server", url: "https://github.com/dbt-msft/dbt-sqlserver" },
    { name: "dbt-synapse", desc: "dbt adapter for Azure Synapse", url: "https://github.com/dbt-msft/dbt-synapse" },
  ];

  const sodaProjects = [
    {
      title: "soda-spark",
      emoji: "🚀",
      description: "PySpark library for data quality testing. Enables comprehensive data validation and quality checks directly within Spark workflows.",
      tags: ["Python", "PySpark", "Data Quality"],
      links: [{ label: "View Project", url: "https://github.com/sodadata/soda-spark" }],
    },
  ];

  const sodaContributions = [
    { name: "soda-core", emoji: "✨", desc: "Core framework contributions", url: "https://github.com/sodadata/soda-core" },
    { name: "docs", emoji: "✨", desc: "Documentation enhancements", url: "https://github.com/sodadata/docs" },
  ];

  const dataScienceProjects = [
    { name: "scikit-lego", emoji: "✨", desc: "Extra blocks for scikit-learn pipelines, extending ML capabilities with practical utilities.", url: "https://github.com/koaning/scikit-lego" },
    { name: "smelly-rats", emoji: "🚀", desc: "scikit-learn implementation of research on IPLS algorithms.", url: "https://github.com/JCZuurmond/smelly-rats" },
    { name: "pyjpeg", emoji: "🚀", desc: "Pure Python implementation of the JPEG compression algorithm.", url: "https://github.com/JCZuurmond/pyjpeg" },
    { name: "emacs-openai", emoji: "✨", desc: "Emacs integration with OpenAI for enhanced productivity.", url: "https://github.com/JCZuurmond/emacs-openai" },
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
            <div className="project-card">
              <h4 className="text-lg font-semibold mb-4">
                Microsoft Ecosystem <span className="golden-text">✨</span>
              </h4>
              <ul className="space-y-2">
                {dbtMicrosoftContributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </a> — {item.desc}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/dbt-msft"
                target="_blank"
                rel="noopener noreferrer"
                className="link-style text-sm font-medium mt-4 inline-block"
              >
                Explore dbt-msft →
              </a>
            </div>

            {/* more dbt contributions */}
            <div className="project-card">
              <h4 className="text-lg font-semibold mb-4">
                More Contributions <span className="golden-text">✨</span>
              </h4>
              <ul className="space-y-2">
                {dbtContributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </a> — {item.desc}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/dbt-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="link-style text-sm font-medium mt-4 inline-block"
              >
                Explore dbt Labs →
              </a>
            </div>
          </div>
        </div>

        {/* Soda (Data Quality) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Soda - Data Quality</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {sodaProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}

            {/* more Soda contributions */}
            <div className="project-card">
              <h4 className="text-lg font-semibold mb-4">
                More Contributions <span className="golden-text">✨</span>
              </h4>
              <ul className="space-y-2">
                {sodaContributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </a>{" "}
                    <span className="golden-text">{item.emoji}</span> — {item.desc}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/sodadata"
                target="_blank"
                rel="noopener noreferrer"
                className="link-style text-sm font-medium mt-4 inline-block"
              >
                Explore Soda →
              </a>
            </div>
          </div>
        </div>

        {/* Data Science & Beyond */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Data Science & Beyond</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataScienceProjects.map((project) => (
              <div key={project.name} className="project-card">
                <h4 className="font-semibold mb-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {project.name}
                  </a>{" "}
                  <span className="golden-text">{project.emoji}</span>
                </h4>
                <p className="text-sm text-muted-foreground">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
