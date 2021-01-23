<template>
	<a-layout-content style="padding:5px;">
		<a-card
		:bordered="false"
		   style="width:100%"
				:tab-list="tabList"
		   :active-tab-key="key"
		   @tabChange="key => onTabChange(key, 'key')"
		 >
		   <template #customRender="item">
		     <span>{{ item.key }} </span>
		   </template>
			 <!-- 基本信息-->
			 <BasicUserInfo v-if="key == 'tab1' "/>
			 <!-- 个人空间地址-->
			 <PersonalSpace v-else/>
		 </a-card>
	</a-layout-content>
		
</template>

<script lang="ts">
	import BasicUserInfo from "/@/components/child/UserInfo/BasicUserInfo.vue"
	import PersonalSpace from "/@/components/child/UserInfo/PersonalSpace.vue"
	// import { HomeOutlined } from '@ant-design/icons-vue';
	export default {
	  components: {
	    // HomeOutlined,
			BasicUserInfo,
			PersonalSpace
	  },
	  data() {
	    return {
	      tabList: [
	        {
	          key: 'tab1',
	          tab: '基本信息',
	          slots: { tab: 'customRender' },
	        },
	        {
	          key: 'tab2',
	          tab: '个人空间地址',
	        },
	      ],
	      contentList: {
	        tab1: 'content1',
	        tab2: 'content2',
	      },
	      key: 'tab1',
	    };
	  },
	  methods: {
	    onTabChange(key, type) {
	      console.log(key, type);
	      this[type] = key;
	    },
	  },
	};
</script>

<style>
</style>
