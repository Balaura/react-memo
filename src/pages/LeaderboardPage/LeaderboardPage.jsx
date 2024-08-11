import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";
import { Button } from "../../components/Button/Button";

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения данных лидерборда
    // Для примера используем моковые данные
    const mockData = [
      { name: "Игрок 1", time: "00:30" },
      { name: "Игрок 2", time: "00:45" },
      { name: "Игрок 3", time: "01:00" },
      // ... добавьте еще записей до 10
    ];
    setLeaderboard(mockData);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Лидерборд</h1>
      <table className={styles.leaderboard}>
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className={styles.backLink}>
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
