import "./App.css";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="white" storageKey="vite-ui-theme">
      <Button>Click Me</Button>
    </ThemeProvider>
  );
}

export default App;
