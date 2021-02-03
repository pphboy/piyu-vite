<template>
  <a-row style="margin-top:30px;"
    ><a-col :span="12" :offset="6">
      <a-card title="登录" style="min-width: 600px;min-height:557px;">
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
import axios from 'axios';
import { message } from 'ant-design-vue';
import main from '../main';
export default {
  data() {
    const validateUser = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名");
      } else if (value.length < 6) {
        return Promise.reject("用户名长度须大于6");
      }else {
        if (this.ruleForm.checkUser !== "") {
          this.$refs.ruleForm.validateField("checkUser");
        }
        return Promise.resolve();
      }
    };
    const validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (value.length < 6) {
        return Promise.reject("密码长度须大于6");
      }else {
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
	mounted(){
		if(main.local.get("piyu")){
			this.$router.push({name:"Index"});
			message.success(`您已是登录状态无需再次登录`,1);
		}
	},
  methods: {
    handleFinish(values) {
      console.log(values);
			let obj = {
				username: values.user,
				password: values.pass,
			}
			axios.post(this.$api.API_USER_LOGIN,obj).then(data=>{
				let res = data.data;
				if(res.status){
					console.log(data.data);
          axios.defaults.headers.common['token'] = res.data.token;
					main.local.set("piyu",res.data);
					message.success(`${res.data.username},欢迎回来`);
          this.$store.state.login = true;
          this.$store.state.userInfo.headImage = res.data.headImage;
          this.$store.state.userInfo.username = res.data.username;
					this.$router.push({name:"Index"})
				}else{
					message.error(`${res.msg}`);
				}
			}).catch(e=>{
				message.error(`网络错误，请联系管理员`);
			})
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
