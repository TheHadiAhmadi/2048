<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { fly, scale } from 'svelte/transition';
	export let number = 0;
    export let prevPos
    export let position
    export let state
    export let id

	let size = '';

	const colors = {
		1: 'black',
		2: '#e4e3d5',
		4: '#e3deb6',
		8: '#f9c285',
		16: '#f3a361',
		32: '#f48c6e',
		64: '#f35b3f',
		128: '#ebe891',
		256: '#909090',
		512: '#a0a0a0',
		1024: '#b0b0b0',
		2048: '#c0c00',
		4096: '#d0d0d0',
		8192: '#e0e0e0',
		16384: '#f0f0f0',
		32768: '#ffffff'
	};

	let el;
	let _in = () => {};
    let params: any = { delay: 200 };


    $: if (prevPos === position) {
		_in = scale;
	} else {
        _in = fly
        params = {duration: 200, x: prevPos.x - position.x, y: prevPos.y - position.y, opacity: 1}
    }

	$: if (number < 100) {
		size = 'text-4xl sm:text-4xl md:text-5xl';
	} else if (number < 1000) {
		size = 'text-2xl sm:text-3xl md:text-4xl';
	} else {
		size = 'text-xl sm:text-2xl md:text-3xl';
	}
</script>

{#key params}
<div
bind:this={el}
    in:_in={params}
    id="{JSON.stringify(params)}"
	class="flex items-center justify-center transition-transform shadow-lg font-bold rounded text-shadow w-full h-full bg-gray-300 {size}"
	style:color={number <= 4 ? '#606060' : '#f0f0f0'}
	style:background-color={colors[number]}
>
	{number}
</div>
{/key}
