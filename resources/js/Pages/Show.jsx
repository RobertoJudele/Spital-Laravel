import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

export default function Show({ post }) {
    const { delete: destroy } = useForm();
    const route = useRoute();
    function submit(e) {
        e.preventDefault();
        destroy(`/posts/${post.id}`);
        // destroy(route(posts.destroy, post)); facut cu Ziggy
    }
    return (
        <>
            <div className="p-4 border-b">
                <p className="font-medium">{post.body}</p>
                <div className="flex items-center justify-end gap-2">
                    <form onSubmit={submit}>
                        <button className="bg-red-500 rounded-md text-sm px-4 py-1 text-white">
                            Delete
                        </button>
                    </form>
                    <Link
                        href={`/posts/${post.id}/edit`}
                        className="bg-green-500 rounded-md text-sm px-4 py-1 text-white"
                    >
                        Update
                    </Link>
                </div>
            </div>
        </>
    );
}
