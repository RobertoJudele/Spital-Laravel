import { Link, Head, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useContext, useState } from "react";
import Auth from "./Auth";
import { AppContext } from "../Context/AppContext";
export default function Home({ posts }) {
    const { name } = useContext(AppContext);
    const route = useRoute();
    const { flash } = usePage().props;
    const [flashDeletedMsg, setFlashDeletedMsg] = useState(flash.deleted);
    const [flashUpdatedMsg, setFlashUpdatedMsg] = useState(flash.updated);
    const { component } = usePage();
    setTimeout(() => {
        setFlashDeletedMsg(null);
        setFlashUpdatedMsg(null);
    }, 2000);
    return (
        <>
            <Head title={component} />
            <h1 className="title">Hello {name}</h1>
            {flashDeletedMsg && (
                <div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white">
                    {flashDeletedMsg}
                </div>
            )}
            {flashUpdatedMsg && (
                <div className="absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white">
                    {flashUpdatedMsg}
                </div>
            )}
            <div>
                {posts.data.map((post) => (
                    <div key={post.id} className="p-4 border-b">
                        <p className="font-medium">{post.body}</p>
                        {/* <Link href={`/posts/${post.id}`} className="text-link">
                            Read more...
                        </Link> */}
                        <Link
                            href={route("posts.show", post)}
                            className="text-link"
                        >
                            Read more...
                        </Link>
                    </div>
                ))}
            </div>
            <div className="py-12 px-4">
                {posts.links.map((link) =>
                    link.url ? (
                        <Link
                            className={`p-1 mx-1 ${
                                link.active ? " font-bold" : ""
                            }`}
                            link={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    ) : (
                        <span></span>
                    )
                )}
            </div>
        </>
    );
}
