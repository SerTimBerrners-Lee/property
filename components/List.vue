<template>
    <div>
        <li> <button class="button is-small is-rounded is-outlined" v-if="admin && posts_section.length > 0" @click="sedit()">{{isEdit ? 'Cохранить' : 'Редактировать'}}</button>  </li>
        <li v-for="post of posts_section">
            <a class="a__href" :contenteditable="isEdit" ref="title" :data-text="post.id" @click="ViewListPost(isEdit, post.id)"> {{ post.name }} </a>
            <button class="button is-danger is-rounded is-small is-outlined" v-if="admin" @click="delPostSection(post.id)">Удалить</button>   
        </li>
    </div>
</template>

<script>
export default {
    props: ['posts_section', 'admin'],
    data: () => {
       return {
           isEdit: false,
           arrs: []
       }
    },
    methods: {
        delPostSection(id) {
            this.$axios.$post(`/api/delete/posts_section`, {id: id}, 
            { headers: {        
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            })
            .then((res) => {
                this.$emit('toggle', res.id)
            })
        },
        sedit() {
            // Обнавляем таблицу, после ответа обновляем стор
            this.isEdit = !this.isEdit;
            
            this.isEdit ?
            this.$refs.title.map((e) => {
               this.arrs.push(e.text)
            })
            :
            this.arrs.forEach((e, index) => {
                if(e != this.$refs.title[index].text) {
                   let name = this.$refs.title[index].text;
                   let id = this.$refs.title[index].dataset.text;
                    this.$axios.$post(`/api/upload/posts_section`, {id, name}, 
                        { headers: {        
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                        })
                    .then((res) => {
                        
                    })
                }
                if(index === this.arrs.length - 1) this.arrs = []
            })
        },
        ViewListPost(edit, id) {
            if(edit) return 

            this.$router.push(`/posts/${id}`)
        }

    }
}
</script>

<style scoped>
    button{
        margin-top: 5px;
    }
    .a__href {
        width: 80%;
        font-size: 20px;
    }
    li{
        display: flex;
    }
</style>
