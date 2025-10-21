import { useState } from "react";

import "./App.css";

const App = () => {
	const [square, setSquare] = useState<string[]>(Array(9).fill(""));
	const [isNext, setIsNext] = useState(true);

	const resetGame = () => {
		setSquare(Array(9).fill(""));
		setIsNext(true);
	};

	const calculateWinner = () => {
		const winPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
		];

		for (let i = 0; i < winPatterns.length; i++) {
			const [a, b, c] = winPatterns[i];
			if (square[a] && square[a] === square[b] && square[a] === square[c]) {
				return square[a];
			}
		}
		return;
	};

	const handleOnClick = (i: number) => {
		// マスが埋まっているか確認
		if (square[i]) {
			return;
		}

		const newSqusre = square.slice();
		newSqusre[i] = isNext ? "X" : "O";
		setSquare(newSqusre);
		setIsNext(!isNext);
	};
	const winner = calculateWinner();
	const isDraw = square.every((square) => square !== "");

	return (
		<>
			<div>
				{winner ? (
					<p>プレイヤー {winner} の勝利！</p>
				) : isDraw ? (
					<p>引き分けです！</p>
				) : (
					<p>次のプレイヤー: {isNext ? "X" : "O"}</p>
				)}
			</div>
			<div className="board">
				{square.map((square, i) => (
					<button
						key={i}
						className="square"
						onClick={() => handleOnClick(i)}
						disabled={Boolean(winner)}
					>
						{square}
					</button>
				))}

				<button onClick={resetGame}>Reset</button>
			</div>
		</>
	);
};

export default App;
