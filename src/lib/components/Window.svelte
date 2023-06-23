<script context="module">
  let lastXPos = 300;
  let lastYPos = 200;
  let highestZIndex = 1;
</script>

<script>
  import { openFile, getIcon } from '$utils/fileExplorer.js';
  import { onMount } from 'svelte';
	import { windows } from '$stores/windows.js';
  export let openWindows;
  export let osWindow;
	export let left = lastXPos + 20;
	export let top = lastYPos + 20;
  export let width = 620;
  export let height = 480;
  import { createEventDispatcher } from 'svelte';
  import CloseIcon from '$lib/svgs/close.svg?raw';
  import MaximizeIcon from '$lib/svgs/maximize.svg?raw';
  import MinimizeIcon from '$lib/svgs/minimize.svg?raw';

  let previousTop = top;
  let previousLeft = left;
  let previousWidth = width;
  let previousHeight = height;

  let zIndex = ++highestZIndex;
  lastXPos = left;
  lastYPos = top;

  let isFullScreen = false;

  let windowContent;

  onMount(async () => {
    if (osWindow.type === 'txt') {
      await import(`${osWindow.directory}.svelte`)
        .then(res => windowContent = res.default)
    } else {

    }
  });

  windows.subscribe(window => {
    openWindows = window;
  })

	const dispatch = createEventDispatcher();

	function closeWindow() {
		dispatch('close', {
			id: osWindow.id
		});
	}

  function minimizeWindow() {
    console.log("Doesn't do anything yet.");
  }
	
	let moving = false;
	
	function onMouseDown(e) {
    if (e.target.closest('.content, #close-btn')) return;
    zIndex = ++highestZIndex;
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}

  function onResize() {
    
  }
</script>

<section data-id={osWindow.id} class:isFullScreen on:mousedown={onMouseDown} style="left: {isFullScreen ? 0 : left}px; top: {isFullScreen ? 0 : top}px; width: {isFullScreen ? window.innerWidth : width}px; height: {isFullScreen ? window.innerHeight : height}px; z-index: {zIndex}" class="os-window draggable">
  <div class="outer">
    <h2 class="window-title">{ osWindow?.title }</h2>
    <div class="controls">
      <button class="btn close-btn" on:click={closeWindow} >
        {@html CloseIcon}
      </button>
      <button class="btn maximize-btn" on:click={() => isFullScreen = !isFullScreen} >
        {@html MaximizeIcon}
      </button>
      <button class="btn minimize-btn" on:click={minimizeWindow} >
        {@html MinimizeIcon}
      </button>
    </div>
  </div>
  <div class="content" contenteditable="{osWindow.type === 'txt' ? true : false }" >
    <slot></slot>
    {#if osWindow.type === 'txt'}
      <svelte:component this={windowContent} />
    {:else}
      <div id="file-grid">
        {#key osWindow.id}
          {#if osWindow?.files }
            {#each osWindow?.files as file }
              {#if file !== '.DS_Store' }
                <div on:dblclick={openFile} data-is-on-desktop="false" class="file" data-directory={`${osWindow.directory}/${file}`}>
                  <img src={getIcon(file)} alt={`${file} folder`} />
                  <h2>{ file }</h2>
                </div>
              {/if}
            {/each}
          {/if}
        {/key}
      </div>
    {/if}
  </div>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:resize={onResize} />
  
  <style>
    .draggable {
      user-select: none;
      cursor: move;
      border: solid 1px gray;
      position: absolute;
    }
    .os-window {
      position: absolute;
      border: 2px solid #888;
      border-radius: 0.5rem;
      padding: 0.25rem;
      background-color: #ddd;
      overflow: hidden;
      &.isFullScreen {
        width: 100vh;
        height: 100vh;
        top: 0;
        left: 0;
      }
    }
    :global(.os-window h2.window-title) {
      text-align: center;
      margin: 0.25rem 0;
    }
    :global(.os-window .content) {
      /* width: 640px; */
      /* height: 420px; */
      width: calc(100% - 10px);
      height: calc(100% - 46px);
      border: 1px solid #aaa;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: #fff;
      cursor: initial;
      user-select: all;
      overflow: scroll;
    }
    .outer .controls {
      position: absolute;
      top: 4px;
      left: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.25rem;
    }
    .controls .btn {
      width: 36px;
      aspect-ratio: 1 / 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    #file-grid {
      display: flex;
      flex-direction: row;
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