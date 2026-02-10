import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./Components/ThemeProvider";

const appName = import.meta.env.VITE_APP_NAME || "JCC";

createInertiaApp({
  title: (title) => (title ? `${title} / ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App {...props} />
      </ThemeProvider>
    );
  },
  progress: {
    color: "#172554",
    delay: 1,
  },
});
