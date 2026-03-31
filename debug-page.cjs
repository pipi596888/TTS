const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));
    
    const text = await page.evaluate(() => document.body.innerText);
    console.log('Page text:');
    console.log(text.substring(0, 2000));
    
    await browser.close();
})();
