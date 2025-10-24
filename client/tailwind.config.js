/** @type {import('tailwindcss').Config} */
export default {
darkMode: 'class',
content: [
'./index.html',
'./src/**/*.{js,jsx,ts,tsx}'
],
theme: {
extend: {
fontFamily: {
sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif']
},
colors: {
brand: {
50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
500: '#6366f1', 600: '#5456d9', 700: '#4546b8', 800: '#373a96', 900: '#2e317c'
}
},
boxShadow: {
glass: '0 1px 0 0 rgba(255,255,255,0.2) inset, 0 8px 30px rgba(0,0,0,0.12)'
},
backdropBlur: {
xs: '2px'
}
}
},
plugins: []
}