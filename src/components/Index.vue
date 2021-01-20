<template>
  <div id="components-layout-demo-basic" >
		<a-layout>
			<a-layout-header>
				 <a-input-search
					 class="search"
					 v-model:value="value"
						placeholder="input search text"
						enter-button="Search"
						size="large"
						@search="onSearch"
					/>
			</a-layout-header>
			<a-layout>
				<a-layout-content>
					 <a-card
					    style="width:100%"
					    :tab-list="tabListNoTitle"
					    :active-tab-key="noTitleKey"
					    @tabChange="key => onTabChange(key, 'noTitleKey')"
					  >
					    <p>
					      <IndexPro :msg="{cl:noTitleKey,search:search}" />
					    </p>
					    <!-- <template #tabBarExtraContent>
					      <a href="#">More</a>
					    </template> -->
					  </a-card>
				</a-layout-content>
				<a-layout-sider>
					<a-card size="small" title="最新评论" >
						<a-row v-for="i in 5" :key="i">
							<a-col :span="4">
								<a-avatar size="small">
									<template #icon><UserOutlined /></template>
								</a-avatar>
							</a-col>
							<a-col :span="20">
								<a-tag color="#108ee9">
										nickname
								</a-tag>
												<br>
								<a-tag style="margin-bottom:10px;" color="default">{{"card content".substring(0,20)}}</a-tag>
							</a-col>
						</a-row>
					</a-card>
				</a-layout-sider>
			</a-layout>
			<a-layout-footer>Footer</a-layout-footer>
		</a-layout>
  </div>
</template>

<script lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import { Options, Vue } from "vue-class-component";
import {ref} from 'vue';
import IndexPro from './child/IndexPro.vue';
import main from './main';

export default {
	data() {
	    return {
	      tabListNoTitle: [
	        {
	          key: 'article',
	          tab: '推荐',
	        },
	        {
	          key: 'app',
	          tab: 'app',
	        },
	        {
	          key: 'project',
	          tab: 'project',
	        },
	      ],
	      noTitleKey: 'article',
				value:"",
				search:""
	    };
	  },
	components:{
		IndexPro
	},beforeCreate(){
		if(main.local.get("piyu")){
			this.$store.state.login = true;
		}
	},
	setup(){
		
	},
	methods:{
		onSearch(s){
			console.log(s);
			this.search = this.value;
		},
		onTabChange(key, type) {
			console.log(key, type);
			this[type] = key;
		},
	}
}
</script>

<style scoped>
	
	.search{
		width: 400px;
		margin-top:10px
	}
	#components-layout-demo-basic {
		min-width: 1280px;
	}
	#components-layout-demo-basic .ant-layout-header,
	#components-layout-demo-basic .ant-layout-footer {
	  background: white;
	  color: #fff;
	}
	#components-layout-demo-basic .ant-layout-footer {
	  line-height: 1.5;		
		color:black;
	}
	#components-layout-demo-basic .ant-layout-sider {
	  background: white;
		color: black;
	  line-height: 120px;
	}
	#components-layout-demo-basic .ant-layout-content {
		padding-left:50px;
		padding-right:10px;
	  background: white;
	  color: black;
	  min-height: 500px;
	}
	#components-layout-demo-basic > .ant-layout {
	  margin-bottom: 48px;
	}
	#components-layout-demo-basic > .ant-layout:last-child {
	  margin: 0;
	}
</style>
