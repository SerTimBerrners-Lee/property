<template>
  <div style="padding: 10px" >
    <Errors :message="message" />
      <div class="AddblockAdmin" v-if="isAdmin">
        <input class="input" type="text" v-model="title" placeholder="Заголовок Новости">
        <textarea class="textarea" v-model="texterra" placeholder="Текст Новости"></textarea>
        <button v-on:click="addNews" class="button">Добавить новость</button>
      </div>
      <div class="tile count">
      <div class="tile is-12 box" v-for="news of NewsList()">
        <p class="title">{{ news.title }} <a v-if="isAdmin" class="delete is-large" v-on:click='deletePost(news.id)'></a> </p>
        <p class="dataNews"> {{ news.date.split('T')[0] }} </p>
        <p class="content">
          {{ news.text }}
        </p>
      </div>


    </div>
  </div>
</template>

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
  .count {
    display: flex;
    justify-content: column;
    flex-wrap: wrap;
  }
  .AddblockAdmin * {
    margin-top: 10px;
  }
</style>

<script>
import Errors from '@/components/Errors';
export default {
  data : () => ({
    texterra: '',
    title: '',
    message: {type: false}
  }),
  components: {
    Errors
  },
  methods: {
    addNews(){
      if(this.title.trim() == '' || this.texterra.trim() == '') {
         return this.message ={type: true, message: 'Заголовок и текст новости должны быть заполнены'}
      }

      let data = new FormData()
      data.append('title', this.title)
      data.append('text', this.texterra)

      this.$axios.$post('/api/add-news', data,
      { headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      .then(res => {
        let date = '' + new Date().getFullYear() + '-'+ (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate();
        this.texterra = '';
        this.title = '';
        this.$store.dispatch('news/pushNews',
        { id: res.id.insertId, title: res.title, text: res.text, date: String(date) })
      })
    },
    NewsList() {
      return this.$store.getters['news/news'];
    },
    deletePost(id) {
      this.$axios.$delete('/api/delete-news/' + id)
      .then(res => {
        this.$store.dispatch('news/deleteNews', id)
      })
    }
  },

  computed: {
    isAdmin(){
      return this.$store.getters['auth/cokk']
    }
  },
  async asyncData({store}) {
    if(store.getters['news/news'].length == 0) {
      await store.dispatch('news/fetch')
    }
  }
}
</script>

<style >
  body {
    background: url('../assets/back.jpg');
  }
</style>
