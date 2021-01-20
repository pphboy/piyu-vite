<template>
	<a-card v-for="i in 5" :key="i" hoverable style="width: 240px;float:left;maring:10px;">
		<template #cover>
			<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
		</template>
		<a-card-meta title="Europe Street beat">
			<template #description>
				{{msg}}
			</template>
		</a-card-meta>
	</a-card>
</template>

<script lang="ts">
	
	export default{
		props: {
		  msg: String,
		},
		data(){
			return {
				// test:123
			}
		},
	  watch:{
			 msg(s){
				 console.log(s);
			 }
	  },created() {
	    console.log(1);
		}
	}
</script>

<style>
</style>
