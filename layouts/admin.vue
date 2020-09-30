<template>
    <div class="wrapper">
        <Header />
        <SidebarLeft :siteAdress="siteAdress"/>
        <nuxt />
        <SidebarRight />
    </div>
</template>

<script>
    import Header from '~/components/admin/Header';
    import SidebarLeft from '~/components/admin/SidebarLeft';
    import SidebarRight from '~/components/admin/SidebarRight'

    export default {
        middleware: ["session-control", "authentication"],
        head() {
            return {
                script: [{
                        src: 'plugins/jquery/jquery.min.js'
                    },
                    {
                        src: 'plugins/bootstrap/js/bootstrap.bundle.min.js'
                    },
                    {
                        src: 'dist/js/adminlte.min.js'
                    },
                    {
                        src: 'dist/js/demo.js'
                    },
                ],
                link: [{
                        rel: 'stylesheet',
                        href: 'plugins/fontawesome-free/css/all.min.css'
                    },
                    {
                        rel: 'stylesheet',
                        href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
                    },
                    {
                        rel: 'stylesheet',
                        href: 'dist/css/adminlte.min.css'
                    },
                    {
                        rel: 'stylesheet',
                        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700'
                    }
                ],
                bodyAttrs: {
                    class: 'sidebar-mini sidebar-collapse layout-footer-fixed',
                }
            }
        },
        components: {
            Header,
            SidebarLeft,
            SidebarRight,
        },
        computed: {
            siteAdress() {
                var settings = this.$store.getters.getGeneralSettings;

                return settings.siteAdress;
            },
        },
    }
</script>

<style>
</style>