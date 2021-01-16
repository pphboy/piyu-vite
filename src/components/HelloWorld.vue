<template>
  <div class="hello">
    123123
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";

// @Options({
//   props: {
//     msg: String,
// 		// hello: Function,
//   }
// })
// export default class HelloWorld extends Vue {
//   msg = "MSG";
//   // title:string = "我只是标题";
//   created() {
//     console.log(1);
// 		// console.log();
// 		console.log(this.$testData);
// 		// this.hello();
//   }
// }

import { defineComponent, reactive,getCurrentInstance } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
	props:{
		
	},
  setup() {
		const instance:any = getCurrentInstance();
		// // 获取当前组件的上下文
		// const ctx   = instance.ctx;
		
    // const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    // const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book;
		// console.log(getCurrentInstance());
		console.log(instance.ctx.hello() )
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
