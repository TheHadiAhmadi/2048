<script>
import { onMount } from 'svelte';

    import 'virtual:windi.css';

onMount(() => {

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(() => {
            console.info('2048 Game Service Worker Registered');
        }, err => console.error("2048 Game Service Worker registration failed: ", err));

    navigator.serviceWorker
        .ready
        .then(() => {
            console.info('2048 Game Service Worker Ready');
        });
    }
})

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
    }

    body > div {
        height: 100%;
    }

    .text-shadow {
        text-shadow: 1px 1px 1px #40404060;
    }

</style>