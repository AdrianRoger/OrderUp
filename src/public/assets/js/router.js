import adminPage from './pages/admin_page.js';
// import sessionMiddlewares from '../../../middlewares/sessionMiddlewares.js'

function createRouter(){
    // sessionMiddlewares.verifyJWT(sessionStorage.getItem('token'));
    // console.log(sessionStorage.getItem('token'));

    const router = {
        '/': function() { return adminPage() },
        getPage: (path) => router[path]()
    }

    return router
}

export default createRouter;