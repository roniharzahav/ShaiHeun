import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        siteName: 'שאי-הון',
        siteUrl: 'https://shi-heun.com'
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        locations: resolve(__dirname, 'src/pages/locations.html'),
        events: resolve(__dirname, 'src/pages/events.html'),
        shop: resolve(__dirname, 'src/pages/shop.html'),
        courses: resolve(__dirname, 'src/pages/courses.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/styles.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    outDir: '../../dist',
    emptyOutDir: true
  },
  root: 'src/pages',
  publicDir: '../../public'
});
