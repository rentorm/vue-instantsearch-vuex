<template>
  <div class="vwp-single">
    <ais-index :searchStore="searchStore" :auto-search="false">
      <ais-search-box placeholder="Find products"/>
      <ais-refinement-list attribute-name="colors"></ais-refinement-list>
      <ais-results>
        <template slot-scope="{ result }">
          <div>
            <ais-highlight :result="result" attribute-name="name"></ais-highlight>
          </div>
        </template>
      </ais-results>
    </ais-index>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import {
  createFromAlgoliaCredentials,
  createFromSerialized,
  FACET_OR
} from 'vue-instantsearch'

import { mapGetters } from 'vuex'

let store1

export default {
  computed: {
    ...mapGetters({
      searchStore: 'searchStore'
    })
  },
  asyncData({store, route}) {
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
      store.dispatch(`searchStore`, store1.serialize())
    })
  },
  beforeMount() {
    if (!window.__INITIAL_STATE__) {
      throw new Error('Not state was found.')
    }
    this.searchStore = createFromSerialized(
      window.__INITIAL_STATE__.searchStore
    )
  },
  watch: {
    '$route'() {
      this.searchStore.query = this.$route.params.query
        ? this.$route.params.query
        : ''
    },
    'searchStore.query'(to) {
      if (to.length === 0) {
        this.$router.push({ name: 'map' })
      } else {
        this.$router.push({ name: 'mapSearch', params: { query: to } })
      }
    }
  }

}
</script>
