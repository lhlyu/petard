export default {
  state: {
    article: {
      id: 0,
      title: '',
      summary: '',
      cover: '',
      top: 0,
      tags: [],
      content: '',
      kind: 0,
      storeMode: 0,
      state: 0,
      commentState: 0
    }
  },
  mutations: {
    SET_ARTICLE (state, val) {
      state.article = val || {
        id: 0,
        title: '',
        summary: '',
        cover: '',
        top: 0,
        tags: [],
        content: '',
        kind: 0,
        storeMode: 0,
        state: 0,
        commentState: 0
      }
    }
  }
}
