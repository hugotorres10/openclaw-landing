import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}
