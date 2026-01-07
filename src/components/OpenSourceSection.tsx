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

  const contributions = [
    { name: "dbt-spark", desc: "dbt adapter for Apache Spark" },
    { name: "spark-utils", desc: "Utility functions for dbt-spark" },
    { name: "dbt-core", desc: "Core dbt framework contributions" },
    { name: "dbt-external-tables", desc: "Macros for staging external sources" },
    { name: "docs.getdbt.com", desc: "Documentation improvements" },
  ];

  const microsoftContributions = [
    { name: "dbt-sqlserver", desc: "dbt adapter for SQL Server" },
    { name: "dbt-synapse", desc: "dbt adapter for Azure Synapse" },
  ];

  const sodaContributions = [
    { name: "soda-spark", emoji: "🚀", desc: "PySpark library for data quality testing" },
    { name: "soda-core", emoji: "✨", desc: "Core framework contributions" },
    { name: "docs", emoji: "✨", desc: "Documentation enhancements" },
  ];

  const dataScienceProjects = [
    { name: "scikit-lego", emoji: "✨", desc: "Extra blocks for scikit-learn pipelines, extending ML capabilities with practical utilities." },
    { name: "smelly-rats", emoji: "🚀", desc: "scikit-learn implementation of research on IPLS algorithms." },
    { name: "pyjpeg", emoji: "🚀", desc: "Pure Python implementation of the JPEG compression algorithm." },
    { name: "emacs-openai", emoji: "✨", desc: "Emacs integration with OpenAI for enhanced productivity." },
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
            Building Tools That Solve Real Problems
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
          <h3 className="text-xl font-semibold mb-6">Databricks Labs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {databricksProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        {/* dbt Ecosystem */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">dbt Ecosystem</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {dbtProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          
          {/* Core Contributions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="project-card">
              <h4 className="text-lg font-semibold mb-4">
                Core Contributions <span className="golden-text">✨</span>
              </h4>
              <ul className="space-y-2">
                {contributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.name}</span> — {item.desc}
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

            <div className="project-card">
              <h4 className="text-lg font-semibold mb-4">
                Microsoft Ecosystem <span className="golden-text">✨</span>
              </h4>
              <ul className="space-y-2 mb-6">
                {microsoftContributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.name}</span> — {item.desc}
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mb-4">Data Quality (Soda)</h4>
              <ul className="space-y-2">
                {sodaContributions.map((item) => (
                  <li key={item.name} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.name}</span>{" "}
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
                  {project.name} <span className="golden-text">{project.emoji}</span>
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
