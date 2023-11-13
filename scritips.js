jQuery(document).ready(function ($) {

    $('.salon-type span').on('click', function(){
        $('.salon-type span').removeClass('active');
        $(this).addClass('active')

        const filterType = $(this).parent().hasClass('salon-tags') ? 'artist_tag' : 'salon_type';
        const salonSlug = $(this).data('slug');
        const data = {
            filterType,
            salonSlug
        }
        loadPosts( data)
    })

    function loadPosts( data = {}) {
        let nonce = document.querySelector('.filter-nonce')?.dataset.nonce;

        $('#load-salon-posts').html(`<div class='preloader'><img src="${ajax.preloader}"/></div>`);

        // $.ajax({
        //     url: ajax.admin_ajax,
        //     type: 'POST',
        //     dataType: 'html',
        //     data: {
        //         action: 'loadmore_posts',
        //         data,
        //     },
        //     beforeSend: function () {
        //         $('#load-salon-posts').html(`<div class='preloader'><img src="${ajax.preloader}"/></div>`);
        //     },
        //     success: function (res) {
        //         if (res) {
        //             $('#load-salon-posts').html(res);
        //         }
        //     },
        //     error: function (jqXHR, textStatus, errorThrown) {
        //         console.log(jqXHR, textStatus, errorThrown);
        //     },
        // });

        wp.ajax.post('loadmore_posts', { data, nonce }).done((res) => {
            if (res) {
                $('#load-salon-posts').html(res.page);
            }
        }).fail((err) => {
            console.log(err)
        })
    }

    loadPosts();
});
