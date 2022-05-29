<script>

import Grid from "$lib/Grid.svelte";
import { onMount } from "svelte";

let score = 0;

onMount(() => {
    function onTouchMove(event) {
        if (event.scale !== 1) { 
            event.preventDefault(); 
        }
    }
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', onTouchMove)

})

</script>
<Grid bind:score/>
