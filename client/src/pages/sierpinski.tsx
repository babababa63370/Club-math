import { useState, useEffect } from "react";
import { Menu, Plus, Minus, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Sierpinski() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [iterations, setIterations] = useState(5);
  const { theme, toggleTheme } = useTheme();

  const canvasWidth = 600;
  const canvasHeight = 600;

  const drawSierpinski = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, depth: number) => {
    if (depth === 0) {
      ctx.fillStyle = theme === "light" ? "#000" : "#fff";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size / 2, y + size * Math.sqrt(3) / 2);
      ctx.closePath();
      ctx.fill();
    } else {
      const newSize = size / 2;
      drawSierpinski(ctx, x, y, newSize, depth - 1);
      drawSierpinski(ctx, x + newSize, y, newSize, depth - 1);
      drawSierpinski(ctx, x + newSize / 2, y + newSize * Math.sqrt(3) / 2, newSize, depth - 1);
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("sierpinski-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = theme === "light" ? "#f5f5f5" : "#1a1a1a";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const padding = 50;
    const size = canvasWidth - padding * 2;
    drawSierpinski(ctx, padding, padding, size, iterations);
  }, [iterations, theme]);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 right-6 md:hidden z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
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
                Accueil
              </button>
            </Link>
            <Link href="/somme">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                Somme des Carrés
              </button>
            </Link>
          </div>
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold flex-1 flex items-center justify-center gap-3">
              🔺 Triangle de Sierpinski
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
          <p className="text-lg text-muted-foreground">
            Une fractale mathématique fascinante avec une complexité infinie
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <canvas
                id="sierpinski-canvas"
                width={canvasWidth}
                height={canvasHeight}
                className="w-full border rounded-lg"
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Contrôles</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Profondeur de récursion: <span className="font-bold">{iterations}</span>
                  </label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIterations(Math.max(0, iterations - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIterations(Math.min(10, iterations + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIterations(5)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold mb-2">Propriétés</h4>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p>📏 Dimension: ≈ 1.585</p>
                    <p>♾️ Aire: 0</p>
                    <p>🔄 Autosimilaire</p>
                    <p>🎯 Récursif</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-3">À propos</h3>
              <p className="text-sm text-muted-foreground">
                Le triangle de Sierpinski est une fractale découverte en 1915. Chaque triangle est divisé en 3 triangles plus petits.
              </p>
            </Card>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/">
            <Button variant="outline">
              ← Accueil
            </Button>
          </Link>
          <Link href="/somme">
            <Button variant="outline">
              Somme des Carrés →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
