<template>
	<a-card :bordered="false">
		
		<a-row>
			<a-col  :span="24">
				<h3>{{priceCom?"皮物":"帖子"}}标题</h3>
				<a-input class="titleInput" v-model:value="product.title" size="large" placeholder="请输入皮物标题" />
				<br><br>
			</a-col>
			<!-- 类型 -->
			<a-col :span="24">
				<h3>皮物类型</h3>
				<a-radio-group default-value="a" v-model:value="priceCom" size="large">
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
			<a-col v-if="priceCom == 'a'" :span="24">
						<h3>皮物价格</h3>
				    <a-input-number precision="2" v-model:value="product.price" size="large" :min="0.01" :max="999999"  />
						<span style="margin-left:10px;">金额范围 0.01 ~ 999999 元</span>
						<MoneyCollectOutlined style="font-size: 25px;margin:5px 0 0 5px;" />
				<br><br>
			</a-col>
			<a-col v-if="priceCom == 'a'" :span="24">
						<h3>皮物运费</h3>
				    <a-input-number precision="2" v-model:value="product.freight" size="large" :min="0.01" :max="999999"  />
						<span style="margin-left:10px;">金额范围 0.01 ~ 999999 元</span>
						<MoneyCollectOutlined style="font-size: 25px;margin:5px 0 0 5px;" />
				<br><br>
			</a-col>
			<!-- 分类 -->
			<a-col :span="24">
				<h3>{{priceCom?"皮物":"帖子"}}分类</h3>
				<a-radio-group v-model:value="product.classId" size="large">
					<a-radio-button  v-for="c in articleClassArray" :key="c.id" :value="c.id">
						{{c.className}}
					</a-radio-button>
				</a-radio-group>
					<br><br>
			</a-col>
			<!-- 地址 -->
			<a-col v-if="priceCom == 'a'" :span="24">
				<h3>皮物地址</h3>
				<a-input class="titleInput" v-model:value="product.address" size="large" placeholder="请填写发货地址" />
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
  import axios from "axios";
	import {message} from 'ant-design-vue';
	import {MoneyCollectOutlined} from '@ant-design/icons-vue';
	import '../css/ReleaseProduct.css';
	import {ref,reactive,getCurrentInstance} from 'vue';
	import Vditor from 'vditor';
	import main from '/@/components/main';
	export default {
		name:"ReleaseProduct",
		setup(){
			const ctx = getCurrentInstance();
			var articleClassArray = reactive({
				priceCom:'a', // 皮物类型状态
				product:{
					title:null, // 皮物标题
					price:null, // 皮物价格
					classId:null,  // 选中的皮物分类
					address:null, // 皮物地址
					freight:null, //运费
				},
				vditor:null,  // 皮物介绍的编辑器实例
				articleClassArray:[
					{
						id:1,
						className:"无网"
					},
					{
						id:2,
						className:"络的"
					},
					{
						id:3,
						className:"状态"
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
	  	this.$notification['warning']({
        message: '编辑中的请不要刷新界面',
        description:
          '无论是新建或编辑，的时候，如果您刷新了界面，则数据就会消失，且无法找回 😈',
      });
	  	var vm = this;
			this.vditor = new Vditor('vditor', {
				height: 360,
				toolbarConfig: {
					pin: true,
				},
				cache: {
					enable: false,
				},
				upload: {

					fieldName:"file",
					headers:{
						token:main.local.get("piyu").token,
					},
					withCredentials:true,
		      accept: 'image/*,.mp3, .wav, .rar',
		      token: main.local.get("piyu").token,
		      url:this.$api.API_UPLOAD_FILE,
		      linkToImgUrl:this.$api.API_UPLOAD_FILE,
		      filename (name) {
		        return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
		          replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
		          replace('/\\s/g', '')
		      },
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
					// 'record',
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
					after(){
						var pid = vm.$route.params['pid'];
						if(pid){
							/*请求数据*/
							axios.post(vm.$api.API_PIPRODUCT_MANAGER_GET,{
								id:pid
							}).then(res=>{
								console.log(res);
								if(res.data.status){
									vm.copyProduct = JSON.stringify(res.data.data);
									vm.product = res.data.data;
									vm.vditor.setValue(vm.product.content);
									/*如果有下架或已售的状态，则删除id，让其变成新增皮物*/
									if(vm.$route.params['down']){
										delete vm.product.id;
									}
									if(vm.$route.params['article']){
										vm.priceCom = 'b';
									}
								}else{
									vm.$message.error(res.data.msg);
								}
							}).catch(e=>{
								vm.$message.error("网络错误");
								console.log(e);
							})
						}
					}
				})
      this.getPiProductClass();
		},
	  data() {
	    return {

	    };
	  },
	  methods: {
      /*
        获取皮物分类
       */
      getPiProductClass(){
        axios.post(this.$api.API_PIPRODUCT_CLASS_ALL).then(data=>{
          // console.log(data);
          if(data.data){
            this.articleClassArray = data.data.data;
          }
        }).catch(e=>{
          console.log(e);
        });
      },
	    send(){
				if(!this.product.title){
					message.error('请填写文章标题');
					return;
				}
				
				if(this.product.priceCom){
					if(!this.product.price){
						message.error('请填写皮物金额');
						return;
					}
					if(!this.product.freight){
						message.error('请填写皮物运费');
						return;
					}
					if(!this.product.classId){
						message.error('请选择皮物分类');
						return;
					}
					if(!this.product.address){
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

						var reg = /\[.*\]\((.*)\)/gi;
						if(!reg.test(this.vditor.getValue())){
							message.warning("皮物必须上传至少一张图片");
							return;
						}
					}
				}else{
					if(!this.product.classId){
						message.error('请选择帖子分类');
						return;
					}
					if(this.vditor.getValue() == "\n" || !this.vditor.getValue()){
						message.error('请填写帖子内容');
						return;
					}else{
						if(this.vditor.getValue().length < 15){
							message.error('帖子内容字符长度必须大于15');
							return;
						}
					}
				}
				this.product.content = this.vditor.getValue();

				if(JSON.stringify(this.product) == this.copyProduct){
					console.log(JSON.stringify(this.product));
					console.log(this.copyProduct);
					message.warning('请做出内容修改再提交');
					return;
				}

				axios.post(this.$api.API_PIPRODUCT_SEND,this.product).then(res=>{
					// console.log(res);
					if(res.data.status){
						message.success(res.data.msg);
						this.reset();
					}else{
						message.error(res.data.msg);
					}
				}).catch(e=>{
					console.log(e);
					message.error("网络错误，请联系管理员处理本问题");
				});
			},
			reset(){
				this.product = {
					title:null, // 皮物标题
					price:null, // 皮物价格
					classId:null,  // 选中的皮物分类
					address:null, // 皮物地址
					freight:null, //运费 
				};
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
