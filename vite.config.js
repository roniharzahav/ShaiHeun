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
        gallery: resolve(__dirname, 'src/pages/gallery.html'),
        locations: resolve(__dirname, 'src/pages/locations.html'),
        events: resolve(__dirname, 'src/pages/events.html'),
        shop: resolve(__dirname, 'src/pages/shop.html'),
        contact: resolve(__dirname, 'src/pages/contact.html')
      }
    },
    outDir: '../../dist',
    emptyOutDir: true
  },
  root: 'src/pages',
  publicDir: '../../public'
});
