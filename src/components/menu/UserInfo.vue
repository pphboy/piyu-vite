<template>
	<a-layout-content style="padding:5px;">
		<a-card
		   style="width:100%"
				:tab-list="tabList"
		   :active-tab-key="key"
		   @tabChange="key => onTabChange(key, 'key')"
		 >
		   <template #customRender="item">
		     <span>{{ item.key }} </span>
		   </template>
			 <BasicUserInfo/>
		   {{ contentList[key] }}
		 </a-card>
	</a-layout-content>
		
</template>

<script lang="ts">
	import BasicUserInfo from "/@/components/child/UserInfo/BasicUserInfo.vue"
	// import { HomeOutlined } from '@ant-design/icons-vue';
	export default {
	  components: {
	    // HomeOutlined,
			BasicUserInfo
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
