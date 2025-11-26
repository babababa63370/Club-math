import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

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
      {/* Menu Button (Mobile + Desktop) */}
      <div className="fixed top-6 right-6 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMenu(!showMenu)}
          data-testid="button-nav-toggle"
        >
          {showMenu ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 animate-slide-in p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setShowMenu(false)}
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
    </>
  );
}
