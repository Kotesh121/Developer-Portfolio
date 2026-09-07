import useAdminPortfolio from "../hooks/useAdminPortfolio";
import {
  AdminCard,
  AdminCardSave,
  AdminField,
  AdminPage,
  adminInputClass,
} from "../components/AdminUi";
import {
  // Web – Frontend
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiWebpack,
  SiVite,
  // Backend & Runtime
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFlask,
  SiFastapi,
  SiDjango,
  SiPhp,
  SiLaravel,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiGo,
  SiOpenjdk,
  SiCplusplus,
  SiC,
  SiDotnet,
  SiSpring,
  // Databases
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  // Data Science / AI / ML
  SiOpencv,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiKeras,
  // DevOps / Cloud / Tools
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiNginx,
  SiLinux,
  SiUbuntu,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiPostman,
  SiGraphql,
  SiSocketdotio,
  // Design & Misc
  SiFigma,
  SiNotion,
  SiSlack,
  SiAndroid,
  SiIos,
  SiFlutter,
  SiDart,
  SiUnity,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaDatabase, FaBrain, FaRobot, FaMicrochip, FaEnvelope, FaCode, FaLaptopCode, FaAws, FaMicrosoft } from "react-icons/fa";

function getSkillIcon(name) {
  const n = name.toLowerCase().trim();

  // ── HTML / CSS ────────────────────────────────────────────────
  if (n.includes("html")) return <SiHtml5 className="text-[#E34F26]" />;
  if (n.includes("sass") || n.includes("scss")) return <SiSass className="text-[#CC6699]" />;
  if (n.includes("css")) return <SiCss className="text-[#1572B6]" />;

  // ── JavaScript / TypeScript ───────────────────────────────────
  if (n.includes("typescript") || n === "ts") return <SiTypescript className="text-[#3178C6]" />;
  if (n === "javascript" || n === "js" || n.includes("javascript")) return <SiJavascript className="text-[#F7DF1E]" />;

  // ── Frontend Frameworks ───────────────────────────────────────
  if (n.includes("next.js") || n.includes("nextjs") || n === "next") return <SiNextdotjs className="text-white" />;
  if (n.includes("react")) return <SiReact className="text-[#61DAFB]" />;
  if (n.includes("vue")) return <SiVuedotjs className="text-[#4FC08D]" />;
  if (n.includes("angular")) return <SiAngular className="text-[#DD0031]" />;
  if (n.includes("svelte")) return <SiSvelte className="text-[#FF3E00]" />;
  if (n.includes("bootstrap")) return <SiBootstrap className="text-[#7952B3]" />;
  if (n.includes("tailwind")) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (n.includes("webpack")) return <SiWebpack className="text-[#8DD6F9]" />;
  if (n.includes("vite")) return <SiVite className="text-[#646CFF]" />;

  // ── Backend Frameworks & Runtimes ─────────────────────────────
  if (n.includes("node")) return <SiNodedotjs className="text-[#339933]" />;
  if (n.includes("express")) return <SiExpress className="text-white" />;
  if (n === "python" || n.includes("python")) return <SiPython className="text-[#3776AB]" />;
  if (n === "flask") return <SiFlask className="text-white" />;
  if (n.includes("fastapi")) return <SiFastapi className="text-[#009688]" />;
  if (n.includes("django")) return <SiDjango className="text-[#092E20]" />;
  if (n.includes("laravel")) return <SiLaravel className="text-[#FF2D20]" />;
  if (n.includes("php")) return <SiPhp className="text-[#777BB4]" />;
  if (n.includes("rails") || n.includes("ruby on rails")) return <SiRubyonrails className="text-[#CC0000]" />;
  if (n.includes("ruby")) return <SiRuby className="text-[#CC342D]" />;
  if (n.includes("spring")) return <SiSpring className="text-[#6DB33F]" />;
  if (n.includes(".net") || n.includes("dotnet") || n.includes("c#")) return <SiDotnet className="text-[#512BD4]" />;
  if (n === "rust" || n.includes("rust")) return <SiRust className="text-[#CE422B]" />;
  if (n === "go" || n.includes("golang")) return <SiGo className="text-[#00ACD7]" />;

  // ── Systems / General-Purpose Languages ───────────────────────
  if (n.includes("c++") || n.includes("cpp")) return <SiCplusplus className="text-[#00599C]" />;
  if (n === "c" || n.includes("c language")) return <SiC className="text-[#A8B9CC]" />;
  if (n.includes("java") && !n.includes("javascript")) return <SiOpenjdk className="text-[#007396]" />;
  if (n.includes("dart")) return <SiDart className="text-[#0175C2]" />;

  // ── Databases ─────────────────────────────────────────────────
  if (n.includes("postgresql") || n.includes("postgres")) return <SiPostgresql className="text-[#336791]" />;
  if (n.includes("sqlite")) return <SiSqlite className="text-[#003B57]" />;
  if (n.includes("mysql") || n === "sql") return <SiMysql className="text-[#4479A1]" />;
  if (n.includes("mongodb") || n.includes("mongo")) return <SiMongodb className="text-[#47A248]" />;
  if (n.includes("redis")) return <SiRedis className="text-[#DC382D]" />;
  if (n.includes("supabase")) return <SiSupabase className="text-[#3ECF8E]" />;
  if (n.includes("firebase")) return <SiFirebase className="text-[#FFCA28]" />;
  if (n.includes("prisma")) return <SiPrisma className="text-[#2D3748]" />;
  if (n.includes("sqlalchemy")) return <FaDatabase className="text-[#D11919]" />;

  // ── AI / ML / Data Science ────────────────────────────────────
  if (n.includes("opencv")) return <SiOpencv className="text-[#5C3EE8]" />;
  if (n.includes("tensorflow")) return <SiTensorflow className="text-[#FF6F00]" />;
  if (n.includes("pytorch")) return <SiPytorch className="text-[#EE4C2C]" />;
  if (n.includes("scikit") || n.includes("sklearn")) return <SiScikitlearn className="text-[#F7931E]" />;
  if (n.includes("numpy")) return <SiNumpy className="text-[#013243]" />;
  if (n.includes("pandas")) return <SiPandas className="text-[#150458]" />;
  if (n.includes("jupyter")) return <SiJupyter className="text-[#F37626]" />;
  if (n.includes("keras")) return <SiKeras className="text-[#D00000]" />;
  if (n.includes("face recognition")) return <FaBrain className="text-[#FF69B4]" />;
  if (n.includes("nlp") || n.includes("voice")) return <FaRobot className="text-[#4CAF50]" />;
  if (n.includes("computer vision")) return <FaBrain className="text-[#2196F3]" />;
  if (n.includes("iot") || n.includes("prototyping")) return <FaMicrochip className="text-[#FF9800]" />;

  // ── DevOps / Cloud ────────────────────────────────────────────
  if (n.includes("docker")) return <SiDocker className="text-[#2496ED]" />;
  if (n.includes("kubernetes") || n === "k8s") return <SiKubernetes className="text-[#326CE5]" />;
  if (n.includes("aws") || n.includes("amazon web services")) return <FaAws className="text-[#FF9900]" />;
  if (n.includes("gcp") || n.includes("google cloud")) return <SiGooglecloud className="text-[#4285F4]" />;
  if (n.includes("azure") || n.includes("microsoft azure")) return <FaMicrosoft className="text-[#0078D4]" />;
  if (n.includes("vercel")) return <SiVercel className="text-white" />;
  if (n.includes("netlify")) return <SiNetlify className="text-[#00C7B7]" />;
  if (n.includes("nginx")) return <SiNginx className="text-[#009639]" />;
  if (n.includes("linux")) return <SiLinux className="text-[#FCC624]" />;
  if (n.includes("ubuntu")) return <SiUbuntu className="text-[#E95420]" />;
  if (n.includes("graphql")) return <SiGraphql className="text-[#E10098]" />;
  if (n.includes("socket.io") || n.includes("websocket")) return <SiSocketdotio className="text-white" />;
  if (n.includes("postman")) return <SiPostman className="text-[#FF6C37]" />;

  // ── Version Control ───────────────────────────────────────────
  if (n.includes("gitlab")) return <SiGitlab className="text-[#FC6D26]" />;
  if (n.includes("bitbucket")) return <SiBitbucket className="text-[#0052CC]" />;
  if (n.includes("github")) return <SiGithub className="text-white" />;
  if (n.includes("git")) return <SiGit className="text-[#F05032]" />;

  // ── Mobile / Game / CMS ───────────────────────────────────────
  if (n.includes("flutter")) return <SiFlutter className="text-[#02569B]" />;
  if (n.includes("android")) return <SiAndroid className="text-[#3DDC84]" />;
  if (n.includes("ios") || n.includes("swift")) return <SiIos className="text-white" />;
  if (n.includes("unity")) return <SiUnity className="text-white" />;
  if (n.includes("wordpress")) return <SiWordpress className="text-[#21759B]" />;

  // ── Tools & Misc ─────────────────────────────────────────────
  if (n.includes("vs code") || n.includes("vscode")) return <VscVscode className="text-[#007ACC]" />;
  if (n.includes("figma")) return <SiFigma className="text-[#F24E1E]" />;
  if (n.includes("notion")) return <SiNotion className="text-white" />;
  if (n.includes("slack")) return <SiSlack className="text-[#4A154B]" />;
  if (n.includes("emailjs") || n.includes("formsubmit")) return <FaEnvelope className="text-[#FFEB3B]" />;
  if (n.includes("dbms") || n.includes("oop")) return <FaLaptopCode className="text-[#9C27B0]" />;

  return <FaCode className="text-muted-foreground" />;
}

export default function SkillsPage() {
  const { portfolio, loading, saving, setPortfolio, save, isSaving, cardStatus } =
    useAdminPortfolio();
  if (loading || !portfolio) return <p className="text-muted-foreground">Loading…</p>;

  const skills = portfolio.skills || portfolio.skillsSection?.categories || [];
  const setSkills = (patch) => setPortfolio((p) => ({ ...p, skills: patch }));

  // ── Add a brand-new empty category ──────────────────────────────────────
  function addCategory() {
    setSkills([
      ...skills,
      { name: "", items: [{ name: "" }] },
    ]);
  }

  return (
    <AdminPage
      title="Skills"
      subtitle="Edit each card and save independently. Changes sync to the public portfolio."
      actions={
        <button
          type="button"
          onClick={addCategory}
          className="rounded-full bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400/60 text-cyan-400 px-4 py-2 text-sm font-medium transition-all"
        >
          + New Skill Category
        </button>
      }
    >
      {skills.map((cat, ci) => {
        const scope = `skills-category-${ci}`;
        return (
          <AdminCard key={ci} title={`Category: ${cat.name}`}>
            {/* Category name */}
            <AdminField label="Category name">
              <input
                className={adminInputClass}
                placeholder="e.g. New category"
                value={cat.name}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[ci] = { ...newSkills[ci], name: e.target.value };
                  setSkills(newSkills);
                }}
              />
            </AdminField>

            {/* Skills list */}
            {(cat.items || []).map((item, ii) => (
              <div key={ii} className="grid grid-cols-[40px_1fr_40px] gap-3 mb-2.5 items-center">
                {/* Dynamically resolved tech logo */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-white/5 text-xl">
                  {getSkillIcon(item.name)}
                </div>
                <input
                  className={adminInputClass}
                  placeholder="e.g. New skill"
                  value={item.name}
                  onChange={(e) => {
                    const newSkills = structuredClone(skills);
                    newSkills[ci].items[ii].name = e.target.value;
                    setSkills(newSkills);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSkills = structuredClone(skills);
                    newSkills[ci].items.splice(ii, 1);
                    setSkills(newSkills);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 cursor-pointer transition-all duration-200"
                  title="Delete skill"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add skill */}
            <button
              type="button"
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors mt-2"
              onClick={() => {
                const newSkills = structuredClone(skills);
                if (!newSkills[ci].items) newSkills[ci].items = [];
                newSkills[ci].items.push({ name: "" });
                setSkills(newSkills);
              }}
            >
              + Add skill
            </button>

            {/* Per-card save */}
            <AdminCardSave
              onSave={() => save(scope)}
              saving={isSaving(scope)}
              saveLocked={saving}
              {...cardStatus(scope)}
            />
          </AdminCard>
        );
      })}
    </AdminPage>
  );
}
