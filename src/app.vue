<template>
    <div class="tm-app">{{msg}}</div>
</template>

<script>

export default {
    data () {
        return {
            msg: 'Hello World!!'
        }
    }
}

</script>

<style>
.tm-app
{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
}
</style>

