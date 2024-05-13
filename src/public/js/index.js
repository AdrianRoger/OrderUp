import Login from "./pages/Login.js";
import AdminOptions from "./pages/AdminOptions.js";
import CategoryList from "./pages/CategoryList.js";
import DeviceList from "./pages/DeviceList.js";
import Header from "./components/Header.js";
import AdminPanel from "./pages/AdminPanel.js";

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    { path: '/', view: AdminOptions },
    { path: '/categories', view: CategoryList },
    { path: '/login', view: Login },
    { path: '/admin', view: AdminPanel },
    { path: '/device', view: DeviceList },

  ];

  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
      // isMatch: false
    }
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch) ??
  {
    route: routes[2],
    isMatch: true,
  };

  const view = new match.route.view();
  document.querySelector('#root').innerHTML = '';
  document.querySelector('#root').appendChild(Header);
  document.querySelector('#root').appendChild(await view.getHtml());
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
})