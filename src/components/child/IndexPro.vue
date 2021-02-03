<template>
		<a-card :bordered="false" >
			<a-card @click="$router.push({name:'Pi',params:{pid:p.id}})" v-for="p in piList" :key="p.id" hoverable style="width: 224px;float:left;margin:3px;">
				<template #cover>
					<img alt="example" style="width:100%;height: 200px;object-fit: cover;" :src="getImage(p.content)" />
				</template>
				<a-card-meta :title="p.title">
					<template #description>
						<h4>{{p.price.toFixed(2)}}￥</h4>
						{{p.content.substring(0,13)}}
					</template>
				</a-card-meta>
			</a-card>
		</a-card>
		<a-card :bordered="false">
 		  <a-pagination v-model:current="page" pageSize="10" @change="pageChange" :total="total" show-less-items />
		</a-card>
</template>

<script lang="ts">
	import axios from 'axios';
	import {ref,reactive,getCurrentInstance} from 'vue';
	import api from '/@/info/ApiUtils.ts';
	export default{
		props: {
		  msg: String,
		},
		setup(){
			const {ctx} = getCurrentInstance();
			console.log("new");
		},
		data(){
			return {
				page:1,
				size:10,
				total:0,
				piList:[],
			}
		},
		methods:{
			pageChange(){
				axios.post(api.API_PIPRODUCT_INDEX,{
			 		page:this.page,
			 		size:this.size,
				 	classId:this.msg.cl,
			 	}).then(res=>{
			 		console.log(res);
			 		if(res.data.status){
			 			this.piList = res.data.data.list;
			 			this.total = res.data.data.total;
			 			console.log(this.total);
			 			console.log(this.piList);
			 		}else{
			 			this.$message.warning(res.data.msg);
			 		}
			 	}).catch(e=>{
			 		console.log(e);
			 		this.$message.error("网络错误，请联系管理员");
			 	});
				console.log(this.msg);
			},
			reset(){
				this.page = 1;
				this.size = 10;
				this.total = 0;
			},
			/*取内容的第一张图片*/
			getImage(str){
				let reg = /!\[.*\]\((.*)\)/g;
				if(!str.match(reg)){
					return "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
				}

				let temp = str.matchAll(reg);
				/**
				 * 取第一张图片
				 */
				for(const a of temp){
					// console.log(a[1]);
					return a[1];
				}
			}
		},
	  watch:{
			msg(s){
				console.log(s);
				this.reset();
			 	this.pageChange();
			}
	  },created() {
	    // console.log(1);
	    this.pageChange();
		}
	}
</script>

<style scoped>
</style>
