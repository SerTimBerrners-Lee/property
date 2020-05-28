export const state = () =>  ({
    posts_section: [],
})

export const mutations = {
    setPostSections(state, posts_section) {
        state.posts_section = posts_section
    },
    addPostSections(state, post) {
        state.posts_section.push(post)
    },
    deletePostSections(state, id) {
        state.posts_section = state.posts_section.filter(el => el.id != id)
    }
}
 
export const actions = {
    async fetch({commit}) {
        const res = await this.$axios.$get(`/api/get/posts_section/`)
        commit('setPostSections', res)
    },
    pushPostSections({commit}, post) {
        commit('addPostSections', post)
    },
    deletePostSections({commit}, id) {
        commit('deletePostSections', id)
    }
}

export const getters = {
    posts_section: s => s.posts_section
}