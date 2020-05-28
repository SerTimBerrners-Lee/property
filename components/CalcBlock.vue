<template>
  <div>
    <div class="columns">
      <div class="column is-6 left">
        <h2 class="title is-3"> Рассчитайте ипотеку</h2>
        <p class="button" @click="modals"> Открыть ипотечный калькулятор</p>
      </div>
      <div class="column is-6 right">
        <div>
         <h2 class="title is-3"> Контакты </h2>
         <p class="subtitle">Телефон: 8(900)-999-99-99</p>
         <p class="subtitle">Почта: aeeq@gmail.com</p>
        </div>
     </div>
    </div>

  <div :class="modal">
    <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="headerImage" @click="src = 'https://ipoteka.domclick.ru/mland/medusa?mode=medusa&utm_source=domclick&utm_medium=blackbutton&_ga=2.89392283.1807980798.1587158365-1542132700.1586267639'">
             <img src="~/assets/sber.jpeg" alt="">
            <span class="ipoteca">
              Дом Клик
            </span>
          </div>
          <hr class="hr">
           <div class="headerImage" @click="src= 'https://www.vtb.ru/personal/ipoteka/ipotechnyj-kalkulyator/' ">
             <img src="~/assets/vtb.jpg" alt="">
            <span class="ipoteca">
              ВТБ
            </span>
           </div>
           <hr class="hr">
            <div class="headerImage" @click="src = 'http://www.rshb.ru/natural/loans/mortgage_all/ipotechnyj-kalkulyator/&output=embed'">
             <img src="~/assets/ross.jpg" alt="">
            <span class="ipoteca">
              Россельхоз Банк
            </span>
            </div>


          <button class="delete is-large" aria-label="close" v-on:click="modal = 'modal'"></button>
        </header>
        <section class="modal-card-body">
         <iframe :src="src" seamless width="100%" height="100%" frameborder="0">

         </iframe>
        </section>
        <footer class="modal-card-foot">

       </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: 'modal',
    src: 'https://ipoteka.domclick.ru/mland/medusa?mode=medusa&utm_source=domclick&utm_medium=blackbutton&_ga=2.89392283.1807980798.1587158365-1542132700.1586267639'
  }),
  methods: {
    modals() {
      this.modal = 'modal is-active'
    }
  }
}
</script>

<style scoped>
  .left{
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .right {
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }
  .right>div {
      border-left: 1px solid #ff3f05;
      display: flex;
      width: 100%;
      justify-content: center;
      flex-direction: column;
      align-items: center;
  }
  .columns {
    flex-flow: wrap;
  }
  .button {
    background-color: #ff3f05;
    border: none;
    color: black;
    font-size: 22px;
    box-shadow: 1px 1px 16px 0px #ff3f05;
  }
  .subtitle{
    margin: 5px;
  }
  .modal-card {
    width: 93%;
    height: 95%;
  }
  .headerImage>img {
    height: 50px;
    border-radius: 32px;
  }
  .headerImage{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
  }
  .headerImage:hover {
    background: rgb(192, 192, 192);
  }
  .headerImage>span {
    font-weight: bold;
  }
  footer{
    margin: 0px;
    padding: 1px;
    display: flex;
    justify-content: center;

  }
  .modal-card-body {
    padding: 0px;
  }
  .modal-card-head {
    padding: 0px;
  }
  .hr {
    height: 60%;
    width: 2px;
    border-radius: 100px;
    box-shadow: 1px 1px 4px 1px #ff3f05;
    background: #ff3f05;
    margin: 10px;
  }
  .delete {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  @media(max-width: 1000px) {
    .headerImage>img {
      height: 25px;
      border-radius: 32px;
    }
    .headerImage>span{
      font-size: 12px;
    }
    .headerImage{
      padding: 5px;
    }
    .modal-card {
      width: 100%;
    }
    h2.title {
      font-size: 15px;
    }
    p.button{
      font-size: 10px;
    }
    .left {
      height: auto;
    }
    .right {
      height: auto;
    }
    .subtitle {
      font-size: 10px;
    }
  }
</style>
