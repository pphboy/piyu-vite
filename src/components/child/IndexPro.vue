<template>
		<a-card :bordered="false">
			<a-card v-for="i in 10" :key="i" hoverable style="width: 230px;float:left;maring:10px;">
				<template #cover>
					<img alt="example" style="width:100%;height: 200px;object-fit: cover;" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
				</template>
				<a-card-meta title="Europe Street beat">
					<template #description>
						{{msg}}
					</template>
				</a-card-meta>
			</a-card>
		</a-card>
		<a-card :bordered="false">
 		  <a-pagination v-model:current="current" @change="pageChange" :total="50" show-less-items />
		</a-card>
</template>

<script lang="ts">
	
	export default{
		props: {
		  msg: String,
		},
		data(){
			return {
				current:1,
				// test:123
			}
		},
		methods:{
			pageChange(){
				console.log(this.current,"pagenum");
			}
		},
	  watch:{
			 msg(s){
				 console.log(s);
			 }
	  },created() {
	    // console.log(1);
		}
	}
</script>

<style scoped>
</style>
