<script lang="ts">
	import Tile from './Tile.svelte';
	import Game2048 from './2048-algorithms';
	import { onMount } from 'svelte';
	import drag from './drag';

	let board: HTMLDivElement;
	const game = new Game2048();

	let score = game.getScore();
	let data = game.getData();
	let prevData = game.getData();

	let gameOver = false;

	function updateData() {
		prevData = data;
		data = game.getData();
		score = game.getScore();

		game.debug()
		if (game.isFull()) {
			console.log('gameOver');
			gameOver = true;
			return;
		}

		let savedPositions: any = {};
		Object.entries(activeTiles).map(([key, value]) => {
			savedPositions[key] = activeTiles[key].position;
		});
		activeTiles = {};
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const tile = data[i][j];
				if (tile.value === 0) continue;

				if (!activeTiles[tile.id]) activeTiles[tile.id] = {};

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

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				const rect = tiles[i][j].getClientRects()[0];
				positions[i][j] = {
					x: rect.x - boardRect.x,
					y: rect.y - boardRect.y
				};
			}
		}

		updateData();
	});

	function handleEnd({ detail }) {
		console.log(detail);
	}
	function handleMove({ detail }) {
		console.log(detail);
		const dx = detail.delta[0];
		const dy = detail.delta[1];
		if (dy > -20 && dy < 20) {
			if (dx < -60) {
				clickLeft();
				detail.cancel();
			} else if (dx > 60) {
				clickRight();
				detail.cancel();
			}
		} else if (dx > -20 && dx < 20) {
			if (dy < -60) {
				clickTop();
				detail.cancel();
			} else if (dy > 60) {
				clickBottom();
				detail.cancel();
			}
		}
	}
	function handleStart({ detail }) {
		console.log(detail);
	}

	function reset() {
		game.reset();
		gameOver = false
		updateData();
	}
</script>

<div class="flex w-full items-center">
	<div class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 flex-1">2048</div>
	<div class="flex flex-row gap-1">
		<div class="score-btn">
			<span class="text-center font-bold text-gray-400 uppercase text-sm">score</span>
			<div class="text-2xl font-bold text-gray-300">{score}</div>
		</div>
		<div class="score-btn">
			<span class="text-center font-bold text-gray-400 uppercase text-sm">best</span>
			<div class="text-xl font-bold text-gray-300">{score}</div>
		</div>
	</div>
</div>

<div class="flex flex-row items-center gap-1 my-4">
	<p class="text-gray-600 flex-1">
		Join the tiles, get to <b class="font-bold">2048!</b>
	</p>
	<button on:click={reset} class="sm:hidden py-1 px-5 ml-4 font-bold rounded bg-gray-700 text-white"
		>New</button
	>
	<button
		on:click={reset}
		class="hidden sm:block py-1 px-5 ml-4 font-bold rounded bg-gray-700 text-white">New Game</button
	>
</div>
<div class="flex flex-col sm:flex-row">
	{#if gameOver}
	<div class="h-300px w-300px font-bold text-gray-800 w-full h-full bg-gray-500/20 flex flex-col items-center justify-center text-3xl text-shadow">
		<span>Game Over</span>
		<button on:click={reset} class="p-2 mt-4 text-sm bg-gray-800 text-white shadow rounded">Reload</button>


	</div>
	{/if}

	<div
		use:drag={{ axis: 'both', handleEnd, handleMove, handleStart }}
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
					<Tile
						prevPos={value.prevPos}
						position={value.position}
						id={key}
						state={value.state}
						number={value.value}
					/>
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
