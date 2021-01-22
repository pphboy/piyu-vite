<template>
		<a-layout>
			<a-layout-header style="background: #7dbcea;" >
				<a-row>
					<a-col :span="4"><router-link :to="'/'"><h1 style="color:white;">皮鱼</h1></router-link></a-col>
					<a-col :span="20">
						<div style="float:right;">
							<span v-if="!$store.state.login">
								<a-button @click="$router.push({name:'Login'})" style="margin-left: 8px" type="primary"> 登录 </a-button>
								<a-button @click="$router.push({name:'Register'})" style="margin-left: 8px" type="primary"> 注册 </a-button>	
							</span>
							<span v-if="$store.state.login && getUser()">
								
								<!-- 连接 发布内容界面 -->
								<a-button @click="$router.push({name:'ReleasePage'})"  shape="circle">
								  <template #icon><PlusOutlined title="发表内容" /> </template
								></a-button>
								
								<a-avatar style="margin-bottom:6px;margin-left:5px;" >
										<a-icon slot="icon" type="user" />
								</a-avatar>
								
								<h4 style="display: inline;margin-left:10px;color:white;">用户名</h4>
														
								<!-- <a-badge :count="99">  以后有时间再写这个功能
								    <a-button style="margin-left: 8px" type="primary"> 信息 </a-button>
								</a-badge> -->
								<a-dropdown >
									<template #overlay>
										<a-menu @click="handleMenuClick">
											<a-menu-item key="1"><UserOutlined />个人信息</a-menu-item>
											<a-menu-item key="2"><ProfileOutlined />我的商品</a-menu-item>
											<a-menu-item key="2"><UngroupOutlined />帖子管理</a-menu-item>
											<a-menu-item key="2"><SolutionOutlined />收货地址</a-menu-item>
											<a-menu-item key="3"><HistoryOutlined />历史足迹</a-menu-item>
											<a-menu-item key="3"><LogoutOutlined />退出登录</a-menu-item>
										</a-menu>
									</template>
									<a-button style="margin-left: 8px" type="primary"> 菜单 <DownOutlined /> </a-button>
								</a-dropdown>
							</span>
						</div>
					</a-col>
				</a-row>
			</a-layout-header>
		</a-layout>
</template>

<script>
import { UserOutlined, DownOutlined,HistoryOutlined
,PlusOutlined,LogoutOutlined,ProfileOutlined,SolutionOutlined,UngroupOutlined} from '@ant-design/icons-vue';

export default{
	components: {
	    UserOutlined,
	    DownOutlined,
			PlusOutlined,
			LogoutOutlined,
			ProfileOutlined,
			SolutionOutlined,
			UngroupOutlined,
			HistoryOutlined
	},
	methods:{
		getUser(){
			console.log("获取用户");
			return true;
		}
	}
}
</script>

<style scoped>
	
</style>
