import { useState, useEffect, useRef } from "react";
import { ArrowDown, RefreshCw, Info, History, Trash2, Clock, BarChart3, Download, FileImage, Moon, Sun, X, Star, Share2, Maximize2, HelpCircle, Menu as MenuIcon } from "lucide-react";
import { Link } from "wouter";
import { useTheme, type ColorPalette } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NavBar } from "@/components/nav-bar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import type { CalculationResult } from "@shared/schema";

// FAKE calculation - deliberately wrong
function calculateFakeSquareSum(num: number): CalculationResult {
  const steps = [];
  const seen = new Map<number, number>();
  let current = num;
  let stepNumber = 0;

  while (!seen.has(current) && stepNumber < 10) {
    seen.set(current, stepNumber);
    
    const digits = current.toString().split('').map(Number);
    // Wrong calculation: multiply by 3 instead of squaring
    const fakeSquaredDigits = digits.map(d => d * 3);
    const fakeSum = fakeSquaredDigits.reduce((acc, val) => acc + val, 0);
    
    const calculation = digits
      .map((d, i) => `${d}*3`)
      .join(' + ') + ` = ${digits.map((d, i) => fakeSquaredDigits[i]).join(' + ')} = ${fakeSum}`;

    steps.push({
      stepNumber,
      originalNumber: current,
      digits,
      calculation,
      result: fakeSum,
      isInCycle: false,
      isCycleStart: false,
    });

    current = fakeSum;
    stepNumber++;
  }

  const cycleStartIndex = seen.has(current) ? seen.get(current)! : steps.length - 1;
  const cycleLength = Math.floor(Math.random() * 10) + 1; // Random fake cycle

  for (let i = cycleStartIndex; i < steps.length; i++) {
    steps[i].isInCycle = true;
  }
  
  if (cycleStartIndex < steps.length) {
    steps[cycleStartIndex].isCycleStart = true;
  }

  return { steps, cycleStartIndex, cycleLength };
}

export default function Fake() {
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

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, colorPalette, setColorPalette, showColorPicker, setShowColorPicker } = useTheme();

  const handleCalculate = () => {
    if (!inputValue.trim()) {
      setError("Veuillez entrer un nombre");
      setResult(null);
      return;
    }
    
    if (!/^\d+$/.test(inputValue)) {
      setError("Veuillez entrer un nombre entier positif");
      setResult(null);
      return;
    }
    
    setError("");
    const num = parseInt(inputValue, 10);
    const fakeResult = calculateFakeSquareSum(num);
    setResult(fakeResult);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInputValue("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1">
              🎭 Détecteur FAKE
            </h1>
            <div className="flex-1 flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:inline-flex"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
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
            </div>
          </>
        )}

        <div className="max-w-md mx-auto mb-16">
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Entrez un nombre (résultats faux!)"
              className="h-16 text-2xl font-mono text-center rounded-xl border-2"
            />
            
            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}
            
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={handleCalculate}
                className="flex-1 h-14 text-lg"
              >
                Calculer (Faux!)
              </Button>
              
              {result && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-14 w-full md:w-14 md:flex md:items-center md:justify-center"
                >
                  <span className="md:hidden">Réinitialiser</span>
                  <X className="h-5 w-5 hidden md:inline" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {result && (
          <Card className="p-8 rounded-xl mb-8 max-w-2xl mx-auto" ref={resultsRef}>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Nombre initial</p>
                <p className="text-6xl font-mono font-bold text-primary">
                  {inputValue}
                </p>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="text-sm text-destructive font-semibold">
                  ⚠️ LES CALCULS SONT INTENTIONNELLEMENT FAUX!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cette page multiplie par 3 au lieu d'élever au carré pour tester votre capacité à détecter les erreurs.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Étapes du calcul (FAUX):</h3>
                <div className="space-y-2">
                  {result.steps.map((step) => (
                    <div key={step.stepNumber} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-mono text-sm">
                        <span className="font-bold">Étape {step.stepNumber}:</span> {step.calculation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Longueur du cycle (FAUX)</p>
                  <p className="text-3xl font-bold text-primary">{result.cycleLength}</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Nombre d'étapes</p>
                  <p className="text-3xl font-bold text-primary">{result.steps.length}</p>
                </Card>
              </div>

              <Link href="/">
                <Button className="w-full">Aller à la vraie version →</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
