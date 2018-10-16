/*
 * @Author: 郑媛霞 
 * @Date: 2018-10-15 09:19:10 
 * @Last Modified by: 郑媛霞
 * @Last Modified time: 2018-10-15 13:50:42
 */
require(['jquery', 'handlebars'], function($, handle) {

    $('.btn').on('click', function() {
        location.href = '../../detail.html';
    })

    $.ajax({
        url: "/api/list",
        success: function(res) {
            var tpl = $('#tpl').html();

            var template = handle.compile(tpl);

            var html = template(JSON.parse(res).data);

            $('.list').append(html);
        }
    })
})