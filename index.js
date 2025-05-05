const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/newest');

  let articleIds = [];

  while (articleIds.length < 100) {
    // Extract article links from the current page
    const newIds = await page.$$eval('a[href^="item?id="]', anchors => {
      const seen = new Set();
      return anchors
        .map(a => {
          const match = a.href.match(/id=(\d+)/);
          return match ? parseInt(match[1], 10) : null;
        })
        .filter(id => id !== null && !seen.has(id) && seen.add(id));
    });

    articleIds = [...articleIds, ...newIds];

    if (articleIds.length >= 100) break;

    const moreLink = await page.$('a.morelink');
    if (!moreLink) {
      console.error('No "More" link found. Cannot load more articles.');
      break;
    }

    await Promise.all([
      page.waitForNavigation(),
      moreLink.click(),
    ]);
  }

  articleIds = articleIds.slice(0, 100);

  const isSorted = articleIds.every((id, i, arr) =>
    i === 0 || arr[i - 1] > id
  );

  if (isSorted) {
    console.log('✅ The first 100 articles are sorted from newest to oldest.');
  } else {
    console.error('❌ The first 100 articles are NOT sorted from newest to oldest.');
  }

  await browser.close();
})();
