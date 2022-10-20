import {
  interpret,
} from 'xstate';
import {
  KeyboardMachine,
} from './KeyboardMachine.js';
import {
  KeyboardModes,
} from './KeyboardModes.js';

const KEYBOARD_INITIAL_CONTEXT = {
  mode: null,
  lastKey: null,
};
const KEYBOARD_CONFIG = {
  actions: {
    debuglog: (context, event) => {
      console.log('actions.log:', context, event);
    },
  },
  delays: {},
  guards: {
    isNormalMode: (ctx) => {
      console.log(`isNormalMode: ${ctx.mode === KeyboardModes.NORMAL}`);

      return ctx.mode === KeyboardModes.NORMAL;
    },
    shouldTransitionToEditMode: (ctx, evt) => {
      const result = ctx?.lastKey?.key === 'i';

      console.log('shouldTransitionToEditMode', result, evt);

      return result;
    },
    shouldTransitionToNormalMode: (ctx, evt) => {
      const result = ctx?.lastKey?.code.toLowerCase() === 'escape';

      console.log('shouldTransitionToNormalMode', result, evt);

      return result;
    },
  },
  services: {},
};

export const KeyboardService = interpret(
  KeyboardMachine
    .withContext(KEYBOARD_INITIAL_CONTEXT)
    .withConfig(KEYBOARD_CONFIG)
  )
  // .onTransition((state) => {
  //   console.log('onTransition:', state);
  // })
  .onChange((newCtx, prevCtx) => {
    console.log(`onChange: ${JSON.stringify(prevCtx)} => ${JSON.stringify(newCtx)}`);
  })
  // .onEvent((evt) => {
  //   console.log(`onEvent: ${JSON.stringify(evt)}`);
  // })
  // .onSend((evt) => {
  //   console.log(`onSend: ${JSON.stringify(evt)}`);
  // })
  .onStop(() => {
    console.log('onStop');
  })
  .onDone((evt) => {
    console.log(`onDone: ${JSON.stringify(evt)}`);
  });
