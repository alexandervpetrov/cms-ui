'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentHelpers',
  ],

  function(defineComponent, ComponentHelpers) {

    return defineComponent(Component, ComponentHelpers);

    function Component() {
      
      this.defaultAttrs({
      });
 
      this.applicationInfo = function () {
        var data = {
          projectName: 'example.com',
        };
        //console.log('data:applicationInfo', data);
        this.trigger('data:applicationInfo', data);
      };
 
      this.after('initialize', function() {
        this.setup();
        this.on('ui:need:applicationInfo', this.applicationInfo);
        this.announceRunning();
      });

    }
  }
);
