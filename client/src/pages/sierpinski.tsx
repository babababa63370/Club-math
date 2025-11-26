import { useState, useEffect, useRef } from "react";
import { Plus, Minus, RotateCcw, Download } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavBar } from "@/components/nav-bar";

interface SierpinskiGrid {
  row: number[];
  redCount: number;
}

export default function Sierpinski() {
  const [numRows, setNumRows] = useState(50);
  const [grid, setGrid] = useState<SierpinskiGrid[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [lineSearch, setLineSearch] = useState("");
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const gridViewportRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const CELL_SIZE = 40;
  const MIN_ZOOM = 50;
  const MAX_ZOOM = 300;
  const ZOOM_STEP = 10;
  const PAN_STEP = 50;

  // Generate Sierpinski Grid using XOR algorithm
  const generateSierpinskiGrid = (rows: number): SierpinskiGrid[] => {
    if (rows <= 0) return [];

    const numCols = rows * 2 - 1;
    const newGrid: number[][] = Array(rows)
      .fill(null)
      .map(() => Array(numCols).fill(0));
    const redCounts: number[] = Array(rows).fill(0);

    // Start with center cell
    newGrid[0][Math.floor(numCols / 2)] = 1;
    redCounts[0] = 1;

    // Generate each row using XOR of parents
    for (let y = 1; y < rows; y++) {
      let currentRedCount = 0;
      for (let x = 0; x < numCols; x++) {
        const leftParent = newGrid[y - 1][(x - 1 + numCols) % numCols];
        const rightParent = newGrid[y - 1][(x + 1) % numCols];
        newGrid[y][x] = leftParent ^ rightParent;
        if (newGrid[y][x] === 1) currentRedCount++;
      }
      redCounts[y] = currentRedCount;
    }

    return newGrid.map((row, idx) => ({
      row,
      redCount: redCounts[idx],
    }));
  };

  const handleGenerate = async () => {
    if (numRows < 1 || numRows > 1000) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGrid(generateSierpinskiGrid(numRows));
      setZoomLevel(100);
      setScrollLeft(0);
      setScrollTop(0);
      setIsGenerating(false);
    }, 100);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) =>
      direction === "in"
        ? Math.min(prev + ZOOM_STEP, MAX_ZOOM)
        : Math.max(prev - ZOOM_STEP, MIN_ZOOM)
    );
  };

  const handlePan = (direction: "left" | "right" | "up" | "down") => {
    if (!gridViewportRef.current) return;
    const step = PAN_STEP;
    switch (direction) {
      case "left":
        setScrollLeft((prev) => Math.max(0, prev - step));
        break;
      case "right":
        setScrollLeft((prev) => prev + step);
        break;
      case "up":
        setScrollTop((prev) => Math.max(0, prev - step));
        break;
      case "down":
        setScrollTop((prev) => prev + step);
        break;
    }
  };

  const handleReset = () => {
    setZoomLevel(100);
    setScrollLeft(0);
    setScrollTop(0);
    setLineSearch("");
    setSearchResult(null);
  };

  const handleSearchLine = () => {
    const lineNum = parseInt(lineSearch);
    if (lineNum > 0 && lineNum <= grid.length) {
      setSearchResult(lineNum - 1);
      const newScroll = (lineNum - 1) * CELL_SIZE;
      setScrollTop(newScroll);
    } else {
      setSearchResult(null);
    }
  };

  const applyScroll = () => {
    if (gridViewportRef.current) {
      gridViewportRef.current.scrollLeft = scrollLeft;
      gridViewportRef.current.scrollTop = scrollTop;
    }
  };

  useEffect(() => {
    applyScroll();
  }, [scrollLeft, scrollTop]);

  useEffect(() => {
    if (gridContainerRef.current) {
      const scale = zoomLevel / 100;
      gridContainerRef.current.style.transform = `scale(${scale})`;
      gridContainerRef.current.style.transformOrigin = "top left";
    }
  }, [zoomLevel]);

  const gridWidth = grid.length > 0 ? grid[0].row.length : 0;
  const totalCells = grid.reduce((acc, item) => acc + item.row.length, 0);
  const redCells = grid.reduce((acc, item) => acc + item.redCount, 0);
  const whiteCells = totalCells - redCells;
  const redPercent = totalCells > 0 ? ((redCells / totalCells) * 100).toFixed(1) : "0";

  const downloadImage = async () => {
    const element = gridViewportRef.current;
    if (!element) return;

    try {
      const canvas = await (window as any).html2canvas(element, {
        backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `sierpinski-${numRows}.png`;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <header className="text-center py-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-3xl md:text-4xl font-bold flex-1 flex items-center justify-center gap-2">
              Pyramide de Sierpinski
            </h1>
            <div className="flex-1 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="hidden md:inline-flex"
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </Button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="p-4 hover-elevate cursor-pointer max-h-32 overflow-y-auto">
              <p className="text-lg text-muted-foreground">
                Explorez la fractale infinie de Sierpinski avec ses motifs auto-similaires générés par un algorithme XOR
              </p>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <Card className="p-4 md:p-6">
              {/* Top Controls */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 p-3 md:p-4 bg-muted rounded-lg">
                <div className="flex gap-2 items-center">
                  <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                    Zoom:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom("out")}
                    data-testid="button-zoom-out"
                  >
                    −
                  </Button>
                  <span className="min-w-12 text-center text-xs md:text-sm font-semibold">
                    {zoomLevel}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom("in")}
                    data-testid="button-zoom-in"
                  >
                    +
                  </Button>
                </div>

                <div className="hidden md:flex gap-2 items-center">
                  <span className="text-xs md:text-sm font-semibold">Navigation:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePan("left")}
                    data-testid="button-pan-left"
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePan("right")}
                    data-testid="button-pan-right"
                  >
                    →
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePan("up")}
                    data-testid="button-pan-up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePan("down")}
                    data-testid="button-pan-down"
                  >
                    ↓
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Search Control */}
              <div className="flex flex-wrap gap-2 mb-4 p-3 md:p-4 bg-muted rounded-lg">
                <label className="text-xs md:text-sm font-semibold flex items-center">
                  Chercher ligne:
                </label>
                <input
                  type="number"
                  value={lineSearch}
                  onChange={(e) => setLineSearch(e.target.value)}
                  placeholder="N°"
                  min="1"
                  max={grid.length}
                  className="w-16 px-2 py-1 text-xs rounded border border-input"
                  data-testid="input-line-search"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSearchLine}
                  data-testid="button-search-line"
                >
                  Chercher
                </Button>
                {searchResult !== null && (
                  <span className="text-xs font-semibold text-primary">
                    Ligne {searchResult + 1}: {grid[searchResult]?.redCount} carrés rouges
                  </span>
                )}
              </div>

              {/* Grid Viewport */}
              <div
                ref={gridViewportRef}
                className="border-2 border-border rounded-lg overflow-auto bg-card max-h-96 md:max-h-[600px]"
                data-testid="grid-viewport"
              >
                <div
                  ref={gridContainerRef}
                  style={{ display: "inline-grid", gridTemplateColumns: "auto 1fr" }}
                >
                  {/* Header Row */}
                  <div className="sticky top-0 left-0 z-10 w-12 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs"></div>
                  <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${gridWidth}, 1fr)` }}>
                    {Array.from({ length: gridWidth }).map((_, i) => (
                      <div
                        key={`header-${i}`}
                        className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs border border-border"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Grid Rows */}
                  {grid.map((item, rowIdx) => (
                    <div key={`row-${rowIdx}`} style={{ display: "contents" }}>
                      <div className="w-12 h-10 bg-muted flex items-center justify-center font-bold text-xs border border-border sticky left-0 z-9">
                        L{rowIdx + 1}
                      </div>
                      <div
                        style={{ display: "inline-grid", gridTemplateColumns: `repeat(${gridWidth}, 1fr)` }}
                      >
                        {item.row.map((cell, colIdx) => (
                          <div
                            key={`cell-${rowIdx}-${colIdx}`}
                            className={`w-10 h-10 border border-border flex items-center justify-center text-xs font-semibold ${
                              cell === 1
                                ? "bg-red-500 text-white dark:bg-red-600"
                                : "bg-card text-foreground"
                            }`}
                            data-testid={`cell-${rowIdx}-${colIdx}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-2 text-center">
                Utilisez zoom et navigation pour explorer la pyramide
              </p>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Statistics */}
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-3">Statistiques</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Total carrés:</span>
                  <p className="font-bold text-primary" data-testid="stat-total">
                    {totalCells}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Carrés rouges:</span>
                  <p className="font-bold text-red-500" data-testid="stat-red">
                    {redCells}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Carrés blancs:</span>
                  <p className="font-bold text-foreground" data-testid="stat-white">
                    {whiteCells}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">% rouge:</span>
                  <p className="font-bold text-primary" data-testid="stat-percent">
                    {redPercent}%
                  </p>
                </div>
              </div>
            </Card>

            {/* Generator */}
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-3">Générateur</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Lignes: <span className="text-foreground">{numRows}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={numRows}
                    onChange={(e) => setNumRows(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    data-testid="slider-rows"
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full text-xs"
                  data-testid="button-generate"
                >
                  {isGenerating ? "Génération..." : "Générer"}
                </Button>
              </div>
            </Card>

            {/* Download */}
            <Card className="p-4">
              <Button
                onClick={downloadImage}
                variant="outline"
                className="w-full text-xs"
                disabled={grid.length === 0}
                data-testid="button-download"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger PNG
              </Button>
            </Card>

            {/* About */}
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-2">À propos</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Le triangle de Sierpinski est une fractale générée par un algorithme XOR. Chaque cellule dépend de ses voisines de la ligne précédente.
              </p>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-4">
          <Link href="/">
            <Button variant="outline" size="sm" data-testid="link-home">
              ← Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
