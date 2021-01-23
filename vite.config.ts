import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}


/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
	alias:{
		'/@/': `${pathResolve('src')}/`,
	}
}
