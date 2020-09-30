import generalSettings from './modules/generalSettings';
import authentication from './modules/authentication';

export default {
    strict: false,
    state:() => ({

    }),
    actions:{
        async nuxtServerInit(vuexContext, context) {
            return await context.$axios.get('/setting/get').then(response => {
                vuexContext.commit('setGeneralSettings', ((response.data.result || [])[0] || {}));
            });
        },
    },
    modules: {
        generalSettings,
        authentication,
    }
};