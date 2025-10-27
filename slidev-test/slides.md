---
theme: default
background: "#1e1e1e"
colorSchema: dark
title: React ３目ならべアプリケーション
highlighter: shiki
lineNumbers: false
info: |
  React + TypeScript + Viteで作成した３目ならべゲーム
drawings:
  persist: true
fonts:
  sans: Inter, system-ui
  serif: Georgia
  mono: Fira Code
---

# ３目ならべアプリケーション

React + TypeScript + Vite で作成

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    プロジェクト概要 → <carbon:arrow-right class="inline"/>
  </span>
</div>

---

layout: center
class: text-center

---

# プロジェクト概要

<div v-click>

## 技術スタック

- **React 19.1.1** - UI ライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール

</div>

<div v-click>

## 主な機能

- 3×3 グリッドのボード
- X と O のプレイヤー交代
- 勝利判定ロジック
- 引き分け検知
- リセット機能

</div>

---

layout: default

---

# コンポーネント構造

```typescript
const App = () => {
	// State管理
	const [square, setSquare] = useState<string[]>(Array(9).fill(""));
	const [isNext, setIsNext] = useState(true);

	// 各処理関数
	const handleOnClick = (i: number) => { ... }
	const calculateWinner = () => { ... }
	const resetGame = () => { ... }

	// UIの描画
	return (
		<div className="board">
			{/* 3×3のマス */}
		</div>
	)
}
```

<div v-click>

<div class="mt-3 p-3 bg-gray-800 rounded text-xs">

**設計のポイント**

シンプルな単一コンポーネント設計
useState で状態管理
関数型コンポーネント（アロー関数）

</div>

</div>

---

layout: two-cols

---

# State 管理の仕組み

<div>

## 2 つの State

```typescript
const [square, setSquare] = useState<string[]>(Array(9).fill(""));
const [isNext, setIsNext] = useState(true);
```

</div>

<div v-click>

<div class="mt-4">

**`square`** - 9 つのマスの状態を配列で管理

- `['', '', '', '', '', '', '', '', '']`
- `['X', 'O', '', 'X', 'O', '', '', '', '']`

**`isNext`** - 次のプレイヤー

- `true` → X のターン
- `false` → O のターン

</div>

</div>

---

layout: two-cols

---

# マスクリック処理

<div>

```typescript
const handleOnClick = (i: number) => {
	// マスが埋まっているか確認
	if (square[i]) return;

	// 新しい配列を作成
	const newSqusre = square.slice();

	// 現在のプレイヤーのマークを設定
	newSqusre[i] = isNext ? "X" : "O";

	// stateを更新
	setSquare(newSqusre);
	setIsNext(!isNext);
};
```

</div>

<div v-click>

<div class="mt-4 p-3 bg-gray-800 rounded text-sm">

**処理の流れ**

1. マスが空かチェック
2. 配列のコピーを作成
3. クリックした位置に X/O を設定
4. state を更新
5. プレイヤー交代

</div>

</div>

---

layout: default

---

# 勝利判定ロジック

```typescript
const calculateWinner = () => {
	// 勝利パターン（8通り）
	const winPatterns = [
		[0, 1, 2], // 上段
		[3, 4, 5], // 中段
		[6, 7, 8], // 下段
		[0, 3, 6], // 左列
		[1, 4, 7], // 中列
		[2, 5, 8], // 右列
		[0, 4, 8], // 斜め（左上→右下）
		[2, 4, 6], // 斜め（右上→左下）
	];

	// 各パターンをチェック
	for (let i = 0; i < winPatterns.length; i++) {
		const [a, b, c] = winPatterns[i];
		if (square[a] && square[a] === square[b] && square[a] === square[c]) {
			return square[a]; // 勝利者を返す
		}
	}
	return null;
};
```

<div v-click>

<div class="mt-3 p-3 bg-green-900 rounded text-sm">
3つのマスが同じ文字（XまたはO）で揃ったら勝利
</div>

</div>

---

layout: default

---

# UI の描画

```typescript
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
```

<div v-click>

<div class="mt-3 p-3 bg-blue-900 rounded text-sm">
`map()` で9つのマスを生成し、それぞれにクリック処理を付与
</div>

</div>

---

layout: default

---

# CSS Grid で 3×3 レイアウト

<div>

```css
.board {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 5px;
	background-color: #333;
	padding: 5px;
	border-radius: 10px;
}

.square {
	width: 80px;
	height: 80px;
	font-size: 24px;
	font-weight: bold;
	border: none;
	background-color: #fff;
	cursor: pointer;
}
```

</div>

<div v-click>

<div class="grid grid-cols-3 gap-2">
  <button class="bg-white text-gray-900 p-4 rounded">1</button>
  <button class="bg-white text-gray-900 p-4 rounded">2</button>
  <button class="bg-white text-gray-900 p-4 rounded">3</button>
  <button class="bg-white text-gray-900 p-4 rounded">4</button>
  <button class="bg-white text-gray-900 p-4 rounded">5</button>
  <button class="bg-white text-gray-900 p-4 rounded">6</button>
  <button class="bg-white text-gray-900 p-4 rounded">7</button>
  <button class="bg-white text-gray-900 p-4 rounded">8</button>
  <button class="bg-white text-gray-900 p-4 rounded">9</button>
</div>

</div>

</div>

---

layout: center
class: text-center

---

# リセット機能

```typescript
const resetGame = () => {
	setSquare(Array(9).fill(""));
	setIsNext(true);
};
```

<div v-click>

<div class="mt-8">

## 機能説明

- すべてのマスを空文字にリセット
- プレイヤーを X に戻す
- いつでも新しいゲームを開始可能

</div>

</div>

<div v-click>

<div class="mt-4 p-3 bg-purple-900 rounded text-sm">

**実装のポイント**

簡単な関数で完全な状態リセット
ユーザー体験を向上させる重要な機能

</div>

</div>

---

layout: default

---

# 引き分け検知

```typescript
const isDraw = square.every((square) => square !== "");
```

<div v-click>

<div class="mt-4 p-3 bg-yellow-900 rounded text-sm">

**判定ロジック**

`every()` メソッドで全マスが空でないかチェック
かつ、勝利者がいない場合に引き分け
9 マス全て埋まり、かつ 3 つ揃いがない = 引き分け

</div>

</div>

<div v-click>

<div class="mt-4">

## ゲーム状態の表示条件

```typescript
{
	winner ? (
		<p>プレイヤー {winner} の勝利！</p>
	) : isDraw ? (
		<p>引き分けです！</p>
	) : (
		<p>次のプレイヤー: {isNext ? "X" : "O"}</p>
	);
}
```

</div>

</div>

---

layout: two-cols

---

# コードの流れ

<div>

## 1. 初期状態

```typescript
// 9つの空のマス
const [square, setSquare] = useState<string[]>(Array(9).fill(""));
```

</div>

<div>

## 2. マスクリック

```typescript
const handleOnClick = (i: number) => {
	// XまたはOを設定
	newSqusre[i] = isNext ? "X" : "O";
};
```

</div>

<div>

## 3. 勝利判定

```typescript
const winner = calculateWinner();
```

</div>

<div>

## 4. UI 更新

```typescript
{
	square.map((square, i) => (
		<button onClick={() => handleOnClick(i)}>{square}</button>
	));
}
```

</div>

---

layout: center
class: text-center

---

# 実装のポイント

<div v-click>

## 1. 状態管理

useState でシンプルに状態を管理

</div>

<div v-click>

## 2. 配列の不変性

`slice()`で配列のコピーを作成してから更新

</div>

<div v-click>

## 3. 条件付きレンダリング

勝利・引き分け・進行中の状態を分岐表示

</div>

<div v-click>

## 4. クリック処理

ボタンを無効化して再クリックを防ぐ

</div>

---

layout: end
class: text-center

---

# まとめ

<div class="mt-8">

## このアプリケーションで学べること

- React Hooks（useState）の使い方
- 配列操作と関数型プログラミング
- 条件付きレンダリング
- イベントハンドリング
- CSS Grid を使ったレイアウト

</div>

<div class="mt-8 text-xl">

**シンプルな構造で実用的なゲームアプリを実装**

</div>

<div class="pt-12">
  <span class="text-6xl">🎮</span>
</div>
