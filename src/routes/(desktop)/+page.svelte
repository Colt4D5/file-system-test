<script>
  import { page } from '$app/stores';
  // console.log($page);
  export let data;
  const folderIcon = '/images/folder.svg';

  const openFile = async (e) => {
    const directory = e.target.closest('.file').dataset.directory;
    const res = await fetch('/api/open-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ directory })
    });
    const files = await res.json();
    console.log(files);
  }
</script>


<h1>Welcome to SvelteKits</h1>
<p>{ data.homePath }</p>

{#if data.files }
  <div id="file-grid">
    {#each data.files as file }
      <div on:dblclick={openFile} class="file" data-directory={`${data.homePath}/${file}`}>
        <img src={folderIcon} alt={`${file} folder`} />
        <h2>{ file }</h2>
      </div>
    {/each}
  </div>
{/if}

<style>
  #file-grid {
    display: flex;
    flex-direction: column;
    align-content: baseline;
    justify-content: flex-start;
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