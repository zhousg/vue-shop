export default {
  name: 'Users',
  data () {
    const checkMobile = (rule, value, cb) => {
      if (!/^1[34578]\d{9}$/.test(value)) return cb(new Error('手机号格式不对'))
      cb()
    }
    return {
      userList: [],
      params: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不对', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不对', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      userInfo: {},
      roleList: [],
      roleId: null,
      roleDialogFormVisible: false
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const {data: {data, meta}} = await this.$http.get('/users', {params: this.params})
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.userList = data.users
      this.total = data.total
    },
    changePager (newPage) {
      this.params.pagenum = newPage
      this.getUserList()
    },
    async changeState (id, newState) {
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$message.success('修改状态成功')
    },
    changeSearch () {
      this.params.pagenum = 1
      this.getUserList()
    },
    addUser () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('/users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加用户失败')
          this.$message.success('添加用户成功')
          this.addDialogFormVisible = false
          this.getUserList()
        }
      })
    },
    addAfterClosed () {
      // 关闭后重置表单及校验
      this.$refs.addForm.resetFields()
    },
    async showEditDialog (id) {
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('查询用户失败')
      this.editForm = data
      this.editDialogFormVisible = true
    },
    editUser () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('编辑用户失败')
          this.$message.success('编辑用户成功')
          this.editDialogFormVisible = false
          this.getUserList()
        }
      })
    },
    editAfterClosed () {
      // 关闭后重置表单及校验
      this.$refs.editForm.resetFields()
    },
    openDelConfirm (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除用户失败')
        this.$message.success('删除用户成功')
        this.getUserList()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    async showRoleDialog (userInfo) {
      this.userInfo = userInfo
      const {data: {data, meta}} = await this.$http.get(`roles`)
      if (meta.status !== 200) return this.$message.error('查询可分配角色失败')
      this.roleList = data
      this.roleDialogFormVisible = true
    },
    async roleUser (id) {
      if (!this.roleId) return this.$message.error('未选择角色')
      const {data: {meta}} = await this.$http.put(`users/${id}/role`, {rid: this.roleId})
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleList = []
      this.roleDialogFormVisible = false
      this.getUserList()
    }
  }
}
