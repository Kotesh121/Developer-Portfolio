import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import SectionHeader from "../Components/SectionHeader";
import GlassCard from "../Components/GlassCard";
import ProxyErrorSymbol from "../Components/ProxyErrorSymbol";
import { FiAward, FiCalendar, FiExternalLink, FiShield } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";

function safeLink(value) {
  if (!value || typeof value !== "string") return "";
  try {
    const url = new URL(value, window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? value : "";
  } catch {
    return "";
  }
}

function CertificationCard({ cert }) {
  const image = safeLink(cert.imageUrl || cert.image);
  const credentialUrl = safeLink(cert.credentialUrl || cert.url);
  const issuedDate = cert.issuedDate || cert.date;
  const skills = Array.isArray(cert.skills) ? cert.skills.filter(Boolean) : [];
  const content = (
    <GlassCard className="overflow-hidden flex flex-col sm:flex-row h-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:bg-white/[0.06]">
      <div className="relative w-full sm:w-48 md:w-56 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[178px] bg-slate-900/50 border-b sm:border-b-0 sm:border-r border-white/5">
        {image ? (
          <img
            src={image}
            alt={cert.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col gap-3 items-center justify-center w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20 text-cyan-300/70">
            <FiAward className="text-4xl" aria-hidden="true" />
            <span className="font-mono-display text-[10px] tracking-[0.22em] uppercase">Credential</span>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-1 flex-col justify-center min-w-0">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono-display text-xs uppercase tracking-wider text-cyan-400/80">{cert.issuer || "Professional credential"}</p>
          {credentialUrl && <FiExternalLink className="mt-0.5 shrink-0 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />}
        </div>
        <h3 className="font-display text-lg font-semibold mt-2 group-hover:text-gradient transition-colors">
          {cert.title}
        </h3>
        {cert.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{cert.description}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-display text-xs text-muted-foreground">
          {issuedDate && <span className="inline-flex items-center gap-1.5"><FiCalendar aria-hidden="true" /> Issued {issuedDate}</span>}
          {cert.credentialId && <span className="inline-flex items-center gap-1.5"><FiShield aria-hidden="true" /> ID {cert.credentialId}</span>}
        </div>
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => <span key={skill} className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-2.5 py-1 font-mono-display text-[10px] text-cyan-200/80">{skill}</span>)}
          </div>
        )}
      </div>
    </GlassCard>
  );

  if (credentialUrl) {
    return (
      <a
        href={credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
}

export default function Certifications({ featuredOnly = false }) {
  const { portfolio, fromApi } = usePortfolio();
  const certifications = portfolio.certifications ?? [];
  const displayedCerts = featuredOnly ? certifications.slice(0, 4) : certifications;

  return (
    <section id="certifications" className="page-container section-pad relative">
      <SectionHeader
        eyebrow="EARNED CERTIFICATIONS"
        title={{ before: "Credentials I've ", highlight: "earned", after: "." }}
        subtitle="Verified credentials, focused learning, and the practical skills behind my work."
      />
      {!fromApi ? (
        <GlassCard className="flex flex-col items-center justify-center text-center p-10 py-16 border border-dashed border-white/10 hover:border-cyan-500/20 transition-all duration-300">
          <ProxyErrorSymbol />
          <h3 className="font-display text-2xl font-bold text-foreground">No items found!</h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Backend database is unreachable due to a proxy error.
          </p>
        </GlassCard>
      ) : (
        <>
          <ul className="grid gap-5 lg:grid-cols-2">
            {displayedCerts.map((cert) => (
              <li key={cert.id || cert.title}>
                <CertificationCard cert={cert} />
              </li>
            ))}
          </ul>

          {/* Multipage CTA Button */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/certifications"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono-display text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:scale-105"
            >
              <span>VIEW ALL CREDENTIALS</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-[10px] text-cyan-200">
                {certifications.length}
              </span>
              <HiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
