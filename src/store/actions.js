import http from 'axios'
import { BASE_URL } from '@root/webconfig'
import {
  createFromAlgoliaCredentials,
  FACET_OR
} from 'vue-instantsearch'

http.defaults.baseURL = BASE_URL

export default {
  getPosts: ({ commit, state }) => {
    return http.get('posts').then((response) => {
      if (response.statusText === 'OK') {
        commit('setPosts', response.data)
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  getSearchStore: ({commit}, route) => {
    let store1
    store1 = createFromAlgoliaCredentials(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
    )
    store1.indexName = 'ikea'
    store1.query = route.params.query ? route.params.query : ''
    store1.addFacet('colors', FACET_OR)
    store1.highlightPreTag = '<mark>'
    store1.highlightPostTag = '</mark>'
    store1.start()
    store1.refresh()
    return store1.waitUntilInSync().then(() => {
      commit('setSearchStore', store1.serialize())
    }).catch((error) => {
      console.log(error)
    })
  }
}
