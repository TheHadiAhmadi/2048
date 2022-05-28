<script>
import { onMount } from 'svelte';

    import 'virtual:windi.css';
</script>  
<slot/>

<style global>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
    }

    body {
        overscroll-behavior-y: contain;
        overflow: hidden;
    }

    body > div {
        height: 100%;
    }

    .text-shadow {
        text-shadow: 1px 1px 1px #40404060;
    }

</style>