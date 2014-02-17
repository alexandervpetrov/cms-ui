'use strict';

define(
  [
    'flight/lib/component',
  ],

  function(defineComponent) {

    return defineComponent(Component);

    function Component() {
      
      this.defaultAttrs({
      });
 
      this.after('initialize', function() {
        //console.log('ui.Test: initialize');
      });

    }
  }
);
