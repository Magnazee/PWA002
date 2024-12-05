import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            manifest: {
                name: "Voice Rainbow PWA",
                short_name: "Voice Rainbow",
                description: "A voice-enabled PWA that speaks colors as they change",
                id: "voice-rainbow-pwa",
                start_url: "/PWA002/",
                scope: "/PWA002/",
                display: "standalone",
                background_color: "#000000",
                theme_color: "#4B0082",
                orientation: "any",
                icons: [
                    {
                        src: "/icons/icon-any.svg",
                        sizes: "any",
                        type: "image/svg+xml",
                        purpose: "any"
                    },
                    {
                        src: "/icons/icon-maskable.svg",
                        sizes: "any",
                        type: "image/svg+xml",
                        purpose: "maskable"
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,ico,txt,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ],
    base: '/PWA002/'
});
