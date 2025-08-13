// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/popular'],
      numberOfRuns: 2,
      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--ignore-certificate-errors',
          '--allow-running-insecure-content',
        ],
      },
    },
  },
};
