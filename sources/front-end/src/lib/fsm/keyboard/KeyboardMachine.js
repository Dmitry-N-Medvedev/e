// import {
//   browser as isBrowser,
// } from '$app/environment';
import {
  createMachine,
  assign,
} from 'xstate';
import {
  KeyboardModes,
} from './KeyboardModes.js';

// const DEFAULT_MODE = KeyboardModes.NORMAL;
// const KEYBOARD_EVENT = isBrowser === true ? window.KeyboardEvent.constructor.name : '';

export const KeyboardMachine = createMachine({
  id: 'KeyBoardMachine',
  predictableActionArguments: true,
  // preserveActionOrder: true,
  initial: KeyboardModes.NORMAL,
  context: {},
  states: {
    [KeyboardModes.NORMAL]: {
      entry: [
        assign({
          mode: () => KeyboardModes.NORMAL,
        }),
      ],
      on: {
        'KeyboardEvent': {
          actions: [
            assign({
              lastKey: (ctx, evt) => {
                return evt.payload;
              },
            }),
          ],
        },
      },
      always: [
        {
          target: KeyboardModes.EDIT,
          cond: 'shouldTransitionToEditMode',
        }
      ],
      exit: ['debuglog'],
    },
    [KeyboardModes.EDIT]: {
      entry: [
        assign({
          mode: () => KeyboardModes.EDIT,
        }),
      ],
      on: {
        'KeyboardEvent': {
          actions: [
            assign({
              lastKey: (ctx, evt) => {
                return evt.payload;
              },
            }),
          ],
        },
      },
      always: [
        {
          target: KeyboardModes.NORMAL,
          cond: 'shouldTransitionToNormalMode',
        }
      ],
      exit: ['debuglog'],
    },
  },
}, {});
