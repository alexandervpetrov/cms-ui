'use strict';

define(
  [
    'flight/lib/component',
    'hbs!./content',
  ],

  function(defineComponent, content) {

    return defineComponent(Component);

    function Component() {
      
      this.defaultAttrs({
      });
      
      this.update = function (ev, data) {
        this.$node.html(content(data));
      };
      
      this.after('initialize', function() {
        //console.log('ui.ProjectInfo: initialize');
        this.on(document, 'data:applicationInfo', this.update);
        this.trigger('ui:need:applicationInfo');
      });

    }
  }
);
