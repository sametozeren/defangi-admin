const state = () => ({
    settings: {},
});

const mutations = {
    setGeneralSettings(state, settings) {
        state.settings = settings;
    },
};

const actions = {
    updateGeneralSettings(vuexContext, settings) {
        this.$axios.put('/setting/update', settings)
            .then(response => {
                if (response.data.status === 200) {
                    vuexContext.commit('setGeneralSettings', settings);

                    this.$toast.success('Ayarlarınız Başarıyla Güncellendi.', {
                        icon: 'check'
                    });
                } else {
                    this.$toast.error('Hata Oluştu. Ayarlar Güncellenemedi.', {
                        icon: 'exclamation'
                    });
                }
            });
    }
};

const getters = {
    getGeneralSettings(state) {
        return state.settings;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
};