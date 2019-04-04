export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [{required: true, message: '角色名称必须填写', trigger: 'blur'}],
        roleDesc: [{required: true, message: '角色说明必须填写', trigger: 'blur'}]
      },
      editDialogFormVisible: false,
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      editRules: {
        roleName: [{required: true, message: '角色名称必须填写', trigger: 'blur'}],
        roleDesc: [{required: true, message: '角色说明必须填写', trigger: 'blur'}]
      },
      rightsDialogFormVisible: false,
      rightsData: [],
      rightsChecked: [],
      rightsRoleId: null
    }
  },
  mounted () {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList () {
      const {data: {data, meta}} = await this.$http.get('/roles')
      if (meta.status !== 200) return this.$message.error('获取角色信息失败')
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.rolesList = data
    },
    // 显示添加弹窗
    showAddDialog (id) {},
    // 提交添加请求
    addRole () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          this.getRolesList()
          this.addDialogFormVisible = false
        }
      })
    },
    // 关闭添加弹窗后的回调
    addAfterClosed () {
      this.$refs.addForm.resetFields()
    },
    // 显示编辑弹窗
    async showEditDialog (id) {
      this.editDialogFormVisible = true
      const {data: {data, meta}} = await this.$http.get(`roles/${id}`)
      if (meta.status !== 200) return this.$message.error('查询角色失败')
      this.editForm = data
    },
    // 提交编辑请求
    editRole () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`roles/${this.editForm.roleId}`, this.editForm)
          if (meta.status !== 200) return this.$message.error('修改角色失败')
          this.$message.success('修改角色成功')
          this.editDialogFormVisible = false
          this.getRolesList()
        }
      })
    },
    // 关闭编辑弹窗后的回调
    editAfterClosed () {
      this.$refs.editForm.resetFields()
    },
    // 显示删除弹窗
    // 提交删除请求
    delRole (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$http.delete(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除角色失败')
        this.$message.success('删除角色成功')
        this.getRolesList()
      }).catch(() => {
        this.$message.info('删除角色取消')
      })
    },
    // 显示分配权限弹窗
    async showRightsDialog (roleData) {
      const {data: {data, meta}} = await this.$http.get(`rights/tree`)
      if (meta.status !== 200) return this.$message.error('查询权限信息失败')
      this.rightsData = data
      const arr = []
      roleData.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      this.rightsChecked = arr
      this.rightsDialogFormVisible = true
      this.rightsRoleId = roleData.id
    },
    // 提交分配权限请求
    async editRights () {
      const checkedArr = this.$refs.tree.getCheckedKeys()
      const halfCheckedArr = this.$refs.tree.getHalfCheckedKeys()
      const {data: {meta}} = await this.$http.post(`roles/${this.rightsRoleId}/rights`, {
        rids: [...checkedArr, ...halfCheckedArr].join(',')
      })
      if (meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.rightsDialogFormVisible = false
    },
    // 关闭分配权限弹窗回调
    rightsAfterClosed () {
      this.rightsChecked = []
      this.rightsRoleId = null
    },
    // 删除权限
    delRights (role, rightId) {
      this.$confirm('此操作将删除该角色下此权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {data, meta}} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除权限失败')
        this.$message.success('删除权限成功')
        role.children = data
      }).catch(() => {
        this.$message.info('删除权限取消')
      })
    }
  }
}
