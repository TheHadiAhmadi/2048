<script>

import Grid from "$lib/Grid.svelte";

let score = 0;


</script>
<div class="w-full h-full px-2 py-6 bg-gradient-to-br from-yellow-200 to-orange-200">
	<div class="h-full max-w-300px sm:max-w-400px md:max-w-500px mx-auto">
        <Grid bind:score/>
	</div>
</div>
