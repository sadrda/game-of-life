import { writable } from "svelte/store";

export const playing = writable(true);
export const animationSpeed = writable(1);
export const boardSize = writable(20);
export const aliveCount = writable(0);
export const boardShouldFill = writable(false);
export const boardShouldClear = writable(false);
