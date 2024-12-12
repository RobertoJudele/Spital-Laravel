import { useForm, Head } from "@inertiajs/react";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        body: "",
    });
    function submit(e) {
        e.preventDefault();
        post("/posts");
    }
    console.log(errors);
    return (
        <>
            {" "}
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="This is the CREATE description"
                />
            </Head>
            <h1 className="title">Create Page</h1>
            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <textarea
                        rows="10"
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        className={errors.body && "!ring-red-500"}
                    ></textarea>
                    {errors.body && <p className="error">{errors.body}</p>}
                    <button className="primary-btn mt-4" disabled={processing}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default Create;
