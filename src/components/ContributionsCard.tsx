interface ContributionItem {
  name: string;
  desc: string;
  url: string;
  emoji?: string;
}

interface ContributionsCardProps {
  title: string;
  titleEmoji?: string;
  contributions: ContributionItem[];
  exploreLink?: {
    url: string;
    label: string;
  };
}

const ContributionsCard = ({ title, titleEmoji = "✨", contributions, exploreLink }: ContributionsCardProps) => {
  return (
    <div className="project-card">
      <h4 className="text-lg font-semibold mb-4">
        {title} <span className="golden-text">{titleEmoji}</span>
      </h4>
      <ul className="space-y-2">
        {contributions.map((item) => (
          <li key={item.name} className="text-sm text-muted-foreground">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              {item.name}
            </a>
            {item.emoji && <> <span className="golden-text">{item.emoji}</span></>} — {item.desc}
          </li>
        ))}
      </ul>
      {exploreLink && (
        <a
          href={exploreLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-style text-sm font-medium mt-4 inline-block"
        >
          {exploreLink.label} →
        </a>
      )}
    </div>
  );
};

export default ContributionsCard;
