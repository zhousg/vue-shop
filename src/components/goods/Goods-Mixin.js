export default {
  name: 'Goods',
  data () {
    return {
      goodsList: [],
      params: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const {data: {data, meta}} = await this.$http.get('/goods', {params: this.params})
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.goodsList = data.goods
      this.total = data.total
    },
    changeSearch () {
      this.params.pagenum = 1
      this.getGoodsList()
    },
    changePager (newPage) {
      this.params.pagenum = newPage
      this.getGoodsList()
    },
    toGoodsAdd () {
      this.$router.push(`/goods/add/`)
    },
    toGoodsEdit (id) {
      this.$router.push(`/goods/edit/${id}`)
    },
    delGoods (id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$http.delete(`goods/${id}`)
        if (meta.status !== 200) return this.$message.error('删除商品失败!')
        this.$message.success('删除商品成功!')
        this.getGoodsList()
      }).catch(err => {
        if (err !== 'cancel') this.$message.info('删除商品失败!')
      })
    }
  }
}
