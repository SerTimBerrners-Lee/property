<template>
 <div class="columns">
    <div class="column is-3"  v-for="section of sections" :key="section.id">
            <div class="card">

                <header class="card-header">
                  <p class="card-header-title">
                    {{ section.name }}
                  </p>
                  <button class="button del_section  is-small  " v-if="admin" @click="deleteSection(section.id)">
                     <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                  </button>
            </header>
                <div class="card-content">
                  <div class="content">
                    <aside class="menu">
                        <ul class="menu-list">
                          <List v-on:toggle="toggleDel($event)" :admin="admin" :posts_section="posts_section.filter(e => e.ratio == section.id)" />
                          <li class="li__ad__list" v-if="admin">
                            <input class="input in__list" type="text" v-model="counts[section.id]" placeholder="Добавить раздел">
                            <button class="button" @click="addPostList(section.id)">+</button>
                          </li>

                        </ul>
                    </aside>
                  </div>
                </div>
              </div>
    </div>

     <div class="column is-4" v-if="admin">
        <div class="card">
            <header class="card-header">
                <div class="buttons card-header-title">
                <input class="input is-rounded" type="text" v-model="newTitle" placeholder="Добавить раздел ">

                </div>
            </header>
            <div class="card-content">
                <button class="button  " v-on:click="addSection">ДОБАВИТЬ </button>
                <Errors :message="errors" />
            </div>
            </div>
        </div>
 </div>
</template>

<script>
import List from '@/components/List';
import Errors from '@/components/Errors';
export default {
    props: {
        sections: {
            type: Array
        },
        admin: {
            type: Boolean
        },
        posts_section: {
          type: Array
        }
    },
    data:()=>({
        postList: [],
        newTitle: '',
        errors: { type: false},
        counts: {},
    }),
    components: {
        List,
        Errors,
    },
    mounted() {
      this.postList = this.sections.map(e => Object({id: e.id}))
    },

    methods: {
        addPostList(id) {
          if(this.counts[id].length > 1) {
            // ДОБАВЛЯЕМ ПОДКАТАЛОГ
               this.$axios.$post(`/api/set/posts_section`, {name: this.counts[id], ratio: id},
                { headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).then(res => {
                  this.counts[id] = '';
                  this.$store.dispatch('posts_section/pushPostSections', res)
                })
          }
        },
        deleteSection(id) {
            this.$axios.$get(`/api/post/sections/del/${id}`)
            .then((res) => {
                this.$store.dispatch('sections/deleteSections', id)
            })
        },
        addSection() {
            if(this.newTitle.length < 2) return  this.errors = { type: true, message: 'Заголовок должени быть больще'}
            this.$axios.$post(`/api/post/sections/`, {title: this.newTitle},
                { headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).then(res => {
                this.newTitle = '',
                this.$store.dispatch('sections/pushSections', {
                    id: res.id,
                    name: res.title
                })
                })
        },
        toggleDel(id) {
          this.$store.dispatch('posts_section/deletePostSections', id)
        },
    }
}
</script>

<style scoped>
  .columns {
    margin: 10px;
    flex-flow: wrap;
  }
  ul{
    list-style: none;
    margin-left: 0px;
    margin-top: 0px;
  }
  header {
    background: #ff3f05;
  }
  header>p {
    color: black;
  }
  button {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .li__ad__list {
    display: flex;
    align-items: center;
  }
  .li__ad__list>input {
    width: 70%;

  }
  .li__ad__list>button {
    margin-left: 10px;
  }
  .del_section {
    margin: 10px;
  }
</style>
