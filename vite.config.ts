import { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from "./build/utils"
import { createProxy } from "./build/proxy"

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  "@": pathResolve("src"),
  //解决开发环境下的警告 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
  "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
}

const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_OPEN } = loadEnv()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  
  return {
    root,
    base: process.env.NODE_ENV === "production" ? "/manages/" : VITE_PUBLIC_PATH,
    plugins: [vue()],
    resolve: {
      alias
    },
    server: {
      // 是否开启 https
      https: false,
      /**
       * 端口号
       * @default 3000
       */
      proxy: createProxy(VITE_PROXY),
      port: VITE_PORT
    },
  }
}
