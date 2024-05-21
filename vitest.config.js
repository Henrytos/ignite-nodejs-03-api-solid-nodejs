import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      include: ["src/use-cases", "src/repositories"],
      exclude: ["src/use-cases/factories", "src/repositories/prisma"],
    },
  },
});
