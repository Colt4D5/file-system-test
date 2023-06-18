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
  export let window;
	export let left = lastXPos + 20;
	export let top = lastYPos + 20;
  export let width = 620;
  export let height = 480;
  import { createEventDispatcher } from 'svelte';

  let zIndex = ++highestZIndex;
  lastXPos = left;
  lastYPos = top;

  let windowContent;

  onMount(async () => {
    console.log(window);
    if (window.type === 'txt') {
      console.log(windowContent);
      await import(`${window.directory}.svelte`)
        .then(res => windowContent = res.default)
      console.log(windowContent);
    } else {

    }
  });

  windows.subscribe(window => {
    openWindows = window;
  })

	const dispatch = createEventDispatcher();

	function closeWindow() {
		dispatch('close', {
			id: window.id
		});
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
</script>

<section data-id={window.id} on:mousedown={onMouseDown} style="left: {left}px; top: {top}px; width: {width}px; height: {height}px; z-index: {zIndex}" class="os-window draggable">
  <div class="outer">
    <h2 class="window-title">{ window.title }</h2>
    <svg on:click={closeWindow} height="36px" width="36px" version="1.1" id="close-btn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 512.001 512.001" xml:space="preserve">
    <path style="fill:#FF6465;" d="M457.127,9.187H54.873c-25.231,0-45.686,20.455-45.686,45.686v402.254
      c0,25.233,20.455,45.686,45.686,45.686h402.254c25.231,0,45.686-20.455,45.686-45.686V54.874
      C502.814,29.641,482.359,9.187,457.127,9.187z"/>
    <polygon style="fill:#FFFFFF;" points="367.788,195.507 316.493,144.213 256.001,204.706 195.507,144.213 144.212,195.507 
      204.705,256.001 144.212,316.494 195.507,367.789 256.001,307.296 316.493,367.789 367.788,316.494 307.295,256.001 "/>
    <path style="opacity:0.1;enable-background:new    ;" d="M70.427,457.127V54.874c0-25.231,20.455-45.686,45.686-45.686H54.872
      c-25.231,0-45.686,20.455-45.686,45.686v402.254c0,25.231,20.455,45.686,45.686,45.686h61.241
      C90.882,502.814,70.427,482.36,70.427,457.127z"/>
    <path d="M54.872,512.001h55.403c5.073,0,9.186-4.113,9.186-9.186c0-5.073-4.113-9.186-9.186-9.186H54.872
      c-20.126,0-36.5-16.373-36.5-36.5V54.874c0-20.126,16.373-36.501,36.5-36.501h308.929c5.074,0,9.186-4.113,9.186-9.186
      s-4.112-9.186-9.186-9.186H54.872C24.615,0.001,0,24.616,0,54.874v402.254C0,487.384,24.615,512.001,54.872,512.001z"/>
    <path d="M400.546,18.373h56.581c20.128,0,36.501,16.375,36.501,36.5v402.254c0,20.126-16.373,36.5-36.501,36.5H147.021
      c-5.073,0-9.186,4.113-9.186,9.186s4.113,9.186,9.186,9.186h310.107c30.257,0,54.873-24.615,54.873-54.872V54.874
      c0-30.257-24.617-54.872-54.873-54.872h-56.581c-5.074,0-9.186,4.113-9.186,9.186S395.471,18.373,400.546,18.373z"/>
    <path d="M309.997,137.717l-53.998,53.996l-53.998-53.996c-3.588-3.588-9.404-3.588-12.99,0l-51.294,51.294
      c-3.588,3.588-3.588,9.404,0,12.99L191.714,256l-53.998,53.998c-3.588,3.588-3.588,9.403,0,12.99l51.294,51.294
      c1.722,1.723,4.059,2.691,6.495,2.691c2.436,0,4.773-0.968,6.495-2.691l53.998-53.998l53.998,53.998
      c1.722,1.723,4.059,2.691,6.495,2.691s4.773-0.968,6.495-2.691l51.296-51.294c3.587-3.587,3.587-9.404,0-12.99L320.286,256
      l53.998-53.998c3.587-3.588,3.587-9.404,0-12.99l-51.296-51.294C319.401,134.13,313.585,134.13,309.997,137.717z M300.799,249.505
      c-1.723,1.723-2.691,4.059-2.691,6.495s0.968,4.772,2.691,6.495l53.998,53.996l-38.304,38.304l-53.998-53.998
      c-1.793-1.794-4.145-2.691-6.495-2.691c-2.35,0-4.702,0.897-6.495,2.691l-53.998,53.998l-38.304-38.304l53.998-53.996
      c1.723-1.723,2.691-4.059,2.691-6.495s-0.968-4.772-2.691-6.495l-53.998-53.998l38.304-38.304l53.998,53.998
      c3.588,3.588,9.404,3.588,12.99,0l53.998-53.998l38.304,38.304L300.799,249.505z"/>
    </svg>
  </div>
  <div class="content">
    <slot></slot>
    {#if window.type === 'txt'}
      <svelte:component this={windowContent} />
    {:else}
      <div id="file-grid">
        {#key window.id}
          {#if window?.files }
            {#each window?.files as file }
              {#if file !== '.DS_Store' }
                <div on:dblclick={openFile} data-is-on-desktop="false" class="file" data-directory={`${window.directory}/${file}`}>
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

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
  
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
    }
    .outer #close-btn {
      position: absolute;
      right: 4px;
      top: 2px;
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