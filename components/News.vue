<template>
  <div>
    <div class="conteiner">
      <p class="title">  Последние новости {{ newsArr.length == 0 ? getNews() : ''}} </p>
        <div class="tile">
            <div class="tile is-4 box" v-for="news of newsArr">
              <p class="title">{{ news.title }}</p>
              <p class="dataNews"> {{ news.date.split('T')[0] }}</p>
              <p class="content">
                {{ news.text.substr(0, 400) }}  <a class="linkNews" @click="fullNews(news)"> Читать полностью... </a>
              </p>

            </div>
        </div>
         <p class="linkAllNews" v-on:click="$router.push('/NewsList')"> Перейти ко всем новостям</p>
    </div>

    <div :class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"> {{ titleModal }} </p>
          <button class="delete" aria-label="close" v-on:click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p style='padding-bottom: 15px; font-size: small;'>Дата создания: {{ dateModal.split('T')[0] }}</p>
          <p> {{ textModal }} </p>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    admin: Boolean,

  },
  data: () => ({
    newsArr: [],
    modal: 'modal',
    titleModal: '',
    textModal: '',
    dateModal: '',

  }),
  methods: {
      getNews() {
        this.$axios.get('/api/news/get-col/' + 3).then(res => {
          this.newsArr = res.data;
          console.log('INIt')
        })
      },
      fullNews(news) {
        this.modal = 'modal is-active';
        this.titleModal = news.title;
        this.textModal = news.text;
        this.dateModal = news.date;
      },
      closeModal() {
        this.modal = 'modal';
        this.titleModal = '';
        this.textModal = '';
        this.dateModal = '';
      }
  }
}
</script>

<style scoped>
  .conteiner {
    padding: 15px;
  }
  .box {
    margin: 5px;
    display: flex;
    flex-direction: column;
  }
  .dataNews {
    padding-bottom: 10px;
  }
  .linkNews {
    font-size: 20px;
    color:#ff3f05;

    box-shadow: -14px 15px 28px 10px white;
  }
  .linkAllNews {
    font-size: 24px;
    padding: 20px;
    margin-top: 20px;
    color: #ff3f05;
  }
  .linkAllNews:hover {
    cursor: pointer;
    color: brown;
  }
  .modal-card-body {
    border-radius: 10px;
  }
  .modal-card-head {
    background: none;
    border: none;
  }
  .modal-card-title {
    color: white;
    font-weight: bold;
  }
  .delete {
    background: black;

  }
</style>
