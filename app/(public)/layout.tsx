import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Header variant="public" />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </main>
  );
}