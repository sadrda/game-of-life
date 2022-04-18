<script lang="ts">
  import { playing } from "./store";
</script>

<div id="controls-container">
  <button on:click={() => ($playing = !$playing)}
    >{$playing ? "stop" : "play"}</button
  >
</div>

<style>
  #controls-container {
    border: 1px solid orangered;
  }
</style>
