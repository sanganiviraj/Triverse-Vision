import { 
  Hero, 
  MarqueeStrip,
  Work, 
  Services, 
  SystematizedGrowth,
  Packages,
  Contact 
} from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <Work />
      <Services />
      <SystematizedGrowth />
      <Packages />
      <Contact />
    </main>
  );
}


