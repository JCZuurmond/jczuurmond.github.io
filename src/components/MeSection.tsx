import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const MeSection = () => {
  return (
    <section className="section-container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Field CTO • Data Engineering & Artificial Intelligence
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            Cor Zuurmond
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Bringing clarity to complex data challenges through engineering
            innovation and human-centered technical leadership. Cor is a field
            CTO at Xebia, bridging enterprise data strategy with hands-on
            engineering excellence.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild className="gap-2">
              <a href="https://github.com/JCZuurmond" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View GitHub
              </a>
            </Button>

            <Button variant="outline" asChild className="gap-2">
              <a href="https://www.linkedin.com/in/cor-zuurmond/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-secondary overflow-hidden shadow-xl">
            <img
              src="/me.png"
              alt="Cor Zuurmond"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeSection;
