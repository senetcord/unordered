import styles from "./container.module.css";

function Contaier({ children }) {
  return <div className={styles.parentContainer}>{children}</div>;
}

export default Contaier;
