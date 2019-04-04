export default {
  name: 'Goods-Add',
  data () {
    return {
      step: 0,
      categoryList: [],
      categorySelected: [],
      categoryProps: {value: 'cat_id', label: 'cat_name'},
      addFrom: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      addRules: {
        goods_name: [{required: true, message: '商品名称必填', trigger: 'blur'}],
        goods_cat: [{required: true, message: '必须选三级分类', trigger: 'change'}],
        goods_price: [{required: true, message: '商品价格必填', trigger: 'blur'}],
        goods_number: [{required: true, message: '商品数量必填', trigger: 'blur'}],
        goods_weight: [{required: true, message: '商品重量必填', trigger: 'blur'}]
      },
      manyAttrs: [],
      onlyAttrs: [],
      uploadAction: this.$http.defaults.baseURL + 'upload/',
      uploadHeaders: {
        Authorization: sessionStorage.getItem('token')
      },
      uploadPreviewVisible: false,
      uploadPreviewSrc: ''
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    beforeLeave (now, old) {
      if (+old === 0) {
        return new Promise((resolve, reject) => {
          this.$refs.addForm.validate(valid => {
            if (!valid) return reject(new Error('校验失败'))
            this.step = +now
            return resolve()
          })
        })
      } else {
        this.step = +now
      }
    },
    categoryChange (value) {
      // 给form表单对象中的goods_cat赋值
      if (this.categorySelected.length === 3) {
        this.addFrom.goods_cat = this.categorySelected.join(',')
      } else {
        this.addFrom.goods_cat = ''
      }
    },
    async getCategoryList () {
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('查询分类失败')
      this.categoryList = data
    },
    async getAttr (type) {
      if (this.categorySelected.length !== 3) return false
      let {data: {data, meta}} = await this.$http.get(`categories/${this.categorySelected[2]}/attributes`, {
        params: {sel: type}
      })
      if (meta.status !== 200) return this.$message.error('查询属性失败')
      if (type === 'many') {
        data = data.filter(item => item.attr_vals.length > 0)
        data.forEach((item, i) => {
          item.attr_vals = item.attr_vals.split(' ')
        })
      }
      this[type + 'Attrs'] = data
    },
    tabClick (tab) {
      if (+tab.index === 1) {
        this.getAttr('many')
      }
      if (+tab.index === 2) {
        this.getAttr('only')
      }
    },
    // 上传成功
    handleSuccess (response) {
      this.addFrom.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 图片预览
    handlePreview (file) {
      this.uploadPreviewSrc = file.response.data.url
      this.uploadPreviewVisible = true
    },
    // 图片删除
    handleRemove (file) {
      const index = this.addFrom.pics.findIndex(item => file.response.data.tmp_path === item.pic)
      this.addFrom.pics.splice(index, 1)
    },
    // 保存
    async save () {
      this.addFrom.attrs = [...this.manyAttrs, ...this.onlyAttrs]
      const {data: {meta}} = await this.$http.post('goods', this.addFrom)
      if (meta.status !== 201) return this.$message.error(meta.msg || '添加失败')
      this.$message.success('添加成功')
      this.$router.push('/goods')
    }
  }
}
