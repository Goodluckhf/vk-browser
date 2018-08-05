import puppeteer  from 'puppeteer';
import logger    from './lib/logger';
import login     from './helpers/login';

(async () => {
	let browser;
	try {
		browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await login(page, {
			login   : '77786271090',
			password: 'Sanko001'
		});
	} catch (error) {
		logger.error({ error });
		await browser.close();
	}
})();
