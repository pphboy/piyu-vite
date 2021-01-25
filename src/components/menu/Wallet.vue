<!-- 
	皮鱼钱包
 -->
<template>
	<a-layout-content style="padding:5px;">
		<a-card style="min-height: 577px;">
			<a-row>
				<a-col :span="24" style="text-align: center;">
					<h2>皮鱼钱包</h2>
					<h1> {{(9999/100).toFixed(2)}} 元</h1>
				</a-col>
				<a-col :span="24">
					<a-button-group style="margin-left:45.5%;">
						<a-button type="default" @click="showModal('visible1')"> 充值</a-button>
						<a-button type="default" @click="showModal('visible2')"> 提现</a-button>
					</a-button-group>
				</a-col>
			</a-row>
		</a-card>
	</a-layout-content>
	
	<a-modal v-model:visible="visible1" title="充值皮鱼账户" cancelText="关闭" okText="确认" @ok="handleOk('visible1')">
		请输入充值金额 (单位元) : 
		<a-input-number min="0.01" max="99999" />
	</a-modal>
	<a-modal v-model:visible="visible2" title="充值皮鱼账户" cancelText="关闭" okText="确认" @ok="handleOk('visible2')">
		请输入提现金额 (单位元) : 
		<a-input-number min="0.01" max="99999" /><br><br>

	</a-modal>
</template>

<script lang="ts">
	import {reactive} from 'vue';
	
	export default{
		setup(){
			let data = reactive({
				visible1: false,
				visible2: false,
			});
			
			return data;
		},
		methods: {
			showModal(vname) {
				this[vname] = true;
			},
			/* 充值和提现随便写个接口算了 */
			handleOk(vname) {
				this[vname] = false;
				if(vname == 'visible1'){
					console.log("充值");
				}else{
					console.log("提现");
				}
			},
		}
	}
</script>

<style>
</style>
