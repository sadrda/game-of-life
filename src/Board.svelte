<script lang="ts">
  const BOARD_SIZE = 20;

  let board = Array(BOARD_SIZE);
  for (let i = 0; i < board.length; i++) {
    board[i] = Array(BOARD_SIZE);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = Math.random() > 0.5;
    }
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
  }
  .cell.lit {
    background-color: rgb(21, 199, 21);
  }
</style>
