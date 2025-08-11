// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/emoticon/8ee0d74a-5e41-4234-b470-1434f91a07cc?imageId=e72aa680-653b-47ac-adba-8a97d07269dc',
      ],
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
