import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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

export function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/somme", label: "Somme des Carrés" },
    { href: "/sierpinski", label: "Triangle de Sierpinski" },
    { href: "/game", label: "Jeu du Cycle" },
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/art", label: "Générateur Art" },
    { href: "/zen", label: "Mode Zen" },
    { href: "/fake", label: "Mode Fake" },
    { href: "/about", label: "À Propos" },
  ];

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
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

  return (
    <>
      <div className="fixed top-6 right-6 z-30">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
            data-testid="button-nav-toggle"
          >
            <AnimatedMenuIcon isOpen={showMenu} />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setShowMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className="fixed top-0 right-0 h-screen w-64 bg-card border-l shadow-lg z-50 p-4 space-y-2 overflow-y-auto"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link href={item.href}>
                    <motion.button
                      onClick={() => setShowMenu(false)}
                      className="w-full px-4 py-3 rounded-lg text-left hover:bg-accent transition-colors"
                      data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      whileHover={{ x: 8, backgroundColor: "var(--elevate-1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
