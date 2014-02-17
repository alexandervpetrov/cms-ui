'use strict';

define(
  [
    'flight/lib/component',
    'ui/ProjectInfo/main',
    'ui/MainNavigation/main',
    'ui/UserNavigation/main',
    'ui/PageNavigation/main',
    'hbs!./layout',
  ],

  function(defineComponent
    , ProjectInfo
    , MainNavigation
    , UserNavigation
    , PageNavigation
    , layout
    ) {

    return defineComponent(Component);

    function Component() {
      
      this.defaultAttrs({
        'projectInfo': '#header_projectInfo',
        'mainNavigation': '#header_mainNavigation',
        'userNavigation': '#header_userNavigation',
        'pageNavigation': '#main_pageNavigation',
      });
 
      this.after('initialize', function() {
        //console.log('layout.Default: initialize');

        var self = this;
        
        this.loading = false;
        
        /*
        this.observeMutations = function (mutations) {
          console.log('mutations', mutations.length);
          console.log(self.loading);
          if (self.loading) {
            ProjectInfo.attachTo(self.select('projectInfo'));
            MainNavigation.attachTo(self.select('mainNavigation'));
            UserNavigation.attachTo(self.select('userNavigation'));
            PageNavigation.attachTo(self.select('pageNavigation'));
            self.loading = false;
            self.observer.disconnect();
          }
  
        };
        
        this.observer = new MutationObserver(this.observeMutations);
        this.observer.observe(document, { childList: true, subtree: true});
        */

        //////////////////////////////////////////////////////////////////
        
        $(document).observe('added subtree', '#layout', function (record) {
          console.log('observed:', record);
          console.log(self.loading);
          if (self.loading) {
            ProjectInfo.attachTo(self.select('projectInfo'));
            MainNavigation.attachTo(self.select('mainNavigation'));
            UserNavigation.attachTo(self.select('userNavigation'));
            PageNavigation.attachTo(self.select('pageNavigation'));
            self.loading = false;
            $(document).observe('added subtree', '#layout').disconnect();
          }
        });
        
        //////////////////////////////////////////////////////////////////
        
        this.loading = true;

        this.$node.html(layout({}));

        /*
        this.on('ui:need:mainNavigation', function (ev, data) {
          console.log('[get] ui:need:mainNavigation', ev, data);
        });
        */
        
      });

    }
  }
);
