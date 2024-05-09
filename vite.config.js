import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      eslintrc: {
        enabled: true
      },
      resolvers: [
        ElementPlusResolver(), // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      imports: ['vue', 'vue-router', '@vueuse/core']
    }),
    Components({
      resolvers: [
        // 自动注册图标组件 --> 自动导入的图标要使用i-ep-xxx/i-ep-xxx-xxx
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // 允许内网访问
    // port: "" // 端口
  }
})
