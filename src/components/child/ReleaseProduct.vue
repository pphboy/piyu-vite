<template>
	<a-card :bordered="false">
		<a-row>
			<a-col  :span="24">
				<h3>{{priceCom?"皮物":"帖子"}}标题</h3>
				<a-input class="titleInput" v-model:value="title" size="large" placeholder="请输入皮物标题" />
				<br><br>
			</a-col>
			<!-- 类型 -->
			<a-col :span="24">
				<h3>皮物类型</h3>
				<a-radio-group default-value="a" @change="priceCom = !priceCom" size="large">
					<a-radio-button value="a">
						皮物
					</a-radio-button>
					<a-radio-button value="b">
						帖子
					</a-radio-button>
				</a-radio-group>
				<br><br>
			</a-col>
			<!-- 价格 -->
			<a-col v-if="priceCom" :span="24">
						<h3>皮物价格</h3>
				    <a-input-number v-model:value="price" size="large" :min="0.01" :max="999999"  />
						<span style="margin-left:10px;">金额范围 0.01 ~ 999999 元</span>
						<MoneyCollectOutlined style="font-size: 25px;margin:5px 0 0 5px;" />
				<br><br>
			</a-col>
			<!-- 分类 -->
			<a-col :span="24">
				<h3>{{priceCom?"皮物":"帖子"}}分类</h3>
				<a-radio-group v-model:value="checkClassId" size="large">
					<a-radio-button  v-for="c in articleClassArray" :key="c.id" :value="c.id.toString()">
						{{c.name}}
					</a-radio-button>
				</a-radio-group>
					<br><br>
			</a-col>
			<!-- 地址 -->
			<a-col v-if="priceCom" :span="24">
				<h3>皮物地址</h3>
				<a-input class="titleInput" v-model:value="address" size="large" placeholder="请填写发货地址" />
				<br><br>
			</a-col>
			<a-col :span="24">
				<h3>{{priceCom?"皮物介绍":"帖子内容"}}</h3>
				<div id="vditor"></div>
			</a-col>
			<!-- 发布与重置按钮 -->
			<a-col>
				<br><br>
				<a-button size="large" @click="send" type="primary" style="margin:5px;">发布</a-button>
				<a-button size="large" @click="reset" type="default" style="margin:5px;">重置</a-button>
			</a-col>
		</a-row>
	</a-card>
</template>

<script lang="ts">
	import {message} from 'ant-design-vue';
	import {MoneyCollectOutlined} from '@ant-design/icons-vue';
	import '../css/ReleaseProduct.css';
	import {ref,reactive} from 'vue';
	import Vditor from 'vditor';
	export default {
		name:"ReleaseProduct",
		setup(){
			var articleClassArray = reactive({
				priceCom:true, // 皮物类型状态
				title:null, // 皮物标题
				price:null, // 皮物价格
				checkClassId:null,  // 选中的皮物分类
				address:null, // 皮物地址
				vditor:null,  // 皮物介绍的编辑器实例
				articleClassArray:[
					{
						id:1,
						name:"电子"
					},
					{
						id:2,
						name:"数码"
					},
					{
						id:3,
						name:"开源"
					}
				]
			});
			
			return articleClassArray;
		},
		watch:{
			/* checkClassId(){
				console.log(this.checkClassId,"checkClassId");
			} */
		},
	  components: {
	    // HighlightOutlined,
			MoneyCollectOutlined
	  },
	  mounted () {
			this.vditor = new Vditor('vditor', {
				height: 360,
				toolbarConfig: {
					pin: true,
				},
				cache: {
					enable: false,
				},
				after: () => {
					this.vditor.setValue("");
				},
				toolbar: [
					'emoji',
					'headings',
					'bold',
					'italic',
					'strike',
					'link',
					'|',
					'list',
					'ordered-list',
					'check',
					'outdent',
					'indent',
					'|',
					'quote',
					'line',
					'code',
					'inline-code',
					'insert-before',
					'insert-after',
					'|',
					'upload',
					'record',
					'table',
					'|',
					'undo',
					'redo',
					'|',
					'edit-mode',
					// 'content-theme',
					'code-theme',
					'export',
					{
						name: 'more',
						toolbar: [
							'fullscreen',
							'both',
							'preview',
							'info',
							'help',
						],
					}],
				})
		},
	  data() {
	    return {
	    };
	  },
	  methods: {
	    send(){
				if(!this.title){
					message.error('请填写文章标题');
					return;
				}
				
				if(this.priceCom){
					if(!this.price){
						message.error('请填写皮物金额');
						return;
					}
					if(!this.checkClassId){
						message.error('请选择皮物分类');
						return;
					}
					if(!this.address){
						message.error('请填写皮物地址');
						return;
					}
					if(this.vditor.getValue() == "\n" || !this.vditor.getValue()){
						message.error('请填写皮物描述');
						return;
					}else{
						if(this.vditor.getValue().length < 50){
							message.error('皮物描述字符长度必须大于50');
							return;
						}
					}
				}else{
					if(!this.checkClassId){
						message.error('请选择帖子分类');
						return;
					}
					if(this.vditor.getValue() == "\n" || !this.vditor.getValue()){
						message.error('请填写帖子内容');
						return;
					}else{
						if(this.vditor.getValue().length < 50){
							message.error('帖子内容字符长度必须大于50');
							return;
						}
					}
				}
				
				
				console.log({
					title:this.title,
					price:this.price,
					classId:this.checkClassId,
					address:this.address,
					content:this.vditor.getValue(),
				});
			},
			reset(){
				this.title = null;
				this.price = null;
				this.checkClassId = null;
				this.address = null;
				this.vditor.setValue("");
			}
	  },
	};
	
</script>

<style>
	.titleInput{
		width:600px !important;
	}
</style>
