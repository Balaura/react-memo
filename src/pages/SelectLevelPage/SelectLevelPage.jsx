import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/3${isSimpleMode ? "?simple=true" : ""}`}>
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/6${isSimpleMode ? "?simple=true" : ""}`}>
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/9${isSimpleMode ? "?simple=true" : ""}`}>
              3
            </Link>
          </li>
        </ul>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="simpleMode"
            checked={isSimpleMode}
            onChange={e => setIsSimpleMode(e.target.checked)}
          />
          <label htmlFor="simpleMode">Упрощенный режим (3 ошибки)</label>
        </div>
      </div>
    </div>
  );
}
