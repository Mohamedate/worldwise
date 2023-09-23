import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enimate, setEnimate] = useState(false);
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    login(name, email);
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/worldwise/app", { replace: true });
    }
  }, [isAuth]);

  useEffect(() => {
    setEnimate(!enimate);
    return () => {
      setEnimate(false);
    };
  }, [name, email]);

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.image}>
          <img className={enimate ? styles.rotate : ""} src={logo} />
          <h1>Sign in</h1>
        </div>

        <div className={styles.row}>
          <input
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Your Name"
          />
        </div>

        <div className={styles.row}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
