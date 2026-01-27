import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, GraduationCap } from "lucide-react";

const projects = [
  {
    title: "Cache Optimization Research",
    description: "LLVM-based cache simulation and optimization research with Python scripts for performance analysis",
    tags: ["Python", "LLVM", "Research"],
    link: "#",
  },
  {
    title: "Rongtai Report System",
    description: "Full-stack reporting system with Vue.js frontend and FastAPI backend for enterprise data visualization",
    tags: ["Vue.js", "FastAPI", "UniApp"],
    link: "#",
  },
  {
    title: "Cloud Computing Platform",
    description: "Distributed computing project using Spark and Docker for scalable data processing",
    tags: ["Spark", "Docker", "Cloud"],
    link: "#",
  },
  {
    title: "AI Whisper Transcription",
    description: "Local deployment of OpenAI Whisper with GPU acceleration for audio-to-text conversion",
    tags: ["Python", "AI", "Whisper"],
    link: "#",
  },
];

const skills = [
  "Python",
  "Java",
  "C/C++",
  "JavaScript",
  "Vue.js",
  "React",
  "SQL",
  "Machine Learning",
  "Cloud Computing",
  "Docker",
];

const education = {
  school: "The Chinese University of Hong Kong, Shenzhen",
  degree: "B.Sc. in Computer Science",
  period: "2021 - 2025",
  gpa: "3.2/4.0",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-[family-name:var(--font-body)]">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-sm backdrop-blur-md border border-gray-200/50">
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#18181B]">
            Eric
          </span>
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-sm text-[#3F3F46] transition-colors duration-200 hover:text-[#18181B] cursor-pointer">
              Projects
            </a>
            <a href="#about" className="text-sm text-[#3F3F46] transition-colors duration-200 hover:text-[#18181B] cursor-pointer">
              About
            </a>
            <a href="#contact" className="text-sm text-[#3F3F46] transition-colors duration-200 hover:text-[#18181B] cursor-pointer">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-3xl text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight text-[#18181B] sm:text-6xl md:text-7xl">
            Hi, I&apos;m <span className="text-[#2563EB]">Eric Wang</span>
          </h1>
          <p className="mt-6 text-lg text-[#3F3F46] sm:text-xl">
            CS Senior @ CUHK-Shenzhen | Builder & Problem Solver
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#3F3F46]">
            <GraduationCap className="h-4 w-4" />
            <span>{education.school}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button 
              className="h-12 rounded-full bg-[#18181B] px-8 text-white transition-all duration-200 hover:bg-[#3F3F46] cursor-pointer"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button 
              variant="outline" 
              className="h-12 rounded-full border-[#18181B]/20 px-8 transition-all duration-200 hover:bg-[#18181B]/5 cursor-pointer"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#18181B] sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-[#3F3F46]">
            A selection of things I&apos;ve built and worked on.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-gray-200/50 bg-white transition-all duration-300 hover:shadow-lg hover:border-[#2563EB]/20 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#18181B] group-hover:text-[#2563EB] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-[#3F3F46] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 text-sm text-[#3F3F46]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-[#18181B]/5 px-3 py-1 text-xs font-medium text-[#3F3F46]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#18181B] sm:text-4xl">
            About
          </h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[#3F3F46] leading-relaxed">
                I&apos;m a senior CS student at CUHK-Shenzhen, passionate about building practical 
                tools and solving real-world problems. My experience spans full-stack development, 
                cloud computing, and AI applications.
              </p>
              <p className="mt-4 text-[#3F3F46] leading-relaxed">
                I excel at leveraging modern AI tools to accelerate development workflows. 
                Currently seeking opportunities in software engineering and applied AI roles.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-[#FAFAFA] border border-gray-200/50">
                <div className="flex items-center gap-2 text-sm font-medium text-[#18181B]">
                  <GraduationCap className="h-4 w-4 text-[#2563EB]" />
                  Education
                </div>
                <p className="mt-2 text-sm text-[#3F3F46]">{education.degree}</p>
                <p className="text-sm text-[#3F3F46]">{education.school}</p>
                <p className="text-sm text-[#3F3F46]">{education.period} | GPA: {education.gpa}</p>
              </div>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#18181B]">
                Skills & Technologies
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-[#18181B]/10 bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#18181B] transition-colors duration-200 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#18181B] sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-[#3F3F46]">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-[#18181B]/20 transition-all duration-200 hover:bg-[#18181B] hover:text-white cursor-pointer"
              asChild
            >
              <a href="mailto:eric1064271358@163.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-[#18181B]/20 transition-all duration-200 hover:bg-[#18181B] hover:text-white cursor-pointer"
              asChild
            >
              <a href="https://github.com/EricWang1358" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-[#18181B]/20 transition-all duration-200 hover:bg-[#18181B] hover:text-white cursor-pointer"
              asChild
            >
              <a href="https://linkedin.com/in/ericwang" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-[#3F3F46]">
            © {new Date().getFullYear()} Eric Wang. Built with Next.js & TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
