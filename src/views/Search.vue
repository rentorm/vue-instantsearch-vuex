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

export default {
  asyncData({store, route}) {
    return store.dispatch(`getSearchStore`, route)
  },
  computed: {
    searchStore: {
      get() {
        return this.$store.state.searchStore
      },
      set(value) {
        this.$store.commit('setSearchStore', value)
      }
    }
  },
  watch: {
    '$route'() {
      this.searchStore.query = this.$route.params.query
        ? this.$route.params.query
        : ''
    },
    'searchStore.query'(to) {
      if (to.length === 0) {
        this.$router.push({ name: 'search' })
      } else {
        this.$router.push({ name: 'searchQuery', params: { query: to } })
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
  h3
    margin 20px 0 15px

  .posts
    max-width 600px

  .post
    padding-bottom 15px
    border-bottom 1px solid #eee
</style>
