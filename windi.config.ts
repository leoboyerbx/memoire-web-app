import {defineConfig, transform} from 'windicss/helpers';
import {theme} from './tailwind.config.cjs'

export default defineConfig({
    plugins: [
        transform('daisyui')
    ],
    daisyui: {
        themes: [
            {
                theme: {
                    "primary": "#367a85",
                    "secondary": "#f28c20",
                    "accent": "#8b5cf6",
                    "neutral": "#3D4451",
                    "base-100": "#FFFFFF",
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                },
            },
        ],
    },
    theme,
})
