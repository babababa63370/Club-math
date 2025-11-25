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
              <h2 className="text-2xl font-bold">TypeScript: Algorithme Principal</h2>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`export function calculateSquareSum(num: number): CalculationResult {
  const steps: CalculationStep[] = [];
  const seen = new Map<number, number>();
  let current = num;
  let stepNumber = 0;

  while (!seen.has(current)) {
    seen.set(current, stepNumber);
    
    const digits = current.toString().split('').map(Number);
    const squaredDigits = digits.map(d => d * d);
    const sum = squaredDigits.reduce((acc, val) => acc + val, 0);
    
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
    
    if (stepNumber > 1000) break;
  }

  const cycleStartIndex = seen.has(current) ? seen.get(current)! : steps.length - 1;
  const cycleLength = stepNumber - cycleStartIndex;

  for (let i = cycleStartIndex; i < steps.length; i++) {
    steps[i].isInCycle = true;
  }
  
  if (cycleStartIndex < steps.length) {
    steps[cycleStartIndex].isCycleStart = true;
  }

  return { steps, cycleStartIndex, cycleLength };
}`}</pre>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">TypeScript: Algorithme Inverse</h2>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`export function findNumbersWithCycle(
  targetCycle: number, 
  maxSearch: number = 100
): number[] {
  const matching: number[] = [];
  
  for (let i = 1; i <= maxSearch; i++) {
    const result = calculateSquareSum(i);
    if (result.cycleLength === targetCycle) {
      matching.push(i);
    }
  }
  
  return matching;
}

// findNumbersWithCycle(1) → nombres heureux
// findNumbersWithCycle(8) → cycle courant`}</pre>
              </div>
            </div>

            <div className="border-t pt-8 space-y-4">
              <h2 className="text-2xl font-bold">Python: Algorithme Principal</h2>
              <p className="text-sm text-muted-foreground">Prêt à copier-coller :</p>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`def calculate_square_sum(num):
    """Décompose un nombre en chiffres, élève au carré, additionne, répète."""
    steps = []
    seen = {}
    current = num
    step_number = 0
    
    while current not in seen:
        seen[current] = step_number
        
        # Décomposer en chiffres
        digits = [int(d) for d in str(current)]
        
        # Élever au carré
        squared_digits = [d * d for d in digits]
        
        # Additionner
        sum_result = sum(squared_digits)
        
        # Calcul lisible
        calculation = ' + '.join(f'{d}²' for d in digits) + \
                     f' = {" + ".join(str(s) for s in squared_digits)} = {sum_result}'
        
        steps.append({
            'step_number': step_number,
            'original_number': current,
            'digits': digits,
            'calculation': calculation,
            'result': sum_result,
            'is_in_cycle': False,
            'is_cycle_start': False,
        })
        
        current = sum_result
        step_number += 1
        
        if step_number > 1000:
            break
    
    cycle_start_index = seen.get(current, len(steps) - 1)
    cycle_length = step_number - cycle_start_index
    
    for i in range(cycle_start_index, len(steps)):
        steps[i]['is_in_cycle'] = True
    
    if cycle_start_index < len(steps):
        steps[cycle_start_index]['is_cycle_start'] = True
    
    return {
        'steps': steps,
        'cycle_start_index': cycle_start_index,
        'cycle_length': cycle_length,
    }


# Exemple d'utilisation:
if __name__ == '__main__':
    result = calculate_square_sum(19)
    print(f"Nombre: 19")
    print(f"Étapes: {len(result['steps'])}")
    print(f"Cycle: {result['cycle_length']}")
    
    for step in result['steps']:
        print(f"Étape {step['step_number']}: {step['calculation']}")`}</pre>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Python: Algorithme Inverse</h2>
              <p className="text-sm text-muted-foreground">Chercher par longueur de cycle :</p>
              <div className="bg-card border rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`def find_numbers_with_cycle(target_cycle, max_search=100):
    """Trouve tous les nombres avec une longueur de cycle spécifique."""
    matching = []
    
    for i in range(1, max_search + 1):
        result = calculate_square_sum(i)
        if result['cycle_length'] == target_cycle:
            matching.append(i)
    
    return matching


# Exemples:
if __name__ == '__main__':
    happy = find_numbers_with_cycle(1, 50)
    print(f"Nombres heureux (cycle=1): {happy}")
    
    cycle_8 = find_numbers_with_cycle(8, 50)
    print(f"Nombres avec cycle=8: {cycle_8}")
    
    cycle_5 = find_numbers_with_cycle(5, 50)
    print(f"Nombres avec cycle=5: {cycle_5}")`}</pre>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg space-y-3">
              <h3 className="font-bold">Notes importantes:</h3>
              <p className="text-sm">• Code Python prêt à copier-coller directement</p>
              <p className="text-sm">• Nombres heureux (cycle=1): 1, 7, 10, 13, 19, 23, 28, 31, ...</p>
              <p className="text-sm">• Cycle principal: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
