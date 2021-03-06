/**
 * User: bogdan.stanciu
 * Date: 9/22/14
 * Time: 11:18 AM
 */

/* ========================================================================
 * JS needed for browser compatibility
 * ======================================================================== */

( function( $ ) {

	 var app = {

		ready: function() {
			app.rating();
            app.toolTips();
            app.sendData();
		},
        rating: function() {
            $('.star').on('click hover', function(){
                //ID is set to hidden input so we can send the value
                var checkedValue = $(this).attr('id');
                
                if(!($(this).is(':checked') || $(this).hasClass('checked'))){
                    $(this).addClass('checked') && $(this).nextAll().addClass('checked');
                    $(this).parent().find('input[name=rating]').prop('checked', true).val(checkedValue);
                }else{
                    $(this).prevAll().removeClass('checked');
                    $(this).parent().find('input[name=rating]').prop('checked', false).val(checkedValue);
                }

            });
            $('.star').hover(function(){
                if(!$(this).hasClass('checked')){
                    $(this).addClass('checked') && $(this).nextAll().addClass('checked');
                }else{
                    $(this).prevAll().removeClass('checked');
                }

            });
        },
        toolTips: function(){
            var tooltips = $('[data-toggle="tooltip"]'),
                placement = $(this).data('placement');
                options = {
                    'trigger': 'hover focus',
                    'html': true,
                    'container': 'body',
                    'placement': placement
                };
            tooltips.tooltip(options)
        },
        sendData:function() {
            $('#button-review').on('click', function() {
                $.ajax({
                    url: 'http://www.yourserverpage.php',
                    type: 'post',
                    dataType: 'json',
                    data: 'text=' + encodeURIComponent($('textarea[name=\'text\']').val()) + '&rating=' + encodeURIComponent($('input[name=\'rating\']').val() ? $('input[name=\'rating\']').val() : ''),
                        beforeSend: function() {
                            $('.alert-warning, .alert-success').remove();
                            $('#button-review').attr('disabled', true);
                            $('.form-group').first().before('<div class="alert alert-info"><i class="fa fa-spinner fa-pulse"></i> Please wait!</div>');
                        },
                        complete: function() {
                            $('#button-review').attr('disabled', false);
                            $('.alert-info').remove();   
                        },
                        success: function(data) {
                            if (data['error']) {
                                $('.form-group').first().before('<div class="alert alert-warning">' + data['error'] + '</div>');

                                alert('Oups, we got an error');
                            }
                            if (data['success']) {
                                //success message
                                $('.form-group').first().before('<div class="alert alert-success">' + data['success'] + '</div>');
                                $('input[name=\'name\']').val('');
                                $('textarea[name=\'text\']').val('');
                                $('input[name=\'rating\']:checked').attr('checked', '');

                                alert('Yey, you rated your first post/product or whatever');
                            }
                        }
                });
            });
        }   
	};

	$(window).on('ready', app.ready);

} )( jQuery );