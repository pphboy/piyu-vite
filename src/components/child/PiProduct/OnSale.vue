<!-- 
		在售
 -->
<template>
	<a-card v-if="total>0" title="在售皮物">
		<a-card  @click="$router.push({name:'Pi',params:{pid:item.id}})" v-for="item in piproList" :key="item.id" hoverable style="width: 250px;float:left;margin:5px;">
		    <template #cover>

		      <img
						style="width:100%;height:200px;object-fit:cover;"		      	
		        alt="example"
		        :src="getImage(item.content)"
		      />
					<h3 style="padding-left:24px;padding-top:5px;">{{(item.price).toFixed(2)}}￥</h3>
		    </template>
		    <template class="ant-card-actions" #actions>
					<a-popover placement="bottom">
						<template #content>
							<a @click="$router.push({name:'ReleasePage',params:{pid:item.id}})">编辑皮物</a>
						</template>
						<edit-outlined  key="edit" />
					</a-popover>
					
					<a-popover placement="bottom">
						<template #content>
							<a @click="down(item.id)" >下架皮物</a>
						</template>
						<ellipsis-outlined key="ellipsis" />
					</a-popover>
		    </template>
		    <a-card-meta :title="item.title" :description="item.content.substring(0,10)">
		    </a-card-meta>
		    <br>
		    {{item.createDate}}
		  </a-card>
	</a-card>
	<a-card v-else>
		<h2>没有在售的皮物请点击上方加号添加皮物吧</h2>
	</a-card>
	<br>
	<a-pagination v-if="total>0" v-model:current="pageInfo.page" @change="pageGet" :total="total" show-less-items /><br>
</template>

<script lang="ts">
	import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
	import {reactive,getCurrentInstance} from 'vue';
	import axios from 'axios';
	import api from '/@/info/ApiUtils.ts';
	export default {
	  components: {
	    SettingOutlined,
	    EditOutlined,
	    EllipsisOutlined,
	  },
		setup(){
			const {ctx} = getCurrentInstance();
			let data = reactive({
				pageInfo:{
					page:1,
					size:10,
					type:1
				},
				total:0,
				piproList:[],
				pageGet(){
					axios.post(api.API_PIPRODUCT,data.pageInfo).then(res=>{
						// console.log(res);
						if(res.data.status == true){
							data.piproList = res.data.data.list;
							data.total = res.data.data.total;
						}
					}).catch(e=>{
						console.log(e);
						ctx.$message.error("网络错误请联系管理员");
					});
				},
			});
			data.pageGet();
			return data;
		},
		methods:{
			down(id){
				axios.post(api.API_PIPRODUCT_MANAGER_DOWN,{
					id:id
				}).then(res=>{
					// console.log(res);
					if(res.data.status){
						this.$message.success("下架成功");
						this.pageGet();
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch(e=>{
					console.log(e);
					this.$message.error("网络错误请联系管理员");
				});
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
		}
	};
</script>

<style>
</style>
