import { useState, useEffect, useContext, createContext } from "react";

export type ColorPalette = "blue" | "purple" | "cyan" | "amber";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
  colorPalette: ColorPalette;
  setColorPalette: (palette: ColorPalette) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
} | null>(null);

const colorPalettes: Record<ColorPalette, Record<string, string>> = {
  blue: {
    "--primary": "217 91% 60%",
    "--accent": "217 20% 94%",
  },
  purple: {
    "--primary": "262 52% 60%",
    "--accent": "262 20% 94%",
  },
  cyan: {
    "--primary": "173 58% 50%",
    "--accent": "173 20% 94%",
  },
  amber: {
    "--primary": "32 95% 50%",
    "--accent": "32 20% 94%",
  },
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>("blue");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const storedColor = localStorage.getItem("color-palette") as ColorPalette | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    
    const initialTheme = stored || (systemPrefersDark ? "dark" : "light");
    const initialColor = storedColor || "blue";
    
    setTheme(initialTheme);
    setColorPaletteState(initialColor);
    applyTheme(initialTheme, initialColor);
  }, []);

  const applyTheme = (newTheme: "light" | "dark", palette: ColorPalette = colorPalette) => {
    // Add transition class
    document.documentElement.classList.add("theme-transitioning");
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    const colors = colorPalettes[palette];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    
    localStorage.setItem("theme", newTheme);
    localStorage.setItem("color-palette", palette);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 400);
  };

  const toggleTheme = () => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      // Double click detected
      setShowColorPicker(true);
      setLastClickTime(0);
    } else {
      setLastClickTime(now);
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      applyTheme(newTheme, colorPalette);
    }
  };

  const setColorPalette = (palette: ColorPalette) => {
    setColorPaletteState(palette);
    applyTheme(theme, palette);
    setShowColorPicker(false);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        colorPalette, 
        setColorPalette,
        showColorPicker,
        setShowColorPicker
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
