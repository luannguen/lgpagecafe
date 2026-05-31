import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { StorySection } from '@/components/story/StorySection';
import { CraftSection } from '@/components/craftsmanship/CraftSection';
import { SpaceSection } from '@/components/space/SpaceSection';
import { MenuSection } from '@/components/menu/MenuSection';
import { BookingSection } from '@/components/booking/BookingSection';
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { CoffeeScene } from '@/components/three/CoffeeScene';

export default function Home() {
  return (
    <main className="relative bg-brand-dark min-h-screen">
      <Navbar />
      
      {/* Global 3D Cinematic Background */}
      <CoffeeScene />
      
      {/* Scrollable Transparent Content Overlay */}
      <div className="relative z-10 w-full pointer-events-none">
        <HeroSection />
        <StorySection />
        <CraftSection />
        <SpaceSection />
        <MenuSection />
        <TestimonialsSection />
        <BookingSection />
        
        {/* Make footer sections catch pointer events */}
        <div className="pointer-events-auto bg-brand-dark">
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
