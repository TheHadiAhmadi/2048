<script lang="ts">
	import Tile from './Tile.svelte';
	import Game2048 from './2048-algorithms';
	import { onMount } from 'svelte';

	let board: HTMLDivElement;
	const game = new Game2048();

	let score = game.getScore();
	let data = game.getData();
	let prevData = game.getData();

	function updateData() {
		prevData = data;
		data = game.getData();
		score = game.getScore();

		let savedPositions: any = {}
		Object.entries(activeTiles).map(([key, value]) => {
			savedPositions[key] = activeTiles[key].position
		})
		activeTiles = {}
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = data[i][j];
				if (tile.value === 0) continue;
				
				if(!activeTiles[tile.id]) activeTiles[tile.id] = {}
				
				activeTiles[tile.id].position = positions[i][j];
				activeTiles[tile.id].prevPos = savedPositions[tile.id] ?? activeTiles[tile.id].position;
				activeTiles[tile.id].state = tile.state;
				activeTiles[tile.id].value = tile.value;
			}
		}
	}

	function clickLeft() {
		game.moveLeft();
		updateData();
	}
	function clickRight() {
		game.moveRight();
		updateData();
	}
	function clickTop() {
		game.moveTop();
		updateData();
	}
	function clickBottom() {
		game.moveBottom();
		updateData();
	}

	let tiles: any[][] = [[], [], [], []];
	let positions = [[], [], [], []];

	$: {
		
	}

	let activeTiles: Record<string, any> = {};

	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowDown') clickBottom();
			if (e.key === 'ArrowUp') clickTop();
			if (e.key === 'ArrowLeft') clickLeft();
			if (e.key === 'ArrowRight') clickRight();
		});

		const boardRect = board.getClientRects()[0];

		for(let i=0;i<4; i++) {
			for(let j=0; j<4; j++) {
				const rect = tiles[i][j].getClientRects()[0];
				positions[i][j] = {
					x: rect.x - boardRect.x,
					y: rect.y - boardRect.y
				};

			}
		}

		updateData()
	});
</script>

<div class="flex flex-col sm:flex-row">

<div
	bind:this={board}
	class="relative rounded w-300px sm:w-400px sm:h-400px md:(w-500px h-500px) p-0.75 h-300px grid grid-cols-4 grid-rows-4 bg-gray-400"
>
	{#each Object.entries(activeTiles) as [key, value] (key)}
		<span
			id={key}
			class:hidden={value.value === 0}
			style:left="{value.position.x}px"
			style:top="{value.position.y}px"
			class:animate-bubble={value.state === 'merged'}
			class:animate-delay-200={value.state === 'merged'}
			class:animate-zoom-in={value.state === 'new'}
			class="animate-duration-400 transition-transform duration-1000 absolute inline-block w-1/4 h-1/4 p-1.5"
		>
			<Tile prevPos={value.prevPos} position={value.position} id={key} state={value.state} number={value.value} />
		</span>
	{/each}

	{#each [0, 0, 0, 0] as _i, i}
		{#each [0, 0, 0, 0] as _j, j}
			<div bind:this={tiles[i][j]} class="p-1.5 w-full h-full">
				<div class="bg-gray-300/50 rounded w-full h-full" />
			</div>
		{/each}
	{/each}
</div>


<div class="sm:hidden mt-4 right-50 flex flex-col items-center justify-center gap-2 mb-2">
	<div
	on:click={clickTop}
	class="w-20 h-10 flex items-start justify-center p-1 bg-gray-400/90 shadow hover:shadow-lg cursor-pointer text-white text-shadow rounded hover:bg-gray-400"
>
	Top
</div>
	<div class="flex flex-row gap-4">

	<div
		on:click={clickLeft}
		class="w-20 h-10 flex items-start justify-center p-1 bg-gray-400/90 shadow hover:shadow-lg cursor-pointer text-white text-shadow rounded hover:bg-gray-400"
	>
		Left
	</div>
	<div
		on:click={clickRight}
		class="w-20 h-10 flex items-start justify-center p-1 bg-gray-400/90 shadow hover:shadow-lg cursor-pointer text-white text-shadow rounded hover:bg-gray-400"
	>
		Right
	</div>
</div>


	<div
		on:click={clickBottom}
		class="w-20 h-10 flex items-start justify-center p-1 bg-gray-400/90 shadow hover:shadow-lg cursor-pointer text-white text-shadow rounded hover:bg-gray-400"
	>
		Bottom
	</div>
</div>

</div>
