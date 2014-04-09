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
      });
      
      this.update = function (ev, data) {
        this.$node.html(content(data));
      };
      
      this.after('initialize', function() {
        this.setup();
        //console.log('ui.ProjectInfo: initialize');
        this.on(document, 'data:applicationInfo', this.update);
        this.announceRunning();
        this.trigger('ui:need:applicationInfo');
      });

    }
  }
);
