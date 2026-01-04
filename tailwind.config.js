module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tw-border": "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "'Halyard_Display-Regular'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        'default': [
          "'Halyard_Display-Regular'",
          "'Halyard_Display-Book'",
          "'Halyard_Display-Light'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        'halyard-display': [
          "'Halyard_Display-Regular'",
          "'Halyard_Display-Book'",
          "'Halyard_Display-Light'",
          "'medium display'",
          "'Halyard_Display-SemiBold'",
          "'Halyard_Display-Bold'",
          "'Halyard_Display-Black'",
          "'Halyard_Display-ExtraLight'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        'halyard-text': [
          "'Halyard_Text-Regular'",
          "'Halyard_Text-Light'",
          "'Halyard_Text-Medium'",
          "'Halyard_Text-Bold'",
          "ui-sans-serif", 
          "system-ui",
          "sans-serif"
        ],
        'halyard-micro': [
          "'Halyard_Micro-Regular'",
          "'Halyard_Micro-Book'",
          "'Halyard_Micro-Light'",
          "'Halyard_Micro-Medium'",
          "'Halyard_Micro-SemiBold'",
          "'Halyard_Micro-Bold'",
          "'Halyard_Micro-Black'",
          "'Halyard_Micro-ExtraLight'",
          "ui-sans-serif",
          "system-ui", 
          "sans-serif"
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-left": "scroll-left 20s linear infinite",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
