'use strict';

define(
  [
    'flight/lib/component',
    'underscore',
    'mixin/Application',
  ],

  function(defineComponent, _, Application) {

    return defineComponent(Component, Application);

    function Component() {
      
      this.defaultAttrs({
      });

      this.describe = function () {
        return {
          name: 'app.Main',
          services: [
            'service.ApplicationProfile',
            'service.UserProfile',
            'service.Routing',
            'service.LayoutManager',
          ],
        };
      };
      
      this.decideAboutLayout = function () {
        var layout = 'layout.Default';
        this.trigger(document, 'app:loadLayout', { name: layout });
        
        /*
        var reload = function () {
          this.trigger(document, 'app:loadLayout', { name: layout });
          window.setTimeout(reload, 500);
        }.bind(this);
        reload();
        */
        
      };
      
      this.after('initialize', function() {
        this.setup();
        this.on('app:services:started', this.decideAboutLayout);
        this.run();
        this.announceRunning();
      });

    };

  }
);
