const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(url, filePath) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    console.log(`Navigating to: ${url}`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        // Wait for Vue app to mount
        await page.waitForSelector('#app > *', { timeout: 10000 }).catch(() => {});
        await new Promise(r => setTimeout(r, 3000));
        
        const content = await page.content();
        console.log(`Page has ${content.length} chars of HTML`);
        
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Screenshot saved: ${filePath}`);
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
    
    await browser.close();
}

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

const baseUrl = 'http://localhost:3000';
const pages = [
    { path: '/login', name: '01-login.png' },
];

(async () => {
    await takeScreenshot(baseUrl + '/login', path.join(screenshotsDir, '01-login.png'));
    console.log('Done!');
})();
