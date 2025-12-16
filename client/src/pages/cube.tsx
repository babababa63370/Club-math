import { useState, useRef } from "react";
import { ArrowLeft, ArrowDown, RefreshCw, Info, Download, FileImage, Moon, Sun, X, Menu as MenuIcon, BarChart3, Maximize2, List, LayoutGrid, Search } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"detailed" | "list">("detailed");
  const [showSearchStep, setShowSearchStep] = useState(false);
  const [searchStepValue, setSearchStepValue] = useState("");
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  const getSuperscript = (p: number) => {
    const superscripts: Record<number, string> = {
      2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', 10: '¹⁰'
    };
    return superscripts[p] || `^${p}`;
  };

  const handleSearchStep = () => {
    const stepNum = parseInt(searchStepValue, 10);
    if (isNaN(stepNum) || stepNum < 1 || !result || stepNum > result.steps.length) {
      return;
    }
    const stepIndex = stepNum - 1;
    setHighlightedStep(stepIndex);
    setShowSearchStep(false);
    setSearchStepValue("");
    
    setTimeout(() => {
      if (stepRefs.current[stepIndex]) {
        stepRefs.current[stepIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    setTimeout(() => {
      setHighlightedStep(null);
    }, 3000);
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
                      1{getSuperscript(power)} + 
                      5{getSuperscript(power)} = 
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

        <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
          <DialogContent className="max-w-4xl h-[90vh]" data-testid="fullscreen-graph">
            <DialogHeader>
              <DialogTitle>Graphique Plein Écran</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-auto">
              {result && (
                <ResponsiveContainer width="100%" height={600}>
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
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSearchStep} onOpenChange={setShowSearchStep}>
          <DialogContent className="max-w-sm" data-testid="search-step-dialog">
            <DialogHeader>
              <DialogTitle>Rechercher une Étape</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Numéro de l'étape (1-{result?.steps.length || 0})
                </label>
                <Input
                  type="number"
                  value={searchStepValue}
                  onChange={(e) => setSearchStepValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchStep()}
                  placeholder="Ex: 5"
                  min="1"
                  max={result?.steps.length || 1}
                  className="w-full"
                  data-testid="input-search-step"
                />
              </div>
              <Button
                onClick={handleSearchStep}
                className="w-full"
                data-testid="button-go-to-step"
              >
                Aller à l'étape
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {result && (
          <div className="space-y-6">
            <div className="flex justify-between gap-2 flex-wrap">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "detailed" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("detailed")}
                  data-testid="button-view-detailed"
                  title="Vue détaillée"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                  title="Vue liste"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSearchStep(true)}
                  data-testid="button-search-step"
                  title="Rechercher une étape"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportImage}
                  data-testid="button-export-image"
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  Image
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportPDF}
                  data-testid="button-export-pdf"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>

            <div ref={resultsRef} data-testid="results-container">
              <Tabs defaultValue="steps" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="steps" data-testid="tab-steps">
                    Étapes {viewMode === "list" ? "(Liste)" : "(Détaillées)"}
                  </TabsTrigger>
                  <TabsTrigger value="graph" data-testid="tab-graph">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Graphique
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="steps" className="space-y-6 mt-6">
                  {viewMode === "list" ? (
                    <Card className="p-4 rounded-xl">
                      <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {result.steps.map((step, index) => (
                          <div
                            key={index}
                            ref={(el) => (stepRefs.current[index] = el)}
                            className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                              step.isInCycle ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                            } ${highlightedStep === index ? "ring-2 ring-primary ring-offset-2" : ""}`}
                            data-testid={`list-step-${index}`}
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
                  ) : (
                  <>
                  <div className="space-y-6">
                    {result.steps.map((step, index) => (
                      <div
                        key={index}
                        ref={(el) => (stepRefs.current[index] = el)}
                        className="relative"
                        style={{
                          animation: `fadeIn 0.4s ease-out ${index * 0.1}s both`,
                        }}
                      >
                        <Card
                          className={`p-6 rounded-xl relative ${
                            step.isInCycle
                              ? "border-2 border-primary bg-primary/5"
                              : ""
                          } ${highlightedStep === index ? "ring-4 ring-primary ring-offset-2" : ""}`}
                          data-testid={`card-step-${index}`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <Badge
                              variant="secondary"
                              className="text-sm font-mono"
                              data-testid={`badge-step-${index}`}
                            >
                              Étape {step.stepNumber + 1}
                            </Badge>
                            
                            {step.isCycleStart && (
                              <Badge
                                variant="default"
                                className="text-sm font-semibold flex items-center gap-1"
                                data-testid="badge-cycle-detected"
                              >
                                <RefreshCw className="h-3 w-3" />
                                Cycle Détecté
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-5xl lg:text-6xl font-mono font-bold mb-2" data-testid={`text-number-${index}`}>
                                {step.originalNumber}
                              </div>
                              <div className="flex justify-center gap-2 flex-wrap">
                                {step.digits.map((digit, digitIndex) => (
                                  <span
                                    key={digitIndex}
                                    className="inline-flex items-center gap-1 text-xl font-mono"
                                  >
                                    <span className="text-muted-foreground">{digit}{getSuperscript(power)}</span>
                                    {digitIndex < step.digits.length - 1 && (
                                      <span className="text-muted-foreground">+</span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-xl lg:text-2xl font-mono text-center" data-testid={`text-calculation-${index}`}>
                                {step.calculation}
                              </p>
                            </div>

                            <div className="text-center">
                              <div className="text-sm text-muted-foreground mb-1">
                                Résultat
                              </div>
                              <div className="text-4xl font-mono font-bold text-primary" data-testid={`text-result-${index}`}>
                                {step.result}
                              </div>
                            </div>
                          </div>
                        </Card>

                        {index < result.steps.length - 1 && (
                          <div className="flex justify-center py-3">
                            <ArrowDown
                              className={`h-8 w-8 ${
                                step.isInCycle ? "text-primary" : "text-muted-foreground"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {result.cycleLength > 0 && (
                    <Card className="p-6 rounded-xl bg-primary/10 border-2 border-primary">
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold">
                          Cycle de longueur {result.cycleLength}
                        </h3>
                        <p className="text-muted-foreground">
                          Le cycle commence à l'étape {result.cycleStartIndex + 1} avec le nombre{" "}
                          <span className="font-mono font-bold text-foreground">
                            {result.steps[result.cycleStartIndex].originalNumber}
                          </span>
                        </p>
                      </div>
                    </Card>
                  )}

                  <Card className="p-6 rounded-xl" data-testid="card-statistics">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Statistiques du Calcul
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary" data-testid="stat-total-steps">
                          {result.steps.length}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Étapes totales
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary" data-testid="stat-cycle-length">
                          {result.cycleLength}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Longueur du cycle
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary" data-testid="stat-steps-before-cycle">
                          {result.cycleStartIndex}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Étapes avant le cycle
                        </div>
                      </div>
                    </div>
                  </Card>
                  </>
                  )}
                </TabsContent>

                <TabsContent value="graph" className="mt-6">
                  <Card className="p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Visualisation de la Séquence</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFullscreen(true)}
                        data-testid="button-fullscreen"
                      >
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Fullscreen
                      </Button>
                    </div>
                    <div ref={graphRef}>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                          data={result.steps.map((step) => ({
                            etape: step.stepNumber + 1,
                            valeur: step.originalNumber,
                            estDansCycle: step.isInCycle,
                          }))}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="etape"
                            label={{ value: "Étape", position: "insideBottom", offset: -5 }}
                          />
                          <YAxis
                            label={{ value: "Valeur", angle: -90, position: "insideLeft" }}
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
                                    <p className="font-semibold">Étape {data.etape}</p>
                                    <p className="font-mono text-primary">
                                      Valeur: {data.valeur}
                                    </p>
                                    {data.estDansCycle && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Dans le cycle
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          {result.cycleStartIndex > 0 && (
                            <ReferenceLine
                              x={result.cycleStartIndex + 1}
                              stroke="hsl(var(--primary))"
                              strokeDasharray="5 5"
                              label={{
                                value: "Début du cycle",
                                position: "top",
                                fill: "hsl(var(--primary))",
                              }}
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
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Les points plus grands et colorés indiquent les valeurs dans le cycle
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-xl mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Analyse du Cycle
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Nombre</th>
                            <th className="text-left p-2">Étape</th>
                            <th className="text-left p-2">Dans le cycle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.steps.map((step) => (
                            <tr key={step.stepNumber} className={`border-b ${step.isInCycle ? "bg-primary/5" : ""}`}>
                              <td className="p-2 font-mono font-bold">{step.originalNumber}</td>
                              <td className="p-2">{step.stepNumber + 1}</td>
                              <td className="p-2">
                                {step.isInCycle && <Badge className="bg-primary">Oui</Badge>}
                                {!step.isInCycle && <span className="text-muted-foreground">Non</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  <Card className="p-6 rounded-xl mt-6" data-testid="card-statistics-graph">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Statistiques du Calcul
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary">
                          {result.steps.length}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Étapes totales
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary">
                          {result.cycleLength}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Longueur du cycle
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-3xl font-bold font-mono text-primary">
                          {result.cycleStartIndex}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Étapes avant le cycle
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap mb-4 mt-12">
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="link-home">
              Accueil
            </Button>
          </Link>
          <Link href="/somme">
            <Button variant="outline" size="sm" data-testid="link-somme">
              Somme des Carrés
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
