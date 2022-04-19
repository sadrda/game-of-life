import { writable } from "svelte/store";

export const playing = writable(false);
export const animationSpeed = writable(1);
export const boardSize = writable(20);
