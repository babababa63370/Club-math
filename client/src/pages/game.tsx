import { useState, useEffect, useRef } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { Link } from "wouter";
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
  const { theme, toggleTheme } = useTheme();

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
      <NavBar />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1 flex items-center justify-center gap-3">
              🎮 Jeu du Cycle
            </h1>
            <div className="flex-1 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:inline-flex"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 hover-elevate cursor-pointer max-h-32 overflow-y-auto">
              <p className="text-lg text-muted-foreground">
                Testez votre intuition ! Devinez si le cycle d'un nombre est court ou long et montez votre score
              </p>
            </Card>
          </div>
        </header>

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
      </div>
    </div>
  );
}
