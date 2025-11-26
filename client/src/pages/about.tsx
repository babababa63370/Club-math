import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, X, Menu as MenuIcon, Moon, Sun, HelpCircle } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { useTheme } from "@/components/theme-provider";

export default function About() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme, colorPalette, setColorPalette, showColorPicker, setShowColorPicker } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div className="flex gap-2">
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

        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">À Propos</h1>
            <p className="text-xl text-muted-foreground">
              Comprendre la fascination mathématique des cycles numériques
            </p>
          </div>

          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Le Concept</h2>
              <p className="text-muted-foreground mb-4">
                Cette application explore un concept mathématique fascinant : ce qui se passe quand on prend un nombre quelconque et qu'on lui applique répétitivement une opération simple.
              </p>
              <p className="text-muted-foreground">
                L'opération : prenez chaque chiffre d'un nombre, élevez-le au carré, puis additionnez tous ces carrés pour obtenir un nouveau nombre. Répétez ce processus indéfiniment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Exemple Pratique</h2>
              <div className="bg-muted/50 p-4 rounded-lg font-mono space-y-2">
                <p><span className="text-primary font-bold">Nombre initial :</span> 19</p>
                <p><span className="text-primary font-bold">Étape 1 :</span> 1² + 9² = 1 + 81 = 82</p>
                <p><span className="text-primary font-bold">Étape 2 :</span> 8² + 2² = 64 + 4 = 68</p>
                <p><span className="text-primary font-bold">Étape 3 :</span> 6² + 8² = 36 + 64 = 100</p>
                <p><span className="text-primary font-bold">Étape 4 :</span> 1² + 0² + 0² = 1</p>
                <p><span className="text-primary font-bold">Étape 5 :</span> 1² = 1 (cycle détecté !)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Propriétés Intéressantes</h2>
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>Chaque nombre finit par entrer dans une boucle (un cycle)</li>
                <li>Certains nombres arrivent à 1 (considérés comme "heureux")</li>
                <li>D'autres se piègent dans des cycles plus longs</li>
                <li>Le nombre d'étapes avant le cycle varie énormément</li>
                <li>La longueur du cycle est toujours assez courte</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nombres "Heureux"</h2>
              <p className="text-muted-foreground mb-4">
                Les nombres heureux (happy numbers) sont ceux qui finissent par atteindre 1 en appliquant cette opération. Les premiers nombres heureux sont : 1, 7, 10, 13, 19, 23, 28, 31...
              </p>
              <p className="text-muted-foreground">
                À l'inverse, les nombres tristes restent piégés dans un cycle qui ne contient pas 1. Le cycle le plus courant (pour les nombres tristes) est : 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Applications</h2>
              <p className="text-muted-foreground mb-4">
                Bien que ce soit un concept mathématique "pur", il a des applications en :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Théorie des nombres</li>
                <li>Cryptographie</li>
                <li>Détection de patterns dans les données</li>
                <li>Éducation mathématique (illustration des séquences)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Essayez Par Vous-Même</h2>
              <p className="text-muted-foreground mb-4">
                Testez plusieurs nombres et observez :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Combien d'étapes avant d'atteindre un cycle</li>
                <li>La longueur du cycle obtenu</li>
                <li>Les patterns qui se répètent</li>
              </ul>
            </section>
          </Card>

          <div className="text-center">
            <Link href="/">
              <Button size="lg">Retour à l'Appli</Button>
            </Link>
          </div>
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
