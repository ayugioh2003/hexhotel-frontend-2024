import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite-plugin-svg-icons
//import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// npm i -D @types/node
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // createSvgIconsPlugin({
    //   iconDirs: [path.resolve(process.cwd(), 'src/assets/')],
    //   symbolId: '[dir]/[name]',
    //   customDomId: '__svg__icons__dom__',
    // }),
  ],
  resolve: {
    alias: [{ 
      find: '@', 
      replacement: resolve(__dirname, 'src') 
    }],
  },
})
