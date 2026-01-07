interface ProjectItem {
  title: string;
  emoji?: string;
  description: string;
  tags?: string[];
  links: { label: string; url: string }[];
}

interface ContributionsCardProps {
  title: string;
  titleEmoji?: string;
  items: ProjectItem[];
  exploreLink?: {
    url: string;
    label: string;
  };
}

const ContributionsCard = ({ title, titleEmoji = "✨", items, exploreLink }: ContributionsCardProps) => {
  const handleCardClick = () => {
    if (exploreLink) {
      window.open(exploreLink.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`project-card ${exploreLink ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <h4 className="text-lg font-semibold mb-4">
        {title} <span className="golden-text">{titleEmoji}</span>
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.title} className="text-sm text-muted-foreground">
            <a
              href={item.links[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {item.title}
            </a>
            {item.emoji && <> <span className="golden-text">{item.emoji}</span></>} — {item.description}
          </li>
        ))}
      </ul>
      {exploreLink && (
        <a
          href={exploreLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-style text-sm font-medium mt-4 inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          {exploreLink.label} →
        </a>
      )}
    </div>
  );
};

export default ContributionsCard;
