import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import GlassCard from "../Components/GlassCard";
import GradientTitle from "../Components/GradientTitle";
import ProxyErrorSymbol from "../Components/ProxyErrorSymbol";
import { getProjectCategoryFilters } from "../utils/projectFilters";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight, HiArrowLeft, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

function safeLink(value) {
  if (!value || typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? value : "";
  } catch {
    return "";
  }
}

export default function AllProjectsPage() {
  const { portfolio, fromApi } = usePortfolio();
  const projects = portfolio.projects ?? [];
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = useMemo(() => getProjectCategoryFilters(projects), [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        (project.category ?? "").trim().toUpperCase() === selectedCategory.toUpperCase();

      const q = search.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        (project.title ?? "").toLowerCase().includes(q) ||
        (project.description ?? "").toLowerCase().includes(q) ||
        (project.category ?? "").toLowerCase().includes(q) ||
        (Array.isArray(project.tags) &&
          project.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, search]);

  return (
    <div className="min-h-screen pt-28 pb-20 page-container relative z-10">
      {/* Breadcrumbs & Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono-display text-muted-foreground hover:text-cyan-300 transition-colors"
        >
          <HiArrowLeft className="text-sm" />
          BACK TO HOME
        </Link>
        <span className="font-mono-display text-xs text-cyan-400/70 tracking-widest uppercase">
          PROJECT ARCHIVE
        </span>
      </div>

      {/* Header */}
      <motion.header
        className="mb-10 text-left"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono-display text-xs tracking-[0.3em] uppercase text-cyan-400 mb-3">
          COMPLETE PORTFOLIO
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          <GradientTitle
            parts={{
              before: "All Crafted ",
              highlight: "Projects",
              after: " & Prototypes.",
            }}
          />
        </h1>
        <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl">
          Explore complete architectural builds, systems, voice assistants, and full-stack software engineered for practical use.
        </p>
      </motion.header>

      {!fromApi ? (
        <GlassCard className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/10">
          <ProxyErrorSymbol />
          <h2 className="font-display text-2xl font-bold text-foreground">Projects Offline</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Backend database is unreachable due to a proxy error.
          </p>
        </GlassCard>
      ) : (
        <>
          {/* Controls: Search & Categories */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-base" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by title, stack, keyword..."
                className="w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-10 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyan-400/50 focus:bg-white/[0.06] focus:outline-none transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <HiXMark className="text-base" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory.toUpperCase() === cat.toUpperCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-[11px] font-mono-display tracking-wider rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "bg-white/[0.02] border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count info */}
          <div className="mb-6 flex items-center justify-between text-xs font-mono-display text-muted-foreground">
            <span>
              SHOWING <strong className="text-cyan-300">{filteredProjects.length}</strong> OF{" "}
              {projects.length} PROJECTS
            </span>
            {(search || selectedCategory !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("ALL");
                }}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <GlassCard className="p-12 text-center border border-dashed border-white/10">
              <p className="font-mono-display text-xs uppercase tracking-widest text-cyan-400 mb-2">
                NO MATCHES FOUND
              </p>
              <p className="text-muted-foreground text-sm">
                No projects matched &quot;{search}&quot;. Try adjusting your search or category filter.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  const liveUrl = safeLink(project.liveUrl);
                  const repoUrl = safeLink(project.repoUrl);

                  return (
                    <motion.div
                      key={project.id || project.title || idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                    >
                      <GlassCard className="flex flex-col h-full overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                        {/* Thumbnail */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900/60 border-b border-white/5">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20">
                              <span className="font-display font-black text-4xl tracking-widest text-white/10 uppercase select-none">
                                {project.title?.slice(0, 2) || "PR"}
                              </span>
                            </div>
                          )}
                          {project.category && (
                            <span className="absolute top-3 left-3 rounded-full border border-cyan-400/30 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 font-mono-display text-[9px] tracking-wider text-cyan-300">
                              {project.category}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6 flex flex-col flex-1">
                          <h2 className="font-display text-xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h2>

                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                            {project.description}
                          </p>

                          {/* Tech stack */}
                          {Array.isArray(project.tags) && project.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-[10px] font-mono-display rounded bg-white/[0.04] border border-white/10 text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer links */}
                          {(repoUrl || liveUrl) && (
                            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                              {repoUrl ? (
                                <a
                                  href={repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-mono-display text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <FaGithub className="text-sm" /> CODE
                                </a>
                              ) : (
                                <span />
                              )}
                              {liveUrl && (
                                <a
                                  href={liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-mono-display text-cyan-300 hover:text-cyan-200 transition-colors ml-auto"
                                >
                                  LIVE DEMO <HiArrowUpRight className="text-sm" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
}
