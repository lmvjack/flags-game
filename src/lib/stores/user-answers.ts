import { writable } from 'svelte/store';

export const correctUserAnswers = writable([]);
export const wrongUserAnswers = writable([]);