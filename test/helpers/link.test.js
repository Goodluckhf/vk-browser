import { expect } from 'chai';
import { getParam } from '../../helpers/link';

describe('link helper', () => {
	it('Should get param from url string by key', () => {
		const paramValue = 'test_string';
		const url    = `http://test.com?a=2&c=asd&par=${paramValue}`;
		
		expect(getParam(url, 'par')).to.be.equals(paramValue);
	});
	
	it('Should return null if there is no value for such key', () => {
		const url = 'http://test.com?a=2';
		
		expect(getParam(url, 'par')).to.be.null;
	});
});
