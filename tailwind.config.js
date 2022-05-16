module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,jsx,tsx,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        lightGrey: 'rgba(255, 255, 255, 0.5)',
        skyBlue: '#00A3FF',
        lightBlue: '#00D1FF',
        boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}
