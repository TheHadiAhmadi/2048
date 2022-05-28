<script>

import Grid from "$lib/Grid.svelte";

let score = 0;


</script>
<div class="w-full h-full px-2 py-6 bg-gradient-to-br from-yellow-200 to-orange-200">
	<div class="h-full max-w-300px sm:max-w-400px md:max-w-500px mx-auto">
		<div class="flex w-full items-center">
			<div class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 flex-1">2048</div>
			<div class="flex flex-row gap-1">
				<div class="score-btn">
					<span class="text-center font-bold text-gray-400 uppercase text-sm">score</span>
					<div class="text-2xl font-bold text-gray-300">123</div>
				</div>
				<div class="score-btn">
					<span class="text-center font-bold text-gray-400 uppercase text-sm">best</span>
					<div class="text-xl font-bold text-gray-300">1233</div>
				</div>
			</div>
		</div>
		
        <Grid bind:score/>
	</div>
</div>
