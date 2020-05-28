<template>
    <div class="container columns">

        <div class="form column is-6">
        <Errors :message="errors" />
            <h4> Вход </h4>
            <div class="inputs">
                         <div class="fiber_pin">
                             <label for="icon_prefix">Логин</label>
                            <input id="login_admin" type="text" placeholder="Введите логин" class="input is-warning" v-model="login">

                        </div>
                         <div class="fiber_pin">
                            <label for="icon_prefix">Пароль</label>
                            <input id="password_admin" type="password" placeholder="Введите пароль" class="input is-warning" v-model="password">

                        </div>
            </div>
            <div class="buttons">
                <button class="button is-warning" @click="CheckedAdmin">Войти</button>
            </div>
        </div>
    </div>

</template>


<style >
  body {
    background: url('../assets/back.jpg');
  }
</style>
<style scoped>

.form{
    margin: 50px;
    padding: 10px;
}
.fiber_pin {
    margin-top: 25px;
}
label{
    font-weight: bold;
}
h4 {
    font-weight: bold;
    font-size: 30px;
    text-shadow: 10px 16px 16px #FFDD57;
}
.buttons {
    margin-top: 20px;
}
.columns {
    display: flex;
    justify-content: center;

}
</style>

<script>
import Errors from '@/components/Errors'

export default {
    data: () => ({

        login: '',
        password: '',
        errors: { type: false }
    }),
    components: {
        Errors
    },
    methods: {
        CheckedAdmin($axios, $cookies) {
            if(this.login.trim().length < 1 || this.password.trim().length < 1) {
                return this.errors = {type: true, message: 'Введите валидный текст'}
            }
            // отправлять даные на сервер
            this.$axios({
                url: 'http://185.185.68.42:3000/api/checked/admin/',
                method: 'post',
                data:   {
                            name: this.login.trim(),
                            password: this.password.trim()
                        },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
            .then((res) => {
                if(res.data.type == 'error') {
                    return this.errors = {type: true, message: res.data.message}
                } else{
                    this.$cookies.set('cookie-is-admin', res.data.message, {
                        path: '/',
                        maxAge: 60*60*24*7
                    })

                    this.$router.push('/');
                }
            })
        }
    }

}
</script>
