<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import Header from '$lib/Header/index.svelte';
  import Footer from '$lib/Footer/index.svelte';
  import {
    ModeStore,
  } from '$lib/stores/mode.store';

  onMount(() => {
    ModeStore.updateMode('normal')
  });
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
