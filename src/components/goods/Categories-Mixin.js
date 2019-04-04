export default {
  name: 'Categories',
  data () {
    return {
      categoriesList: [],
      params: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      addDialogFormVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addRules: {
        cat_name: [{required: true, message: '分类名称必须填写', trigger: 'blur'}]
      },
      categoryList: [],
      categorySelected: [],
      categoryProps: {value: 'cat_id', label: 'cat_name'}
    }
  },
  mounted () {
    this.getCategoriesList()
  },
  methods: {
    async getCategoriesList () {
      const {data: {data, meta}} = await this.$http.get('categories', {params: this.params})
      if (meta.status !== 200) return this.$message.error('获取分类信息失败')
      // 处理数据成树状表格要求的数据结构
      data.result.forEach(item1 => {
        item1.id = parseInt('' + item1.cat_id)
        if (item1.children && item1.children.length) {
          item1.children.forEach(item2 => {
            item2.id = parseInt('' + item1.cat_id + item2.cat_id)
            if (item2.children && item2.children.length) {
              item2.children.forEach(item3 => {
                item3.id = parseInt('' + item1.cat_id + item2.cat_id + item3.cat_id)
              })
            }
          })
        }
      })
      this.categoriesList = data.result
      this.total = data.total
    },
    changePager (newPage) {
      this.params.pagenum = newPage
      this.getCategoriesList()
    },
    categoryChange () {
      const len = this.categorySelected.length
      if (len === 0) {
        this.addForm.cat_level = 0
        this.addForm.cat_pid = 0
      } else {
        this.addForm.cat_level = len
        this.addForm.cat_pid = this.categorySelected[len - 1]
      }
    },
    async showAddDialog () {
      this.addDialogFormVisible = true
      const {data: {data, meta}} = await this.$http.get('categories', {params: {type: 2}})
      if (meta.status !== 200) return this.$message.error('获取分类信息失败')
      this.categoryList = data
    },
    addCategory () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error(meta.msg || '添加分类失败')
          this.$message.success('添加分类成功')
          this.getCategoriesList()
          this.addDialogFormVisible = false
        }
      })
    },
    addDialogClose () {
      this.$refs.addForm.resetFields()
      this.addForm.cat_level = 0
      this.addForm.cat_pid = 0
      this.categorySelected = []
    },
    delCategory (id) {
      this.$confirm('您确认删除该分类吗？', '温馨提示', {
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$http.delete(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error(meta.msg || '删除分类失败')
        this.$message.success(meta.msg || '删除分类成功')
        this.getCategoriesList()
      }).catch(() => {
        // this.$message.info('删除分类取消')
      })
    }
  }
}
