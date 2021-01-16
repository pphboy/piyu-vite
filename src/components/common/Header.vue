<template>
		<a-layout>
			<a-layout-header style="background: #7dbcea;" >
				<a-row>
					<a-col :span="4"><h1 style="color:white;">皮鱼</h1></a-col>
					<a-col :span="20">
						<div style="float:right;">
							<a-avatar>
									<a-icon slot="icon" type="user" />
							</a-avatar>
							<h4 style="display: inline;margin-left:10px;color:white;">用户名</h4>
							<a-badge :count="99">
							    <a-button style="margin-left: 8px" type="primary"> 信息 </a-button>
							</a-badge>
							<a-dropdown>
								<template #overlay>
									<a-menu @click="handleMenuClick">
										<a-menu-item key="1"><UserOutlined />1st menu item</a-menu-item>
										<a-menu-item key="2"><UserOutlined />2nd menu item</a-menu-item>
										<a-menu-item key="3"><UserOutlined />3rd item</a-menu-item>
									</a-menu>
								</template>
								<a-button style="margin-left: 8px" type="primary"> 菜单 <DownOutlined /> </a-button>
							</a-dropdown>
						</div>
					</a-col>
				</a-row>
			</a-layout-header>
		</a-layout>
</template>

<script>
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';

export default{
	components: {
	    UserOutlined,
	    DownOutlined,
	},
}
</script>

<style scoped>
	
</style>
