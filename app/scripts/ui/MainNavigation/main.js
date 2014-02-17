'use strict';

define(
  [
    'flight/lib/component',
    'hbs!./content',
  ],

  function(defineComponent, content) {

    return defineComponent(Component);

    function Component() {
      
      this.defaultAttrs({
        'content': 'ul',
      });
 
      this.update = function (ev, data) {
        //console.log('nav update:', data);
        this.select('content').html(content(data));
      };
 
      this.after('initialize', function() {
        //console.log('ui.MainNavigation: initialize');
        this.on(document, 'data:mainNavigation', this.update);
        this.trigger('ui:need:mainNavigation');
      });

    }
  }
);
