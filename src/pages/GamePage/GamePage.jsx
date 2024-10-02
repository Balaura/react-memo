import { useParams, useSearchParams } from "react-router-dom";
import { Cards } from "../../components/Cards/Cards";
import { useGameContext } from "../../context/GameContext";
import { useEffect } from "react";

export function GamePage() {
  const { pairsCount } = useParams();
  const [searchParams] = useSearchParams();
  const { setIsSimpleMode } = useGameContext();

  useEffect(() => {
    const isSimple = searchParams.get("simple") === "true";
    setIsSimpleMode(isSimple);
  }, [searchParams, setIsSimpleMode]);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5}></Cards>
    </>
  );
}
