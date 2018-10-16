/*
 * @Author: 郑媛霞 
 * @Date: 2018-10-15 08:50:36 
 * @Last Modified by: 郑媛霞
 * @Last Modified time: 2018-10-15 19:07:39
 */
var gulp = require('gulp');

var server = require('gulp-webserver');

var path = require('path');

var url = require('url');

var fs = require('fs');

var list = require('./src/data/index.json');

var querystring = require('querystring');

gulp.task('serverTask', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end('');
                    return false;
                }

                if (pathname === '/api/list') {

                    res.end(JSON.stringify({ code: 1, data: list }));

                } else if (pathname === '/api/detail') {

                    var arr = [];

                    req.on('data', function(chunk) {
                        arr.unshift(chunk);
                    })

                    req.on('end', function() {

                        var params = querystring.parse(Buffer.concat(arr).toString());

                        list.push(params);

                        fs.writeFileSync('./src/data/index.json', JSON.stringify(list));

                        res.end(JSON.stringify({ code: 1, data: "添加成功" }))
                    })


                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;

                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})