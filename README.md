# Explorations Mathématiques 🔢🔺

Une plateforme éducative interactive pour explorer les mathématiques à travers la visualisation et le jeu.

## 🎯 Caractéristiques Principales

### 📊 Somme des Carrés (`/somme`)
- **Calculateur** : Décomposez des nombres et explorez les cycles mathématiques
- **Jeu du Cycle** : Devinez si un cycle est court ou long (50/50)
- **Hall of Fame** : Records absolus des nombres de 1 à 100
- **Générateur Art** : Visualisez les cycles en motifs circulaires colorés
- **Mode Zen** : Flux infini et relaxant de nombres aléatoires
- **Mode Fake** : Calculs intentionnellement faux pour tester vos yeux
- **Historique & Favoris** : Sauvegardez vos calculs préférés
- **Export** : Téléchargez en PDF ou PNG
- **Thèmes** : 4 palettes de couleurs avec animations

### 🔺 Triangle de Sierpinski (`/sierpinski`)
- **Fractale Interactive** : Visualisez la construction mathématique
- **Contrôles de Profondeur** : Explorez jusqu'à 10 itérations
- **Propriétés Mathématiques** : Dimension, aire, autosimilarité

## 🚀 Démarrage

```bash
npm install
npm run dev
```

L'app démarre sur `http://localhost:5000`

## 📱 Pages Disponibles

- **`/`** - Page d'accueil (Landing page)
- **`/somme`** - Calculateur Somme des Carrés
- **`/sierpinski`** - Triangle de Sierpinski
- **`/game`** - Jeu du Cycle
- **`/hall-of-fame`** - Records et Hall of Fame
- **`/art`** - Générateur de Patterns
- **`/zen`** - Mode Zen (flux relaxant)
- **`/about`** - À propos
- **`/fake`** - Mode Fake (calculs incorrects)
- **`/dev-5524`** - Code Source (caché)

## 🛠️ Stack Technique

**Frontend**
- React 18 + TypeScript
- Vite (build et dev)
- TailwindCSS + shadcn/ui
- Wouter (routing)
- TanStack Query
- Recharts (graphiques)
- React Hook Form

**Backend**
- Express.js
- TypeScript
- In-memory storage

**Design**
- Thème sombre/clair
- Dark mode avec 4 palettes
- Animations fluides
- Design responsive
- Typographie : Inter (UI) + JetBrains Mono (math)

## 🎓 Concepts Mathématiques

### Somme des Carrés
Processus itératif qui prend un nombre, décompose ses chiffres, élève au carré, additionne, et répète :
- **19** → 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = 1 ✅ (Nombre heureux)
- Certains nombres créent des cycles infinis
- D'autres convergent vers 1 (nombres heureux)

### Triangle de Sierpinski
Fractale découverte en 1915 :
- Dimension fractale ≈ 1.585
- Aire mathématique = 0
- Autosimilaire (chaque partie ressemble au tout)
- Propriétés étonnantes à chaque itération

## 📊 Statistiques

- 303 fichiers compilés
- Support du mode hors ligne (localStorage)
- ~50 nombres pré-calculés pour le jeu
- Animations optimisées pour 60fps

## 🔗 Lien de Déploiement

Replit : https://replit.com/@meonix200/Club-math

GitHub : https://github.com/babababa63370/club-math-test

## 💡 Utilisation Pédagogique

Parfait pour :
- Comprendre les cycles mathématiques
- Explorer les fractales
- Apprendre par l'interaction
- Développer l'intuition mathématique

## 📝 Licence

MIT

---

**Créé avec ❤️ pour l'exploration mathématique interactive**
