export default {
  setPosts: (state, posts) => {
    state.posts = posts
  },
  setSearchStore: (state, results) => {
    console.log(results)
    state.searchStore = results
  }
}
