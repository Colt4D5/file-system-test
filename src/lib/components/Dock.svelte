<script>
  import AppsIcon from '$lib/svgs/apps.svg?raw';
</script>

<div id="dock">
  <button id="dock-btn">{@html AppsIcon}</button>
</div>

<style lang="postcss">
  #dock {
    position: fixed;
    top: auto;
    left: 0;
    bottom: 0;
    right: auto;
    width: 100%;
    padding: 0;
    background-color: #ffffff88;
    z-index: 2;
    & #dock-btn {
      background-color: #ffffff22;
      padding: 0.25rem 0.5rem;
      display: flex; 
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #00000011;
        /* border: 2px solid #00000066; */
      }
    }
  }
</style>
