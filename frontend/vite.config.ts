import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite"
import reactCompiler from 'babel-plugin-react-compiler'

export default defineConfig({
    plugins: [
        react(),
        babel({
            plugins: [
                [reactCompiler]
            ]
        }),
        tailwindcss()
    ],
    resolve: {
        tsconfigPaths: true
    }
})