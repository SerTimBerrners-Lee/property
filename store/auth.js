export const state = () => ({
    cookies: false
})

export const mutations = {
    setCookie(state) {
        state.cookies = true
    },
    logout(state) {
        state.cookies = false
    }
} 

export const actions = {
    auth({commit}) {
        commit('setCookie')
    },
    logout({commit}) {
        commit('logout')
    }
}

export const getters = {
    cokk: s =>  s.cookies
}