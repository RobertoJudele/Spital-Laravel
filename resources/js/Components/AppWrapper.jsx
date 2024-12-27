import { Route } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
export default function AppWrapper({ App, props }) {
    const { user } = useContext(AppContext);
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="/register"
                            element={user ? <Home /> : <Register />}
                        />
                        <Route path="/login" element={<Auth />} />
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}
