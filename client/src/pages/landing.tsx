import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function AnimatedMenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-5 h-5 flex flex-col justify-center items-center">
      <motion.span
        className="block w-5 h-0.5 bg-current origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block w-5 h-0.5 bg-current origin-center"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-5 h-0.5 bg-current origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: { 
    x: "100%", 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function Landing() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 right-6 md:hidden z-30">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <AnimatedMenuIcon isOpen={showMobileMenu} />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/20 z-40 md:hidden" 
              onClick={() => setShowMobileMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div 
              className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 md:hidden p-4 space-y-3"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants}>
                <Link href="/somme">
                  <motion.button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full px-4 py-3 rounded-lg text-left hover:bg-accent transition-colors"
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Somme des Carrés
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/sierpinski">
                  <motion.button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full px-4 py-3 rounded-lg text-left hover:bg-accent transition-colors"
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Triangle de Sierpinski
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Link href="/somme">
              <Card className="p-8 cursor-pointer h-full flex flex-col justify-between transition-shadow hover:shadow-lg">
                <div>
                  <h2 className="text-3xl font-bold mb-4">🔢 Somme des Carrés</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Explorez les cycles mathématiques fascinants créés en additionnant les carrés des chiffres d'un nombre.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>✨ Décomposition de nombres</p>
                    <p>✨ Détection de cycles</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full mt-6">
                    Commencer →
                  </Button>
                </motion.div>
              </Card>
            </Link>
          </motion.div>

          {/* Triangle de Sierpinski */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <Link href="/sierpinski">
              <Card className="p-8 cursor-pointer h-full flex flex-col justify-between transition-shadow hover:shadow-lg">
                <div>
                  <h2 className="text-3xl font-bold mb-4">🔺 Triangle de Sierpinski</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Observez la construction fractale infinie et autosimilaire du triangle de Sierpinski.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>✨ Fractales mathématiques</p>
                    <p>✨ Construction itérative</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full mt-6">
                    Découvrir →
                  </Button>
                </motion.div>
              </Card>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="bg-primary/10 p-8 rounded-lg text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">À propos de ce projet</h3>
          <p className="text-muted-foreground mb-6">
            Une plateforme éducative pour explorer et comprendre les mathématiques à travers l'interaction, la visualisation et le jeu.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/somme">
                <Button variant="outline">Somme des Carrés</Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sierpinski">
                <Button variant="outline">Sierpinski</Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
