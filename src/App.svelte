<script lang="ts">
  import Board from "./Board.svelte";
</script>

<main>
  <Board />
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 2vh;
    background-color: rgb(45, 29, 45);
  }
</style>
