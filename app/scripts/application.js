'use strict';

define(
  [
    'flight/lib/component',
    'underscore',
    'mixin/ServiceManager',
  ],

  function(defineComponent, _, ServiceManager) {

    return defineComponent(Component, ServiceManager);

    function Component() {
      
      this.defaultAttrs({
      });

      this.describe = function () {
        return {
          name: 'app.Main',
          services: [
            'ApplicationProfile',
            'UserProfile',
            'ApplicationManager',
          ],
        };
      };
      
      this.onServicesStarted = function () {
        this.trigger('app:services:started');
      };

      this.after('initialize', function() {
        this.setup();
        this.run();
      });

    };

  }
);
