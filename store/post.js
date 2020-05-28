export const state = () =>  ({
    posts: [],
    id: null
})

export const mutations = {
    setPosts(state, posts) {
        state.posts = posts
    },
    addPosts(state, post) {
        state.posts.push(post)
    },
    deletePost(state, id) {
        state.posts = state.posts.filter(el => el.id !== id)
    }
}

export const actions = {
    async fetch({commit}, id) {
        const posts = await this.$axios.$get(`/api/get/posts/${id}`)
        commit('setPosts', posts)
    },
    pushPost({commit}, post) {
        commit('addPosts', post)
    },
    deletePost({commit}, id) {
        commit('deletePost', id)
    }
}

export const getters = {
    posts: s => s.posts,
    id: d => d.id
}