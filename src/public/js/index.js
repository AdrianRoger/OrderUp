import AdminOptions from "./pages/AdminOptions.js";
import AdminPage from "./pages/AdminPage.js";
import Login from "./pages/Login.js";
import RegisterCategory from "./pages/RegisterCategory.js";
import RegisterProduct from "./pages/RegisterProduct.js";

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    { path: '/login', view: Login },
    { path: '/admin-options', view: AdminOptions },
    { path: '/admin-page', view: AdminPage },
    { path: '/register-category', view: RegisterCategory },
    { path: '/register-product', view: RegisterProduct },
  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    }
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch) ??
  {
    route: routes[0],
    isMatch: true,
  };

  const view = new match.route.view();

  document.querySelector('#root').innerHTML = '';
  document.querySelector('#root').appendChild(await view.getHtml());
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target.matches('[data-link]')){
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
})