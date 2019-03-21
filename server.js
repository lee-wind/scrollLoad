const Koa = require('koa2');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('./router');

const app = new Koa();

app.use(static(
    path.join(__dirname, "./views")
));

app.use(bodyParser());

app.use(router.routes());

app.listen(8080);
console.log('app started at localhost:8080.');