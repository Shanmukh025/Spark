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
                <iframe
                    src="https://xspark.instatus.com/embed-status/5d821429/dark-sm"
                    width="220"
                    height="60"
                    frameBorder="0"
                    scrolling="no"
                    title="SPARK Status"
                    style={{ border: "none" }}
                />
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
