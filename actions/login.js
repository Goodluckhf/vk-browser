import logger from '../lib/logger';

export default async (page, { login, password }) => {
	logger.info('Переходим на  "https://vk.com" для авторизации');
	await page.goto('https://vk.com', { waitUntil: 'networkidle2' });
	// eslint-disable-next-line no-shadow
	await page.evaluate((login, password) => {
		document.querySelector('#index_email').value = login;
		document.querySelector('#index_pass').value  = password;
	}, login, password);
	
	logger.info({
		message: 'нажимаем авторизоваться',
		login,
		password,
	});
	const navigationPromise = page.waitForNavigation();
	await page.click('#index_login_button');
	await navigationPromise;
	return page;
};
