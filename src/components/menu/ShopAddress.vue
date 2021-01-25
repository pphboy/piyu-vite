<!-- 
	收货地址编写，需要实现增删改
-->
<template>
	<a-layout-content style="padding: 5px;">
		<a-card title="收货地址管理" style="min-height: 587px;">
			<a-card>
				<a-row >
				<a-col :span="24">
					<label >
						收货人姓名: <br>
						<a-input v-model:value="address.name" maxlength="10" style="width:200px;" />
					</label>
					<br><br>
				</a-col>
				<a-col :span="24">
					<label >
						收货人电话: <br>
						<a-input v-model:value="address.phone" maxlength="11" style="width:200px;" />
					</label>
					<br><br>
				</a-col>
				<a-col :span="24">
						收货地址: <br>
					<a-cascader v-model:value="addValue" :options="options" style="width:400px;">
						<template #displayRender="{ labels, selectedOptions }">
							<span v-for="(label, index) in labels" :key="selectedOptions[index].value">
								<span v-if="index === labels.length - 1">
									{{ label }} (<a @click="e => handleAreaClick(e, label, selectedOptions[index])">{{
										selectedOptions[index].code
									}}</a
									>)
								</span>
								<span v-else @click="onChange"> {{ label }} / </span>
							</span>
						</template>
					</a-cascader>
					<br><br>
					<label >
							详细地址: <br>
						<a-textarea placeholder="请输入大于六个字符的详细地址" v-model:value="address.dailedAddress" maxlength="11" style="width:200px;" /> 
					</label>
					<br><br>
					<a-button type="primary" @click="add">保存</a-button>&nbsp;
					<a-button @click="clear">重置</a-button>
					<br><br>
				</a-col>
			</a-row>
			</a-card>
			<br>
			<a-row>
				<a-col :span="24">
					<a-card title="收货地址列表">
						<a-list item-layout="horizontal" :data-source="addressList">
						    <template #renderItem="{ item, index }">
						      <a-list-item>
										<template #actions>
											<label>默认: <input name="address" @click="setDefault(index)" :checked="item.isDefault" type="radio"></label>
											<a @click="edit(index)">edit</a>
											<a @click="del(index)">delete</a>
										</template>
						        <a-list-item-meta
						          :description="`地址 ${item.province},${item.city}${(item.county?','+item.county:'')},${item.dailedAddress}`"
						        >
						          <template #title>
						            <a>{{ `收货人:${item.name},  电话${item.phone}` }}</a>
						          </template>
						        </a-list-item-meta>
						      </a-list-item>
						    </template>
						  </a-list>
					</a-card>
				</a-col>
			</a-row>
		</a-card>
	</a-layout-content>
</template>

<script lang="ts">
	import {reactive} from 'vue';
	import obj from './address.js';
	import { message } from 'ant-design-vue';


	export default{
		setup(){
				let data = reactive({
					editIndex:null,
					address:{
						province:null, // 省级 int
						city:null, // 市级 int 
						county:null, // 县级 int
						dailedAddress:null, //详细地址
						// isDefault:true, //是否为默认
						name:null,
						phone:null,
					}, // 当前编辑的对象
					addValue:null,
					addressList:[
					  {
					  	id:1,
							province:"山西省", // 省级 int
							city:"阳泉市", // 市级 int 
							county:"矿区", // 县级 int
							dailedAddress:"石皮镇小皮村", //详细地址
							isDefault:true, //是否为默认
							name:"小皮",
							phone:"17777777777",
					  },
					  {
					  	id:2,
							province:"山西省", // 省级 int
							city:"阳泉市", // 市级 int 
							county:"郊区", // 县级 int
					    dailedAddress:"石皮镇小皮村", //详细地址
					    isDefault:false, //是否为默认
					    name:"逼霖",
					    phone:"18888888888",
					  },
					  {
					  	id:3,
							province:"山西省", // 省级 int
							city:"阳泉市", // 市级 int 
							county:"平定县", // 县级 int
					    dailedAddress:"石皮镇小皮村", //详细地址
					    isDefault:false, //是否为默认
					    name:"霖",
					    phone:"19999999999",
					  }],
						// value: ['湖南省', '衡阳市','衡阳县'], // 地址
						options:obj.arr, // 这个是城市的列表
				});
				return data;
		},
		watch:{
			/*addValue(){
				console.log(typeof this.addValue);
			}*/
			checkDefault(){
				console.log(this.checkDefault);
			}
		},
		methods:{
			checkPhone(){
				console.log("检查");
			},
			onChange(value) {
				console.log(value);
			},
			handleAreaClick(e, label, option) {
				e.stopPropagation();
				console.log('clicked', label, option);
			},
			clear(){
				var vm = this;
				vm.addValue = null;
				vm.address = {
					province:null, // 省级 int
					city:null, // 市级 int 
					county:null, // 县级 int
					dailedAddress:null, //详细地址
					// isDefault:true, //是否为默认
					name:null,
					phone:null,
				}
			},
			/**
			 * 设置默认
			 */
			setDefault(index){
				message.success(`设置 [${this.addressList[index].name}] 为默认收货人`,1);
				/* 把id提示至服务器*/
				console.log(this.addressList[index].id);
			},
			/**
			 * 编辑
			 */
			edit(index){
				var vm = this;
				vm.editIndex = index;
				vm.address = vm.addressList[index];
				vm.addValue = [vm.address.province,vm.address.city,vm.address.county];
				console.log(vm.addValue);
			},
			/**
			 * 删除地址
			 */
			del(index){
				
				var vm = this;

				if(vm.editIndex == index){
					message.error("无法删除正在编辑的收货信息");
					return;
				}

				/*
					此处	将数据发送到服务器		
				 */
				console.log(vm.addressList[index]);

				message.success(`删除收货人[${vm.addressList[index].name}]成功`);				
				vm.addressList.splice(index,1);

			},
			/**
			 * 添加地址
			 */
			add(){
				var vm = this;
				if(vm.addressList.length > 4){
					message.warning("收货地址最多添加5条");
					return;
				}

				if(!vm.address.name){
					message.warning("请输入收货人姓名");
					return;
				}

				if(!vm.address.phone){
					message.warning("请输入收货人电话");
					return;
				}

				var reg = /^1[356789][98765432]\d{8}$/g;
				
				if(!reg.test(vm.address.phone)){
					message.warning("请输入正确的手机号");
					return;
				}

				if(!vm.addValue){
					message.warning("请选择收货地址");
					return;
				}

				if(!vm.address.dailedAddress){
					message.warning("请输入详细地址");
					return;
				}

				if(vm.address.dailedAddress.length < 6){
					message.warning("您输入的详细地址没有六个字符，系统默认为不够详细");
					return;
				}

				vm.address.province=vm.addValue[0]; // 省级 int
				vm.address.city=vm.addValue[1]; // 市级 int 
				vm.address.county=vm.addValue[2] ? vm.addValue[2] : null ;

				/*编辑的对象会有id，在后端通过id判断是编辑还是新增*/
				if(vm.editIndex != null){
					/*编辑*/
					message.success("编辑收货人保存成功");

					vm.editIndex = null;
				}else{
					/*新增*/
					message.success("新增收货人成功");
					console.log(vm.address);
					vm.addressList.push(vm.address);
				}
				
				/* 此处应是提交至服务器 */
				vm.clear();
			}
		}
	}
</script>

<style scoped>
	
</style>
