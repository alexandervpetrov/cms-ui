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
     * Starts components registered in [children] attribute of descriptor.
     * Triggers [component:children:started] when all child components reported they are running.
     */
    
    function Mixin() {
      
      compose.mixin(this, [ComponentBasic]);

      this.announceRunningIfReady = function () {
        if (_.isEmpty(this.runtime.childrenWaitingToStart)) {
          console.log(this.info.name, '::', 'component:children:started');
          this.trigger({
            type: 'component:children:started',
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

        if (info.name in this.runtime.childrenWaitingToStart) {
          delete this.runtime.childrenWaitingToStart[info.name];
        }
        
        this.announceRunningIfReady();
      };
      
      this.startChildren = function () {
        this.announceRunningIfReady();
        _.each(this.info.children, function (child) {
          var element = this.select(child.selector);
          this.startComponent(child.name, element);
        }.bind(this));
      };

      this.setup = function () {
        
        (new ComponentBasic).setup.bind(this)();

        var names = _.map(this.info.children, function (c) { return c.name; });
        var children = _.object(names, this.info.children);
        
        this.runtime = {
          children: children,
          childrenWaitingToStart: _.clone(children),
        };
        
        this.on('component:startChildren', this.startChildren);
        this.on('component:started', this.trackComponentStart);

      };

    };
    
  }
);
