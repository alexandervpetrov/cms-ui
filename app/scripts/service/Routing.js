'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentBasic',
    'locationBar',
  ],

  function(defineComponent, ComponentBasic, LocationBar) {

    return defineComponent(Component, ComponentBasic);

    function Component() {
      
      this.defaultAttrs({
      });
      
      this.onLocationChange = function (path) {
        console.log('location:', '[', path, ']');
      };
      
      this.after('initialize', function() {
        this.setup();
        this.on('app:services:started', function () {
          this.locationBar = new LocationBar();
          this.locationBar.onChange(this.onLocationChange);
          this.locationBar.start();
        });        
        this.announceRunning();        
      });

    }
  }
);
