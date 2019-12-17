const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method;

    // res.setHeader('Content-type', 'application/json');
    if (method === 'POST' && req.path === '/api/user/login') {
        const {userName, password} = req.body;
        return login(userName, password).then(result => {
            if (result) {
                return new SuccessModel(result);
            } else {
                return new ErrorModel('登录失败');
            }
        })
    }
}

module.exports = handleUserRouter;
