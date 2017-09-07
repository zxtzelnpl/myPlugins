/**
 * Created by Administrator on 2017/7/14 0014.
 * An Tab Plugin
 */
(function ($) {
    var Tab = (function () {
        function Tab(element, options) {
            this.setting = $.extend(false, $.fn.Tab.defaults, options || []);
            this.element = element;
            this.btns = element.find(this.setting.btn);
            this.contents = element.find(this.setting.content);
            this.init()
        }

        Tab.prototype = {
            init: function () {
                var me = this;
                me._on(me.setting.index);
                me._show(me.setting.index);
                me._fun(me.setting.index);
                me.btns.on('click', function () {
                    console.log('_handleClick');
                    var index = $(me).index();
                    me._on(index);
                    me._show(index);
                    me._fun(index);
                })
            },
            _show: function (index) {
                var _active = this.setting.active;
                console.log(_active);
                this.btns.removeClass(_active).eq(index).addClass(_active)
            },
            _on: function (index) {
                var _on = this.setting.on;
                console.log(_on);
                this.contents.removeClass(_on).eq(index).addClass(_on)
            },
            _fun:function(index){
                if (typeof this.setting.fun === 'function') {
                    this.setting.fun.call(this, index, this.btns, this.contents);
                }
            }
        };
        return Tab;
    })();

    $.fn.Tab = function (options) {
        console.log('Tab');
        return this.each(function () {
            var me = $(this),
                instance = me.data('Tab');
            if (!instance) {
                me.data('Tab', ( new Tab(me, options)))
            }
        })
    };

    $.fn.Tab.defaults = {
        btn: '.btn',
        active: 'active',
        content: '.content',
        on: 'on',
        index: 0,
        fun: null
    }

})(jQuery);