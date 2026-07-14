/**
 * Shared Tailwind design tokens, lifted directly from the iMeek Cargo
 * dashboard reference: warm off-white surfaces, near-black text, and a
 * single confident red accent used for primary actions, active nav state,
 * and "hero" stat cards.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        imeek: {
          bg: "#F3F1EA",        // page / sidebar background (warm off-white)
          surface: "#FFFFFF",   // cards
          ink: "#1B1A17",       // primary text
          muted: "#8A8A82",     // secondary text
          line: "#E6E3D8",      // hairline borders
          red: {
            DEFAULT: "#E8483D", // primary accent (buttons, active nav, alerts)
            50: "#FDEEEC",
            100: "#FBD9D5",
            400: "#EF6B60",
            500: "#E8483D",
            600: "#CF3A30",
            700: "#A82E26"
          }
        }
      },
      borderRadius: {
        card: "20px",
        pill: "999px"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,26,23,0.04), 0 8px 24px rgba(27,26,23,0.04)"
      }
    }
  }
};
