import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Landing() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
            <Link href="/somme">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                Somme des Carrés
              </button>
            </Link>
            <Link href="/sierpinski">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-full px-4 py-3 rounded-lg hover-elevate text-left"
              >
                Triangle de Sierpinski
              </button>
            </Link>
          </div>
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center py-12 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1" />
            <h1 className="text-5xl font-bold flex-1">
              Explorations Mathématiques
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les merveilles des mathématiques à travers des visualisations interactives
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Somme des Carrés */}
          <Link href="/somme">
            <Card className="p-8 hover-elevate cursor-pointer h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">🔢 Somme des Carrés</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Explorez les cycles mathématiques fascinants créés en additionnant les carrés des chiffres d'un nombre.
                </p>
                <div className="space-y-2 text-sm">
                  <p>✨ Décomposition de nombres</p>
                  <p>✨ Détection de cycles</p>
                  <p>✨ Jeu interactif</p>
                  <p>✨ Visualisations artistiques</p>
                  <p>✨ Hall of Fame & Mode Zen</p>
                </div>
              </div>
              <Button className="w-full mt-6">
                Commencer →
              </Button>
            </Card>
          </Link>

          {/* Triangle de Sierpinski */}
          <Link href="/sierpinski">
            <Card className="p-8 hover-elevate cursor-pointer h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">🔺 Triangle de Sierpinski</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Observez la construction fractale infinie et autosimilaire du triangle de Sierpinski.
                </p>
                <div className="space-y-2 text-sm">
                  <p>✨ Fractales mathématiques</p>
                  <p>✨ Construction itérative</p>
                  <p>✨ Zooms infinis</p>
                  <p>✨ Propriétés étonnantes</p>
                  <p>✨ Patterns autosimilaires</p>
                </div>
              </div>
              <Button className="w-full mt-6">
                Découvrir →
              </Button>
            </Card>
          </Link>
        </div>

        <div className="bg-primary/10 p-8 rounded-lg text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">À propos de ce projet</h3>
          <p className="text-muted-foreground mb-6">
            Une plateforme éducative pour explorer et comprendre les mathématiques à travers l'interaction, la visualisation et le jeu.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/somme">
              <Button variant="outline">Somme des Carrés</Button>
            </Link>
            <Link href="/sierpinski">
              <Button variant="outline">Sierpinski</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
