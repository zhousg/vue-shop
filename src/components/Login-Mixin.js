export default {
  name: 'Login',
  data () {
    return {
      respond: {
        lg: {span: 6, offset: 9},
        sm: {span: 8, offset: 8},
        xs: {span: 20, offset: 2}
      },
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 18, min: 6, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const {data: {data, meta}} = await this.$http.post('login', this.ruleForm)
          if (meta.status !== 200) return this.$message.error(meta.msg)
          sessionStorage.setItem('token', data.token)
          this.$message.success('登录成功')
          this.$router.push('/home')
        }
      })
    }
  }
}
