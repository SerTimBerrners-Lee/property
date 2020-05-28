<template>
    <div class="container">
        <div class="info" style="margin-left: 20px;">
        <button class="button is-rounded" @click="$router.push('/')">НАЗАД</button>
        <button v-if="isAdmin()" class="button is-rounded is-success is-inverted" @click="modal = 'modal is-active'"> Добавить запись </button>
        </div>
        <div :class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Добавление нового поста</p>
                <button class="delete" aria-label="close" @click="modal = 'modal'"></button>
                </header>
                <section class="modal-card-body">
                    <label for="title_message"> Заголовок </label>
                    <input class="input is-warning" v-model="title" id="title_message" type="text" >
                    <label for="price_message"> Цена </label>
                    <input id="price_message" v-model="price" class="input is-warning" type="text" >
                    <label for="coordinates_message"> Координаты </label>
                    <input id="coordinates_message" v-model="coordinate" class="input is-warning" type="text" placeholder="51.368478, 42.073731">
                    <div class="field">
                        <div class="control">
                            <label for="discription_message"> Описание </label>
                            <textarea id="discription_message" v-model="text" class="textarea is-warning"></textarea>
                        </div>
                    </div>
                    <div class="field">
                    <div class="file is-warning is-boxed">
                        <label class="file-label">
                        <input class="file-input" type="file" @change="changeImg" ref="fileInput" name="resume">
                        <span class="file-cta">
                            <span class="file-icon">
                            <i class="fas fa-cloud-upload-alt"></i>
                            </span>
                            <span class="file-label">
                                Выбрать файл
                            </span>
                        </span>
                        </label>
                    </div>
                    </div>
                    <div class="field" ref="imageView" v-html="imageView"> </div>
                </section>
                <footer class="modal-card-foot">
                    <div >
                        <Errors :message="errors" />
                    </div>
                    <div>
                <button class="button is-warning" @click="addPost()">Добавить</button>
                <button class="button" @click="removeFields">Очистить</button>
                </div>
                </footer>
            </div>
        </div>

        <article class="message is-warning" v-if="postList().length == 0">
            <div class="message-body">
                <strong>Постов нет</strong>
            </div>
        </article>

        <div v-else>
            <div class="columns">
                <div class="column is-3" v-for="post of postList()">
                     <div class="card ">
                        <img class="image_post" :src="JSON.parse(post.image).length > 0 ? JSON.parse(post.image)[0].href : '/default.png'" >

                             <div class="card-content">
                            <div class="content">
                                <p class="subtitle"> <strong> {{ post.name }} </strong> </p>
                                <p class="subtitle"> Цена:  {{ post.price }}  </p>
                                <button class="button is-danger is-small" v-if="isAdmin()" @click="delPost(post.id)">УДАЛИТЬ</button>
                                <br>
                                <button class="button is-warning is-outlined" @click="detalsPost(post.id)">Подробнее</button>

                            </div>
                             </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Errors from '@/components/Errors';

export default {
    data: () => ({
        modal: 'modal',
        title: '',
        text: '',
        price: '',
        coordinate: '',
        imageView: '',
        imagesArr: [],
        errors: { type: false }
    }),
    components: {
        Errors
    },
    async asyncData({store, params}) {
        if(store.getters['post/id'] !== params.id) {
            await store.dispatch('post/fetch', params.id)
        }
    },
    methods: {
        postList(){
            return this.$store.getters['post/posts']
        },
        isAdmin() {
            return this.$store.getters['auth/cokk']
        },
        addPost() {
             if(this.title ==  '' || this.text == '') {
                this.errors = { type: true, message: 'Заголовок и описание должны присутствовать'}
                return
            }
            this.modal = 'modal'
            let ratio = this.$route.params.id;
            let data = new FormData();

            data.append('ratio', ratio)
            data.append('title', this.title)
            data.append('text', this.text)
            data.append('price', this.price)
            data.append('coordinate', this.coordinate)

            if(this.imagesArr) {
                this.imagesArr.forEach((el, index, arr) => {
                    data.append(`image${index}`, el, `location${Math.floor(Math.random(1, 99) * 19999 * 9889)}${el.name.replace(/ /g,'121')}`)
            })

            this.$axios.$post(`/api/add/post/`, data,
                { headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
            .then((res) => {
                this.$store.dispatch('post/pushPost', res)
                this.title = ''
                this.text = ''
                this.price = ''
                this.coordinate = ''
                this.imagesArr = []
                this.imageView = ''
            })
        }

        },
        changeImg() {
            let image = this.$refs.fileInput
            let reader = new FileReader();
            let prom = new Promise((res, rej) => {
                reader.onload = function(e) {
                    res(`<img src="${e.target.result}" style="width:100px; height: 80px; margin: 10px;">`)
                }
            })

            prom.then((res) => {
                this.imageView += res
            })
            reader.readAsDataURL(image.files[0])
            this.imagesArr.push(image.files[0])

        },
        removeFields() {
            this.title = ''
            this.text = ''
            this.price = ''
            this.coordinate = ''
            this.imagesArr = []
            this.imageView = ''
        },
        delPost(id) {
            this.$axios.$delete(`/api/delete/post/${id}`)
            .then(res => {
               this.$store.dispatch('post/deletePost', res.id)
            })
        },
        detalsPost(id) {
            this.$router.push('/post/' + id)
        }
    }
}
</script>

<style scoped>
.info {
    width: 100%;

    margin-bottom: 30px;
}
input {
    margin-bottom: 20px;
}
.columns {
    flex-flow: wrap;
}
.image_post {

}
button {
    margin-bottom: 5px
}
.modal-card-foot {
    display: flex;
    flex-direction: column-reverse;
}
.modal-card-foot>div {
    margin: 10px;
    width: 100%;
}
.column>.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
}
.column>.card>img{
    height: 170px;
}

@media (min-width: 1250px) {
    .column>.card>img{
        width:100%;

    }
}
@media(max-width: 1000px) {
    .column>.card>img{
        height: 110px;
    }
    .columns{
        padding-left: 20px;
        padding-right: 20px;
    }
}

@media(max-width: 689px) {

    .column{
        padding-left: 40px;
        padding-right: 40px;
    }
    .column>.card>img{
        width: 100%;
        height: 250px;
    }
    .column>.card{
        display: block;
    }
    .subtitle>strong{
        font-size: 30px;
    }
}
@media(max-width: 450px) {

    .column{
        padding-left: 30px;
        padding-right: 30px;
    }
    .column>.card>img{
        width: 100%;
        height: 200px !important;

    }
}


</style>

<style >
  body {
    background: url('../../assets/back.jpg');
    min-height: 100vh;
  }
</style>
