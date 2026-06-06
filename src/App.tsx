import React from "react";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import system from "./theme";
import AppRoutes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import "./i18n"; // Import i18n configure engine

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <HashRouter>
          <BoxWrapper>
             <Header />
             <AppRoutes />
             <Footer />
             <WhatsAppWidget />
          </BoxWrapper>
        </HashRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

// Simple Box Wrapper styled using standard inline padding or styles if needed
function BoxWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#FAFAF9", fontFamily: "'Inter', sans-serif" }}>
      {children}
    </div>
  );
}
