import { defineConfig, loadEnv, normalizePath } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";

export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    // https://vitejs.dev/config/
    return defineConfig({
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    protocolRewrite: "https",
                    target: process.env.VITE_BaseURL,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: normalizePath(
                            `${path.resolve(
                                __dirname,
                                "."
                            )}/firebase-messaging-sw.js`
                        ),
                        dest: normalizePath(
                            `${path.resolve(__dirname, "./public")}`
                        ),
                        overwrite: true,
                        transform: (contents) =>
                            contents
                                .toString()
                                .replace(
                                    /INSERT_API_KEY_HERE/g,
                                    process.env.VITE_apiKey as string
                                )
                                .replace(
                                    /INSERT_MESSAGING_SENDER_ID_HERE/g,
                                    process.env.VITE_messageSenderId as string
                                )
                                .replace(
                                    /INSERT_AUTH_DOMAIN_HERE/g,
                                    process.env.VITE_authDomain as string
                                )
                                .replace(
                                    /INSERT_APP_ID_HERE/g,
                                    process.env.VITE_appId as string
                                )
                                .replace(
                                    /INSERT_PROJECT_ID_HERE/g,
                                    process.env.VITE_projectId as string
                                )
                                .replace(
                                    /INSERT_MEASUREMENT_ID_HERE/g,
                                    process.env.VITE_measurementId as string
                                )
                                .replace(
                                    /INSERT_STORAGE_BUCKET_HERE/g,
                                    process.env.VITE_storageBucket as string
                                )
                                .replace(
                                    /INSERT_WEBURL_HERE/g,
                                    process.env.VITE_WebURL as string
                                ),
                    },
                    {
                        src: normalizePath(
                            `${path.resolve(
                                __dirname,
                                "."
                            )}/firebase-messaging-sw.js`
                        ),
                        dest: normalizePath(
                            `${path.resolve(__dirname, "./dist")}`
                        ),
                        overwrite: true,
                        transform: (contents) =>
                            contents
                                .toString()
                                .replace(
                                    /INSERT_API_KEY_HERE/g,
                                    process.env.VITE_apiKey as string
                                )
                                .replace(
                                    /INSERT_MESSAGING_SENDER_ID_HERE/g,
                                    process.env.VITE_messageSenderId as string
                                )
                                .replace(
                                    /INSERT_AUTH_DOMAIN_HERE/g,
                                    process.env.VITE_authDomain as string
                                )
                                .replace(
                                    /INSERT_APP_ID_HERE/g,
                                    process.env.VITE_appId as string
                                )
                                .replace(
                                    /INSERT_PROJECT_ID_HERE/g,
                                    process.env.VITE_projectId as string
                                )
                                .replace(
                                    /INSERT_MEASUREMENT_ID_HERE/g,
                                    process.env.VITE_measurementId as string
                                )
                                .replace(
                                    /INSERT_STORAGE_BUCKET_HERE/g,
                                    process.env.VITE_storageBucket as string
                                )
                                .replace(
                                    /INSERT_WEBURL_HERE/g,
                                    process.env.VITE_WebURL as string
                                ),
                    },
                ],
            }),
            react(),
            VitePWA({
                registerType: "autoUpdate",
                injectRegister: "auto", // I register SW in app.ts, disable auto registration
                // minimum PWA
                includeAssets: [
                    "favicon.ico",
                    "robots.txt",
                    "*.svg",
                    "*.{png,ico}",
                    "*.{json}",
                    "*.js",
                ],
                workbox: {},
            }),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id: string) {
                        // creating a chunk to react routes deps. Reducing the vendor chunk size
                        if (
                            id.includes("react-router-dom") ||
                            id.includes("react-router")
                        ) {
                            return "@react-router";
                        }
                        if (id.includes("tanstack")) {
                            return "@tanstack";
                        }
                        if (id.includes("firebase")) {
                            return "@firebase";
                        }
                        if (id.includes("framer")) {
                            return "@framer";
                        }
                    },
                },
            },
        },
    });
};
