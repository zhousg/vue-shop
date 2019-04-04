export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      const {data: {data, meta}} = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取权限信息失败')
      this.rightsList = data
    }
  }
}
