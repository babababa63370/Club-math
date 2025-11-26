# Club Mathématique - Explorations Mathématiques Interactives

## 📌 Aperçu du Projet

Une plateforme web éducative qui combine deux explorations mathématiques fascinantes :
1. **Somme des Carrés** - Cycles mathématiques générés en décomposant les nombres
2. **Triangle de Sierpinski** - Fractale infinie avec autosimilarité

Le projet héberge une page d'accueil (Landing) qui présente les deux thèmes avec navigation fluide vers chaque exploration.

## 🎯 État Actuel

### ✅ Complété
- **Landing page** (`/`) - Présentation des deux thèmes
- **Somme des Carrés** (`/somme`) - Calculateur complet avec :
  - Jeu du Cycle (50/50 court/long)
  - Hall of Fame (records)
  - Générateur Art (patterns circulaires)
  - Mode Zen (flux relaxant)
  - Mode Fake (calculs faux)
  - Export PDF/PNG
  - 4 thèmes colorés
  - Historique & Favoris
- **Triangle de Sierpinski** (`/sierpinski`) - Fractale interactive avec :
  - Contrôles de profondeur (0-10)
  - Visualisation dynamique
  - Propriétés mathématiques affichées

### 📱 Design
- Mode sombre/clair avec 4 palettes
- Responsive (mobile + desktop)
- Menu coulissant mobile (slide-in depuis la droite)
- Animations fluides et transitions
- Typography : Inter (UI) + JetBrains Mono (nombres)

### 🔗 Navigation
Tous les menus incluent :
- Lien d'accueil (vers landing)
- Lien vers l'autre thème (Sierpinski ↔ Somme)
- Séparateur visuel
- Tous les outils et pages amusantes

## 🏗️ Architecture

### Structure des Fichiers
```
client/src/
├── pages/
│   ├── landing.tsx        # Page d'accueil principale
│   ├── somme.tsx          # Somme des Carrés (copie de home.tsx)
│   ├── sierpinski.tsx     # Triangle de Sierpinski (NEW)
│   ├── game.tsx           # Jeu du Cycle
│   ├── hall-of-fame.tsx   # Hall of Fame
│   ├── art.tsx            # Générateur Art
│   ├── zen.tsx            # Mode Zen
│   ├── fake.tsx           # Mode Fake
│   ├── about.tsx          # À Propos
│   ├── dev-5524.tsx       # Code Source (caché)
│   └── not-found.tsx      # 404
├── lib/
│   ├── cycleDetector.ts   # Algorithme mathématique
│   ├── historyStorage.ts
│   ├── favoritesStorage.ts
│   └── queryClient.ts
└── components/
    ├── theme-provider.tsx
    └── ui/ (shadcn components)
```

## 📊 Routes Actuelles
- `/` - Landing (sélection des thèmes)
- `/somme` - Calculateur Somme des Carrés
- `/sierpinski` - Triangle de Sierpinski
- `/game` - Jeu du Cycle
- `/hall-of-fame` - Hall of Fame
- `/art` - Générateur Art
- `/zen` - Mode Zen
- `/about` - À Propos
- `/fake` - Mode Fake
- `/dev-5524` - Code Source (non affiché dans les menus)

## 🛠️ Stack Technique

### Frontend
- React 18 + TypeScript
- Vite (build & HMR)
- TailwindCSS + shadcn/ui
- Wouter (routing léger)
- TanStack Query v5
- Recharts (graphiques)
- html2canvas + jsPDF (export)

### Backend
- Express.js + TypeScript
- In-memory storage
- Session management (express-session)

### Design System
- Thèmes HSL avec dark mode
- Composants réutilisables shadcn
- Icônes Lucide React
- Animations Tailwind

## 🔄 Fusion de Projets

### Avant (Deux Projets Séparés)
- Projet 1 : Somme des Carrés avec tous les outils
- Projet 2 : Triangle de Sierpinski seul

### Après (Un Seul Projet Unifié)
- Page d'accueil qui présente les deux thèmes
- Navigation cohérente vers `/somme` et `/sierpinski`
- Tous les outils disponibles via `/somme`
- Menus uniformes et cohérents

## 💾 Stockage
- **localStorage** : Historique, Favoris, Statistiques
- **URL Parameters** : Partage direct des calculs
- **In-memory** : Calculs en temps réel côté client

## 🎨 Thèmes Disponibles
1. **Blue** - Bleu professionnel
2. **Violet** - Violet élégant
3. **Cyan** - Cyan vibrant
4. **Amber** - Ambre chaleureux

Double-clic sur le bouton thème pour accéder au sélecteur avec transition de 6 secondes.

## 📱 Responsive Design
- **Mobile** : Menu hamburger coulissant, layout vertical
- **Tablet** : Ajustement automatique
- **Desktop** : Full layout avec tous les boutons visibles

## 🚀 Déploiement
- **Replit** : https://replit.com/@meonix200/Club-math
- **GitHub** : https://github.com/babababa63370/club-math-test
- **Build** : `npm run build`
- **Dev** : `npm run dev` (port 5000)

## 👤 Préférences Utilisateur
- Communication simple et directe
- Pas d'emojis dans le code (uniquement interface)
- Jeu avec équilibre 50/50
- Accent sur l'expérience utilisateur fluide
- Respect des conventions de code existantes

## 📝 Fichiers Clés Modifiés
1. `client/src/App.tsx` - Routes principales
2. `client/src/pages/landing.tsx` - NOUVEAU
3. `client/src/pages/sierpinski.tsx` - NOUVEAU
4. `client/src/pages/somme.tsx` - Copie de home.tsx
5. Tous les menus mobiles mis à jour
