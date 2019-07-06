(function() {
    var COMMON_KEY = {
        lastBrowseCookieName: "LastBrowseProducts",
        cartNum: "cartnum",
        ume: "ume",
        qhs: "qhs",
        cps_from: "t_from",
        cps_aid: "siku_aid"
    };
    var head = {
        flag: false,
        searchTimer: null,
        regionOptions: $('.region-options'),
        currencyOptions: $('.currency-options'),
        searchInput: $('.s-search input'),
        init: function() {
            var that = this;
            $.cookie('area_iso') === 'EN' ? $('.selected-region').text('EN') : $('.selected-region').text('中文');
            that.updateLoginInfo();
            that.bindEvent();
            $('.s-search input.en').val($('.s-search input.en').attr('data-value'));
            $('.s-search input.zh').val($('.s-search input.zh').attr('data-value'));
        },
        bindEvent: function() {
            var that = this;
            $('.region-selection').click(function() {
                that.regionOptions.show();
                // that.currencyOptions.hide();
            });
            $('.region-option').click(function(e) {
                e.stopPropagation();
                var regionOption = $(this).text();
                that.setRegion(regionOption);
            });


            $('.head-lang').on('mouseleave', function() {
                that.regionOptions.hide();
                // that.currencyOptions.hide();
            });

            that.searchInput.focus(function() {
                clearTimeout(that.searchTimer);
                that.searchTimer = null;
                $(this).addClass('txl').removeClass('txr');
                $(this).val() === $(this).attr('data-value') && $(this).val('').attr('placeholder', $(this).attr('data-focus'));
                $('.s-search').addClass('active');
            });
            that.searchInput.blur(function(e) {
                var $this = $(this);
                if ($this.val() === '') {
                    if (that.flag) {
                        $(this).focus();
                        return;
                    }
                    $('.s-search').removeClass('active')
                    that.searchTimer = setTimeout(function() {
                        $this.val($this.attr('data-value'));
                        $this.removeClass('txl').addClass('txr');
                    }, 290);
                }
            });
            that.searchInput.on('keydown', function(e) {
                if (e.keyCode === 13) {
                    $('.s-search .icon-search').click();
                }
            });
            $('.s-search .icon-search').on('mousedown', function() {
                that.flag = true;
            });
            $('.s-search .icon-search').on('mouseup', function() {
                that.flag = false;
            });
            $('.s-search .icon-search').click(function() {
                if (!$('.s-search').hasClass('active')) {
                    $('.s-search input').focus();
                }
                var searchTxt = '';
                if ($('body').hasClass('en')) {
                    searchTxt = $('.s-search input.en').val();
                } else {
                    searchTxt = $('.s-search input.zh').val();
                }
                searchTxt && (window.location.href = 'http://search.secoo.com/search?keyword=' + encodeURIComponent(encodeURIComponent(searchTxt)) + '&level=0&qfs=1');
            });

        },
        setRegion: function(regionOption) {
            var that = this;
            $('.selected-region').text(regionOption);
            if (regionOption === 'EN') {
                $('body').removeClass('zh').addClass('en');
                $('html').attr('lang', 'en');
                that.regionOptions.hide();
                $.cookie('lang_iso', 'en', { domain: 'secoo.com', path: '/' });
            } else {
                $('body').removeClass('en').addClass('zh');
                $('html').attr('lang', 'zh');
                that.regionOptions.hide();
                $.cookie('lang_iso', 'zh', { domain: 'secoo.com', path: '/' });
            }
            $.cookie('area_iso', regionOption, { domain: 'secoo.com', path: '/' });
        },
        updateLoginInfo: function() {
            $.getJSON("https://passport.secoo.com/login/checkLogin.jsp?callback=?", function(data) {
                if (data && data.isLogin) {
                    var umeStr = $.cookie(COMMON_KEY.ume) == null ? "" : $.cookie(COMMON_KEY.ume);
                    $('.head-site').addClass('logged-in');
                    $('.head-site .username a').text(umeStr);
                } else {
                    $('.head-site').removeClass('logged-in');
                    $('.head-site .username a').text('');
                }
            });
        }
    };
    head.init();
})();