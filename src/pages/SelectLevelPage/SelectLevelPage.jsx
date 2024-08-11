import { useNavigate, Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useGameContext } from "../../context/GameContext";

export function SelectLevelPage() {
  const { isSimpleMode, setIsSimpleMode } = useGameContext();
  const navigate = useNavigate();

  const handleLevelSelect = pairsCount => {
    navigate(`/game/${pairsCount}${isSimpleMode ? "?simple=true" : ""}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <button className={styles.levelLink} onClick={() => handleLevelSelect(3)}>
              1
            </button>
          </li>
          <li className={styles.level}>
            <button className={styles.levelLink} onClick={() => handleLevelSelect(6)}>
              2
            </button>
          </li>
          <li className={styles.level}>
            <button className={styles.levelLink} onClick={() => handleLevelSelect(9)}>
              3
            </button>
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
        <Link to="/leaderboard" className={styles.leaderboardLink}>
          Лидерборд
        </Link>
      </div>
    </div>
  );
}
