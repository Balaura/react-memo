import React from "react";
import styles from "./Superpowers.module.css";
import { Button } from "../Button/Button";

export function Superpowers({ onUseSuperpower, usedSuperpowers }) {
  return (
    <div className={styles.superpowers}>
      <Button
        onClick={() => onUseSuperpower("revelation")}
        className={styles.superpowerButton}
        disabled={usedSuperpowers.revelation}
      >
        Прозрение
      </Button>
      <Button
        onClick={() => onUseSuperpower("alohomora")}
        className={styles.superpowerButton}
        disabled={usedSuperpowers.alohomora}
      >
        Алохомора
      </Button>
    </div>
  );
}
