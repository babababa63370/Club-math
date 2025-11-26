import { useState, useEffect, useRef } from "react";
import { RotateCcw, Trophy, X, Menu as MenuIcon, Moon, Sun, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/nav-bar";
import { calculateSquareSum } from "@/lib/cycleDetector";

export default function Game() {
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
      @keyframes pulse-success {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-pulse-success {
        animation: pulse-success 0.6s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const [currentNumber, setCurrentNumber] = useState(0);
  const [actualCycleLength, setActualCycleLength] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"guessing" | "revealed">("guessing");
  const [userGuess, setUserGuess] = useState<"short" | "long" | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme, colorPalette, setColorPalette, showColorPicker, setShowColorPicker } = useTheme();

  const shortCycleNumbers = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100, 103, 109, 129, 130, 133, 139, 167, 176, 188, 190, 192, 193, 203, 208, 213, 215, 216, 228, 231, 232, 235, 242, 250, 254, 259, 271, 274, 284, 286, 293];
  const longCycleNumbers = [2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 24, 25, 26, 27, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];

  const generateNewGame = () => {
    // Choisir aléatoirement entre court et long (50/50)
    const isShortCycle = Math.random() < 0.5;
    const numberList = isShortCycle ? shortCycleNumbers : longCycleNumbers;
    const num = numberList[Math.floor(Math.random() * numberList.length)];
    
    const result = calculateSquareSum(num);
    setCurrentNumber(num);
    setActualCycleLength(result.cycleLength);
    setGameState("guessing");
    setUserGuess(null);
    setIsCorrect(false);
  };

  useEffect(() => {
    generateNewGame();
  }, []);

  const handleGuess = (guess: "short" | "long") => {
    const isShort = actualCycleLength <= 5;
    const correct = (guess === "short" && isShort) || (guess === "long" && !isShort);
    
    setUserGuess(guess);
    setIsCorrect(correct);
    setGameState("revealed");
    
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setTotalGames(totalGames + 1);
  };

  const handleNextGame = () => {
    generateNewGame();
  };

  const handleReset = () => {
    setScore(0);
    setStreak(0);
    setTotalGames(0);
    generateNewGame();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1 flex items-center justify-center gap-3">
              🎮 Jeu du Cycle
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

              <Link href="/somme/hall-of-fame">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🏆 Hall of Fame
                </button>
              </Link>

              <Link href="/somme/art">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🎨 Générateur Art
                </button>
              </Link>

              <Link href="/somme/zen">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
                >
                  🧘 Mode Zen
                </button>
              </Link>

              <Link href="/somme/fake">
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

        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-3xl font-bold text-accent">{streak}</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Parties</p>
            <p className="text-3xl font-bold">{totalGames}</p>
          </Card>
        </div>

        <Card className="p-8 rounded-xl mb-8">
          <div className="text-center space-y-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Le nombre est:</p>
              <p className="text-7xl font-mono font-bold text-primary">
                {currentNumber}
              </p>
            </div>

            {gameState === "guessing" ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold">
                  Son cycle est-il COURT (≤5) ou LONG (&gt;5)?
                </p>
                <div className="flex gap-4 justify-center flex-col md:flex-row">
                  <Button
                    onClick={() => handleGuess("short")}
                    className="flex-1 h-16 text-lg font-bold"
                  >
                    ⚡ Cycle COURT
                  </Button>
                  <Button
                    onClick={() => handleGuess("long")}
                    className="flex-1 h-16 text-lg font-bold"
                    variant="secondary"
                  >
                    🌊 Cycle LONG
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`space-y-6 p-6 rounded-lg ${isCorrect ? "bg-green-500/10 border-2 border-green-500" : "bg-destructive/10 border-2 border-destructive"}`}>
                <div>
                  <p className="text-2xl font-bold mb-2">
                    {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                  <p className="text-lg">
                    La longueur du cycle est <span className="font-bold font-mono text-2xl">{actualCycleLength}</span>
                  </p>
                  {actualCycleLength <= 5 ? (
                    <Badge className="mt-3">Cycle COURT</Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-3">Cycle LONG</Badge>
                  )}
                </div>

                <Button
                  onClick={handleNextGame}
                  className="w-full h-14 text-lg"
                >
                  Prochain nombre →
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="hidden md:inline-flex">
              ← Calculateur
            </Button>
          </Link>
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
        </div>

        <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
          <DialogContent className="max-w-md" data-testid="color-picker">
            <DialogHeader>
              <DialogTitle>Sélectionner une Couleur</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {(["blue", "purple", "cyan", "amber"] as const).map((palette) => (
                <button
                  key={palette}
                  onClick={() => setColorPalette(palette)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    colorPalette === palette ? "border-primary" : "border-border"
                  } hover-elevate`}
                  data-testid={`color-${palette}`}
                >
                  <div className={`h-12 rounded-md mb-2 ${
                    palette === "blue" ? "bg-blue-500" :
                    palette === "purple" ? "bg-purple-500" :
                    palette === "cyan" ? "bg-cyan-500" :
                    "bg-amber-500"
                  }`} />
                  <p className="font-semibold capitalize">{palette === "blue" ? "Bleu" : palette === "purple" ? "Violet" : palette === "cyan" ? "Cyan" : "Ambre"}</p>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
