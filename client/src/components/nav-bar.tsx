import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/somme", label: "Somme des Carrés" },
    { href: "/sierpinski", label: "Triangle de Sierpinski" },
    { href: "/game", label: "Jeu du Cycle" },
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/art", label: "Générateur Art" },
    { href: "/zen", label: "Mode Zen" },
    { href: "/fake", label: "Mode Fake" },
    { href: "/about", label: "À Propos" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 md:hidden z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          data-testid="button-nav-toggle"
        >
          {showMobileMenu ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 md:hidden animate-slide-in p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left hover:bg-accent transition-colors"
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Desktop Menu (Hover) */}
      <div
        className="hidden md:fixed md:top-6 md:right-6 md:z-30 md:group"
        onMouseEnter={() => setShowDesktopMenu(true)}
        onMouseLeave={() => setShowDesktopMenu(false)}
      >
        <Button
          variant="outline"
          size="icon"
          data-testid="button-nav-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {showDesktopMenu && (
          <div className="absolute top-12 right-0 w-56 bg-card border rounded-lg shadow-lg p-2 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setShowDesktopMenu(false)}
                  className="w-full px-4 py-2 text-sm rounded-md hover-elevate text-left hover:bg-accent transition-colors"
                  data-testid={`link-desktop-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
