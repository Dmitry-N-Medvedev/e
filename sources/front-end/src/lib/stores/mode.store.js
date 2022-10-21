import {
  writable,
} from 'svelte/store';
import {
  KeyboardModes,
} from '$lib/fsm/keyboard/KeyboardModes';

const MODES = [];
const createModeStore = () => {
  for (const keyboardMode of Object.values(KeyboardModes)) {
    MODES.push(keyboardMode);
  }

  const {
    subscribe,
    update,
  } = writable(undefined);

  return {
    subscribe,
    updateMode: (newMode) => update((currentState) => {
      if (MODES.includes(newMode) === false) {
        throw new ReferenceError(`unknown mode: ${newMode}`);
      }

      return (newMode !== currentState) ? newMode : currentState;
    }),
  }
}

export const ModeStore = createModeStore();