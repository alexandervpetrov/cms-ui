'use strict';

define(
  [
    'flight/lib/component',
    'mixin/ComponentContainer',
    'hbs!./layout',
  ],

  function(defineComponent
    , ComponentContainer
    , layout
    ) {

    return defineComponent(Component, ComponentContainer);

    function Component() {
      
      this.defaultAttrs({
        projectInfo: '#header_projectInfo',
        mainNavigation: '#header_mainNavigation',
        userNavigation: '#header_userNavigation',
        pageNavigation: '#main_pageNavigation',
      });
 
      this.describe = function () {
        return {
          name: 'layout.Default',
          children: [
            { name: 'ui.ProjectInfo', selector: 'projectInfo', },
            { name: 'ui.MainNavigation', selector: 'mainNavigation', },
            { name: 'ui.UserNavigation', selector: 'userNavigation', },
            { name: 'ui.PageNavigation', selector: 'pageNavigation', },
          ],
        };
      };
 
      this.render = function (data) {
        this.$node.html(layout(data));
      };
 
      this.after('initialize', function() {
        this.setup();
        this.announceRunning();
        this.transformInternalDom(this.render.bind(this, {}), 'startChildren');
      });

    }
  }
);
