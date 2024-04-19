import adminPage from './pages/admin_page.js';

function createRouter(){
    const router = {
        '/': function() { return adminPage() },
        '/cozinha': function() { return },
        getPage: (path) => router[path]()
    }

    return router
}

export default createRouter;