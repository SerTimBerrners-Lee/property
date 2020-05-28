<template>
<div>

    <article class="message is-warning"  v-if="message.type">
        <div class="message-header">
            <p>Предупреждение</p>
            <button class="delete" @click="message.type = false" aria-label="delete"></button>
        </div>
        <div class="message-body">
            {{message.message}}
        </div>
    </article>

    </div>
</template>

<script>
// 17=00 28 03 20 - 
export default {
    props: ['message'],
    methods: {

    }
}
</script>

<style scoped>
    .errors {
        border: 1px solid #ffbb00;
        padding-left: 10px;
        border-radius: 10px;
        background-color: #f1eda5;
        box-shadow: 1px 1px 7px 1px cadetblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
        margin: 10px;
        padding: 15px;
    }
    .errors>p {
        font-size: 17px;
        font-weight: 500;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    }
    .errors>span{
        color: #ffbb00;
        font-size: 17px;
        font-weight: 500;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        box-shadow: 1px 0px 3px 4px;
        cursor: pointer;
        padding-left: 5px;
        border-radius: 2px;
        padding-right: 5px;
    }
    .errors>span:hover {
        font-size: 18px;
        background-color: aliceblue;
    }

</style>