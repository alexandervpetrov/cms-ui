'use strict';

define(
  [
    'flight/lib/compose',
    'mixin/ComponentHelpers',
    'underscore',
  ],

  function(compose, ComponentHelpers, _) {

    return Mixin;
    
    /**
     * Starts services registered in [services] attribute of descriptor.
     * Calls [onServicesStarted] when all services reported they are running.
     */
    
    function Mixin() {
      
      compose.mixin(this, [ComponentHelpers]);

      this.startService = function (name) {
        var componentName = 'service.' + name;
        var componentPath = 'service/' + name;
        require([componentPath], function (Service) {
          Service.attachTo(document, {
            name: componentName,
          });
        });
      };

      this.announceRunningIfReady = function () {
        if (_.isEmpty(this.runtime.servicesToStart)) {
          this.announceRunning();
        }
      };

      this.trackComponentStart = function (ev, data) {
        
        if (data.name === this.info.name) {
          this.onServicesStarted();
          return;
        }

        var pr = this.parseComponentName(data.name);
        if (!pr.parsed || pr.prefix !== 'service') {
          return;
        }
        
        if (pr.name in this.runtime.services) {
          delete this.runtime.servicesToStart[pr.name];
        }
        
        this.announceRunningIfReady();
      };
      
      this.run = function () {
        this.announceRunningIfReady();
        _.each(this.info.services, this.startService);
      };

      this.setup = function () {
        
        this.info = this.describe();

        var serviceNames = this.info.services;
        var services = _.object(serviceNames, _.range(0, serviceNames.length));
        this.runtime = {
          services: services,
          servicesToStart: _.clone(services),
        };
        
        this.on('component:started', this.trackComponentStart);

      };

    };
    
  }
);
