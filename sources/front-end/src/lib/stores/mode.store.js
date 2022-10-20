import {
  writable,
} from 'svelte/store';

const Modes = Object.freeze(new Map([
  ['normal', {
    title: 'normal',
  }],
  ['edit', {
    title: 'edit',
  }],
]));

let currentMode = undefined;

const createModeStore = () => {
  const {
    subscribe,
    update,
  } = writable(currentMode);

  return {
    subscribe,
    updateMode: (newMode) => update((currentState) => {
      console.log(`ModeStore.updateMode: ${currentState} => ${newMode}`);

      if (Modes.has(newMode) === false) {
        throw new ReferenceError(`unknown mode: ${newMode}`);
      }

      return newMode;
    }),
  }
}

export const ModeStore = createModeStore();