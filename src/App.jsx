import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastProvider from "./context/ToastProvider";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";

// Las páginas secundarias se cargan bajo demanda para aligerar la carga inicial
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="noise"></div>
            <Navbar />

            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/program/:id" element={<ProgramDetail />} />
                <Route path="/checkout/:planId" element={<Checkout />} />
                <Route path="/cuenta" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
