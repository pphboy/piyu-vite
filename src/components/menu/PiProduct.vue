<!-- 
	皮物管理
 -->
<template>
		<a-row class="pi" :gutter="10" >
			<a-col :span="2" >
					<a-menu
						v-model:openKeys="openKeys"
						v-model:selectedKeys="selectedKeys"
						mode="inline"
						theme="light"
						:inline-collapsed="collapsed"
					>
						<a-menu-item key="1">
							<PieChartOutlined />
							<span>在售</span>
						</a-menu-item>
						<a-menu-item key="2">
							<DesktopOutlined />
							<span>已售</span>
						</a-menu-item>
						<a-menu-item key="3">
							<InboxOutlined />
							<span>下架</span>
						</a-menu-item>
						<a-menu-item key="4">
							<FileTextOutlined />
							<span>皮帖</span>
						</a-menu-item>
						
					</a-menu>
			</a-col>
			<a-col :span="22" style="padding:5px 0px;">
				<OnSale v-if="selectedKeys[0] == '1'" />
				<Sold v-if="selectedKeys[0] == '2'" />
				<DownShelf v-if="selectedKeys[0] == '3'" />
				<Article v-if="selectedKeys[0] == '4'" />
			</a-col>
		</a-row>
</template>
<script>
	import OnSale from "/@/components/child/PiProduct/OnSale.vue";
	import Sold from "/@/components/child/PiProduct/Sold.vue";
	import DownShelf from "/@/components/child/PiProduct/DownShelf.vue";
	import Article from "/@/components/child/PiProduct/Article.vue";
	
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
	FileTextOutlined
} from '@ant-design/icons-vue';
export default {
  components: {
		OnSale,Sold,DownShelf,Article,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
		FileTextOutlined
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    };
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal;
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    },
  },
};
</script>

<style scoped>
	.pi{
		width:99.8%;
		min-width: 1200px;
		min-height: 590px;
	}
</style>