<template>
    <div>
        <button type="button" @click="apiTest()" class="btn btn-dark">API TEST İÇİN TIKLA</button>
        {{data}}
        <br>
        <a href="/admin" class="brand-link">
            <i class="fas ml-3 mr-2 fa-dragon"></i>
            <span class="brand-text font-weight-light">Defangi Panel</span>
        </a>
        <br>
        <a href="/admin/login" class="brand-link">
            <i class="fas ml-3 mr-2 fa-dragon"></i>
            <span class="brand-text font-weight-light">Giriş</span>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: '',
            }
        },
        methods: {
            apiTest() {
                this.$axios.get('/').then(response => {
                    this.data = response.data;
                }).catch(err => {
                    //client;
                    console.log(err);
                });
            },
        }
    }
</script>

<style>

</style>