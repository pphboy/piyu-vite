<template>
	<a-card :bordered="false">
		<a-row>
			<a-col  :span="24">
				<h3>皮物标题</h3>
				<a-input class="titleInput" size="large" placeholder="请输入皮物标题" />
				<br><br>
			</a-col>
			<a-col  :span="24">
						<h3>皮物价格</h3>
				    <a-input-number size="large" :min="0.01" :max="999999"  />
						<span style="margin-left:10px;">金额范围 0.01 ~ 999999</span>
						<MoneyCollectOutlined style="font-size: 25px;margin:5px 0 0 5px;" />
				<br><br>
			</a-col>
			<a-col :span="24">
				<h3>皮物地址</h3>
				<a-input class="titleInput" size="large" placeholder="请填写发货地址" />
				<br><br>
			</a-col>
			<a-col :span="24">
				<div id="vditor"></div>
			</a-col>
		</a-row>
	</a-card>
</template>

<script lang="ts">
	import {MoneyCollectOutlined} from '@ant-design/icons-vue';
	import '../css/ReleaseProduct.css';
	import Vditor from 'vditor';
	export default {
		name:"ReleaseProduct",
		data(){
			return{
				v:null,
			}
		},
	  components: {
	    // HighlightOutlined,
			MoneyCollectOutlined
	  },
	  mounted () {
			this.v = new Vditor('vditor', {
				height: 360,
				toolbarConfig: {
					pin: true,
				},
				cache: {
					enable: false,
				},
				after: () => {
					this.v.setValue('hello, Vditor + Vue!')
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
	    
	  },
	};
	
</script>

<style>
	.titleInput{
		width:600px !important;
	}
</style>
