import { Head, Link } from "@inertiajs/react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    async function handleLogout(e) {
        e.preventDefault();
        const res = await fetch("/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log("Data:", data);
        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        }
    }
    return (
        <>
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="This is the default description"
                />
            </Head>
            <header>
                <nav>
                    <Link className="nav-link" href="/">
                        Home
                    </Link>
                    <div>
                        {user && user.name ? (
                            <div className="flex flex-row">
                                {" "}
                                <Link className="nav-link" href="/posts/create">
                                    Create
                                </Link>
                                <Link className="nav-link" href="/">
                                    {user.name}
                                </Link>
                                <form onSubmit={handleLogout}>
                                    <button className="nav-link">Logout</button>
                                </form>
                            </div>
                        ) : (
                            <Link className="nav-link" href="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
