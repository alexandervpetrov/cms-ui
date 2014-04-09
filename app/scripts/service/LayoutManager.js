'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentBasic',
  ],

  function(defineComponent, ComponentBasic) {

    return defineComponent(Component, ComponentBasic);

    function Component() {
      
      this.defaultAttrs({
        layout: '#layout',
      });
      
      this.emptyLayout = function () {
        var e = document.createElement('div');
        e.id = 'layout';
        return e;
      };

      this.loadLayout = function(ev, info) {
        var layoutElement = this.emptyLayout();
        this.startComponent(info.name, layoutElement);
        this.select('layout').replaceWith(layoutElement);
        // -----------------------------------------------------------------
        //this.startComponent(info.name, this.select('layout'));
      };
 
      this.after('initialize', function() {
        this.setup();
        this.on('app:loadLayout', this.loadLayout);
        this.announceRunning();
      });

    }
  }
);
