<template>
    <div id="defLogin">
        <div class="defLog">
            <div class="container">
                <section id="formHolder">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 brand">
                            <div class="heading">
                                <h2>DEFANGİ</h2>
                                <p>YÖNETİMİN ANAHTARI</p>
                            </div>
                            <div class="loging">
                                <div v-if="login===true" class="logCircle success scale-in-center">
                                    <svg id="Bold" enable-background="new 0 0 24 24" height="64" viewBox="0 0 24 24"
                                        width="64">
                                        <path
                                            d="m.828 13.336c-.261.304-.388.691-.357 1.091s.215.764.52 1.024l7.403 6.346c.275.235.616.361.974.361.044 0 .089-.002.134-.006.405-.036.77-.229 1.028-.542l12.662-15.411c.254-.31.373-.7.334-1.099-.04-.399-.231-.759-.541-1.014l-2.318-1.904c-.639-.524-1.585-.432-2.111.207l-9.745 11.861-3.916-3.355c-.628-.536-1.576-.465-2.115.163z" />
                                    </svg>
                                </div>
                                <div v-if="login===false" class="logCircle error scale-in-center">
                                    <svg id="Capa_1" enable-background="new 0 0 24 24" height="512"
                                        viewBox="0 0 512.001 512.001" width="512">
                                        <g>
                                            <path
                                                d="m512.001 84.853-84.853-84.853-171.147 171.147-69.853 84.853 69.853 84.854 171.147 171.147 84.853-84.853-171.148-171.148z" />
                                            <path
                                                d="m84.853 0-84.853 84.853 171.148 171.147-171.148 171.148 84.853 84.853 171.148-171.147v-169.707z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 form">
                            <div class="login form-peice ">
                                <form class="login-form" action="#">
                                    <div class="form-group">
                                        <label :class="user.username !== '' || activeClass === 'email' ? 'active' : ''"
                                            for="loginusername">KULLANICI ADI</label>
                                        <input @focus="activeClass = 'email' " @blur="activeClass = false"
                                            v-model="user.username" type="text" name="loginusername" id="loginusername">
                                    </div>
                                    <div class="form-group">
                                        <label :class="user.password !== '' || activeClass === 'pass' ? 'active' : ''"
                                            for="loginPassword">ŞİFRE</label>
                                        <input @focus="activeClass = 'pass'" @blur="activeClass = false"
                                            v-model="user.password" type="password" name="loginPassword"
                                            id="loginPassword">
                                    </div>
                                    <div class="CTA">
                                        <input type="submit" @click.prevent="signIn()" value="GİRİŞ">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'auth',
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                activeClass: false,
            }
        },
        methods: {
            signIn() {
                if (this.user.username === '' || this.user.password === '') {
                    this.$toast.error('Lütfen Giriş Bilgilerinizi Eksiksiz Olarak Doldurunuz', {
                        icon: 'exclamation',
                        position: 'top-center',
                        duration: '3000'
                    });
                } else {
                    this.$store.dispatch('loginUser', this.user);

                    document.querySelector('.brand').classList.add('switched');
                    document.querySelector('.brand').classList.add('logintry');
                    document.querySelector('.login').classList.add('switched');

                    setTimeout(() => {
                        if (this.login === false) {
                            document.querySelector('.brand').classList.remove('switched');
                            document.querySelector('.brand').classList.remove('logintry');
                            document.querySelector('.login').classList.remove('switched');

                            this.$store.dispatch('clearLoginStatus', '');
                        } else {
                            // ssr redirect
                            window.location.href = '/admin';
                        }
                    }, 2000);
                }
            }
        },

        computed: {
            login() {
                return this.$store.getters.getIsLogin;
            }
        }
    }
</script>
<style scoped>
    #defLogin {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: table;
    }

    #defLogin::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(129, 236, 236, 0.6);
        z-index: -1;
    }

    .defLog {
        display: table-cell;
        vertical-align: middle;
    }

    .container {
        max-width: 900px;
    }

    a {
        display: inline-block;
        text-decoration: none;
    }

    input {
        outline: none !important;
    }

    h1 {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 40px;
        font-weight: 700;
    }

    .brand {
        padding: 20px;
        background-size: cover;
        background-position: center center;
        color: #fff;
        min-height: 540px;
        position: relative;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.9s cubic-bezier(1, -0.375, 0.285, 0.995);
        z-index: 9999;
    }

    .brand::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: -1;
    }

    .brand .heading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        transition: all 0.6s;
    }

    .brand .heading.active {
        top: 100px;
        left: 100px;
        transform: translate(0);
    }

    .brand .heading h2 {
        font-size: 70px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 0;
    }

    .brand .heading p {
        font-size: 15px;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 2px;
        white-space: 4px;
        font-family: "Raleway", sans-serif;
    }

    .brand .loging {
        position: absolute;
        top: 75%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        transition: all 0.6s;
    }

    .brand .loging .logCircle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .scale-in-center {
        -webkit-animation: scale-in-center 0.5s linear;
        animation: scale-in-center 0.5s linear;
    }

    .brand .loging .success {
        background-color: rgba(46, 204, 113, 0.8);
    }

    .brand .loging .success {
        background-color: rgba(46, 204, 113, 0.8);
    }

    .brand .loging .error {
        background-color: rgba(192, 57, 43, 0.8);
    }

    .brand .loging .logCircle svg {
        fill: #fff;
        width: 64px;
        height: 64px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }

    .form {
        position: relative;
    }

    .form .form-peice {
        background: #fff;
        min-height: 480px;
        margin-top: 30px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        color: #bbbbbb;
        padding: 30px 0 60px;
        transition: all 0.9s cubic-bezier(1, -0.375, 0.285, 0.995);
        position: absolute;
        top: 0;
        left: -30%;
        width: 130%;
        overflow: hidden;
    }

    .form .form-peice.switched {
        transform: translateX(-50%);
        width: 100%;
        left: 0;
    }

    .brand.switched {
        transform: translateX(50%);
        width: 100%;
        left: 0;
    }

    .logintry {
        background: rgba(0, 0, 0, 0.7);
    }

    .form form {
        padding: 0 40px;
        margin: 0;
        width: 70%;
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%);
    }

    .form form .form-group {
        margin-bottom: 5px;
        position: relative;
    }

    .form form label {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        font-family: "Montserrat", sans-serif;
        transform: translateY(40px);
        transition: all 0.4s;
        cursor: text;
        z-index: -1;
    }

    .form form label.active {
        transform: translateY(5px);
        font-size: 10px;
    }

    .form form input:not([type=submit]) {
        background: none;
        outline: none;
        border: none;
        display: block;
        padding: 10px 0;
        width: 100%;
        border-bottom: 1px solid #eee;
        color: #444;
        font-size: 15px;
        font-family: "Montserrat", sans-serif;
        z-index: 1;
    }

    .form form input[type=password] {
        color: #f95959;
    }

    .form form .CTA {
        margin-top: 30px;
    }

    .form form .CTA input {
        font-size: 12px;
        text-transform: uppercase;
        padding: 5px 30px;
        background: #f95959;
        color: #fff;
        border-radius: 30px;
        margin-right: 20px;
        border: none;
        font-family: "Montserrat", sans-serif;
    }

    @-webkit-keyframes scale-in-center {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 1;
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes scale-in-center {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 1;
        }

        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .container {
            overflow: hidden;
        }

        section#formHolder {
            padding: 0;
        }

        section#formHolder div.brand.switched {
            transform: translateY(0%);
            height: 100vh !important;
            left: 0;
        }

        section#formHolder div.brand {
            min-height: 200px !important;
        }

        section#formHolder div.brand.active {
            min-height: 100vh !important;
        }

        section#formHolder div.brand .heading.active {
            top: 200px;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        section#formHolder div.brand .success-msg p {
            font-size: 16px;
        }

        section#formHolder div.brand .success-msg a {
            padding: 5px 30px;
            font-size: 10px;
        }

        section#formHolder .form {
            width: 80vw;
            min-height: 500px;
        }

        section#formHolder .form .form-peice {
            margin: 0;
            top: 0;
            left: 0;
            transition: all 0.5s ease-in-out;
        }

        section#formHolder .form .form-peice.switched {
            transform: none;
            width: 100%;
            left: 0;
        }

        section#formHolder .form .form-peice>form {
            width: 100% !important;
            padding: 60px;
            left: 50%;
        }

    }

    @media (max-width: 480px) {
        #formHolder>div>div.col-sm-12.col-md-6.brand>a {
            display: none;
        }

        #defLogin>div {
            display: block;
        }

        #formHolder>div>div.col-xs-12.col-sm-12.col-md-6.form>div>form {
            top: unset;
            left: unset;
            transform: unset;
        }

        #formHolder>div>div.col-xs-12.col-sm-12.col-md-6.form>div {
            width: 100%;
        }

        section#formHolder .form {
            width: 100vw;
            margin-left: 0;
        }

        h2 {
            font-size: 50px !important;
        }

        section#formHolder .form .form-peice.switched {
            transform: translateX(-50%);
            width: 100%;
            left: 0;
        }

        .brand.switched {
            transform: translateX(100%);
            width: 100%;
            left: 0;
        }

        section#formHolder div.brand {
            min-height: 120px !important;
        }
    }
</style>