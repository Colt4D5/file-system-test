<script>
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

<slot/>