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
    KeyboardClass,
  } from '$lib/fsm/keyboard/KeyboardClass';

  /**
	 * @type {KeyboardClass | undefined}
	 */
  let keyboard;
  let keyboardStore;

  onMount(() => {
    if (isBrowser === true) {
      keyboard = new KeyboardClass();
      keyboard?.start();
    }
  });

  onDestroy(() => {
    if (isBrowser === true) {
      keyboard?.stop();
      keyboard = undefined;
    }
  });
</script>

<svelte:window
  on:keyup|capture|nonpassive|trusted|stopPropagation={keyboard?.handleKeyboardEvent}
/>
<Header />
<main>
  <slot />
</main>
<Footer />
