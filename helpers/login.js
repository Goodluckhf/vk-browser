export default async (page, { login, password }) => {
	await page.goto('http://vk.com', { waitUntil: 'networkidle2' });
	await page.evaluate((login, password) => {
		document.querySelector('#index_email').value = login;
		document.querySelector('#index_pass').value  = password;
	}, login, password);
	
	const navigationPromise = page.waitForNavigation();
	await page.click('#index_login_button');
	await navigationPromise;
	return page;
}
