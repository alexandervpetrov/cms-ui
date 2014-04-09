'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentBasic',
    'hbs!./content',
  ],

  function(defineComponent, ComponentBasic, content) {

    return defineComponent(Component, ComponentBasic);

    function Component() {
      
      this.defaultAttrs({
        'content': 'ul',
      });
 
      this.update = function (ev, data) {
        //console.log('nav update:', data);
        this.select('content').html(content({ user: data }));
      };
 
      this.after('initialize', function() {
        this.setup();
        //console.log('ui.UserNavigation: initialize');
        this.on(document, 'data:userInfo', this.update);
        this.announceRunning();
        this.trigger('ui:need:userInfo');
      });

    }
  }
);
