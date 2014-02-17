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
        //console.log('nav update:', data);
        this.$node.html(content(data));
      };
 
      this.after('initialize', function() {
        //console.log('ui.PageNavigation: initialize');
        this.on(document, 'data:pageNavigation', this.update);
        this.trigger('ui:need:pageNavigation');
      });

    }
  }
);
