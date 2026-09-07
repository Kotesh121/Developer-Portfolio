import { Routes, Route } from "react-router-dom";
import IntroAnimation from "./Components/IntroAnimation";
import BackgroundFx from "./Components/ParticlesBackground";
import useLiteMode from "./hooks/useLiteMode";
import Navbar from "./Components/Navbar";
import SocialSidebar from "./Components/SocialSidebar";
import BackToTop from "./Components/BackToTop";
import ScrollToTop from "./Components/ScrollToTop";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import Projects from "./Sections/Projects";
import Experience from "./Sections/Experience";
import Certifications from "./Sections/Certifications";
import Contact from "./Sections/Contact";
import Blogs from "./Sections/Blogs";
import Footer from "./Components/Footer";
import AllProjectsPage from "./pages/AllProjectsPage";
import AllCertificationsPage from "./pages/AllCertificationsPage";
import { usePortfolio } from "./context/PortfolioContext";
import useRecordVisit from "./hooks/useRecordVisit";

function HomeSections({ sections }) {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects featuredOnly={true} />
      <Experience />
      {sections?.certifications && <Certifications featuredOnly={true} />}
      {sections?.blogs && <Blogs />}
      <Contact />
    </>
  );
}

export default function PublicApp() {
  useLiteMode();
  useRecordVisit();
  const { portfolio } = usePortfolio();
  const { sections } = portfolio;

  return (
    <>
      <ScrollToTop />
      <IntroAnimation />
      <BackgroundFx />
      <Navbar />
      <SocialSidebar />
      <main className="relative w-full overflow-x-clip xl:pl-16">
        <Routes>
          <Route path="/" element={<HomeSections sections={sections} />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/certifications" element={<AllCertificationsPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
