<template>
    <div>
       <nav class="navbar" role="navigation" aria-label="main navigation">
           <div class="navbar-brand">
             <nuxt-link class="brand-logo" exact no-prefetch to="/">
                Недвижимость Борисоглебска
                    <hr class="hr-logo z-depth-2">

            </nuxt-link>
                <ul class="right hide-on-med-and-down bars">
                    <li @click="mobileMenu = 'modal is-active'">
                        <i class="fas fa-bars"></i>
                    </li>
                </ul>
                <ul class="right hide-on-med-and-down">
                    <!-- <li>
                        <nuxt-link exact no-prefetch to="/"> Главная
                            <hr class="hr-li z-depth-2">
                        </nuxt-link>

                    </li> -->
                    <!-- <li>
                        <nuxt-link  to="/"> Ипотечный калькулятор
                            <hr class="hr-li z-depth-2">
                        </nuxt-link>
                    </li> -->
                    <li>
                        <a @click="openModal"> Оставить заявку
                            <hr class="hr-li z-depth-2">
                        </a>
                    </li>
                    <li >
                        <strong class="tel">8(900)-999-99-99</strong>
                    </li>
                </ul>
            </div>
        </nav>
            <div :class="mobileMenu">
                <div class="modal-background"></div>
                <div class="modal-card" style="color: white; display: flex; justify-content: center; align-items: center;">

                            <!-- <nuxt-link to="/">
                                <div style="margin-bottom: 10px; height: 10%;" @click="mobileMenu ='modal'">
                                 <p style="color: #dee0df;"> Главная</p>
                                <hr class="hr-li z-depth-2" style="padding: 0px; margin: 0px;">
                                </div>
                            </nuxt-link> -->
                            <!-- <nuxt-link  to="/">
                            <div style="    margin-bottom: 10px;     height: 10%;" @click="mobileMenu ='modal'">
                              <p style="color: #dee0df;"> Ипотечный калькулятор </p>
                                <hr class="hr-li z-depth-2" style="padding: 0px; margin: 0px;">
                            </div>
                            </nuxt-link> -->
                            <div style=" margin-bottom: 10px; height: 10%;" @click="openModal">
                                  <a style="color: #dee0df;"> Оставить заявку </a>
                                <hr class="hr-li z-depth-2" style="padding: 0px; margin: 0px;">
                            </div>

                            <strong class="tel" style="color: #dee0df; margin-top: 10px;">8(900)-999-99-99</strong>

                </div>
                 <button class="modal-close is-large" aria-label="close" @click="mobileMenu ='modal'"></button>
            </div>
        <div :class="modal">
      <div class="modal-background"></div>
       <div class="modal-card models__modal">
          <section class="modal-card-body" style="background: hsl(141, 71%, 48%);">
              <div class="content" style="display: flex; justify-content: center; align-items: center;" v-if="toSend.type">
                   <p class="title">
                       Спасибо, {{name}}! Мы с вами свяжемся.
              </p>
                  </div>
            <div class="content" v-if="!toSend.type">
              <p class="title ">
                 Оставить заявку
              </p>
                <div>
                    <div class="tile is-ancestor">
                    <div class="tile" @click="check(0)">
                        <article class="tile box">
                            <p class="title">Сдать</p>
                            <div v-html="arrBlockIcon[0]"> </div>
                        </article>
                    </div>
                    <div class="tile" @click="check(1)">
                        <article class="tile box">
                            <p class="title">Продать</p>
                            <div v-html="arrBlockIcon[1]"> </div>
                        </article>
                    </div>
                    <div class="tile" @click="check(2)">
                        <article class="tile box">
                           <p class="title">Купить  </p>
                           <div v-html="arrBlockIcon[2]"> </div>
                        </article>
                    </div>
                    </div>
                    <div class="field">
                    <div class="control">
                        <input class="input is-success" v-model="name" type="text" placeholder="Введите Имя">
                    </div>
                    </div>
                    <div class="field">
                    <div class="control">
                        <input class="input is-success" v-model="emails" type="text" placeholder="E-mail или Телефон">
                    </div>
                    </div>
                    <div class="field">
                    <div class="control">
                        <textarea class="textarea is-success" v-model="discriptions" placeholder="Если хотите - оставьте сообщение."></textarea>
                    </div>
                    </div>

                </div>
            </div>
        </section>
        <footer class="modal-card-foot" v-if="!toSend.type">
          <button class="button is-warning" @click="sendMail">
                <i class="fas fa-envelope"></i> <span style="margin-left: 10px"> ОТПРАВИТЬ ЗАЯВКУ</span></button>
        </footer>
       </div>
      <button class="modal-close is-large" aria-label="close" @click="modal ='modal'"></button>
    </div>
    </div>
</template>

<script>
export default {
    data: () =>({
        modal: 'modal',
        arrBlockIcon: ['', '', ''],
        emails: '',
        name: '',
        bool: ['Сдать', 'Продать', 'Купить'],
        options: null,
        discriptions: '',
        toSend: { type: false, message: ''},
        mobileMenu: 'modal'
    }),

    methods: {
        openModal() {
            this.modal = 'modal is-active';
        },
        sendMail() {
            if(this.emails.trim() == '' || this.name.trim() == '') {
                alert('Введите имя и Данные для связи')
                return
            } else if(this.options == null){
                alert('Выберете тип заявки.')
                return
            } else {
                let data = new FormData();

                data.append('options', this.options)
                data.append('name', this.name)
                data.append('emails', this.emails)
                data.append('discription', this.discriptions)

                this.$axios.$post('/api/send-mail/modal/raport/', data,
                { headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).then(res => {
                    console.log(res)
                    this.toSend.type = true
                })
            return
            }
           this.modal = 'modal';
        },
        check(index) {
            if(this.arrBlockIcon[index].trim() == '') {
                this.arrBlockIcon = ['', '', ''];
                this.arrBlockIcon[index] = '<i class="fas fa-check" style="font-size: 20px;"></i>';
                this.options = this.bool[index];
            } else {
                this.arrBlockIcon = ['', '', ''];
                this.options = null;
                return
            }

        }
    }
}
</script>


<style scoped>
nav{
  background: url(../assets/back.jpg);
}
@font-face {
  font-family: 'Onyx';
  src: url('../assets/17669.otf');
}
.navbar-brand{
    width: 100%;
    justify-content: space-between;
    padding: 13px;
}
.brand-logo {
  font-size: 40px;
  font-family: 'Onyx';
}
ul{
    display: flex;
}
ul>li{
    margin-right: 20px;

    font-weight: bold;
}
a{
    color: black;
}
hr{
    background: #ff3f05;
    box-shadow: 1px 1px 30px 1px #ff3f05;
    border-radius: 100px;
}
.models__modal {
  width: 90%;
  height: 90%;
  border-radius: 8px;
}
.modal-card-body {
  display: flex;
  justify-content: center;
}
.content{
    width: 80%;
    padding: 10px;
}
.tile{
    margin: 5px;
    cursor: pointer;
}
.tile:hover {
    margin: 10px;
}
.bars {
    display:none;
}
.field{
    height: 20px;
}
.field:hover{
    height: 40px;
    margin-top: 10px;
}
.field:active{
    margin-top: 10px;
    height: 40px;
}
.modal-card-body>content>title{
    font-size: 40px;
}
@media(max-width: 650px) {
    ul {
        display: none;
    }
    .bars {
        display: block;
    }
    .bars>li{
        padding: 10px;
        cursor: pointer;
    }
    i{
        font-size: 10px;
    }
}

@media(max-width: 960px) {
    .brand-logo {
        font-size: 15px;

    }
    li>a{
        font-size: 11px;
    }
    li>strong{
        font-size: small;
    }
    ul>li{
        margin-right: 15px;
    }

    .title{
        font-size: 15px;
    }
    .is-ancestor {
        display: flex;
    }
    span{
        font-size: 10px;
    }
    i {
        font-size: 10px;
    }
    footer {
        height: 0px;
        background: #23d160;
        border: none;
    }
    button{
        padding: 10px;
        margin-bottom: 5px;
    }
}

@media(max-width: 400px) {
    .brand-logo{
        font-size: 15px;
    }
}

</style>
