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
    <main className="relative bg-brand-dark">
      <Navbar />
      
      {/* Global 3D Cinematic Background */}
      <CoffeeScene />
      
      {/* 
        VIRTUAL SCROLL CONTAINER
        This forces the browser to have a scrollbar without actually sliding content.
        The height (e.g. 500vh) determines how long the total cinematic experience takes to scroll through.
      */}
      <div className="h-[600vh] w-full" />
      
      {/* 
        FIXED OVERLAYS
        These sections are absolutely positioned over the screen and fade in/out based on scroll progress.
      */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <HeroSection />
        <StorySection />
        <CraftSection />
        <SpaceSection />
        <MenuSection />
        <TestimonialsSection />
        <BookingSection />
      </div>

      {/* Footer at the end of the journey */}
      <div className="absolute bottom-0 w-full z-20 pointer-events-auto bg-brand-dark">
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
