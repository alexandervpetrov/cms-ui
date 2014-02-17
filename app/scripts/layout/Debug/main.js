'use strict';

define(
  [
    'flight/lib/component',
    'hbs!./layout',
  ],

  function(defineComponent, layout) {

    return defineComponent(Component);

    function Component() {
      
      this.defaultAttrs({
      });
 
      this.after('initialize', function() {
        console.log('layout.Default: initialize');
        this.$node.html(layout({}));
      });

    }
  }
);
