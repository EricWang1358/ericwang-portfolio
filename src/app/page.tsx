"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, GraduationCap, Menu, X, BookOpen, Instagram, Code2, Database, Cloud, Brain, Layers, Terminal, Cpu, Globe, Container, Sparkles, Trophy, Lock, Palette } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useInView } from "framer-motion";

/* ─── Data ─── */

const projects = [
  {
    title: "AGV Scheduling Optimization",
    brief: "WSC 2024 1st Place — 4.09% delay rate",
    description: "3-module heuristic: queue-aware yard allocation, weighted-distance berth placement, linear-scoring AGV dispatch. Pivoted from DRL after convergence failure; two-stage grid search for optimal weights.",
    tags: ["Python", "Heuristics", "Optimization"],
    link: "#",
    gradient: "from-amber-200/50 via-yellow-100/30 to-orange-200/40 dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-orange-900/30",
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    title: "Cache-Aware Data Orchestration",
    brief: "Compiler cache optimization via DP on DAGs",
    description: "ILP proved intractable due to state-space explosion. Pivoted to Bellman-equation DP on weighted dataflow graphs, achieving near-optimal cache hit rates within compilation time budgets.",
    tags: ["C++", "LLVM", "DP", "Research"],
    link: "#",
    gradient: "from-rose-200/40 via-amber-100/30 to-violet-200/40 dark:from-rose-900/30 dark:via-amber-900/20 dark:to-violet-900/30",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "CUHK Data Space Platform",
    brief: "Secure data exchange with IDS architecture",
    description: "Led DAPS module: identity verification & token issuance via FastAPI + Redis atomic locks. Docker containerization cut setup 70%; Redis reduced API latency 40%. Full CI/CD with GitHub Actions.",
    tags: ["FastAPI", "Redis", "Docker", "JWT"],
    link: "#",
    gradient: "from-emerald-200/40 via-cyan-100/30 to-blue-200/40 dark:from-emerald-900/30 dark:via-cyan-900/20 dark:to-blue-900/30",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Semantic Image Colorization",
    brief: "28.27 dB PSNR with joint seg-color head",
    description: "Staged evaluation across CIFAR-10 → COCO. Three fusion methods on CNN/U-Net/ViT backbones. Joint head gained +3.57 dB over baseline; cross-attention collapsed at higher resolution.",
    tags: ["PyTorch", "ViT", "U-Net", "Deep Learning"],
    link: "#",
    gradient: "from-violet-200/40 via-pink-100/30 to-orange-200/40 dark:from-violet-900/30 dark:via-pink-900/20 dark:to-orange-900/30",
    icon: <Palette className="h-6 w-6" />,
  },
  {
    title: "RISC-V Pipeline Simulator",
    brief: "5-stage pipeline with RVV vector extension",
    description: "Implemented vsetvl, vadd, vmul, vlw, vsw with correct opcode/funct3/funct6 decoding. Handled pipeline hazards, vector register management, and stage signal propagation in C++.",
    tags: ["C++", "RISC-V", "Pipeline", "Architecture"],
    link: "#",
    gradient: "from-sky-200/40 via-indigo-100/30 to-purple-200/40 dark:from-sky-900/30 dark:via-indigo-900/20 dark:to-purple-900/30",
    icon: <Terminal className="h-6 w-6" />,
  },
  {
    title: "Library Management System",
    brief: "Full-stack Spring Boot + Vue.js CRUD app",
    description: "ER schema with 4 tables and PK/FK constraints. Role-based access (Reader/Admin), MyBatis dynamic SQL, @Transactional consistency, and layered Controller-Service-Mapper architecture.",
    tags: ["Java", "Spring Boot", "Vue.js", "MySQL"],
    link: "#",
    gradient: "from-teal-200/40 via-green-100/30 to-lime-200/40 dark:from-teal-900/30 dark:via-green-900/20 dark:to-lime-900/30",
    icon: <Database className="h-6 w-6" />,
  },
];

const skillIcons: Record<string, React.ReactNode> = {
  "Python": <Terminal className="h-3.5 w-3.5" />,
  "Java": <Code2 className="h-3.5 w-3.5" />,
  "C/C++": <Cpu className="h-3.5 w-3.5" />,
  "JavaScript/TS": <Globe className="h-3.5 w-3.5" />,
  "Vue.js": <Layers className="h-3.5 w-3.5" />,
  "React/Next.js": <Code2 className="h-3.5 w-3.5" />,
  "SQL": <Database className="h-3.5 w-3.5" />,
  "PyTorch/ML": <Brain className="h-3.5 w-3.5" />,
  "Docker": <Container className="h-3.5 w-3.5" />,
  "FastAPI": <Globe className="h-3.5 w-3.5" />,
  "Spring Boot": <Layers className="h-3.5 w-3.5" />,
  "Redis": <Database className="h-3.5 w-3.5" />,
};

const skills = [
  "Python", "Java", "C/C++", "JavaScript/TS", "Vue.js",
  "React/Next.js", "SQL", "PyTorch/ML", "Docker",
  "FastAPI", "Spring Boot", "Redis",
];

const education = {
  school: "The Chinese University of Hong Kong, Shenzhen",
  degree: "B.Sc. in Computer Science",
  period: "2022 - 2026",
};

const stats = [
  { value: "6+", label: "Projects" },
  { value: "12+", label: "Tech Skills" },
  { value: "1st", label: "WSC 2024" },
];

/* ─── Typewriter Hook ─── */

function useTypewriter(texts: string[], speed = 80, deleteSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentFullText.substring(0, displayText.length - 1)
            : currentFullText.substring(0, displayText.length + 1)
        );
      }, isDeleting ? deleteSpeed : speed);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return displayText;
}

/* ─── Animated Section Wrapper ─── */

function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const typedText = useTypewriter([
    "Builder & Problem Solver",
    "Full-Stack Developer",
    "AI Enthusiast",
    "Cloud Explorer",
  ]);

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-body)] transition-colors duration-500 dot-grid-bg">
      {/* ═══ Navigation ═══ */}
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-between rounded-full bg-background/70 px-4 sm:px-6 py-3 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02] backdrop-blur-xl border border-border"
        >
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
            Eric
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          </span>
          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-6">
            {["Projects", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
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
        </motion.div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-border p-4 shadow-lg"
          >
            <div className="flex flex-col gap-3">
              {["Projects", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground py-2 cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden">
        {/* Pearlescent / Iridescent glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full opacity-40 blur-[100px] iridescent"
            style={{ background: "var(--pearl-gradient)" }}
          />
          <div
            className="absolute -bottom-20 right-1/4 h-[350px] w-[350px] rounded-full opacity-30 blur-[100px]"
            style={{ background: "var(--pearl-gradient)", animationDelay: "4s", animationName: "iridescent-shift", animationDuration: "12s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
          />
          <div
            className="absolute top-1/3 right-[10%] h-[200px] w-[200px] rounded-full opacity-20 blur-[80px]"
            style={{ background: "var(--pearl-gradient)", animationDelay: "8s", animationName: "iridescent-shift", animationDuration: "12s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
          />
        </div>

        {/* Pearl shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px pearl-shimmer" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl text-center"
        >
          {/* Avatar */}
          <div className="mx-auto mb-8 relative">
            <div className="h-28 w-28 mx-auto rounded-full bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 p-[3px] iridescent">
              <div className="h-full w-full rounded-full bg-card flex items-center justify-center text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">
                E
              </div>
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-primary/60 animate-pulse" />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Hi, I&apos;m{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent">
                Eric Wang
              </span>
            </span>
          </h1>

          {/* Typewriter subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground h-8">
            CS Senior @ CUHK-Shenzhen |{" "}
            <span className="text-foreground font-medium">
              {typedText}
              <span className="ml-0.5 inline-block w-[2px] h-5 bg-primary align-middle" style={{ animation: "blink-caret 1s step-end infinite" }} />
            </span>
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-primary/70" />
            <span className="text-xs sm:text-sm">{education.school}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              className="h-10 sm:h-12 rounded-full bg-foreground px-6 sm:px-8 text-background transition-all duration-300 hover:bg-foreground/80 hover:shadow-lg hover:shadow-foreground/10 hover:scale-[1.02] cursor-pointer"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              variant="outline"
              className="h-10 sm:h-12 rounded-full border-border px-6 sm:px-8 transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="relative px-4 sm:px-6 -mt-8 sm:-mt-12 pb-12">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ Projects Section ═══ */}
      <section id="projects" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Projects
            </h2>
            <p className="mt-4 text-muted-foreground">
              A selection of things I&apos;ve built and worked on.
            </p>
          </AnimatedSection>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card
                  className="group relative overflow-hidden border-border bg-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 cursor-pointer hover:-translate-y-1"
                >
                  {/* Gradient cover */}
                  <div className={`h-32 sm:h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 pearl-shimmer opacity-30" />
                    <div className="h-14 w-14 rounded-xl bg-background/60 dark:bg-background/40 backdrop-blur-sm flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      {project.icon}
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    {/* Brief — always visible */}
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground/80 font-medium">
                      {project.brief}
                    </p>
                    {/* Full description — revealed on hover */}
                    <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full bg-accent/80 px-3 py-1 text-xs font-medium text-accent-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ About Section ═══ */}
      <section id="about" className="relative bg-card/50 px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
        {/* Subtle shimmer divider */}
        <div className="absolute top-0 left-0 right-0 h-px pearl-shimmer" />

        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              About
            </h2>
          </AnimatedSection>
          <div className="mt-8 grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I&apos;m a senior CS student at CUHK-Shenzhen with hands-on experience spanning
                compiler optimization, distributed systems, deep learning, and full-stack development.
                I won 1st Place at the 2024 Winter Simulation Challenge for AGV scheduling optimization.
              </p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                My approach: mathematical rigor meets engineering pragmatism. I know when to use
                ILP vs DP, when to pivot from DRL to heuristics, and how to ship reliable systems
                with Docker, CI/CD, and automated testing. Currently seeking opportunities in
                software architecture and applied AI.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-accent/50 border border-border backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{education.degree}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{education.school}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{education.period}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-foreground">
                Skills & Technologies
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-accent/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10 cursor-default"
                  >
                    <span className="text-primary/70">{skillIcons[skill]}</span>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ Contact Section ═══ */}
      <section id="contact" className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Get in Touch
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Have a project in mind or just want to chat? Feel free to reach out.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
              {/* Email */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-300 hover:bg-[#EA4335] hover:border-[#EA4335] hover:text-white hover:shadow-lg hover:shadow-[#EA4335]/20 hover:scale-110 cursor-pointer"
                asChild
              >
                <a href="mailto:1064271358@qq.com" aria-label="Email">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              {/* GitHub */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-300 hover:bg-[#333] dark:hover:bg-white hover:border-[#333] dark:hover:border-white hover:text-white dark:hover:text-[#333] hover:shadow-lg hover:shadow-[#333]/20 hover:scale-110 cursor-pointer"
                asChild
              >
                <a href="https://github.com/EricWang1358" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              {/* LinkedIn */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-300 hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white hover:shadow-lg hover:shadow-[#0077B5]/20 hover:scale-110 cursor-pointer"
                asChild
              >
                <a href="https://www.linkedin.com/in/%E5%AD%90%E6%98%82-%E7%8E%8B-544237334/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              {/* CSDN Blog */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-300 hover:bg-[#FC5531] hover:border-[#FC5531] hover:text-white hover:shadow-lg hover:shadow-[#FC5531]/20 hover:scale-110 cursor-pointer"
                asChild
              >
                <a href="https://blog.csdn.net/m0_74331272?type=blog" target="_blank" rel="noopener noreferrer" aria-label="CSDN Blog">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              {/* Instagram */}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-border transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134AF] hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-[#dd2a7b]/20 hover:scale-110 cursor-pointer"
                asChild
              >
                <a href="https://www.instagram.com/ericwang1358/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative border-t border-border bg-card/50 px-4 sm:px-6 py-6 sm:py-8">
        <div className="absolute top-0 left-0 right-0 h-px pearl-shimmer" />
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Eric Wang. Built with Next.js & TailwindCSS.
          </p>
          <div className="mt-3">
            <Link
              href="/about"
              className="text-xs sm:text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              About this site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
