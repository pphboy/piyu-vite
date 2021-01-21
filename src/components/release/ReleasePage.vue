<template>
	<div id="release">
		<a-context>
				<a-card
				    style="width:100%"
				    :tab-list="tabList"
				    :active-tab-key="key"
				    @tabChange="key => onTabChange(key, 'key')"
				  >
				    <template #customRender="item">
				      <span> {{ item.name }} </span>
				    </template>
						<!-- 发布商品 -->
						<ReleaseProduct v-if="key == 'tab1'" />
						<!-- 发布帖子 -->
						<ReleaseArticle v-if="key != 'tab1'" />
				  </a-card>
		</a-context>
	</div>
</template>

<script lang="ts">
	// import { HighlightOutlined } from '@ant-design/icons-vue';
	import ReleaseProduct from "../child/ReleaseProduct.vue";
	import ReleaseArticle from "../child/ReleaseArticle.vue";
export default {
  components: {
    // HighlightOutlined,
		ReleaseArticle,
		ReleaseProduct
  },
  data() {
    return {
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          slots: { tab: 'customRender' },
					name:"发布皮物"
        },
        {
          key: 'tab2',
          tab: '发布帖子',
        },
      ],
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

<style scoped>
	
	#release{
		padding:10px;
	}
</style>
