<template>

    <div class="conteiner">
      <div class="columns rowser">
        <div class="column is-6 left-image-discript">
          <div>
          <img class="left-image" src="https://ipoteka.domclick.ru/mland/img/images/benefits-img-3.jpg" alt="">
          </div>
        </div>
        <div class="column is-6  container-text-right-block">
          <h4> Просто — позаботимся о вашем комфорте </h4>
          <p>  Пройдите небольшой тест состоящий из 5 вопросов
                И мы перезвоним вам. Это поможет сэкономить много времени. 
          </p>
          <div class="columns text_tester_block">
            <div class="column is-4 container-icon-photo">
              <img src="https://ipoteka.domclick.ru/mland/img/icons/icon-01.svg" alt="">
              <p>Текст текст текст текст текст текст </p>
            </div>
            <div class="column is-4 container-icon-photo">
              <img src="https://ipoteka.domclick.ru/mland/img/icons/icon-01.svg" alt="">
              <p>Текст текст текст текст текст текст </p>
            </div>
               <div class="column is-4 container-icon-photo">
              <img src="https://ipoteka.domclick.ru/mland/img/icons/icon-01.svg" alt="">
              <p>Текст текст текст текст текст текст </p>
            </div>
               <div class="column is-4 container-icon-photo">
              <img src="https://ipoteka.domclick.ru/mland/img/icons/icon-01.svg" alt="">
              <p>Текст текст текст текст текст текст </p>
            </div>
          </div>
            
             <br>
              <div class="container-icon-photo">
              <button class="button is-warning" @click="testModal">Пройти тест</button>
            </div>

        </div>
      </div>

      <div :class="modal">
      <div class="modal-background"></div>
       <div class="modal-card models__modal">
          <section class="modal-card-body" :style='fieldArrsModals !== 111 ? objectModalTest[fieldArrsModals].color : "background: hsl(141, 71%, 48%);"'>
            <div class="content">
              <p class="title ">
                {{fieldArrsModals !== 111 ? objectModalTest[fieldArrsModals].title : `Спасибо ${name}, мы скоро с вами свяжемся.` }}
              </p>
                <div v-if="fieldArrsModals == 0">
                    <div class="control" style="display: flex !important; flex-direction: column !important;">
                      <label class="radio" style="margin-left: 0px; font-size: 25px;" @click="e => aa(e, 0, 'Вторичка')">
                        <input type="radio" name="answer">
                        
                          Вторичка 
                      </label>
                      <label class="radio" style="margin-left: 0px; font-size: 25px;"  @click="e => aa(e, 0, 'Новостройка')">
                        <input type="radio" name="answer">
                          Новостройка
                      </label>
                    </div>
                </div>
                <p style="position: absolute; left: 10px; top: 10px;"> {{ arrItems[fieldArrsModals] ? `Выбрано: ${arrItems[fieldArrsModals]}`  : "" }} </p>
                    <div v-if="fieldArrsModals == 1">
                      <input class="input" v-model="arrItems[1]" type="number" placeholder="Количество комнат">
                    </div>
                    <div v-if="fieldArrsModals == 2">
                      <div class="control" style="display: flex !important; flex-direction: column !important;">
                        <label class="radio" style="margin-left: 0px; font-size: 25px;" @click="e => aa(e, 2,  'Для сдачи')">
                          <input type="radio" name="answer">
                            Для сдачи 
                        </label>
                        <label class="radio" style="margin-left: 0px; font-size: 25px;" @click="e => aa(e, 2, 'Для родственников')">
                          <input type="radio" name="answer">
                            Для родственников 
                        </label>
                        <label class="radio" style="margin-left: 0px; font-size: 25px;"  @click="e => aa(e, 2, 'Для себя')">
                          <input type="radio" name="answer">
                            Для себя
                        </label>
                      </div>
                    </div>
                    <div v-if="fieldArrsModals == 3">
                      <div class="control" style="display: flex !important; flex-direction: column !important;">
                        <label class="radio" style="margin-left: 0px; font-size: 25px;" @click="e => aa(e, 3, 'Наличными')">
                          <input type="radio" name="answer">
                            Наличными
                        </label>
                        <label class="radio" style="margin-left: 0px; font-size: 25px;" @click="e => aa(e, 3, 'Картой')">
                          <input type="radio" name="answer">
                            Картой
                        </label>
                      </div>
                    </div>
                  <div v-if="fieldArrsModals == 111">

                </div>
            </div>
        </section>
        <footer class="modal-card-foot"  v-if="fieldArrsModals !== 111">

          <button :class="hideButton" @click="preventTest ">НАЗАД</button>
          <button :class="hideLeftButton" @click="nextTest">ДАЛЕЕ</button>
          <button :class="hideSend" @click="sendMail ">ОТПРАВИТЬ РЕЗУЛЬТАТ</button>
          
          <input type="text" :class="hideInput" v-model="emails" placeholder="Почта/Мобильный">
          <input type="text" :class="hideInput" v-model="name" placeholder="Имя">
        </footer>
       </div>
      <button class="modal-close is-large" aria-label="close" @click="modal ='modal'"></button>
    </div>


    <h3> О компании </h3>
    <strong> Здесь текст о компании.</strong>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus facere ea error, cum quos aut eos, deleniti, libero itaque quia consectetur ad numquam laborum quae accusamus voluptates id quas esse.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam totam atque quis eveniet impedit modi tenetur ipsam quos optio est cum possimus accusamus eaque, laborum ullam culpa ipsum animi? Quod?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, itaque vero ab dolores repellat accusamus fugit aut pariatur at quisquam est voluptate voluptas sequi qui eum accusantium numquam? Non, cum.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea possimus saepe ex corrupti iure officia hic laudantium id. Aut accusantium earum corporis voluptates esse ipsam molestiae similique minus! Ratione, temporibus.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem commodi ipsum beatae vitae autem perferendis fuga facere ex reiciendis veniam dolorum nisi, similique illum, sint atque porro soluta eius quod?
    </p>
    </div>
    
</template>

<script>
export default {
  data: () => ({
    modal: 'modal',
    fieldArrsModals: 0,
    hideButton: 'button is-warning hide',
    hideLeftButton: 'button is-warning',
    hideSend: 'hide',
    hideInput: 'hide',
    emails: '',
    name: '',

    arrItems: [],

    objectModalTest: [
      {
        title: 'Выберите тип',
        color: 'background: hsl(141, 71%, 48%);'
      },
      {
        title: 'Количество комнат',
        color: 'background: #8258ac;'
      },
      {
        title: 'Выберите цель',
        color: 'background: hsl(217, 71%, 53%);'
      },
      {
        title: 'Способ оплаты',
        color: 'background: hsl(48, 100%, 67%);' 
      },

    ]
  }),
  methods: {
    testModal() {
      this.modal = 'modal is-active';
      
    },
    sendMail() {
      if(this.emails.trim() == '' && this.name.trim() == '') {
        alert('Введите имя и данные для связи.')
      } else if(this.arrItems[3] == undefined) {
        alert('Выберите способ оплаты')
      }else {
        let data =  new FormData();
        data.append('one', this.arrItems[0])
        data.append('two', this.arrItems[1])
        data.append('three', this.arrItems[2])
        data.append('four', this.arrItems[3])
        data.append('emails', this.emails.trim())
        data.append('name', this.name.trim())
        this.$axios.$post('/api/send-mail/post/', data, { headers: {        
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).then(res => {
                  console.log(res)
                  this.arrItems = [];
                  this.fieldArrsModals = 111;
                })
      }
    },
    aa(e, index, text) {
      this.arrItems[index] = text;
      if(e.path[2].getElementsByClassName('control')[0]) {
        [...e.path[2].getElementsByClassName('control')[0].children].forEach(es => {
          setTimeout(() => {
             if(es.getElementsByTagName('input')[0].checked) {
                es.style="font-weight: bold; font-size: 25px; margin-left: 0px;";
                
              } else {
                es.style="font-weight: 400; font-size: 25px; margin-left: 0px;"
                
              }
          })
        })
      }
      
    },

    nextTest() {
      if(this.fieldArrsModals == this.objectModalTest.length - 2) {
        this.hideButton = 'hide';
        this.hideLeftButton = 'hide';
        this.hideSend = 'button is-warning';
        this.fieldArrsModals = this.fieldArrsModals + 1;
        this.hideInput = 'input is-warning mesSend';
        return 
      } 
        this.hideButton = 'button is-warning'
        this.fieldArrsModals = this.fieldArrsModals + 1;
    },
    preventTest() {
       if(this.fieldArrsModals == 0) {
        this.hideButton = 'button is-warning hide'
        return 
      } else {
        this.fieldArrsModals = this.fieldArrsModals - 1;
      }
    }
  }
  
}
</script>


<style scoped>
  h3 {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }
  .conteiner {
    padding-left: 50px;
    padding-right: 50px;
  }
  .conteiner>p {
    font-size: 16px;
  }
  .container-text-right-block {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    width: 60%;
  }
  .left-image {
    height: 100%;
  }
  .left-image-discript {
    height: 400px;
    display: flex;
    justify-content: center;
  }
  .container-icon-photo {
    display: flex;
    margin: 10px;

  }
   .container-icon-photo>p {
     margin-left: 10px;
   }
   .container-icon-photo>img {
     filter: hue-rotate(-101deg);
   }
  .container-text-right-block>h4 {
    font-size: 25px;
    font-weight: bold;
  }
  .columns {
    flex-flow: wrap;
  }
  .models__modal {
    width: 90%;
    height: 90%;
    border-radius: 8px;
  }
  .modal-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hide {
    display: none;
  }
  .mesSend {
    width: 20%;
    margin-left: 5px;
  }
  input[type*='radio']{
    display: none;
  }
  .left-image-discript>div {
        display: flex;
            width: 100%;
    justify-content: center;
  }
  label{
    font-size: 40px;
  }
  .modal-card-body>.content>.title {
    font-size: 40px;
  }
  @media screen and (min-width: 769px){
    .column.is-6 {
        flex: auto; 
        width: 50%;
    }
  }

@media(max-width: 960px) {
  .text_tester_block>div{
    width: 100%;
    margin-top: 0px;
  } 
  .text_tester_block>div:first-child{
    margin-top: 20px;
  }
  .container-icon-photo>p {
    font-size: 15px;
  }
}

@media(max-width: 700px) {
  .container-text-right-block {
    width: 100%;
  }
  .conteiner {
    padding: 40px;
  }
  .left-image-discript {
    height: auto;
  }
  .left-image-discript>div{
    height: 200px;
    display: flex;

  }
  label{
    font-size: 20px;
  }
  .modal-card-body>.content>.title {
    font-size: 20px;
  }
  .container-icon-photo>p {
    font-size: 15px;
  }
  footer{
    flex-direction: column;
  }
  .button{
    margin-top: 10px;
  }
  .mesSend{
    margin-top: 10px;
    width: 80%;
  }

}

@media(max-width: 400px) {

}


</style>