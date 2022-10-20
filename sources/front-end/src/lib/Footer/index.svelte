<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    ModeStore,
  } from '$lib/stores/mode.store';
  import {
    TimeStore,
  } from '$lib/stores/time.store';

  /** @type {any} */
  let currentMode;
  /** @type {null} */
  let currentTime;

  const unsubscribeModeStore = ModeStore.subscribe((currentState) => {
    currentMode = currentState;
  });

  const unsubscribeTimeStore = TimeStore.subscribe((currentState) => {
    if (currentState !== null || typeof currentState !== undefined) {
      currentTime = currentState;
    }
  });

  onMount(() => {
    console.log('mounted Footer');
  });

  onDestroy(() => {
    unsubscribeModeStore();
    unsubscribeTimeStore();

    console.log('unmounted Footer');
  });
</script>

<style>
  footer {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      'mode . . . . . . . . . . time'
    ;
    gap: min(0.5vh, 0.5vw);

    align-items: center;
    justify-content: start;

    height: var(--footer-height);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;

    text-transform: uppercase;
  }
  
  .inverted-colors {
    color: var(--theme-white);
    background-color: var(--theme-glacier);
  }

  .mode {
    grid-area: mode;
  }

  .time {
    grid-area: time;
  }
</style>

<footer>
  <div class='mode inverted-colors'>
    {#if currentMode}
      {currentMode}
    {/if}
  </div>
  <div class='time inverted-colors'>
    {#if currentTime}
      {currentTime}
    {/if}
  </div>
</footer>