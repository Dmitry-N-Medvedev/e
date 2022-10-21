import {
  interpret,
} from 'xstate';
import {
  KeyboardMachine,
} from './KeyboardMachine.js';

export const KeyboardService = (cfg, ctx) => interpret(
  KeyboardMachine
    .withContext(ctx)
    .withConfig(cfg)
  );
