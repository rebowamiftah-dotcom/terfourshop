import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { publicMenus } from "@/components/Header/menus/publicMenu";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header navLinks={publicMenus} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}