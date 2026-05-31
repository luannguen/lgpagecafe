import { CoffeeScene } from '@/components/three/CoffeeScene';

export default function Home() {
  return (
    <main className="bg-brand-dark overflow-hidden w-screen h-screen">
      {/* Global 3D Cinematic Background & Interactions */}
      <CoffeeScene />
    </main>
  );
}
