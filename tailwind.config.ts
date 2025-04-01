const config= {
    //...
    theme: {
      extend: {
        animation: {
          marquee: 'marquee var(--duration, 30s) linear infinite'
        },
        keyframes: {
          marquee: {
            to: { transform: 'translateX(-50%)' }
          }
        }
      }
    }
    //...
  }
  export default config
  