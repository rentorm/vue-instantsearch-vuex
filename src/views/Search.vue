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

import { mapGetters, mapActions } from 'vuex'

const setSearchStore = (store, route) => {
  return store.dispatch(`getSearchStore`, route)
}

export default {
  computed: {
    ...mapGetters({
      searchStore: 'searchStore'
    })
  },
  asyncData: setSearchStore,
  methods: {
    ...mapActions({
      getSearchStore: 'getSearchStore'
    }),
    loadSearchData() {
      return this.setSearchStore(this.$store, this.$route)
    }
  },
  created() {
    this.loadSearchData()
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
