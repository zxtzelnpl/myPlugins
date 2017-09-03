/**
 * Created by Administrator on 2017/7/14 0014.
 * An Tab Plugin
 */
(function($){
  var Tab = (function(){
    function Tab(element,options){
      this.setting=$.extend(false,$.fn.Tab.defaults,options||[]);
      this.element = element;
      this.btns=element.find(this.setting.btn);
      this.contents=element.find(this.setting.content);
      this.init()
    }

    Tab.prototype = {
      init:function(){
        var me=this;
        me._on(this.setting.index);
        me._show(this.setting.index);
        if(me.setting.fun!==null){
          me.setting.fun.call(this,this.setting.index,this.btns,this.contents);
        }
        this.btns.on('click',function(){
          console.log('_handleClick');
          var index=$(this).index();
          me._on(index);
          me._show(index);
          if(me.setting.fun!==null){
            me.setting.fun.call(me,index,me.btns,me.contents);
          }
        })
      },
      _show:function(index){
        var _active=this.setting.active;
        console.log(_active);
        this.btns.removeClass(_active).eq(index).addClass(_active)
      },
      _on:function(index){
        var _on=this.setting.on;
        console.log(_on);
        this.contents.removeClass(_on).eq(index).addClass(_on)
      }
    };

    return Tab;
  })();

  $.fn.Tab = function(options){
    console.log('Tab');
    return this.each(function(){
      var me=$(this),
        instance=me.data('Tab');
      if(!instance){
        me.data('Tab',(instance = new Tab(me,options)))
      }
    })
  };

  $.fn.Tab.defaults={
    btn:'.btn',
    active:'active',
    content:'.content',
    on:'on',
    index:0,
    fun:null
  }
})(jQuery);