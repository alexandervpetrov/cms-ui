'use strict';

define(
  [
    'underscore',
  ],

  function(_) {

    return Mixin;

    /**
     * Basic component: descriptor + life-cycle tracking possibility.
     */

    function Mixin() {
      
      this.componentPrefix = function (name) {
        if (name.indexOf('.') === -1) {
          throw Error('component name does not have a prefix: ' + name);
        }
        return name.split('.', 1)[0];
      };

      this.componentPath = function (name) {
        var prefix = this.componentPrefix(name);
        var path = name.replace('.', '/');
        if (prefix !== 'service') {
          path += '/main';
        }
        return path;
      };
      
      this.startComponent = function (name, element) {
        //console.log('start:', name, element);
        var componentPath = this.componentPath(name);
        require([componentPath], function (Component) {
          Component.attachTo(element, {
            name: name,
          });
        });
      };

      this.transformInternalDom = function (domTransformation, readyEventTag) {
        var domReadyEventName = (typeof readyEventTag === 'undefined') 
                                  ? 'component:internalDomReady'
                                  : 'component:' + readyEventTag;
        this.loading = false;
        $(document).observe('added subtree', this.$node, function (record) {
          if (this.loading) {
            this.trigger({
              type: domReadyEventName,
              defaultBehavior: this.preventDefault,
            });
            this.loading = false;
            $(document).observe('added subtree', this.$node).disconnect();
          }
        }.bind(this));
        this.loading = true;
        domTransformation();
      };
      
      this.setup = function () {
        if (!('describe' in this)) {
          this.describe = function () {
            return { name: this.attr.name };
          };
        }
        if (!('info' in this)) {
          this.info = {};
        }
        _.extend(this.info, this.describe());
      };
      
      this.announceRunning = function () {
        this.trigger('component:started', this.info);
      };
      
    };
    
  }
);
