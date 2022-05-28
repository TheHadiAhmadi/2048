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
		256: '#ece368',
		512: '#f5df4f',
		1024: '#f4d025',
		2048: '#e9c332',
		4096: '#d0410a',
		8192: '#e0410a',
		16384: '#f0410a',
		32768: '#ff410a'
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

<div class="absolute w-20 h-20" style:bakground-color={colors[256]}></div>
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
