export default {
  name: 'Params',
  data () {
    return {
      disabled: true,
      activeName: 'many',
      manyAttrs: [],
      onlyAttrs: [],
      categoryList: [],
      categorySelected: [],
      categoryProps: {value: 'cat_id', label: 'cat_name'},
      dialogFormVisible: false,
      addForm: {
        attr_name: ''
      },
      addRules: {
        attr_name: [{required: true, message: '参数名称必须填写', trigger: 'blur'}]
      }
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const {data: {data, meta}} = await this.$http.get('categories', {params: {type: 3}})
      if (meta.status !== 200) return this.$message.error('获取分类级联数据失败')
      this.categoryList = data
    },
    categoryChange () {
      this.getData()
    },
    handleClick () {
      this.getData()
    },
    async getData () {
      if (this.categorySelected.length === 3) {
        const id = this.categorySelected[2]
        const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes?sel=${this.activeName}`)
        if (meta.status !== 200) return this.$message.error('获取分类参数数据失败')
        data.forEach(item => {
          item.showInput = false
          if (this.activeName === 'many') {
            item.valueInput = ''
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          }
        })
        this[this.activeName + 'Attrs'] = data
        this.disabled = false
      } else {
        this.categorySelected = []
        this.manyAttrs = []
        this.onlyAttrs = []
        this.disabled = true
      }
    },
    saveAttr () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          this.dialogFormVisible = false
          // 提交数据
          const id = this.categorySelected[2]
          // 添加参数
          this.addForm.attr_sel = this.activeName
          this.addForm.attr_vals = ''
          const {data: {meta}} = await this.$http.post(`categories/${id}/attributes`, this.addForm)
          if (meta.status !== 201) return this.$message.error(meta.msg || '添加参数失败')
          this.$message.success('添加参数成功')
          this.getData()
        }
      })
    },
    showAddAttrValue (row) {
      row.showInput = true
      // 待视图渲染完毕后执行获取焦点操作
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    async closeManyAttrsValue (row, i) {
      const id = this.categorySelected[2]
      row.attr_vals.splice(i, 1)
      const {data: {meta}} = await this.$http.put(`categories/${id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(' ')
      })
      if (meta.status !== 200) return this.$message.error(meta.msg || '操作失败')
      this.$message.success('操作成功')
    },
    async addManyAttrValue (row) {
      if (row.valueInput) {
        row.attr_vals.push(row.valueInput)
        // 提交 修改的属性值  注意：是字符串类型且以,号拼接
        // 请求URL categories/:id/attributes/:attrId
        // 发送参数 attr_name  attr_sel  attr_vals
        const id = this.categorySelected[2]
        const {data: {meta}} = await this.$http.put(`categories/${id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(' ')
        })
        if (meta.status !== 200) return this.$message.error(meta.msg || '操作失败')
        this.$message.success('操作成功')
      }
      row.showInput = false
      row.valueInput = ''
    },
    async addOnlyAttrValue (row) {
      if (row.attr_vals) {
        const id = this.categorySelected[2]
        const {data: {meta}} = await this.$http.put(`categories/${id}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals
        })
        if (meta.status !== 200) return this.$message.error(meta.msg || '操作失败')
        this.$message.success('操作成功')
      }
      row.showInput = false
    },
    async delAttr (attrId) {
      const confirm = await this.$confirm('您是否删除该属性', '温馨提示', {type: 'warning'}).catch(() => '')
      if (confirm) {
        const id = this.categorySelected[2]
        const {data: {meta}} = await this.$http.delete(`categories/${id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error(meta.msg || '删除失败')
        this.$message.success('删除成功')
        this.getData()
      }
    }
  }
}
