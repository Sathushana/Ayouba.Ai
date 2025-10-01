import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import DoctorVideoClips from '@/components/DoctorsVideoClips';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <DoctorVideoClips/>
      <Footer />
    </main>
  );
}

