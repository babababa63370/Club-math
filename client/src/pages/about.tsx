import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/nav-bar";

export default function About() {

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

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
      </div>
    </div>
  );
}
