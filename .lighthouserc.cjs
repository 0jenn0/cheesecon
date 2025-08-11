// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/emoticon/f273ca4d-ab91-456f-b877-ef5659fec32a?imageId=cf7b39e7-f85c-4b18-8747-7899d7e15b62',
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
