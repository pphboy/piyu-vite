<template>
	<h3>功能开发中~</h3>
	<a-row v-if="false">
		<a-col  :span="18">
			<h3>个人空间地址</h3>
			<a-input size="large" />
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
		name:"PersonalSpace",
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
