import puppeteer    from 'puppeteer';
import logger       from './lib/logger';
import login        from './actions/login';
//import createAdPost from './actions/createAdPost';
import getPostStatus from './actions/getPostStatus';

(async () => {
	let browser;
	try {
		browser = await puppeteer.launch({ headless: false, devtools: true });
		
		const context = await browser.createIncognitoBrowserContext();
		const page    = await context.newPage();
		await login(page, {
			login   : '77786271090',
			password: 'Sanko001',
		});
		
		let result = await getPostStatus(page, { postId: 2526479 });
		logger.info({
			message: 'Статус поста: 2526479',
			result,
		});
		
		result = await getPostStatus(page, { postId: 2311008 });
		logger.info({
			message: 'Статус поста: 2311008',
			result,
		});
		
		result = await getPostStatus(page, { postId: 2306969 });
		logger.info({
			message: 'Статус поста: 2306969',
			result,
		});
		
		
		/*const result = await createAdPost(page, {
			imageSrc: './img/test1.jpg',
			text    : `🔥 Девочки, классный сайт с постельным бельем! 👇
- более 105 ярких рисунков и 4 размера комплектов
- 100% хлопок, после стирки рисунок держит
- нет предоплаты - оплата после проверки посылки
- в подарок дарят еще полотенце
Заходите, выбирайте - https://vk.cc/7HrbXC`,
			postName: 'postel',
		});*/
	} catch (error) {
		logger.error({ error });
		//await browser.close();
	}
})();
