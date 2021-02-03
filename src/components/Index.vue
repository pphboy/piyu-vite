<template>
  <div id="components-layout-demo-basic" >
		<a-layout>
			<a-layout-header>
				 <a-input-search
					 class="search"
					 v-model:value="value"
						placeholder="输入想要搜索的内容"
						enter-button="Search"
						size="large"
						@search="onSearch"
					/>
			</a-layout-header>
			<a-layout>
				<a-layout-content v-if="tabListNoTitle.length > 0">
					<!-- {{noTitleKey}} -->
					 <a-card
					    style="width:100%"
					    :tab-list="tabListNoTitle"
					    :active-tab-key="noTitleKey"
					    @tabChange="key => onTabChange(key, 'noTitleKey')"
					  >
					    <p>
					      <IndexPro :search="search" :msg="noTitleKey?{cl:noTitleKey}:null" />
					    </p>
					    <!-- <template #tabBarExtraContent>
					      <a href="#">More</a>
					    </template> -->
					  </a-card>
				</a-layout-content>
				<a-layout-sider>
					<a-card size="small" title="最新皮帖" >
							<a-list  item-layout="horizontal" :data-source="articleList">
							    <template #renderItem="{ item, index }">
							      <a-list-item >
							        <a-list-item-meta
							          :description="item.content.substring(0,20)+'...'"
							        >
							          <template #title>
							            <a @click="$router.push({name:'Pi',params:{pid:item.id}})">{{ item.title.substring(0,8) }}...</a>
							          </template>
							          <template #avatar>
							            <a-avatar :src="item.maker.headImage?item.maker.headImage:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />
							          </template>
							        </a-list-item-meta>
							      </a-list-item>
							    </template>
							  </a-list>
					</a-card>
					<a-card size="small" title="最新皮论" >
						<a-row  v-for="(c,index) in commentList" :key="index">
							<!-- 点击头像和 名称的时候应该跳到用户空间 -->
							<a-col :span="4">
    						<a-avatar :src="c.user.headImage?c.user.headImage:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />
							</a-col>
							<a-col :span="20">
								<a-tag  color="#108ee9">
										{{c.user.username}}
								</a-tag>
												<br>
								<a-tag @click="$router.push({name:'Pi',params:{pid:c.piId}})" style="margin-bottom:10px;" color="default">{{c.content.substring(0,10)}}</a-tag>
							</a-col>
						</a-row>
					</a-card>
				</a-layout-sider>
			</a-layout>
			<a-layout-footer>
				<!-- Footer -->
			</a-layout-footer>
		</a-layout>
  </div>
</template>

<script lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue';
import { Options, Vue } from "vue-class-component";
import {ref,reactive,getCurrentInstance} from 'vue';
import IndexPro from './child/IndexPro.vue';
import axios from 'axios';
import api from '/@/info/ApiUtils.ts';

export default {
	components:{
		IndexPro
	},
	setup(){
		let data = reactive({
			  articleList:[],
			 	commentList:[],
	      tabListNoTitle: [
	        /*{
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
	        },*/
	      ],
	      noTitleKey: null,
				value:"",
				search:""
		});
		const {ctx} = getCurrentInstance();

		/*获取全部分类*/
		axios.post(api.API_PIPRODUCT_CLASS_ALL).then(res=>{
			// console.log(res);
			if(res.data.status){
				for(var c of res.data.data){
					data.tabListNoTitle.push({
						key:c.id,
						tab:c.className
					});
				}
				data.noTitleKey = data.tabListNoTitle[0].key;
			}
		}).catch(e=>{
			console.log(e);
			ctx.$message.error("网络错误请联系管理员解决问题");
		});

		/*获取最新评论*/
		axios.post(api.API_PIPRODUCT_INDEX_ARTICLE).then(res=>{
			console.log(res);
			if(res.data.status){
				data.articleList = res.data.data;
			}else{
				ctx.$message.error(res.data.msg);
			}	
		}).catch(e=>{
			console.log(e);
			ctx.$message.error("网络错误请联系管理员解决问题");
		});

		/*获取最新的皮论*/
		axios.get(api.API_COMMENT_INDEX).then(res=>{
			console.log(res);
			if(res.data.status){
				data.commentList = res.data.data;
			}else{
				ctx.$message.error(res.data.msg);
			}
		}).catch(e=>{
			console.log(e);
			ctx.$message.error("网络错误请联系管理员解决问题");
		});
		return data;
	},
	methods:{
		onSearch(s){
			console.log(s);
			this.search = this.value;
		},
		onTabChange(key, type) {
			this.value = null;
			this.search= null;
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
