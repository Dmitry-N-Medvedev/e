<script>
  import {
    browser as isBrowser,
  } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import Header from '$lib/Header/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  import {
    ModeStore,
  } from '$lib/stores/mode.store';
  import {
    KeyboardService,
  } from '$lib/fsm/keyboard/KeyboardService';
	
  const unsubscribeModeStore = ModeStore.subscribe((currentState) => {
    console.log('ModeStore:', currentState);
  });

  // @ts-ignore
  const handleKeyboardEvent = (keyboardEvent) => {
    if (isBrowser === true) {
      requestAnimationFrame(() => {
        KeyboardService.send({
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
      });
    }
  }

  let keyboardStore;

  onMount(() => {
    if (isBrowser === true) {
      KeyboardService.onChange((ctx, evt) => {
        console.log('+layout.onChange:', ctx, evt);

        ModeStore.updateMode(ctx.mode);
      });

      KeyboardService.start();

      // ModeStore.updateMode('normal');
    }
  });

  onDestroy(() => {
    if (isBrowser === true) {
      KeyboardService.stop();
    }

    unsubscribeModeStore();
  });
</script>

<svelte:window
  on:keyup|capture|nonpassive|trusted|stopPropagation={handleKeyboardEvent}
/>
<Header />
<main>
  <slot />
</main>
<Footer />
