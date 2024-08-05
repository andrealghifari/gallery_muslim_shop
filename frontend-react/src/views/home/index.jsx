import { Link } from "react-router-dom";
import Register from "../auth/register";

const Home = () => {
  return (
    <body>
      <div
        className="p-5 mb-4"
        style={{
          width: "800px",
          borderRadius: "1em",
          backgroundColor: "cyan",
          border: "3px solid white",
        }}
      >
        <div
          className="container-fluid py-5"
          style={{
            width: "700px",
            display: "flex",
            flexDirection: "column",
            borderRadius: ".5rem",
            backgroundColor: "whitesmoke",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "10px 5px 5px grey",
          }}
        >
          <h1 className="display-4 ">Welcome to</h1>
          <div
            className="logo-toko"
            style={{
              width: "370px",
              position: "relative",
              backgroundColor: "orange",
              color: "#FFFF",
              fontSize: "2.6rem",
              fontWeight: "800",
              border: ".3rem solid black",
              borderRadius: "3rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={`/img/man.png`}
              alt=""
              style={{ scale: ".7", marginRight: "-20px", marginTop: "-10px" }}
            />{" "}
            <strong>Gallery Muslim</strong>
          </div>
          <p
            className="col-md-12 banner fw-bold"
            style={{ marginTop: "2rem", fontSize: "2.5rem" }}
          >
            مرحبا بك أخي
          </p>
          <hr />
          <div style={{ display: "flex", gap: "3rem" }}>
            <Link to={"/register"} className="btn btn-primary btn-lg w-50 ">
              Register
            </Link>
            <Link to={"/login"} className="btn btn-secondary btn-lg w-50">
              Login
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Home;
