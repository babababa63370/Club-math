import { useState, useRef } from "react";
import { ArrowLeft, RefreshCw, Info, Download, FileImage, Moon, Sun, X, Menu as MenuIcon } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePowerSum } from "@/lib/cycleDetector";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { CalculationResult } from "@shared/schema";

export default function Cube() {
  const [inputValue, setInputValue] = useState("");
  const [power, setPower] = useState(3);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const handleCalculate = () => {
    if (!inputValue.trim()) {
      setError("Veuillez entrer un nombre entier positif");
      setResult(null);
      return;
    }
    
    const number = inputValue.trim();
    if (!/^\d+$/.test(number)) {
      setError("Veuillez entrer uniquement un nombre entier positif");
      setResult(null);
      return;
    }
    
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber) || parsedNumber < 0) {
      setError("Veuillez entrer un nombre entier positif");
      setResult(null);
      return;
    }
    
    setError("");
    const calculationResult = calculatePowerSum(parsedNumber, power);
    setResult(calculationResult);
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

  const handleExportImage = async () => {
    if (!resultsRef.current) return;
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `cycle-power-${power}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Erreur lors de l'export en image:", error);
    }
  };

  const handleExportPDF = async () => {
    if (!resultsRef.current) return;
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`cycle-power-${power}-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Erreur lors de l'export en PDF:", error);
    }
  };

  const getPowerLabel = (p: number) => {
    switch (p) {
      case 2: return "Carré (n²)";
      case 3: return "Cube (n³)";
      case 4: return "Puissance 4 (n⁴)";
      case 5: return "Puissance 5 (n⁵)";
      default: return `Puissance ${p}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center py-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold flex-1">
              Cycles avec Puissance Variable
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-toggle-theme"
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
                className="md:hidden"
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
            <div className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 p-4 space-y-3">
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

        <div className="max-w-md mx-auto mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Puissance</label>
              <Select
                value={power.toString()}
                onValueChange={(value) => setPower(parseInt(value, 10))}
              >
                <SelectTrigger data-testid="select-power">
                  <SelectValue placeholder="Choisir la puissance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Carré (n²)</SelectItem>
                  <SelectItem value="3">Cube (n³)</SelectItem>
                  <SelectItem value="4">Puissance 4 (n⁴)</SelectItem>
                  <SelectItem value="5">Puissance 5 (n⁵)</SelectItem>
                  <SelectItem value="6">Puissance 6 (n⁶)</SelectItem>
                  <SelectItem value="7">Puissance 7 (n⁷)</SelectItem>
                  <SelectItem value="8">Puissance 8 (n⁸)</SelectItem>
                  <SelectItem value="9">Puissance 9 (n⁹)</SelectItem>
                  <SelectItem value="10">Puissance 10 (n¹⁰)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Entrez un nombre (ex: 15)"
              className="h-16 text-2xl font-mono text-center rounded-xl border-2"
              data-testid="input-number"
            />
            
            {error && (
              <p className="text-sm text-destructive text-center" data-testid="text-error">
                {error}
              </p>
            )}
            
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={handleCalculate}
                className="flex-1 h-14 text-lg"
                data-testid="button-calculate"
              >
                Calculer
              </Button>
              
              {result && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-14 w-full md:w-14 md:flex md:items-center md:justify-center"
                  data-testid="button-reset"
                >
                  <span className="md:hidden">Réinitialiser</span>
                  <X className="h-5 w-5 hidden md:inline" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {!result && (
          <Card className="p-6 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Comment ça fonctionne ?</h3>
                <div className="text-sm leading-relaxed space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Exemple avec 15 (puissance {power}) :</strong>
                  </p>
                  <ul className="list-none space-y-1 ml-4">
                    <li>
                      <span className="font-mono">15</span> → 
                      1{power === 2 ? '²' : power === 3 ? '³' : `^${power}`} + 
                      5{power === 2 ? '²' : power === 3 ? '³' : `^${power}`} = 
                      {Math.pow(1, power)} + {Math.pow(5, power)} = 
                      <span className="font-mono font-semibold"> {Math.pow(1, power) + Math.pow(5, power)}</span>
                    </li>
                    <li className="text-foreground">... et ainsi de suite jusqu'à trouver un cycle !</li>
                  </ul>
                  <p className="mt-4">
                    Utilisez le sélecteur de puissance pour explorer différents comportements.
                    La page <Link href="/somme" className="text-primary underline">/somme</Link> utilise la puissance 2 (carrés).
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            <div className="flex justify-end gap-2 flex-wrap">
              <Button
                variant="outline"
                onClick={handleExportImage}
                data-testid="button-export-image"
              >
                <FileImage className="h-4 w-4 mr-2" />
                Exporter en Image
              </Button>
              <Button
                variant="outline"
                onClick={handleExportPDF}
                data-testid="button-export-pdf"
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter en PDF
              </Button>
            </div>

            <div ref={resultsRef} data-testid="results-container">
              <Card className="p-6 rounded-xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-mono font-bold text-primary mb-2">
                    {inputValue}
                  </div>
                  <p className="text-muted-foreground">
                    {getPowerLabel(power)}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-mono font-bold">
                      {result.steps.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Étapes totales</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-mono font-bold">
                      {result.cycleLength}
                    </div>
                    <p className="text-sm text-muted-foreground">Longueur du cycle</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-mono font-bold">
                      {result.cycleStartIndex}
                    </div>
                    <p className="text-sm text-muted-foreground">Étapes avant cycle</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Graphique d'Évolution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={result.steps.map((step) => ({
                      etape: step.stepNumber + 1,
                      valeur: step.originalNumber,
                      estDansCycle: step.isInCycle,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="etape" label={{ value: "Étape", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Valeur", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    {result.cycleStartIndex > 0 && (
                      <ReferenceLine
                        x={result.cycleStartIndex + 1}
                        stroke="hsl(var(--primary))"
                        strokeDasharray="5 5"
                        label={{ value: "Début du cycle", position: "top", fill: "hsl(var(--primary))" }}
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="valeur"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={payload.estDansCycle ? 6 : 4}
                            fill={payload.estDansCycle ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                          />
                        );
                      }}
                      name="Valeur"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 rounded-xl mt-6">
                <h3 className="text-xl font-semibold mb-4">Détail des Étapes</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {result.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        step.isInCycle ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                      }`}
                      data-testid={`step-${idx}`}
                    >
                      <Badge variant={step.isInCycle ? "default" : "secondary"}>
                        {step.stepNumber + 1}
                      </Badge>
                      <div className="flex-1">
                        <span className="font-mono font-bold text-lg">{step.originalNumber}</span>
                        <span className="text-muted-foreground mx-2">→</span>
                        <span className="text-sm text-muted-foreground">{step.calculation}</span>
                      </div>
                      {step.isCycleStart && (
                        <Badge variant="outline" className="text-xs">
                          Début du cycle
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
