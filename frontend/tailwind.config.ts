import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'halfMinusGap': 'calc(50% - 0.25rem)',
      }
    },
  },
  plugins: [],
} satisfies Config;
