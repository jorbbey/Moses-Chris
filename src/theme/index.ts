import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { spacing } from "./spacing";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: colors,
      fonts: typography.fonts,
      fontSizes: typography.fontSizes,
      fontWeights: typography.fontWeights,
      lineHeights: typography.lineHeights,
      shadows: shadows,
      spacing: spacing
    },
    semanticTokens: {
      colors: {
        primary: {
          value: "{colors.navy.800}"
        },
        secondary: {
          value: "{colors.teal.500}"
        },
        accent: {
          value: "{colors.gold.500}"
        },
        brandText: {
          value: "{colors.navy.800}"
        },
        brandMuted: {
          value: "{colors.slate.500}"
        },
        brandBg: {
          value: "{colors.slate.50}"
        }
      }
    }
  }
});

export const system = createSystem(defaultConfig, customConfig);
export default system;
