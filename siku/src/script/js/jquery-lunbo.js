;
(function($) {
    $.fn.extend({
        lunbo: function() {
            $(this).each(function(index, element) {
                const $pics = $(document).find('ul li');
                const $btn = $(document).find('ol li');
                const $left = $(document).find('.left');
                const $right = $(document).find('.right');
                let $num = 0;
                let timer = null;
                $btn.on('click', function() {
                    $num = $(this).index();
                    tabswitch();
                });
                // 
                $(this).hover(function() {
                    $left.show();
                    $right.show();
                    clearInterval(timer);
                }, function() {
                    $left.hide();
                    $right.hide();
                    timer = setInterval(function() {
                        $right.click();
                    }, 1000)
                });
                // 
                $right.on('click', function() {
                    $num++;
                    if ($num > $btn.length - 1) {
                        $num = 0;
                    }
                    tabswitch();
                });
                // 
                $left.on('click', function() {
                    $num--;
                    if ($num < 0) {
                        $num = $btn.length - 1;
                    }
                    tabswitch();
                });

                function tabswitch() {
                    $btn.eq($num).addClass('active').siblings().removeClass('active');
                    $pics.eq($num).addClass('showpic').siblings().removeClass('showpic');
                }
                // 
                timer = setInterval(function() {
                    $right.click();
                }, 1000)
            })
        }
    })
})(jQuery);