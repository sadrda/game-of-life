<script lang="ts">
  import Board from "./Board.svelte";
  import Controls from "./Controls.svelte";
</script>

<main>
  <Board />
  <Controls />
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 2vh;
    background-color: rgb(45, 29, 45);
  }

  main {
    display: flex;
    gap: 1em;
  }
</style>
