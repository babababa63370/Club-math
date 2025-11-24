# Design Guidelines: Number Sequence Cycle Detector

## Design Approach
**Reference-Based Hybrid:** Drawing from **Linear's** clean mathematical aesthetics and **Notion's** educational clarity, combined with data visualization principles from modern calculation tools. This utility-focused application prioritizes clarity and visual progression.

## Core Design Principles
1. **Mathematical Clarity:** Clear visual hierarchy for numbers and operations
2. **Progressive Disclosure:** Step-by-step revelation builds understanding
3. **Cycle Emphasis:** Distinct visual treatment for detected repetition
4. **Educational Flow:** Guide users through the calculation process

## Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - clean, mathematical readability
- Mono: JetBrains Mono - for numbers and calculations

**Hierarchy:**
- Page Title: text-4xl font-bold
- Section Headers: text-2xl font-semibold
- Number Display (large): text-6xl font-mono font-bold
- Step Numbers: text-3xl font-mono
- Calculation Details: text-lg font-mono
- Body Text: text-base
- Helper Text: text-sm text-gray-600

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16 (p-4, gap-8, mt-12, etc.)

**Container Structure:**
- Max width: max-w-4xl mx-auto
- Page padding: px-6 py-12
- Section spacing: space-y-12

## Component Library

### 1. Input Section (Top)
- Centered layout with max-w-md
- Large input field: h-16 text-2xl font-mono text-center
- Input styling: rounded-xl border-2 with focus states
- "Calculate" button: Large, prominent (h-14 text-lg)
- Gap between input and button: gap-4

### 2. Calculation Display (Main Content)
**Timeline/Sequence Layout:**
- Vertical flow with connecting lines/arrows
- Each step in a card: p-6 rounded-xl border
- Step spacing: space-y-6

**Step Card Structure:**
- Step number badge (top-left): Circular, text-sm
- Original number: Large display (text-5xl font-mono)
- Breakdown visualization: Inline digit display with "+" separators
- Calculation formula: text-xl font-mono (e.g., "1² + 5² = 26")
- Result number: text-4xl font-mono font-bold
- Arrow/connector to next step

### 3. Cycle Detection Section
**Visual Treatment:**
- Distinct border treatment (thicker, different style)
- Background differentiation (subtle)
- "Cycle Detected" badge: Prominent, top-right of first repeating card
- Repeated sequence grouped visually with connecting bracket/outline

**Cycle Visualization:**
- Highlight first occurrence and repeat with matching treatment
- Visual loop indicator (circular arrow or connecting line)

### 4. Information Panel (Optional Sidebar or Bottom)
- Explanation of the process: p-6 rounded-xl
- Example breakdown: List with gap-3
- "How it works" section: text-sm leading-relaxed

## Page Structure

**Single-Page Application Layout:**
1. **Header (Compact):** 
   - Title and subtitle: text-center py-8
   - Brief description: max-w-2xl mx-auto

2. **Input Area:**
   - Centered, prominent positioning
   - mb-16 for separation from results

3. **Results Display:**
   - Conditional rendering (empty state vs. results)
   - Empty state: Centered prompt with example
   - Results state: Full sequence timeline

4. **Footer:**
   - Educational notes or additional examples
   - Centered, py-12

## Interaction Patterns

**Progressive Revelation:**
- Steps appear sequentially (stagger animation timing)
- Smooth scroll to new steps as they calculate
- Cycle detection triggers final visual emphasis

**Number Transitions:**
- Result of one step becomes input of next
- Visual connection with subtle animations

**Input Validation:**
- Real-time feedback for invalid inputs
- Clear error states: border-red-500
- Helper text below input: "Enter a positive integer"

## Responsive Behavior

**Mobile (base):**
- Single column, full-width cards
- Reduced font sizes (text-4xl → text-3xl for numbers)
- Compact padding: p-4 instead of p-6
- Stacked layout for all elements

**Desktop (lg:):**
- Maintain max-w-4xl container
- Larger number displays (text-6xl)
- More generous spacing (p-6, gap-8)

## Visual Rhythm

**Card Patterns:**
- Consistent rounded-xl radius across all cards
- Uniform border weights
- Predictable padding: p-6 for content cards

**Vertical Flow:**
- Top: Input (fixed position)
- Middle: Dynamic sequence (grows vertically)
- Bottom: Static information

**Spacing Consistency:**
- Between cards: gap-6
- Section breaks: mt-12 or mt-16
- Input to results: mb-16

## Key Visual Elements

**Number Display Excellence:**
- Monospace font for all numerical values
- Large, bold presentation for primary numbers
- Smaller, lighter for intermediate calculations
- Tabular figures alignment

**Mathematical Operation Clarity:**
- Explicit operators (+, ², =) with spacing
- Step-by-step breakdown before final result
- Clear visual separation between operation and result

**Cycle Indication:**
- First occurrence: Visual marker
- Repetition: Matching marker + connecting element
- Loop visualization: Curved arrow or bracket connecting cycle endpoints

This design creates an educational, mathematically precise experience that makes complex iterations comprehensible through clear visual hierarchy and progressive disclosure.