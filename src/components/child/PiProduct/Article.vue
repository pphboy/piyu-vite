<!-- 
		帖子管理
 -->
<template>
	<a-card title="帖子管理">
		<a-card v-for="i in 8" :key="i" hoverable style="width: 300px;float:left;margin:5px;">
		    <template class="ant-card-actions" #actions>
					<a-popover placement="bottom">
						<template #content>
							<a>编辑皮帖</a>
						</template>
						<edit-outlined  key="edit" />
					</a-popover>
					
					<a-popover placement="bottom">
						<template #content>
							<a >删除皮帖</a>
						</template>
						<ellipsis-outlined key="ellipsis" />
					</a-popover>
		    </template>
		    <a-card-meta title="皮帖标题" description="皮贴介绍">
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
