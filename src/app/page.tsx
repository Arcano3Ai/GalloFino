import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ElPorte } from "@/components/sections/ElPorte";
import { Services } from "@/components/sections/Services";
import { Barbers } from "@/components/sections/Barbers";
import { Merch } from "@/components/sections/Merch";
import { Appointments } from "@/components/sections/Appointments";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Location } from "@/components/sections/Location";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

export default function Home() {
  return (
    <>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Discreet Song Audio Player */}
      <AudioPlayer />

      {/* Main Content */}
      <main>
        <Hero />
        <ElPorte />
        <Services />
        <Barbers />
        <Merch />
        <Appointments />
        <Gallery />
        <Testimonials />
        <Location />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global WhatsApp Floating Button */}
      <WhatsAppButton variant="floating" />

      {/* Mobile Sticky Bottom CTA */}
      <MobileCtaBar />
    </>
  );
}
