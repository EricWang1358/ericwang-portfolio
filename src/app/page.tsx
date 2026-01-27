"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, GraduationCap, Menu, X, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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
  period: "2022 - 2026",
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-body)] transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full bg-background/80 px-4 sm:px-6 py-3 shadow-sm backdrop-blur-md border border-border">
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
            Eric
          </span>
          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-6">
            <a href="#projects" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer">
              Projects
            </a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer">
              About
            </a>
            <a href="#contact" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer">
              Contact
            </a>
            <ThemeToggle />
          </div>
          {/* Mobile Nav Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-md border border-border p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 cursor-pointer">
                Projects
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 cursor-pointer">
                About
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 cursor-pointer">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-3xl text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Hi, I&apos;m <span className="text-primary">Eric Wang</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground">
            CS Senior @ CUHK-Shenzhen | Builder & Problem Solver
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{education.school}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button 
              className="h-10 sm:h-12 rounded-full bg-foreground px-6 sm:px-8 text-background transition-all duration-200 hover:bg-foreground/80 cursor-pointer"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button 
              variant="outline" 
              className="h-10 sm:h-12 rounded-full border-border px-6 sm:px-8 transition-all duration-200 hover:bg-accent cursor-pointer"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground">
            A selection of things I&apos;ve built and worked on.
          </p>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
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
      <section id="about" className="bg-card px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            About
          </h2>
          <div className="mt-8 grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2">
            <div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I&apos;m a senior CS student at CUHK-Shenzhen, passionate about building practical 
                tools and solving real-world problems. My experience spans full-stack development, 
                cloud computing, and AI applications.
              </p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                I excel at leveraging modern AI tools to accelerate development workflows. 
                Currently seeking opportunities in software engineering and applied AI roles.
              </p>
              <div className="mt-6 p-4 rounded-lg bg-accent border border-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{education.degree}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{education.school}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{education.period}</p>
              </div>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-foreground">
                Skills & Technologies
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-border bg-accent px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 cursor-default"
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
      <section id="contact" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
              asChild
            >
              <a href="mailto:1064271358@qq.com" aria-label="Email">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
              asChild
            >
              <a href="https://github.com/EricWang1358" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
              asChild
            >
              <a href="https://www.linkedin.com/in/%E5%AD%90%E6%98%82-%E7%8E%8B-544237334/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-200 hover:bg-foreground hover:text-background cursor-pointer"
              asChild
            >
              <a href="https://blog.csdn.net/m0_74331272?type=blog" target="_blank" rel="noopener noreferrer" aria-label="CSDN Blog">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Eric Wang. Built with Next.js & TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
