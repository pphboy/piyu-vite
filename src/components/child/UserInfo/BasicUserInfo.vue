<template>
	<a-row>
		<a-col :span="18">
		  <a-avatar :size="64" icon="user" />
		  <br><br>
			<a-upload
		    name="file"
		    :multiple="true"
		    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
		    :headers="headers"
		    @change="handleChange"
		  >
		    <a-button> <a-icon type="upload" />上传头像</a-button>
		  </a-upload>
		  <br><br>
		</a-col>
		<a-col :span="18">
			<h3>支付宝账号</h3>
			<a-input maxlength="20" size="large" /><br>
			<br>
		</a-col>
		<a-col :span="18">
			<h3>性别</h3>
			 <a-radio-group v-model:value="gender" @change="onChange">
				<a-radio :value="1">
					男
				</a-radio>
				<a-radio :value="2">
					女
				</a-radio>
				<a-radio :value="3">
					空
				</a-radio>
			</a-radio-group>
			<br><br>
		</a-col>
		<a-col :span="18">
			<h3>简介</h3>
			<a-textarea v-model:value="introduction" placeholder="关于皮鱼用户介绍" :rows="4"/>
			<br><br>
		</a-col>
		<a-col :span="18">
			<a-button type="primary" size="large">保存信息</a-button>
		</a-col>
	</a-row>
</template>

<script lang="ts">
	import {reactive} from 'vue';
	export default{
		name:"BasicUserInfo",
		setup(){
			let data = reactive({
				gender:3 ,// 1，男，2，女，3 空,
				introduction:null,
				headers: {
	        authorization: 'authorization-text',
	      },
			});
			return data
		},
		methods:{
			onChange(){
				
			},
			handleChange(info) {
	      if (info.file.status !== 'uploading') {
	        console.log(info.file, info.fileList);
	      }
	      if (info.file.status === 'done') {
	        this.$message.success(`${info.file.name} file uploaded successfully`);
	      } else if (info.file.status === 'error') {
	        this.$message.error(`${info.file.name} file upload failed.`);
	      }
	    },
		}
	}
</script>

<style>
</style>
