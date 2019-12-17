const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;

    // res.setHeader('Content-type', 'application/json');
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        return getList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return getDetail(req.query.id).then(data => {
            console.log(data)
            return new SuccessModel(data);
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'Reed';
        return newBlog(req.body).then(data => {
            return new SuccessModel(data);
        })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        return updateBlog(req.query.id, req.body).then(result => {
            if (result) {
                return new SuccessModel();
            } else {
                return new ErrorModel('博客保存失败');
            }
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = 'Reed';
        return deleteBlog(req.query.id, author).then(result => {
            if (result) {
                return new SuccessModel();
            } else {
                return new ErrorModel('博客删除失败');
            }
        })
    }
}

module.exports = handleBlogRouter;