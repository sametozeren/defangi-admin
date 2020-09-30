<template>
    <div class="content-wrapper">
        <ContentHeader pageName="Genel Ayarlar" />
        <section class="content">
            <div class="card">
                <form class="form-horizontal">
                    <div class="card-body">
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Site Başlığı</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="generalSettings.webSiteName"
                                    placeholder="Defangi">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Slogan</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="generalSettings.webSiteSlogan"
                                    placeholder="Yönetimin Anahtarı">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Anahtar Kelimeler</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="generalSettings.keywords"
                                    placeholder="Yönetimin Anahtarı">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Site Adresi</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="generalSettings.siteAdress"
                                    placeholder="https://www.google.com">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Yönetici E-Posta Adresi</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="generalSettings.adminEmail"
                                    placeholder="Örn. example@gmail.com">
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <button class="btn btn-info" @click.prevent="updateSetting(generalSettings)">Kaydet</button>
                        <button class="btn btn-default float-right" @click.prevent="cancelSetting()">Geri</button>
                    </div>
                    <!-- /.card-footer -->
                </form>
            </div>
        </section>
    </div>
</template>

<script>
    import ContentHeader from '~/components/admin/Content/ContentHeader';

    export default {
        layout: 'admin',
        components: {
            ContentHeader,
        },
        computed: {
            generalSettings() {
                return this.$store.getters.getGeneralSettings;
            }
        },
        methods: {
            updateSetting(generalSettings) {
                this.$store.dispatch('updateGeneralSettings', generalSettings);
            },
            cancelSetting() {
                this.$router.back();
            }
        }
    }
</script>