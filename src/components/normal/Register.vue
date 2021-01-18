<template>
  <a-row style="margin-top:30px;"
    ><a-col :span="12" :offset="6">
      <a-card title="注册" style="min-width: 600px;">
        <a-form
          name="custom-validation"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          v-bind="layout"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
        >
          <a-form-item required has-feedback label="用户名称" name="user">
            <a-input
              v-model:value="ruleForm.user"
              maxlength="12"
              type="text"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item required has-feedback label="输入密码" name="pass">
            <a-input
              v-model:value="ruleForm.pass"
              maxlength="12"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item required has-feedback label="确认密码" name="pass2">
            <a-input
              v-model:value="ruleForm.pass2"
              maxlength="12"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item required has-feedback label="邮箱账号" name="email">
            <a-input
              v-model:value="ruleForm.email"
              type="email"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item required has-feedback label="验证码" name="checkCode">
            <a-row>
              <a-col>
                <a-input
                  maxlength="6"
                  v-model:value="ruleForm.checkCode"
                  type="password"
                  autocomplete="off"
                />
              </a-col>
              <a-col>
                <img
                  style="margin-left:10px;"
                  src="../../assets/checkimg.png"
                  alt=""
                />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
            <a-button
              style="margin-left:70px;"
              type="primary"
              html-type="submit"
            >
              注册
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm">
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col></a-row
  >
</template>
<script>
export default {
  data() {
    const validateUser = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名");
      } else {
        if (this.ruleForm.checkUser !== "") {
          this.$refs.ruleForm.validateField("checkUser");
        }
        return Promise.resolve();
      }
    };
    const validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (value.length < 8) {
        return Promise.reject("密码太短，长度必须大于8");
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        return Promise.resolve();
      }
    };
    const validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入确认密码");
      } else if (this.ruleForm.pass != this.ruleForm.pass2) {
        return Promise.reject("两次密码不一致");
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        return Promise.resolve();
      }
    };
    const validateEmail = async (rule, value) => {
      const reg = /^\w{0,13}@\w{1,10}\.\w{2,5}$/gi;
      if (value === "") {
        return Promise.reject("请输入邮箱");
      } else if (!reg.test(value)) {
        return Promise.reject("请输入正确的邮箱账号");
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        return Promise.resolve();
      }
    };
    const validateCheckCode = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码");
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        return Promise.resolve();
      }
    };
    return {
			isPass:false,
      ruleForm: {
        user: "",
        pass: "",
        pass2: "",
        email: "",
        checkCode: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: "change" }],
        pass: [{ validator: validatePass, trigger: "change" }],
        pass2: [{ validator: validatePass2, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        checkCode: [{ validator: validateCheckCode, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    handleFinish(values) {
      console.log(values);
    },
    handleFinishFailed(errors) {
      console.log(errors);
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  }
};
</script>
