export const state = () =>  ({
  news: []
})

export const mutations = {
  setNews(state, news) {
      state.news = news
  },
  addNews(state, news) {
      state.news.push(news)
  },
  deleteNews(state, id) {
      state.news = state.news.filter(el => el.id !== id)
  }
}

export const actions = {
  async fetch({commit}) {
      const news = await this.$axios.$get(`/api/get/news/`)
      commit('setNews', news)
  },
  pushNews({commit}, news) {
      commit('addNews', news)
  },
  deleteNews({commit}, id) {
      commit('deleteNews', id)
  }
}

export const getters = {
  news: n => n.news
}
