'use strict';

define(
  [
  ],

  function() {

    return Mixin;

    /**
     * Basic component: descriptor + life-cycle tracking possibility.
     * 
     * Mixin target must provide describe() function
     * returning component descriptor
     */

    function Mixin() {
      
      this.parseComponentName = function (name) {

        var r = {
          parsed: false,
          prefix: '',
          name: '',
          fullName: '',
        };

        // TODO: Is it safe to use String.split here?

        var prefixLength = name.indexOf('.');
        if (prefixLength !== -1 && name.length > prefixLength+1) {
          r.prefix = name.substr(0, prefixLength);
          r.name = name.substr(prefixLength + 1);
          r.fullName = name;
          r.parsed = true;
        }

        return r;
      };
      
      this.setup = function () {
        if (!('describe' in this)) {
          this.describe = function () {
            return { name: this.attr.name };
          };
        }
        this.info = this.describe();
      };
      
      this.announceRunning = function () {
        this.trigger('component:started', this.info);
      };
      
    };
    
  }
);
