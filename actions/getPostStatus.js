import logger from '../lib/logger';

const vkStatusHash = Object.freeze({
	'Проверяется...': 'checking',
	Отклонена       : 'canceled',
	''              : 'approved',
});

export default async (page, { postId }) => {
	logger.info('Переходим на страницу поста');
	await page.goto(`https://vk.com/adsmarket?act=post&ad_id=${postId}`, { waitUntil: 'networkidle2' });
	
	const vkStatus = await page.evaluate(() => {
		const statusElement = document.querySelector('span#exchange_info_status');
		return statusElement.innerText;
	});
	
	return vkStatusHash[vkStatus];
};
