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
        this.select('content').html(content(data));
      };
 
      this.after('initialize', function() {
        this.setup();
        this.on(document, 'data:mainNavigation', this.update);
        this.announceRunning();
        this.trigger('ui:need:mainNavigation');
      });

    }
  }
);
