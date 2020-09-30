<template>
    <nuxt />
</template>

<script>
    export default {
        middleware: ['session-control', 'login-control'],
        head: {
            link: [{
                rel: 'stylesheet',
                href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
            }],
        },
    }
</script>

<style>

</style>