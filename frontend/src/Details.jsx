export function Details({ details, setDetails }) {
    return (
        <div className="base">
            <img src="/vite.svg" alt="asd" />
            <h1>{details.title}</h1>
            <p>{details.subtitle}</p>
            <input id="text" type="text" />
            <button
                onClick={() => {
                    setDetails((prev) => ({
                        ...prev,
                        title: document.getElementById("text").value,
                    }));
                }}
            >
                Click button
            </button>
        </div>
    );
}

