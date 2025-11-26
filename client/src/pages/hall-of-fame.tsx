import { useState, useEffect } from "react";
import { X, Menu as MenuIcon, Moon, Sun, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/nav-bar";
import { calculateSquareSum } from "@/lib/cycleDetector";

interface Record {
  title: string;
  number: number;
  value: number;
}

export default function HallOfFame() {
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

  const [records, setRecords] = useState<Record[]>([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const calculateRecords = () => {
      let longestCycle: Record = { title: "Cycle le plus long", number: 0, value: 0 };
      let shortestCycle: Record = { title: "Cycle le plus court", number: 0, value: Infinity };
      let mostSteps: Record = { title: "Plus d'étapes", number: 0, value: 0 };
      let fastestConvergence: Record = { title: "Convergence la plus rapide", number: 0, value: Infinity };

      for (let i = 1; i <= 100; i++) {
        const result = calculateSquareSum(i);
        
        if (result.cycleLength > longestCycle.value) {
          longestCycle = { title: "Cycle le plus long", number: i, value: result.cycleLength };
        }
        if (result.cycleLength < shortestCycle.value && result.cycleLength > 0) {
          shortestCycle = { title: "Cycle le plus court", number: i, value: result.cycleLength };
        }
        if (result.steps.length > mostSteps.value) {
          mostSteps = { title: "Plus d'étapes", number: i, value: result.steps.length };
        }
        if (result.steps.length < fastestConvergence.value && result.steps.length > 0) {
          fastestConvergence = { title: "Convergence la plus rapide", number: i, value: result.steps.length };
        }
      }

      setRecords([longestCycle, shortestCycle, mostSteps, fastestConvergence]);
    };

    calculateRecords();
  }, []);

  const RecordCard = ({ record, rank }: { record: Record; rank: number }) => {
    const medals = ["🥇", "🥈", "🥉", "⭐"];
    
    return (
      <Card className="p-6 hover-elevate">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{record.title}</h3>
            <span className="text-3xl">{medals[Math.min(rank, 3)]}</span>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Nombre</p>
            <p className="text-4xl font-mono font-bold text-primary">{record.number}</p>
          </div>
          
          <Badge className="bg-accent/20 text-accent-foreground hover:bg-accent/30">
            {record.value}
          </Badge>

          <Link href="/">
            <button className="w-full px-3 py-2 text-sm rounded-md hover-elevate text-primary border border-primary/30">
              Voir le détail →
            </button>
          </Link>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1 flex items-center justify-center gap-3">
              🏆 Hall of Fame
            </h1>
            <div className="flex-1 flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:inline-flex"
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
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 hover-elevate cursor-pointer max-h-32 overflow-y-auto">
              <p className="text-lg text-muted-foreground">
                Découvrez les records mathématiques : les cycles les plus longs, les plus courts, et les convergences les plus rapides
              </p>
            </Card>
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

              <Link href="/art">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🎨 Générateur Art
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
          {records.map((record, idx) => (
            <RecordCard key={idx} record={record} rank={idx} />
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/">
            <Button variant="outline">
              ← Calculateur
            </Button>
          </Link>
          <Link href="/art">
            <Button>
              Voir Patterns 🎨
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
