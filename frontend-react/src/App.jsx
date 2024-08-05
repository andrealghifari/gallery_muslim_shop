import "./App.css";
import AppRoutes from "./views/routes";

/*Import AuthProvider untuk memantau state otentikasi,
routes yang telah dibuat, react-router, dan juga Link*/
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="body-wrapper">
          <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
              <Link to="/" className="navbar-brand">
                Home
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      href="#"
                      target="_blank"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Gallery Muslim
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container mt-5">
            <AppRoutes></AppRoutes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
