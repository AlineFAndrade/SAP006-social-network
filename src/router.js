/* eslint-disable arrow-body-style */
import { login } from './pages/login/index.js';
import { cadastro } from './pages/cadastro/index.js';
import { home } from './pages/home/index.js';
import { postar } from './pages/postar/index.js';

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/login': login,
    '/cadastro': cadastro,
    '/home': home,
    '/posts': postar,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  routRender();
});

// export const route = (state) => {
//   window.history.pushState({}, '', state);
//   const popstateEvent = new PopStateEvent('popstate', { state: {} });
//   dispatchEvent(popstateEvent);
// };
