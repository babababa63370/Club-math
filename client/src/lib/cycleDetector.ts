import type { CalculationStep, CalculationResult } from "@shared/schema";

export function calculatePowerSum(num: number | string | bigint, power: number = 2): CalculationResult {
  const steps: CalculationStep[] = [];
  const seen = new Map<string, number>();
  let current = BigInt(num);
  let stepNumber = 0;

  while (!seen.has(current.toString())) {
    seen.set(current.toString(), stepNumber);
    
    const digits = current.toString().split('').map(Number);
    const poweredDigits = digits.map(d => BigInt(d) ** BigInt(power));
    const sum = poweredDigits.reduce((acc, val) => acc + val, 0n);
    
    const superscript = power === 2 ? '²' : power === 3 ? '³' : `^${power}`;
    const calculation = digits
      .map((d) => `${d}${superscript}`)
      .join(' + ') + ` = ${poweredDigits.map(d => d.toString()).join(' + ')} = ${sum.toString()}`;

    steps.push({
      stepNumber,
      originalNumber: Number(current < BigInt(Number.MAX_SAFE_INTEGER) ? current : 0), // Placeholder for compatibility
      digits,
      calculation,
      result: Number(sum < BigInt(Number.MAX_SAFE_INTEGER) ? sum : 0), // Placeholder for compatibility
      isInCycle: false,
      isCycleStart: false,
    });

    current = sum;
    stepNumber++;
    
    if (stepNumber > 1000) {
      break;
    }
  }

  const cycleStartIndex = seen.has(current.toString()) ? seen.get(current.toString())! : steps.length - 1;
  const cycleLength = stepNumber - cycleStartIndex;

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
}

export function calculateSquareSum(num: number | string | bigint): CalculationResult {
  return calculatePowerSum(num, 2);
}
