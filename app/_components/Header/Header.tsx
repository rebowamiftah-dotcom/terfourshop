import { HeaderProvider } from '../Contexts/HeaderContext';
import Navbar from '../Navbar/Navbar';
import MobileNav from '../Navbar/MobileNav';

export default function Header() {
  const navLinks = [
    {
      title: { id: "Tentang Kami", en: "About" },
      href: "/about"
    },
    {
      title: { id: "Belanja", en: "Shoping" },
      href: "/shopping"
    },
    {
      title: { id: "Kontak", en: "Contact" },
      href: "/contact"
    }
  ]

  return (
    <HeaderProvider>
      <header className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar menus={navLinks} />
        </div>

        <MobileNav menus={navLinks} />
      </header>
    </HeaderProvider>
  );
}