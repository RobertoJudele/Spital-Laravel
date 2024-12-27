import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import Layout from "./Layouts/Layout"; // Correct import for your custom Layout component
import AppProvider from "./Context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import ProtectedRoute from "./Pages/ProtectedRoute";

createInertiaApp({
    title: (title) => (title ? `${title} - Spital.php` : "Spital.php"),
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        const LayoutWrapper = (page) => <Layout>{page}</Layout>;
        page.default.layout = page.default.layout || LayoutWrapper;
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App {...props} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </AppProvider>
        );
    },
    progress: {
        color: "#fff",
    },
});
