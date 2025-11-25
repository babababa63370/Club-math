import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Dev5524() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold mb-8">Code Source - Anecdote Dev</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Algorithme Principal: Décomposer et Calculer</h2>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`export function calculateSquareSum(num: number): CalculationResult {
  const steps: CalculationStep[] = [];
  const seen = new Map<number, number>();
  let current = num;
  let stepNumber = 0;

  // Boucle jusqu'à trouver un cycle
  while (!seen.has(current)) {
    seen.set(current, stepNumber);
    
    // Étape 1: Décomposer en chiffres
    const digits = current.toString().split('').map(Number);
    
    // Étape 2: Élever chaque chiffre au carré
    const squaredDigits = digits.map(d => d * d);
    
    // Étape 3: Additionner les résultats
    const sum = squaredDigits.reduce((acc, val) => acc + val, 0);
    
    // Créer le calcul lisible
    const calculation = digits
      .map((d, i) => \`\${d}²\`)
      .join(' + ') + \` = \${digits.map((d, i) => squaredDigits[i]).join(' + ')} = \${sum}\`;

    steps.push({
      stepNumber,
      originalNumber: current,
      digits,
      calculation,
      result: sum,
      isInCycle: false,
      isCycleStart: false,
    });

    current = sum;
    stepNumber++;
    
    // Sécurité: limite à 1000 itérations
    if (stepNumber > 1000) {
      break;
    }
  }

  // Identifier le cycle
  const cycleStartIndex = seen.has(current) ? seen.get(current)! : steps.length - 1;
  const cycleLength = stepNumber - cycleStartIndex;

  // Marquer les étapes dans le cycle
  for (let i = cycleStartIndex; i < steps.length; i++) {
    steps[i].isInCycle = true;
  }
  
  if (cycleStartIndex < steps.length) {
    steps[cycleStartIndex].isCycleStart = true;
  }

  return {
    steps,
    cycleStartIndex,
    cycleLength,
  };
}`}</pre>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg space-y-2">
                <p className="text-sm"><strong>Exemple:</strong> 19</p>
                <p className="text-sm">• Chiffres: 1, 9</p>
                <p className="text-sm">• Carrés: 1² = 1, 9² = 81</p>
                <p className="text-sm">• Somme: 1 + 81 = 82</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Algorithme Inverse: Trouver par Cycle</h2>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`// Chercher tous les nombres (1 à 100) qui ont une longueur de cycle spécifique
export function findNumbersWithCycle(
  targetCycle: number, 
  maxSearch: number = 100
): number[] {
  const matching: number[] = [];
  
  // Tester chaque nombre
  for (let i = 1; i <= maxSearch; i++) {
    // Utiliser l'algorithme principal
    const result = calculateSquareSum(i);
    
    // Si la longueur du cycle correspond
    if (result.cycleLength === targetCycle) {
      matching.push(i);
    }
  }
  
  return matching;
}

// Exemple d'utilisation:
// findNumbersWithCycle(1) retourne [1, 7, 10, 13, 19, 23, ...]
// Ces nombres sont appelés "nombres heureux" (happy numbers)
// car leur cycle contient toujours 1

// Exemple d'utilisation:
// findNumbersWithCycle(8) retourne [2, 5, 8, 14, 15, ...]
// Ces nombres se piègent dans le cycle: 4→16→37→58→89→145→42→20→4`}</pre>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg space-y-2">
                <p className="text-sm"><strong>Résultats intéressants:</strong></p>
                <p className="text-sm">• Cycle de 1: Nombres heureux (atteignent 1)</p>
                <p className="text-sm">• Cycle de 8: Le cycle le plus courant pour les nombres "tristes"</p>
                <p className="text-sm">• Le cycle principal: 4→16→37→58→89→145→42→20→4</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Complexité et Performance</h2>
              <div className="bg-card border rounded-lg p-6 space-y-3">
                <p className="text-sm"><strong>Temps: O(k)</strong> où k est le nombre d'étapes avant le cycle (généralement &lt; 20)</p>
                <p className="text-sm"><strong>Espace: O(k)</strong> pour stocker les nombres vus</p>
                <p className="text-sm"><strong>Cas limite:</strong> Limitée à 1000 itérations pour éviter les infinis théoriques</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
