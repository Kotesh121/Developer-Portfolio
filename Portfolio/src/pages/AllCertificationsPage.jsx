import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import GlassCard from "../Components/GlassCard";
import GradientTitle from "../Components/GradientTitle";
import ProxyErrorSymbol from "../Components/ProxyErrorSymbol";
import { FiAward, FiCalendar, FiExternalLink, FiShield } from "react-icons/fi";
import { HiArrowLeft, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

function safeLink(value) {
  if (!value || typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? value : "";
  } catch {
    return "";
  }
}

export default function AllCertificationsPage() {
  const { portfolio, fromApi } = usePortfolio();
  const certifications = portfolio.certifications ?? [];
  const [search, setSearch] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("ALL");

  const issuers = useMemo(() => {
    const list = Array.from(
      new Set(certifications.map((c) => c.issuer?.trim()).filter(Boolean))
    );
    return ["ALL", ...list];
  }, [certifications]);

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesIssuer =
        selectedIssuer === "ALL" ||
        (cert.issuer ?? "").trim().toUpperCase() === selectedIssuer.toUpperCase();

      const q = search.trim().toLowerCase();
      if (!q) return matchesIssuer;

      const matchesSearch =
        (cert.title ?? "").toLowerCase().includes(q) ||
        (cert.issuer ?? "").toLowerCase().includes(q) ||
        (cert.credentialId ?? "").toLowerCase().includes(q) ||
        (cert.description ?? "").toLowerCase().includes(q) ||
        (Array.isArray(cert.skills) &&
          cert.skills.some((s) => s.toLowerCase().includes(q)));

      return matchesIssuer && matchesSearch;
    });
  }, [certifications, selectedIssuer, search]);

  return (
    <div className="min-h-screen pt-28 pb-20 page-container relative z-10">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono-display text-muted-foreground hover:text-cyan-300 transition-colors"
        >
          <HiArrowLeft className="text-sm" />
          BACK TO HOME
        </Link>
        <span className="font-mono-display text-xs text-cyan-400/70 tracking-widest uppercase">
          CREDENTIAL DIRECTORY
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
          VERIFIED QUALIFICATIONS
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          <GradientTitle
            parts={{
              before: "All Earned ",
              highlight: "Certifications",
              after: " & Honors.",
            }}
          />
        </h1>
        <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl">
          A full repository of professional certificates, verified industry credentials, and specialized course achievements.
        </p>
      </motion.header>

      {!fromApi ? (
        <GlassCard className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/10">
          <ProxyErrorSymbol />
          <h2 className="font-display text-2xl font-bold text-foreground">Credentials Offline</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Backend database is unreachable due to a proxy error.
          </p>
        </GlassCard>
      ) : (
        <>
          {/* Controls: Search & Issuers */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-base" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by certification, issuer, skill..."
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

            {/* Issuer Filter Pills */}
            {issuers.length > 2 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {issuers.map((issuer) => {
                  const isActive = selectedIssuer.toUpperCase() === issuer.toUpperCase();
                  return (
                    <button
                      key={issuer}
                      type="button"
                      onClick={() => setSelectedIssuer(issuer)}
                      className={`px-3.5 py-1.5 text-[11px] font-mono-display tracking-wider rounded-full border transition-all cursor-pointer ${
                        isActive
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                          : "bg-white/[0.02] border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                      }`}
                    >
                      {issuer}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results count info */}
          <div className="mb-6 flex items-center justify-between text-xs font-mono-display text-muted-foreground">
            <span>
              SHOWING <strong className="text-cyan-300">{filteredCerts.length}</strong> OF{" "}
              {certifications.length} CREDENTIALS
            </span>
            {(search || selectedIssuer !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedIssuer("ALL");
                }}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Cards List / Grid */}
          {filteredCerts.length === 0 ? (
            <GlassCard className="p-12 text-center border border-dashed border-white/10">
              <p className="font-mono-display text-xs uppercase tracking-widest text-cyan-400 mb-2">
                NO CREDENTIALS FOUND
              </p>
              <p className="text-muted-foreground text-sm">
                No certifications matched &quot;{search}&quot;. Try adjusting your search query.
              </p>
            </GlassCard>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredCerts.map((cert, idx) => {
                  const image = safeLink(cert.imageUrl || cert.image);
                  const credentialUrl = safeLink(cert.credentialUrl || cert.url);
                  const issuedDate = cert.issuedDate || cert.date;
                  const skills = Array.isArray(cert.skills) ? cert.skills.filter(Boolean) : [];

                  const cardContent = (
                    <GlassCard className="overflow-hidden flex flex-col sm:flex-row h-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:bg-white/[0.06]">
                      {/* Image / Icon Banner */}
                      <div className="relative w-full sm:w-48 md:w-56 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[180px] bg-slate-900/50 border-b sm:border-b-0 sm:border-r border-white/5">
                        {image ? (
                          <img
                            src={image}
                            alt={cert.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col gap-2.5 items-center justify-center w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20 text-cyan-300/70">
                            <FiAward className="text-4xl" aria-hidden="true" />
                            <span className="font-mono-display text-[10px] tracking-[0.2em] uppercase">
                              Credential
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-1 flex-col justify-center min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-mono-display text-xs uppercase tracking-wider text-cyan-400/90">
                            {cert.issuer || "Professional Credential"}
                          </p>
                          {credentialUrl && (
                            <FiExternalLink
                              className="mt-0.5 shrink-0 text-cyan-300 opacity-80 group-hover:opacity-100 transition-opacity"
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        <h2 className="font-display text-lg sm:text-xl font-semibold mt-2 text-foreground group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h2>

                        {cert.description && (
                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">
                            {cert.description}
                          </p>
                        )}

                        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-display text-xs text-muted-foreground">
                          {issuedDate && (
                            <span className="inline-flex items-center gap-1.5">
                              <FiCalendar aria-hidden="true" /> Issued {issuedDate}
                            </span>
                          )}
                          {cert.credentialId && (
                            <span className="inline-flex items-center gap-1.5">
                              <FiShield aria-hidden="true" /> ID: {cert.credentialId}
                            </span>
                          )}
                        </div>

                        {skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-0.5 font-mono-display text-[10px] text-cyan-200/90"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  );

                  return (
                    <motion.div
                      key={cert.id || cert.title || idx}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                    >
                      {credentialUrl ? (
                        <a
                          href={credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group h-full"
                        >
                          {cardContent}
                        </a>
                      ) : (
                        <div className="group h-full">{cardContent}</div>
                      )}
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
