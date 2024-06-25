<script lang="ts">
	import { onMount } from 'svelte';
	import { renderStudio, type Config } from 'sanity';
	import config from '$lib/sanity/sanity.config';

	onMount(() => {
		renderStudio(document.getElementById('app'), config as Config);
	});
</script>

<div id="app"></div>

<style>
	:global(html) {
		-webkit-text-size-adjust: 100%;
		text-size-adjust: 100%;
		-webkit-tap-highlight-color: transparent;
		-webkit-font-smoothing: antialiased;
	}
	:global(html),
	:global(body),
	#app {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}
</style>
