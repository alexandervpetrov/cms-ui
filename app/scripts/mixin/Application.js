'use strict';

define(
  [
    'flight/lib/compose',
    'mixin/ComponentBasic',
    'underscore',
  ],

  function(compose, ComponentBasic, _) {

    return Mixin;
    
    /**
     * Application is a container of services.
     * Starts services registered in [services] attribute of descriptor.
     * Triggers [app:services:started] when all services reported they are running.
     */
    
    function Mixin() {
      
      compose.mixin(this, [ComponentBasic]);

      this.announceRunningIfReady = function () {
        if (_.isEmpty(this.runtime.servicesWaitingToStart)) {
          console.log(this.info.name, '::', 'app:services:started');
          this.trigger({
            type: 'app:services:started',
            defaultBehavior: this.preventDefault,
          });
          this.off('component:started');
        }
      };

      this.trackComponentStart = function (ev, info) {
        
        console.log('component:started', info);
        
        if (info.name === this.info.name) {
          return;
        }

        if (info.name in this.runtime.services) {
          delete this.runtime.servicesWaitingToStart[info.name];
        }
        
        this.announceRunningIfReady();
      };
      
      this.run = function () {
        this.announceRunningIfReady();
        _.each(this.info.services, function (name) {
          this.startComponent(name, document);
        }.bind(this));
      };

      this.setup = function () {

        (new ComponentBasic).setup.bind(this)();

        var names = this.info.services;
        var services = _.object(names, _.range(0, names.length));
        
        this.runtime = {
          services: services,
          servicesWaitingToStart: _.clone(services),
        };
        
        this.on('component:started', this.trackComponentStart);

      };

    };

  }
);
