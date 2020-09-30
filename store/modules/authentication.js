import Cookie from 'js-cookie';

const state = () => ({
    authToken: null,
    isLogin: null,
});

const mutations = {
    setAuthToken(state, authToken) {
        state.authToken = authToken;
    },

    clearAuthToken(state) {
        Cookie.remove('authToken');
        Cookie.remove("expiresIn");

        if (process.client) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('expiresIn');
        }

        state.authToken = null;
    },

    setIsLogin(state, isLogin) {
        state.isLogin = isLogin;
    },
};

const actions = {
    initAuth(vuexContext, req) {
        let token;
        let expiresIn;

        if (req) {
            // Server Üzerinde Calisiyoruz....
            if (!req.headers.cookie) {
                return;
            }

            // Cookie üzerinden Token elde etmek..
            token = req.headers.cookie.split(";").find(c => c.trim().startsWith("authToken="));

            if (token) {
                token = token.split("=")[1];
            }

            expiresIn = req.headers.cookie.split(";").find(e => e.trim().startsWith("expiresIn="));

            if (expiresIn) {
                expiresIn = expiresIn.split("=")[1];
            }
        } else {
            // Client Üzerinde Calisiyoruz....
            token = localStorage.getItem("authToken");
            expiresIn = localStorage.getItem("expiresIn");
        }

        if (new Date().getTime() > +expiresIn || !token) {
            vuexContext.commit("clearAuthToken");
        }

        vuexContext.commit("setAuthToken", token);
    },

    loginUser(vuexContext, userData) {
        this.$axios.post('/auth/login', userData)
            .then(response => {
                if (response.data.status === 200) {
                    vuexContext.commit('setAuthToken', response.data.result.token);
                    vuexContext.commit('setIsLogin', true);

                    Cookie.set('authToken', response.data.result.token, {
                        expires: 1 / 24, //1 hour
                    });
                    Cookie.set('expiresIn', response.data.result.expiresIn, {
                        expires:  1 / 24, //1 hour
                    });

                    localStorage.setItem('authToken', response.data.result.token);
                    localStorage.setItem('expiresIn', response.data.result.expiresIn);
                } else {
                    vuexContext.commit('setIsLogin', false);
                }
            });
    },

    logoutUser(vuexContext){
        vuexContext.commit('clearAuthToken');
    }
};

const getters = {
    isAuthenticated(state) {
        return state.authToken != null;
    },

    getAuthToken(state) {
        return state.authToken;
    },

    getIsLogin(state) {
        return state.isLogin;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
};