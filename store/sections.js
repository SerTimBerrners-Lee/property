export const state = () =>  ({
    sections: []
})

export const mutations = {
    setSections(state, sections) {
        state.sections = sections
    },
    addSections(state, sections) {
        state.sections.push(sections)
    },
    deleteSections(state, id) {
        state.sections = state.sections.filter(el => el.id !== id)
    }
}

export const actions = {
    async fetch({commit}) {
        const sections = await this.$axios.$get(`/api/get/sections/`)
        commit('setSections', sections)
    },
    pushSections({commit}, post) {
        commit('addSections', post)
    },
    deleteSections({commit}, id) {
        commit('deleteSections', id)
    }
}

export const getters = {
    sections: s => s.sections
}