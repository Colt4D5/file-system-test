<script>
  export let data;
  import { windows } from '$stores/windows.js';
  import { openFile, getIcon } from '$utils/fileExplorer.js';
  import Window from '$lib/components/Window.svelte';

  let openWindows;

  windows.subscribe(window => {
    openWindows = window;
  })

  const closeWindow = (id) => {
    $windows = $windows.filter(w => w.id != id);
  }
</script>

<!-- <h1>Welcome to SvelteKits</h1> -->
<!-- <p>{ data.homePath }</p> -->

{#if data.files }
  <div id="file-grid">
    {#each data?.files as file }
      {#if file !== '.DS_Store' }
        <div on:dblclick={openFile} data-is-on-desktop="true" class="file" data-directory={`${data.homePath}/${file}`}>
          <img src={getIcon(file)} alt={`${file} folder`} />
          <h2>{ file }</h2>
        </div>
      {/if}
    {/each}
  </div>
{/if}

{#each openWindows as window (window.id) }
  <Window on:close={() => closeWindow(window.id)} { window } {openWindows} />
{/each}

<style>
  #file-grid {
    display: flex;
    flex-direction: column;
    align-content: baseline;
    justify-content: flex-start;
    max-height: calc(100vh - 100px);
  }
  .file {
    width: 100px;
    text-align: center;
  }
  .file img {
    width: 65px;
  }
  .file h2 {
    font-size: 1rem;
    font-weight: normal;
  }
</style>