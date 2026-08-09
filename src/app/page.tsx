import { 
  Hero, 
  MarqueeStrip,
  Work, 
  Approach,
  Services, 
  Process, 
  SystematizedGrowth,
  Contact 
} from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <Work />
      <Approach />
      <Services />
      <Process />
      <SystematizedGrowth />
      <Contact />
    </main>
  );
}

