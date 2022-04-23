<script lang="ts">
  import { BladeApi, Pane } from "tweakpane";
  import type { BladeController, View } from "@tweakpane/core";

  import Board from "./Board.svelte";
  import {
    playing,
    animationSpeed,
    boardSize,
    aliveCount,
    boardShouldClear,
    boardShouldFill,
  } from "./store";

  let aliveCountMonitor: BladeApi<BladeController<View>>;

  const PARAMS = {
    playing: $playing,
    animationSpeed: $animationSpeed,
    boardSize: $boardSize,
    aliveCount: $aliveCount,
  };

  const pane = new Pane({ title: "Parameters" });

  const playingInput = pane.addInput(PARAMS, "playing");
  const animationSpeedInput = pane.addInput(PARAMS, "animationSpeed", {
    min: 0.1,
    max: 10,
  });
  const boardSizeInput = pane.addInput(PARAMS, "boardSize", {
    min: 2,
    max: 100,
    step: 1,
  });

  const fillAllButton = pane.addButton({
    title: "Fill All",
  });
  fillAllButton.on("click", () => ($boardShouldFill = true));

  const clearAllButton = pane.addButton({
    title: "Clear All",
  });
  clearAllButton.on("click", () => ($boardShouldClear = true));

  playingInput.on("change", (ev) => playing.set(ev.value));
  animationSpeedInput.on("change", (ev) => animationSpeed.set(ev.value));
  boardSizeInput.on("change", (ev) => boardSize.set(ev.value));

  aliveCount.subscribe(() => {
    PARAMS.aliveCount = $aliveCount;
  });
  boardSize.subscribe(() => {
    if (aliveCountMonitor) pane.remove(aliveCountMonitor);

    aliveCountMonitor = pane.addMonitor(PARAMS, "aliveCount", {
      view: "graph",
      interval: 200,
      min: 0,
      max: $boardSize * $boardSize,
    });
  });
</script>

<main>
  <Board />
  <ol id="rules">
    <li>
      Any live cell with fewer than two live neighbours dies, as if by
      underpopulation.
    </li>
    <li>
      Any live cell with two or three live neighbours lives on to the next
      generation.
    </li>
    <li>
      Any live cell with more than three live neighbours dies, as if by
      overpopulation.
    </li>
    <li>
      Any dead cell with exactly three live neighbours becomes a live cell, as
      if by reproduction.
    </li>
  </ol>
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

  #rules {
    color: bisque;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    width: 400px;
  }

  #rules > li {
    font-size: 14px;
    margin-top: 10px;
  }
</style>
