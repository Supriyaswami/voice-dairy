/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "#f6f0e7",
          muted: "#eee6da",
          ink: "#2c2118",
          accent: "#b36a3c",
          dot: "#c08b5c",
          night: "#141313",
          mist: "#23211f"
        }
      },
      fontFamily: {
        display: ["Georgia", "ui-serif", "serif"],
        body: ["'Segoe UI'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        velvet: "0 20px 60px rgba(45, 30, 16, 0.12)",
        page: "0 30px 80px rgba(15, 10, 8, 0.18)"
      },
      backgroundImage: {
        paper:
          "linear-gradient(transparent 31px, rgba(179, 106, 60, 0.11) 32px), linear-gradient(90deg, rgba(179, 106, 60, 0.08) 0, rgba(179, 106, 60, 0.08) 1px, transparent 1px)",
        halo:
          "radial-gradient(circle at top, rgba(235, 210, 188, 0.8), transparent 35%), radial-gradient(circle at bottom right, rgba(179, 106, 60, 0.18), transparent 25%)"
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(179, 106, 60, 0.12)" },
          "50%": { boxShadow: "0 0 0 16px rgba(179, 106, 60, 0.02)" }
        }
      }
    }
  },
  plugins: []
};

