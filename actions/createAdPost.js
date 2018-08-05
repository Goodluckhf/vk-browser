import logger from '../lib/logger';

export default async (page, { imageSrc, text, postName }) => {
	logger.info('Переходим в маркет платформу');
	await page.goto('https://vk.com/adsmarket?act=office', { waitUntil: 'networkidle2' });
	
	logger.info('Нажимаем на кнопку "создать запись"');
	const navigationPromise = page.waitForNavigation();
	await page.click('#ads_page_wrap1 .page_block_h2 a.flat_button');
	await navigationPromise;
	
	if (imageSrc) {
		logger.info({
			message: 'Прикрепляем фото',
			imageSrc,
		});
		await page.click('#pb_add_media a.ms_item_photo');
		await page.waitForSelector('#photos_choose_upload_area');
		const fileInputHandle = await page.$('#choose_photo_upload');
		await fileInputHandle.uploadFile(imageSrc);
		await page.waitForSelector('#pb_media_preview img.preview');
	}
	
	logger.info({
		message: 'Заполняем поля',
		text,
		postName,
	});
	const adTextInput = await page.$('#pb_text');
	await adTextInput.type(text);
	
	const adNameInput = await page.$('#pb_title');
	await adNameInput.type(postName);
	
	const navigationToPost = page.waitForNavigation();
	await page.click('#pb_send');
	await navigationToPost;
	
	logger.info({
		message: 'Отправляем на модерацию',
		postUrl: page.url(),
	});
	
	await page.click('#exchange_status_btn');
	await page.waitForSelector('#box_layer button.flat_button');
	await page.waitFor(500);
	await page.click('#box_layer button.flat_button');
	
	// Может быть ошибки
	// А при успехе попап должен исчезнуть
	await page.waitForFunction(() => {
		const errorElement = document.querySelector('#box_layer #exchange_error');
		const popup        = document.querySelector('#box_layer');
		return !!errorElement || !popup
	});
	
	const error = await page.evaluate(() => {
		const errValue = document.querySelector('#box_layer #exchange_error');
		
		if (! errValue) {
			return null;
		}
		
		return errValue.innerText;
	});
	
	if (! error) {
		return;
	}
	
	logger.error({
		message: 'Ошибка при Отправки записи на модерацию',
		error  : error,
	});
};
