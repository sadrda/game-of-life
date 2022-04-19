<script lang="ts">
  import { playing, animationSpeed, boardSize } from "./store";
</script>

<div id="controls-container">
  <button on:click={() => ($playing = !$playing)}
    >{$playing ? "stop" : "play"}</button
  >
  <div>
    <label for="animation-speed">Animation Speed: {$animationSpeed}</label>
    <input
      id="animation-speed"
      type="range"
      min="1"
      max="10"
      bind:value={$animationSpeed}
    />
  </div>
  <div>
    <label for="board-size">Board Size: {$boardSize}</label>
    <input
      id="board-size"
      type="range"
      min="2"
      max="100"
      bind:value={$boardSize}
    />
  </div>
</div>

<style>
  #controls-container {
    border: 1px solid orangered;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
    padding: 1em;
  }
</style>
