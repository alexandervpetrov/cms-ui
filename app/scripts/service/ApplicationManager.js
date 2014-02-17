'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentHelpers',
    'locationBar',
  ],

  function(defineComponent, ComponentHelpers, LocationBar) {

    return defineComponent(Component, ComponentHelpers);

    function Component() {
      
      this.defaultAttrs({
        layout: '#layout',
      });
      
      this.emptyLayout = function () {
        var e = document.createElement('div');
        e.id = 'layout';
        return e;
      };

      this.loadLayout = function(ev, data) {
        console.log('loading layout: ', data);
        var self = this;
        var layoutComponentPath = 'layout/' + data.tag + '/main';
        require([layoutComponentPath], function (Layout) {
          var newLayout = self.emptyLayout();
          Layout.attachTo(newLayout);
          // TODO: loading + transition
          self.select('layout').replaceWith(newLayout);
          
          //self.select('layout').replaceWith(self.emptyLayout);
          //Layout.attachTo(self.select('layout'));
        });
      };
 
      this.decideAboutLayout = function () {
        this.trigger(document, 'client:loadLayout', { tag: 'Default' });
        /*
        function reload() {
          self.trigger(document, 'client:loadLayout', { tag: 'Debug' });
          window.setTimeout(reload, 500);
        };
        reload();
        */
      };
      
      /*
      this.onWindowPopState = function (e, data) {
        console.log('window.popstate: ', e, data);
        var state = e.state;
        var title = state.title;
        var url = state.url;
        console.log('window.popstate: ', url, title);
      };
      */
      
      this.locationBar = new LocationBar();
 
      this.after('initialize', function() {
        this.setup();

        this.on('client:loadLayout', this.loadLayout);
        
        this.locationBar.onChange(function (path) {
          console.log('location:', path);
        });
        
        this.locationBar.start();
        
        //window.onpopstate = this.onWindowPopState;
        
        //$(window).on('popstate', this.onWindowPopState);
        //this.on(window, 'popstate', this.onWindowPopState);
        
        /*
        var self = this;
        $(document).on('click', 'a[href^="#"]', function (e) {
          e.preventDefault();
          console.log('click on a href=/..', e);
          self.trigger('app:navigate', $(this).attr('href'));
        });
        */

        this.on('app:services:started', this.decideAboutLayout);

        this.announceRunning();
      });

    }
  }
);
