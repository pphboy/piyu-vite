<!-- 
		在售
 -->
<template>
	<a-card title="在售皮物">
		<a-card v-for="i in 8" :key="i" hoverable style="width: 300px;float:left;margin:5px;">
		    <template #cover>
		      <img
		        alt="example"
		        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
		      />
					<h3 style="padding-left:24px;padding-top:5px;">9999￥</h3>
		    </template>
		    <template class="ant-card-actions" #actions>
					<a-popover placement="bottom">
						<template #content>
							<a>编辑皮物</a>
						</template>
						<edit-outlined  key="edit" />
					</a-popover>
					
					<a-popover placement="bottom">
						<template #content>
							<a >下架皮物</a>
						</template>
						<ellipsis-outlined key="ellipsis" />
					</a-popover>
		    </template>
		    <a-card-meta title="商品标题" description="商品介绍">
		    </a-card-meta>
		  </a-card>
	</a-card>
</template>

<script lang="ts">
	import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
	import {reactive} from 'vue';
	export default {
	  components: {
	    SettingOutlined,
	    EditOutlined,
	    EllipsisOutlined,
	  },
		setup(){
			let data = reactive({
				
			});
			return data;
		},
		methods:{
			
		}
	};
</script>

<style>
</style>
