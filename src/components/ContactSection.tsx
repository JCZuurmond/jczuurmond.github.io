import { Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="section-alt">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Let's Build Something Together
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
          Open to collaborations on data engineering challenges, open source contributions, 
          speaking opportunities, and conversations about the future of data platforms. 
          Whether you're tackling Unity Catalog migrations, improving dbt workflows, 
          or exploring AI-human collaboration, let's connect.
        </p>
        
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/JCZuurmond"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-all group-hover:shadow-lg group-hover:border-foreground/20">
              <Github className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">GitHub</span>
            <span className="text-xs text-link">@JCZuurmond</span>
          </a>
          
          <a
            href="https://www.linkedin.com/in/cor-zuurmond/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-all group-hover:shadow-lg group-hover:border-foreground/20">
              <Linkedin className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">LinkedIn</span>
            <span className="text-xs text-link">Connect</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
