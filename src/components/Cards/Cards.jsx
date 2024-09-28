import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { LeaderboardModal } from "../../components/LeaderboardModal/LeaderboardModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { useGameContext } from "../../context/GameContext";
import { Superpowers } from "../Superpowers/Superpowers";

const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
const STATUS_PREVIEW = "STATUS_PREVIEW";

const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }
  if (endDate === null) {
    endDate = new Date();
  }
  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/** * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(STATUS_PREVIEW);
  const [gameStartDate, setGameStartDate] = useState(null);
  const [gameEndDate, setGameEndDate] = useState(null);
  const [timer, setTimer] = useState({ seconds: 0, minutes: 0 });
  const { isSimpleMode } = useGameContext();
  const [mistakes, setMistakes] = useState(0);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
    if (status === STATUS_WON && pairsCount === 9) {
      setShowLeaderboardModal(true);
    }
  }

  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
    setMistakes(0);
  }

  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setMistakes(0);
    setShowLeaderboardModal(false);
  }

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleSaveLeaderboard = async (name, achievements) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          name,
          time: timer.minutes * 60 + timer.seconds,
          achievements,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setShowLeaderboardModal(false);
    } catch (error) {
      console.error("Ошибка при сохранении результата:", error);
    }
  };

  /** * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий */
  const openCard = clickedCard => {
    if (clickedCard.open) {
      return;
    }
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }
      return { ...card, open: true };
    });
    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    const openCards = nextCards.filter(card => card.open);
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);
      if (sameCards.length < 2) {
        return true;
      }
      return false;
    });

    const playerMadeMistake = openCardsWithoutPair.length >= 2;
    if (playerMadeMistake) {
      if (isSimpleMode) {
        const newMistakes = mistakes + 1;
        setMistakes(newMistakes);
        if (newMistakes >= 3) {
          finishGame(STATUS_LOST);
        } else {
          setTimeout(() => {
            setCards(prevCards =>
              prevCards.map(card =>
                openCardsWithoutPair.some(openCard => openCard.id === card.id) ? { ...card, open: false } : card,
              ),
            );
          }, 1000);
        }
      } else {
        finishGame(STATUS_LOST);
      }
    }
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  useEffect(() => {
    if (status !== STATUS_PREVIEW) {
      return;
    }
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }
    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });
    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate]);

  const { usedSuperpowers, setUsedSuperpowers } = useGameContext();

  const handleUseSuperpower = superpower => {
    if (usedSuperpowers[superpower] || status !== STATUS_IN_PROGRESS) return;

    setUsedSuperpowers(prev => ({ ...prev, [superpower]: true }));

    if (superpower === "revelation") {
      setGameStartDate(prevStartDate => new Date(prevStartDate.getTime() + 5000));
      const revealedCards = cards.map(card => ({ ...card, open: true }));
      setCards(revealedCards);
      setTimeout(() => {
        setCards(prevCards => prevCards.map(card => ({ ...card, open: false })));
        setGameStartDate(prevStartDate => new Date(prevStartDate.getTime() - 5000));
      }, 5000);
    } else if (superpower === "alohomora") {
      const closedPairs = cards
        .filter(card => !card.open)
        .reduce((acc, card) => {
          const pair = acc.find(p => p[0].suit === card.suit && p[0].rank === card.rank);
          if (pair) {
            pair.push(card);
          } else {
            acc.push([card]);
          }
          return acc;
        }, [])
        .filter(pair => pair.length === 2);

      if (closedPairs.length > 0) {
        const randomPair = closedPairs[Math.floor(Math.random() * closedPairs.length)];
        setCards(prevCards =>
          prevCards.map(card => (randomPair.some(p => p.id === card.id) ? { ...card, open: true } : card)),
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart(2, "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart(2, "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS && (
          <div className={styles.mistakesCounter}>{isSimpleMode ? `Осталось попыток: ${3 - mistakes}` : null}</div>
        )}
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>
      <Superpowers onUseSuperpower={handleUseSuperpower} usedSuperpowers={usedSuperpowers} />
      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
      {isGameEnded && !showLeaderboardModal && (
        <EndGameModal
          isWon={status === STATUS_WON}
          time={timer.minutes * 60 + timer.seconds}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {showLeaderboardModal && (
        <LeaderboardModal
          time={timer.minutes * 60 + timer.seconds}
          onSave={handleSaveLeaderboard}
          onPlayAgain={handlePlayAgain}
          usedSuperpowers={usedSuperpowers}
        />
      )}
    </div>
  );
}
