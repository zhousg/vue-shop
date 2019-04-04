export default {
  name: 'Home',
  data () {
    return {
      menu: [],
      collapse: true,
      active: location.hash.replace('#', ''),
      iconArr: ['fa-user-circle-o', 'fa-id-card-o', 'fa-product-hunt', 'fa-file', 'fa-area-chart']
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    getMenus () {
      this.$http.get('menus')
        .then(res => {
          const {data, meta} = res.data
          if (meta.status !== 200) return this.$message.error(meta.message)
          this.menu = data
        })
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
