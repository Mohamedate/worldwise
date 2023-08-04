import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

import { useEffect, useState } from "react";
import homePage from "../images/travel.png";
export default function Homepage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main className={styles.homepage}>
      <section className={animate ? styles.show : ""}>
        <h1>
          You travel the world.
          <br />
          We keeps track of your adventures.
        </h1>

        <Link className="cta" to="login">
          start{" "}
        </Link>
      </section>
      <section className={animate ? styles.show : ""}>
        <img src={homePage} className={styles.animatePhoto} />
      </section>
    </main>
  );
}
