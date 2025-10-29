import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import DoctorVideoClips from '@/components/DoctorsVideoClips';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <DoctorVideoClips/>
      <Footer />
    </main>
  );
}

