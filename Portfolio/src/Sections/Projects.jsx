import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import GlassCard from "../Components/GlassCard";
import GradientTitle from "../Components/GradientTitle";
import { getProjectCategoryFilters } from "../utils/projectFilters";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import ProxyErrorSymbol from "../Components/ProxyErrorSymbol";

/* ─── Compact visual card ─────────────────────────────────────────────────── */
function GridCard({ project }) {
  return (
    <GlassCard className="flex flex-col justify-between h-full overflow-hidden rounded-2xl group hover:border-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300">
      {/* Small image visual banner */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-900/50 border-b border-white/5">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20">
            <span className="font-display font-black text-2xl tracking-widest text-white/10 uppercase select-none">
              {project.title?.slice(0, 2) || "PR"}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground truncate leading-relaxed">
            {project.description}
          </p>
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-4">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono-display tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="text-sm" /> CODE
              </a>
            ) : (
              <span />
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono-display tracking-wider text-cyan-300 hover:text-cyan-200 transition-colors ml-auto"
              >
                LIVE DEMO <HiArrowUpRight className="text-sm" />
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export default function Projects({ featuredOnly = false }) {
  const { portfolio, fromApi } = usePortfolio();
  const projectsSection = portfolio.projectsSection ?? {
    eyebrow: "SELECTED WORK",
    title: { before: "Projects I'm ", highlight: "proud", after: " of." },
    subtitle: "A small selection of recent products — each one shipped with obsessive care.",
  };
  const projects = portfolio.projects ?? [];
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filters = getProjectCategoryFilters(projects);

  const allFiltered =
    selectedFilter === "ALL"
      ? projects
      : projects.filter(
          (p) =>
            (p.category ?? "").trim().toUpperCase() === selectedFilter.toUpperCase()
        );

  const displayedProjects = featuredOnly ? allFiltered.slice(0, 3) : allFiltered;

  return (
    <section id="projects" className="page-container section-pad relative">
      <motion.header
        className="mb-10 sm:mb-14 md:mb-20 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono-display text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase text-muted-foreground mb-3 sm:mb-4">
          {projectsSection.eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] sm:leading-[1.1] max-w-3xl mx-auto md:mx-0 text-balance">
          <GradientTitle parts={projectsSection.title} />
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto md:mx-0">
          {projectsSection.subtitle}
        </p>
      </motion.header>

      {!fromApi ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="flex flex-col items-center justify-center text-center p-10 py-16 border border-dashed border-white/10 hover:border-cyan-500/20 transition-all duration-300">
            <ProxyErrorSymbol />
            <h3 className="font-display text-2xl font-bold text-foreground">No items found!</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Backend database is unreachable due to a proxy error.
            </p>
          </GlassCard>
        </motion.div>
      ) : (
        <>
          {/* Filter tabs */}
          {filters.length > 1 && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10 md:mb-12">
              {filters.map((filter) => {
                const isActive = selectedFilter.toUpperCase() === filter.toUpperCase();
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 text-xs font-mono-display tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                        : "bg-white/[0.02] border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Responsive compact card grid ── */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="h-full"
                >
                  <GridCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Multipage CTA Button ── */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono-display text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:scale-105"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-[10px] text-cyan-200">
                {projects.length}
              </span>
              <HiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
