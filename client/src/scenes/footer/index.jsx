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
                <iframe 
                    src="https://xspark.instatus.com/embed-status/5d821429/dark-sm"
                    width="230"
                    height="61"
                    frameBorder="0"
                    scrolling="no"
                    style={{ border: "none" }}
                />
            </footer>
        </>
    );
};

export default index;
