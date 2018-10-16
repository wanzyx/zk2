/*
 * @Author: 郑媛霞 
 * @Date: 2018-10-15 09:45:58 
 * @Last Modified by: 郑媛霞
 * @Last Modified time: 2018-10-15 14:35:04
 */
require(['jquery'], function($) {
    $('.ft').on('click', function() {
        var message = $('#inp').val();

        $.ajax({
            url: "/api/detail?",
            type: "post",
            data: {
                title: message
            },
            success: function(res) {
                console.log(res);
            }
        })

        location.href = '../../index.html';
    })
})