import { useState, useEffect } from "react";
import { Menu, Pause, Play } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateSquareSum } from "@/lib/cycleDetector";

interface ZenNumber {
  number: number;
  cycleLength: number;
  steps: number;
  color: string;
}

export default function Zen() {
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
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-fade-in-scale {
        animation: fadeInScale 0.6s ease-out;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [numbers, setNumbers] = useState<ZenNumber[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-cyan-500 to-cyan-600",
    "from-green-500 to-green-600",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600",
    "from-indigo-500 to-indigo-600",
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const num = Math.floor(Math.random() * 999) + 1;
      const result = calculateSquareSum(num);
      const color = colors[Math.floor(Math.random() * colors.length)];

      setNumbers(prev => {
        const updated = [
          ...prev,
          {
            number: num,
            cycleLength: result.cycleLength,
            steps: result.steps.length,
            color
          }
        ];
        return updated.slice(-12); // Keep only last 12
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed top-6 right-6 z-30 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={() => setShowMobileMenu(false)}
          />
          <div 
            className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 md:hidden animate-slide-in p-4 space-y-3"
          >
            <Link href="/">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                Calculateur
              </button>
            </Link>
            <Link href="/about">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                À propos
              </button>
            </Link>
            <div className="border-t my-2" />

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
            <Link href="/art">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                🎨 Générateur Art
              </button>
            </Link>
            <Link href="/fake">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                🎭 Mode Fake
              </button>
            </Link>
          </div>
        </>
      )}

      <div className="h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">🧘 Mode Zen</h1>
            <p className="text-muted-foreground text-lg">Regardez le flux relaxant de nombres</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {numbers.map((item, idx) => (
              <div
                key={idx}
                className={`animate-fade-in-scale`}
              >
                <Card className={`p-6 bg-gradient-to-br ${item.color} text-white hover-elevate cursor-default`}>
                  <div className="text-center space-y-3">
                    <p className="text-4xl font-mono font-bold">{item.number}</p>
                    <div className="space-y-1 text-sm opacity-90">
                      <p>Cycle: {item.cycleLength}</p>
                      <p>Étapes: {item.steps}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {numbers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">En attente de nombres...</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 left-6 md:left-auto md:right-6 flex gap-2">
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="hidden md:inline-flex"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </Button>
        <Link href="/">
          <Button variant="outline">
            ← Retour
          </Button>
        </Link>
      </div>
    </div>
  );
}
