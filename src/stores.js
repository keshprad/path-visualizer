import { writable } from 'svelte/store';

const algorithm = writable('');
const gridType = writable('recursive-division-maze');

export { algorithm, gridType };
