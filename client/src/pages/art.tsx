import { useState, useEffect } from "react";
import { RefreshCw, X, Menu as MenuIcon, Moon, Sun, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavBar } from "@/components/nav-bar";
import { calculateSquareSum } from "@/lib/cycleDetector";

interface ArtData {
  number: number;
  cycleLength: number;
  steps: number;
  colors: string[];
}

export default function Art() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slideIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const [artWorks, setArtWorks] = useState<ArtData[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme, setShowColorPicker } = useTheme();

  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
    "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B88B", "#ABEBC6"
  ];

  const generateArt = () => {
    const newArtworks: ArtData[] = [];
    for (let i = 0; i < 6; i++) {
      const num = Math.floor(Math.random() * 999) + 1;
      const result = calculateSquareSum(num);
      const cycleColors = result.steps.map((_, idx) => colors[idx % colors.length]);
      
      newArtworks.push({
        number: num,
        cycleLength: result.cycleLength,
        steps: result.steps.length,
        colors: cycleColors
      });
    }
    setArtWorks(newArtworks);
  };

  useEffect(() => {
    generateArt();
  }, []);

  const CircleArt = ({ data }: { data: ArtData }) => {
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    const angleStep = (Math.PI * 2) / Math.max(data.steps, 1);

    return (
      <Card className="p-6 hover-elevate overflow-hidden bg-background/50">
        <div className="flex flex-col items-center gap-4">
          <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
            {/* Cercle de base */}
            <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            
            {/* Points du cycle */}
            {Array.from({ length: data.steps }).map((_, idx) => {
              const angle = angleStep * idx - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              const size = 8 + (idx % 5) * 2;
              
              return (
                <g key={idx}>
                  <circle cx={x} cy={y} r={size} fill={data.colors[idx]} opacity="0.8" />
                  {idx < data.steps - 1 && (
                    <line 
                      x1={x} 
                      y1={y} 
                      x2={centerX + radius * Math.cos(angleStep * (idx + 1) - Math.PI / 2)}
                      y2={centerY + radius * Math.sin(angleStep * (idx + 1) - Math.PI / 2)}
                      stroke={data.colors[idx]}
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  )}
                </g>
              );
            })}

            {/* Ligne de fermeture du cycle */}
            {data.steps > 1 && (
              <line
                x1={centerX + radius * Math.cos(angleStep * (data.steps - 1) - Math.PI / 2)}
                y1={centerY + radius * Math.sin(angleStep * (data.steps - 1) - Math.PI / 2)}
                x2={centerX + radius * Math.cos(-Math.PI / 2)}
                y2={centerY + radius * Math.sin(-Math.PI / 2)}
                stroke={data.colors[0]}
                strokeWidth="1"
                opacity="0.4"
                strokeDasharray="4"
              />
            )}
          </svg>

          <div className="text-center">
            <p className="text-lg font-mono font-bold">{data.number}</p>
            <p className="text-xs text-muted-foreground">Cycle: {data.cycleLength} | Étapes: {data.steps}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1 flex items-center justify-center gap-3">
              🎨 Générateur de Patterns
            </h1>
            <div className="flex-1 flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:inline-flex"
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                data-testid="button-mobile-menu"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {showMobileMenu && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 z-40" 
              onClick={() => setShowMobileMenu(false)}
            />
            <div 
              className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 animate-slide-in p-4 space-y-3 overflow-y-auto"
            >
              <button
                onClick={() => {
                  toggleTheme();
                  setShowMobileMenu(false);
                }}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-5 w-5 inline mr-2" />
                    Mode Sombre
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5 inline mr-2" />
                    Mode Clair
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowColorPicker(true);
                  setShowMobileMenu(false);
                }}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                <div className="h-5 w-5 rounded-full bg-primary inline mr-2" />
                Couleurs
              </button>

              <Link href="/">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  ← Accueil
                </button>
              </Link>

              <Link href="/sierpinski">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  Triangle de Sierpinski →
                </button>
              </Link>

              <div className="border-t border-border my-2" />

              <Link href="/about">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  <HelpCircle className="h-5 w-5 inline mr-2" />
                  À Propos
                </button>
              </Link>

              <div className="border-t border-border my-2" />

              <p className="text-xs text-muted-foreground px-2 font-semibold">JEUX & EXPLORATIONS</p>

              <Link href="/game">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🎮 Jeu du Cycle
                </button>
              </Link>

              <Link href="/hall-of-fame">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🏆 Hall of Fame
                </button>
              </Link>

              <Link href="/zen">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🧘 Mode Zen
                </button>
              </Link>

              <Link href="/fake">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🤔 Mode Fake
                </button>
              </Link>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {artWorks.map((art, idx) => (
            <CircleArt key={idx} data={art} />
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={generateArt}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Générer Nouveaux Patterns
          </Button>
          <Link href="/hall-of-fame">
            <Button variant="outline">
              Hall of Fame 🏆
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
