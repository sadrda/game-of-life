<script lang="ts">
  import { BladeApi, Pane } from "tweakpane";
  import type { BladeController, View } from "@tweakpane/core";

  import Board from "./Board.svelte";
  import { playing, animationSpeed, boardSize, aliveCount } from "./store";

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
