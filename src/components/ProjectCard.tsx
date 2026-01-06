import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  emoji?: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
}

const ProjectCard = ({ title, emoji, description, tags, links }: ProjectCardProps) => {
  return (
    <div className="project-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-3">
        {title} {emoji && <span className="golden-text">{emoji}</span>}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-style text-sm font-medium inline-flex items-center gap-1 group"
          >
            {link.label}
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
