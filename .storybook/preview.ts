import type { Preview } from "@storybook/react";
import '../src/index.css';
import type { ThemeConfig } from "storybook-addon-data-theme-switcher";

export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Rainforest", dataTheme: "rainforest", color: "#00755e" },
        { name: "Candy", dataTheme: "candy", color: "#ffb7d5" },
        { name: "Rose", dataTheme: "rose", color: "#ff007f" },
      ],
      dataAttribute: "data-theme",            // optional (default: "data-theme")
      clearable: true,                        // optional (default: true)
      toolbar: {
        title: "Change data-theme attribute", // optional
        icon: "paintbrush",                   // optional
      },
    } satisfies ThemeConfig,
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {...globalTypes},

} satisfies Preview;

export default preview;
