import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WardrobeProvider } from "@/context/WardrobeContext";
import Index from "./pages/Index";
import Drops from "./pages/Drops";
import Editorial001 from "./pages/Editorial001";
import Editorial002 from "./pages/Editorial002";
import ProductDetail from "./pages/ProductDetail";
import Wardrobe from "./pages/Wardrobe";
import Apply from "./pages/Apply";
import Brands from "./pages/Brands";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WardrobeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/editorial/001" element={<Editorial001 />} />
            <Route path="/editorial/002" element={<Editorial002 />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/brands" element={<Brands />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WardrobeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
