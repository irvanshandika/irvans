import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import About from '@/src/components/sections/About';
import Certificates from '@/src/components/sections/Certificates';
import Hero from '@/src/components/sections/Hero';
import Projects from '@/src/components/sections/Projects';
import Skills from '@/src/components/sections/Skills';
import Contact from '@/src/components/sections/Contact';

export default function Home() {
  return (
    <>
      <main className="w-full">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
