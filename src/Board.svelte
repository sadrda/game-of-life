<script lang="ts">
  import { animationSpeed, playing, boardSize, aliveCount } from "./store";

  let board = getRandomizedBoard();
  let intervalId = -1;

  function getEmptyBoard(): boolean[][] {
    let board = Array($boardSize);
    for (let i = 0; i < board.length; i++) {
      board[i] = Array($boardSize);
    }
    return board;
  }

  function getRandomizedBoard(): boolean[][] {
    const board = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = Math.random() > 0.5;
      }
    }
    return board;
  }

  function countNeighbouringCells(
    board: boolean[][],
    y: number,
    x: number
  ): number {
    let count = 0;
    if (board[y - 1] && board[y - 1][x - 1]) count++;
    if (board[y - 1] && board[y - 1][x]) count++;
    if (board[y - 1] && board[y - 1][x + 1]) count++;

    if (board[y] && board[y][x - 1]) count++;
    if (board[y] && board[y][x + 1]) count++;

    if (board[y + 1] && board[y + 1][x - 1]) count++;
    if (board[y + 1] && board[y + 1][x]) count++;
    if (board[y + 1] && board[y + 1][x + 1]) count++;

    return count;
  }

  function shouldReproduce(
    cellStatus: boolean,
    neighbouringCells: number
  ): boolean {
    let newCell = false; // dead by default
    if (cellStatus) {
      if (neighbouringCells === 2 || neighbouringCells === 3) newCell = true;
    } else {
      if (neighbouringCells === 3) newCell = true;
    }
    return newCell;
  }

  function getNextGenBoard(board: boolean[][]): boolean[][] {
    const nextBoard = getEmptyBoard();

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const neighbouringCells = countNeighbouringCells(board, y, x);
        nextBoard[y][x] = shouldReproduce(board[y][x], neighbouringCells);
      }
    }
    return nextBoard;
  }

  function countAliveCells(board: boolean[][]): number {
    let count = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell) count++;
      }
    }
    return count;
  }

  boardSize.subscribe(() => (board = getRandomizedBoard()));
  animationSpeed.subscribe(() => {
    clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      if ($playing) {
        board = getNextGenBoard(board);
      }
    }, 1000 / $animationSpeed);
  });
  $: {
    aliveCount.set(countAliveCells(board));
  }
</script>

<div id="board-container">
  {#each board as row, y}
    <div class="row">
      {#each row as cell, x}
        <div
          class="cell {cell ? 'lit' : ''}"
          on:click={() => (board[y][x] = !board[y][x])}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  #board-container {
    width: 96vh;
    height: 96vh;
    background-color: rgb(235, 235, 28);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }

  .row {
    background-color: orange;
    height: 100%;
    display: flex;
  }

  .cell {
    background-color: rgb(4, 37, 37);
    height: 100%;
    width: 100%;
    border: 1px solid grey;
    cursor: pointer;
  }
  .cell.lit {
    background-color: rgb(21, 199, 21);
  }
</style>
