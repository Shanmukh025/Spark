const index = () => {
    return (
        <>
            <footer
                style={{
                    textAlign: "center",
                    marginTop: "15px",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <iframe
                        src="https://xspark.instatus.com/embed-status/5d821429/dark-sm"
                        width="218"
                        height="60"
                        frameBorder="0"
                        scrolling="no"
                        style={{ border: "none" }}
                        title="Spark Status Widget"
                    />
                </div>

                <h3
                    style={{ textDecoration: "none" }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                    }
                    onClick={() =>
                        window.open("https://shanmukh25.vercel.app/", "_blank")
                    }
                >
                    Developed by Shanmukh.
                </h3>
            </footer>
        </>
    );
};

export default index;
