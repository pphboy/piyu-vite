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
								
								<a-avatar 
								title="点击进入个人主页"
								@click="$router.push({name:'PY',params:{username:$store.state.userInfo.username}})" 
								:src="$store.state.userInfo.headImage" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style="margin-bottom:6px;margin-left:5px;" >
								</a-avatar>
								
								<h4 style="display: inline;margin-left:10px;color:white;">{{$store.state.userInfo.username}}</h4>
								<!-- <a-badge :count="99">  以后有时间再写这个功能
								    <a-button style="margin-left: 8px" type="primary"> 信息 </a-button>
								</a-badge> -->
								<a-dropdown >
									<template #overlay>
										<a-menu @click="handleMenuClick">
											<a-menu-item @click="$router.push('/UserInfo')" key="1"><UserOutlined />个人信息</a-menu-item>
											<a-menu-item @click="$router.push('/Wallet')" key="4"><MoneyCollectOutlined />皮鱼钱包</a-menu-item>
											<a-menu-item @click="$router.push('/PiProduct')" key="2"><ProfileOutlined />皮物皮帖</a-menu-item>
											<a-menu-item @click="$router.push('/ShopAddress')" key="2"><SolutionOutlined />收货地址</a-menu-item>
											<a-menu-item @click="$router.push('/Collect')" key="9"><StarOutlined/>我的收藏</a-menu-item>
											<a-menu-item @click="$router.push('/Trading')" key="6"><ProjectOutlined />交易记录</a-menu-item>
											<a-menu-item @click="$router.push('/FootPrint')" key="3"><HistoryOutlined />历史足迹</a-menu-item>
											<a-menu-item @click="logOut" key="7"><LogoutOutlined />退出登录</a-menu-item>
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

<script lang="ts">
import {
	UserOutlined,
	DownOutlined,
	PlusOutlined,
	LogoutOutlined,
	ProfileOutlined,
	SolutionOutlined,
	UngroupOutlined,
	HistoryOutlined,
	MoneyCollectOutlined,
	ProjectOutlined,
	StarOutlined
} from '@ant-design/icons-vue';
import main from '/@/components/main';
import axios from 'axios';
import { message } from 'ant-design-vue';
import {reactive,getCurrentInstance} from 'vue';
export default{
	components: {
	    UserOutlined,
	    DownOutlined,
			PlusOutlined,
			LogoutOutlined,
			ProfileOutlined,
			SolutionOutlined,
			UngroupOutlined,
			HistoryOutlined,
			MoneyCollectOutlined,
			ProjectOutlined,StarOutlined
	},
	methods:{
		getUser(){
			console.log("获取用户");
			return true;
		},
		logOut(){
			message.success("退出登录成功");
			main.local.remove("piyu");
			this.$store.state.login = false;
			axios.defaults.headers.common['token'] = null;
			console.log("退出登录");
		}
	}
}
</script>

<style scoped>
	
</style>
