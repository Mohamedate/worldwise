import styles from "./SidebarFooter.module.css";

const SidebarFooter = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy;{new Date().getFullYear()} by{" "}
        <a href="https://mohamedate.github.io/Mohamed_Atef/" target="_blank">
          Mohamed Atef
        </a>
      </p>
    </footer>
  );
};

export default SidebarFooter;
