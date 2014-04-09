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
      });
 
      this.userInfo_ = {
        userId: '1',
        userName: 'alex',
        displayName: 'Alexander Petrov',
      };
      
      function navItem(link, title, active) {
        return {
          link: link,
          title: title,
          active: active || false,
        };
      };
 
      this.navigation = {
          main: [
            navItem('/', 'Home', true),
            navItem('/users', 'Users'),
            navItem('/security', 'Security'),
            navItem('/system', 'System'),
          ],
          page: [
            navItem('/documents', 'Documents'),
            navItem('/definitions', 'Definitions', true),
            navItem('/resources', 'Resources'),
          ],
          plugins: [
            navItem('/ext.rockets', 'Rockets'),
            navItem('/ext.ships', 'Ships'),
            navItem('/ext.aircrafts', 'Aircrafts'),
          ],
        };
        
      this.pageNavigation_ = {
          nav: {
            core: this.navigation.page,
            extensions: this.navigation.plugins,
          },
        };

      this.userInfo = function () {
        this.trigger('data:userInfo', this.userInfo_);
      };

      this.mainNavigation = function () {
        this.trigger('data:mainNavigation', { nav: this.navigation.main });
      };
 
      this.pageNavigation = function () {
        this.trigger('data:pageNavigation', this.pageNavigation_);
      };
      
      this.navigate = function (ev, data) {
        console.log('navigate:', data);
      };
      
      this.after('initialize', function() {
        this.setup();
        this.on('ui:need:userInfo', this.userInfo);
        this.on('ui:need:mainNavigation', this.mainNavigation);
        this.on('ui:need:pageNavigation', this.pageNavigation);
        this.on('app:navigate', this.navigate);
        this.announceRunning();
      });

    }
  }
);
