import {
  writable,
} from 'svelte/store';

let Keyboard = null;

const createKeyboardStore = () => {
  const {
    subscribe,
    update,
  } = writable(Keyboard);

  return {
    subscribe,
    setMode: (mode) => update((currentState) => {
      console.log('setMode:', mode, currentState);

      return mode;
    }),
    // handleKeyboardEvent: (keyboardEvent) => update((currentState) => {
    //   console.log('handleKeyboardEvent', Keyboard, currentState, keyboardEvent);

    //   Keyboard = keyboardEvent;

    //   return Keyboard;
    // }),
  }
}

export const KeyboardStore = createKeyboardStore();