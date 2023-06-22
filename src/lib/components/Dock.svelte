<script>
  // import settingsIcon from 'images/settings.svg';
</script>

<div id="dock">
  <button id="dock-btn"><img src="images/settings.svg" alt="Settings button" /></button>
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
      padding: 0 1rem;
      cursor: pointer;
      &:hover {
        background-color: #00000011;
        /* border: 2px solid #00000066; */
      }
    }
  }
</style>
