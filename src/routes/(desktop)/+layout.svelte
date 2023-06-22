<script>
  import Dock from '../../lib/components/Dock.svelte';
import '/src/app.postcss';
  import { onMount } from "svelte";

  const trackMouseMovement = e => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
  }

  onMount(() => {
    window.addEventListener('mousemove', trackMouseMovement)
    // return window.removeEventListener('mousemove', trackMouseMovement)
  });
</script>

<div id="desktop">
  <slot/>
  <Dock />
</div>

<style lang="postcss">
  #desktop {
    height: 100vh;
    background-image: url('images/pika.webp');
    background-size: cover;
    background-position: center;
  }
</style>