/**
* @jest-environment jsdom
*/

import { cadastro } from '../../../src/pages/cadastro/index.js';

describe('should render page register correctly', () => {
  test('should be true', () => {
    const divRegister = cadastro();
    expect(divRegister.tagName).toBe('DIV');
  });
});

describe('should route to home when register is valid', () => {
  test('should be true', () => {
    const divRegister = cadastro();
    divRegister.querySelector('#nameUser').value = 'aline';
    divRegister.querySelector('#emailUser').value = 'aline@gmail.com';
    divRegister.querySelector('#passwordRegister').value = '654321';
    divRegister.querySelector('#confPass').value = '654321';
    const enterButton = divRegister.querySelector('#enter');
    enterButton.dispatchEvent(new Event('click'));
    expect(enterButton.click).toBeCalled();
  });
});
