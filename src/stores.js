import { writable } from 'svelte/store';

const algorithm = writable('');
const gridType = writable('simple-random');

export { algorithm, gridType };
