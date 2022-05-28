<script>
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

    body > div {
        height: 100%;
    }

    .text-shadow {
        text-shadow: 1px 1px 1px #40404060;
    }

</style>