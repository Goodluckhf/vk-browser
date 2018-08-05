import url from 'url';

// eslint-disable-next-line import/prefer-default-export
export const getParam = (urlString, paramKey) => {
	const parsed = url.parse(urlString, true);
	return parsed.query[paramKey] || null;
};
