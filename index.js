import puppeteer  from 'puppeteer';
import logger    from './lib/logger';
import login     from './helpers/login';
import createAdPost from './helpers/createAdPost';

(async () => {
	let browser;
	try {
		browser = await puppeteer.launch({ headless: false });
		
		const context = await browser.createIncognitoBrowserContext();
		const page    = await context.newPage();
		await login(page, {
			login   : '77786271090',
			password: 'Sanko001'
		});
		
		await createAdPost(page, {
			imageSrc: './img/test.jpg',
			text    : `Господи, дай сил тому, у кого трудности...
						Дай здоровье тем, кто болеет...
						Дай улыбку тем, у кого горечь и печаль...`,
			postName: 'test1',
		});
		
	} catch (error) {
		logger.error({ error });
		await browser.close();
	}
})();
