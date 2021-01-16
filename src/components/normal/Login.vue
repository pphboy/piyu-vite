<template>
  <a-row style="margin-top:30px;"
    ><a-col :span="12" :offset="6">
      <a-card title="登录" style="min-width: 600px;">
        <a-form
          name="custom-validation"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          v-bind="layout"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed"
        >
          <a-form-item required has-feedback label="Username" name="user">
            <a-input
              v-model:value="ruleForm.user"
              type="text"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item required has-feedback label="Password" name="pass">
            <a-input
              v-model:value="ruleForm.pass"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
            <a-button
              style="margin-left:70px;"
              type="primary"
              html-type="submit"
            >
              登录
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
        return Promise.reject("Please input the Username");
      } else {
        if (this.ruleForm.checkUser !== "") {
          this.$refs.ruleForm.validateField("checkUser");
        }
        return Promise.resolve();
      }
    };
    const validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        return Promise.resolve();
      }
    };

    return {
      ruleForm: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: "change" }],
        pass: [{ validator: validatePass, trigger: "change" }]
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
    }
  }
};
</script>
