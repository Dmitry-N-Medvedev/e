import {
  ModeStore,
} from '$lib/stores/mode.store';
import {
  KeyboardService,
} from '$lib/fsm/keyboard/KeyboardService';

export class KeyboardClass extends EventTarget {
  #unsubscribeModeStore = () => {};
  #currentMode = null;
  #keyboardServiceConfig = null;
  #keyboardServiceContext = null;
  #keyboardService = null;

  constructor() {
    super();

    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);

    this.#keyboardServiceContext = {
      mode: null,
      lastKey: null,
    };

    this.#keyboardServiceConfig = {
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

          if (result === true) {
            console.log('transition to edit mode');
          }

          return result;
        },
        shouldTransitionToNormalMode: (ctx, evt) => {
          const result = ctx?.lastKey?.code.toLowerCase() === 'escape';

          if (result === true) {
            console.log('transition to normal mode');
          }

          return result;
        },
      },
      services: {},
    };
  }

  #handleModeStoreStateChange(currentState) {
    if (!currentState) {
      return;
    }

    console.log('handleModeStoreStateChange:', currentState);
  }

  handleKeyboardEvent(keyboardEvent) {
    this.#keyboardService.send({
      type: keyboardEvent.constructor.name,
      payload: Object.freeze({
        isTrusted: keyboardEvent.isTrusted,
        altKey: keyboardEvent.altKey,
        bubbles: keyboardEvent.bubbles,
        charCode: keyboardEvent.charCode,
        code: keyboardEvent.code,
        ctrlKey: keyboardEvent.ctrlKey,
        detail: keyboardEvent.detail,
        key: keyboardEvent.key,
        keyCode: keyboardEvent.keyCode,
        metaKey: keyboardEvent.metaKey,
        repeat: keyboardEvent.repeat,
        shiftKey: keyboardEvent.shiftKey,
        timeStamp: keyboardEvent.timeStamp,
        type: keyboardEvent.type,
        which: keyboardEvent.which,
      }),
    });
  }

  #handleKeyboardServiceCtxChanged(newCtx, prevCtx) {
    ModeStore.updateMode(newCtx?.mode);

    // this.#keyboardServiceContext = newCtx;
  }

  start() {
    this.#unsubscribeModeStore = ModeStore.subscribe(this.#handleModeStoreStateChange);

    this.#keyboardService = KeyboardService(this.#keyboardServiceConfig, this.#keyboardServiceContext);
    this.#keyboardService
      .onChange(this.#handleKeyboardServiceCtxChanged.bind(this));

    this.#keyboardService.start();
  }

  stop() {
    this.#keyboardService.stop();
    this.#unsubscribeModeStore();
  }
}
