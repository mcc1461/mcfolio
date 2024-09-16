/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: { "content-fit": "fit-content" },
      colors: {
        "mc-blue": "#0D2C54",
        "mc-blue-darker1": "#0A1D33",
        "mc-blue-darker2": "#081426",
        "mc-blue-darker3": "#06101A",
        "mc-orange": "#FFA500",
        "mc-yellow": "#FFD700",
        "mc-green": "#008000",
        "mc-red": "#FF0000",
        "mc-purple": "#800080",
        "mc-pink": "#FFC0CB",
        "mc-black": "#000000",
        "mc-white": "#FFFFFF",
        primary: {
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#84A9FF",
          400: "#6690FF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
        secondary: {
          100: "#F3E0FF",
          200: "#E0B0FF",
          300: "#D084FF",
          400: "#C25CFF",
          500: "#A61AE8",
          600: "#8F0FC5",
          700: "#7A0AA3",
          800: "#64057F",
          900: "#54046A",
        },
        tertiary: {
          100: "#FFD6D6",
          200: "#FFADAD",
          300: "#FF8484",
          400: "#FF6666",
          500: "#FF3333",
          600: "#DB254E",
          700: "#B71939",
          800: "#931026",
          900: "#7A091A",
        },
        quaternary: {
          100: "#D6FFD6",
          200: "#ADFFAD",
          300: "#84FF84",
          400: "#66FF66",
          500: "#33FF33",
          600: "#25DB25",
          700: "#19B719",
          800: "#109310",
          900: "#097A09",
        },
        quinary: {
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#84A9FF",
          400: "#6690FF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
        senary: {
          100: "#FFF0D6",
          200: "#FFE6AD",
          300: "#FFDC84",
          400: "#FFD266",
          500: "#FFC933",
          600: "#DBB525",
          700: "#B7A019",
          800: "#938610",
          900: "#7A7A09",
        },
        septenary: {
          100: "#F0D6FF",
          200: "#E6ADFF",
          300: "#DC84FF",
          400: "#D266FF",
          500: "#C933FF",
          600: "#B525DB",
          700: "#A019B7",
          800: "#861093",
          900: "#7A097A",
        },
        octonary: {
          100: "#D6FFEC",
          200: "#ADFFD9",
          300: "#84FFC6",
          400: "#66FFB8",
          500: "#33FFA1",
          600: "#25DB8C",
          700: "#19B77A",
          800: "#109366",
          900: "#097A57",
        },
        nonary: {
          100: "#FFD6F1",
          200: "#FFADF1",
          300: "#FF84F1",
          400: "#FF66F1",
          500: "#FF33F1",
          600: "#DB25DB",
          700: "#B719B7",
          800: "#931093",
          900: "#7A097A",
        },
        denary: {
          100: "#FFD6D6",
          200: "#FFADAD",
          300: "#FF8484",
          400: "#FF6666",
          500: "#FF3333",
          600: "#DB254E",
          700: "#B71939",
          800: "#931026",
          900: "#7A091A",
        },
        elevenary: {
          100: "#D6FFD6",
          200: "#ADFFAD",
          300: "#84FF84",
          400: "#66FF66",
          500: "#33FF33",
          600: "#25DB25",
          700: "#19B719",
          800: "#109310",
          900: "#097A09",
        },
        twelveth: {
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#84A9FF",
          400: "#6690FF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
        thirteenth: {
          100: "#FFF0D6",
          200: "#FFE6AD",
          300: "#FFDC84",
          400: "#FFD266",
          500: "#FFC933",
          600: "#DBB525",
          700: "#B7A019",
          800: "#938610",
          900: "#7A7A09",
        },
        fourteenth: {
          100: "#F0D6FF",
          200: "#E6ADFF",
          300: "#DC84FF",
          400: "#D266FF",
          500: "#C933FF",
          600: "#B525DB",
          700: "#A019B7",
          800: "#861093",
          900: "#7A097A",
        },
        fifteenth: {
          100: "#D6FFEC",
          200: "#ADFFD9",
          300: "#84FFC6",
          400: "#66FFB8",
          500: "#33FFA1",
          600: "#25DB8C",
          700: "#19B77A",
          800: "#109366",
          900: "#097A57",
        },
        sixteenth: {
          100: "#FFD6F1",
          200: "#FFADF1",
          300: "#FF84F1",
          400: "#FF66F1",
          500: "#FF33F1",
          600: "#DB25DB",
          700: "#B719B7",
          800: "#931093",
          900: "#7A097A",
        },
        seventeenth: {
          100: "#FFD6D6",
          200: "#FFADAD",
          300: "#FF8484",
          400: "#FF6666",
          500: "#FF3333",
          600: "#DB254E",
          700: "#B71939",
          800: "#931026",
          900: "#7A091A",
        },
        eighteenth: {
          100: "#D6FFD6",
          200: "#ADFFAD",
          300: "#84FF84",
          400: "#66FF66",
          500: "#33FF33",
          600: "#25DB25",
          700: "#19B719",
          800: "#109310",
          900: "#097A09",
        },
        nineteenth: {
          100: "#D6E4FF",
          200: "#ADC8FF",
          300: "#84A9FF",
          400: "#6690FF",
          500: "#3366FF",
          600: "#254EDB",
          700: "#1939B7",
          800: "#102693",
          900: "#091A7A",
        },
      },
    },
    screens: {
      sm: { max: "640px" },
      // => @media (min-width: 640px) { ... }

      md: { min: "641px", max: "767px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "768px", max: "1023px" },
      // => @media (min-width: 1024px) { ... }

      xl: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1280px) { ... }

      xl2: { min: "1280px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
