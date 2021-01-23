<template>
	<a-row>
		<a-col :span="18">
			<h3>昵称</h3>
			<a-input size="large" />
			<br><br>
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
			});
			return data
		},
		methods:{
			onChange(){
				
			}
		}
	}
</script>

<style>
</style>
