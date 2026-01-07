import { Mic, PenLine, ArrowRight } from "lucide-react";

interface ContentCardProps {
  type: "spoken" | "written";
  venue: string;
  title: string;
  description: string;
  tags: string[];
  link: { label: string; url: string };
}

const ContentCard = ({ type, venue, title, description, tags, link }: ContentCardProps) => {
  return (
    <div className="project-card">
      <p className="text-sm text-muted-foreground mb-2">{venue}</p>
      <h3 className="text-lg font-semibold mb-3">"{title}"</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="tag flex items-center gap-1">
          {type === "spoken" ? <Mic className="w-3 h-3" /> : <PenLine className="w-3 h-3" />}
          {type === "spoken" ? "Spoken" : "Written"}
        </span>
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-style text-sm font-medium inline-flex items-center gap-1 group"
      >
        {link.label}
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

const ThoughtLeadershipSection = () => {
  const content: ContentCardProps[] = [
    {
      type: "spoken",
      venue: "PyData Global 2021",
      title: "Wisdom of the Crowd: Amplifying Human Intelligence With AI",
      description: "Conference talk examining how AI systems can enhance rather than replace human decision-making. Explores collaborative intelligence frameworks and practical applications of human-AI partnerships.",
      tags: ["AI", "Machine Learning"],
      link: { label: "Watch Talk", url: "https://www.youtube.com/watch?v=IJQ-PpSU1kY" },
    },
    {
      type: "written",
      venue: "Technical Blog",
      title: "dbt's missing software engineering piece: unit tests",
      description: "Deep dive into testing practices for analytics code, making the case for unit testing in dbt projects. Explores how traditional software engineering principles enhance data transformation reliability and developer confidence.",
      tags: ["Data Engineering", "Testing"],
      link: { label: "Read Article", url: "https://xebia.com/blog/dbts-missing-software-engineering-piece-unit-tests/" },
    },
    {
      type: "written",
      venue: "Academic Research",
      title: "Height estimation from aerial imagery with stereo CNNs",
      description: "University of Amsterdam master's thesis exploring computer vision applications. Research on using convolutional neural networks for three-dimensional height estimation from aerial stereo imagery.",
      tags: ["Computer Vision", "Deep Learning"],
      link: { label: "Read Thesis", url: "#" },
    },
  ];

  return (
    <section className="section-container">
      <div className="mb-12">
        <span className="section-badge mb-4">
          <Mic className="w-4 h-4" />
          Thought Leadership
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Sharing Knowledge Through Speaking & Writing
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Exploring the intersection of human intelligence and artificial intelligence, 
          software engineering practices in data, and the future of data platforms 
          through conference talks, technical writing, and academic research.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {content.map((item) => (
          <ContentCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ThoughtLeadershipSection;
