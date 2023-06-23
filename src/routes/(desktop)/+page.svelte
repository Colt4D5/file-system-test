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
  <Window on:close={() => closeWindow(window.id)} osWindow={ window } {openWindows} />
{/each}

<style lang="postcss">
  #file-grid {
    padding: 1rem;
    display: flex;
    /* grid-template-rows: auto; */
    flex-direction: column;
    align-content: baseline;
    justify-content: flex-start;
    max-height: calc(100vh - 100px);
    & .file {
      width: 100px;
      text-align: center;
      & img {
        width: 65px;
      }
      & h2 {
        font-size: 0.85rem;
        line-height: 1.1;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }
</style>