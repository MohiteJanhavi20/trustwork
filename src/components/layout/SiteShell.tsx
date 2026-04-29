import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      <main className="relative z-10 pb-24 md:pb-32">
        {children}
      </main>

      <Footer />
    </div>
  );
}