import styles from "./Button.module.css";

export function Button({ children, onClick, disabled, className }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
}
