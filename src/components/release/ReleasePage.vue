<template>
	<div id="release">
		<a-context>
			<ReleaseProduct/>
		</a-context>
	</div>
</template>

<script lang="ts">
	// import { HighlightOutlined } from '@ant-design/icons-vue';
	import ReleaseProduct from "../child/ReleaseProduct.vue";
export default {
  components: {
    // HighlightOutlined,
		ReleaseProduct
  },
};

	
</script>

<style scoped>
	
	#release{
		padding:10px;
		min-width: 1000px;
	}
	
</style>
