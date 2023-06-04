//Unique value to re-render the question in Quiz component
import { writable } from 'svelte/store';

export const unique = writable(0);