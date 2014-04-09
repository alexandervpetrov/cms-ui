'use strict';

require.config({

  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrapAffix: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix',
    bootstrapAlert: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert',
    bootstrapButton: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button',
    bootstrapCarousel: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel',
    bootstrapCollapse: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse',
    bootstrapDropdown: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown',
    bootstrapModal: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal',
    bootstrapPopover: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover',
    bootstrapScrollspy: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy',
    bootstrapTab: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab',
    bootstrapTooltip: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip',
    bootstrapTransition: '../bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition',
    es5shim: '../bower_components/es5-shim/es5-shim',
    es5sham: '../bower_components/es5-shim/es5-sham',
    underscore: '../bower_components/underscore/underscore',
    flight: '../bower_components/flight',
    handlebars: '../bower_components/hbs/hbs/handlebars',
    hbs: '../bower_components/hbs/hbs',
    jqueryObserve: '../bower_components/jquery-observe/jquery-observe',
    locationBar: '../bower_components/location-bar/location-bar',
  },

  hbs: {
    templateExtension: 'html',
  },

  shim: {

    bootstrapAffix: {
      deps: ['jquery']
    },
    bootstrapAlert: {
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapButton: {
      deps: ['jquery']
    },
    bootstrapCarousel: {
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapCollapse: {
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapDropdown: {
      deps: ['jquery']
    },
    bootstrapModal:{
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapPopover: {
      deps: ['jquery', 'bootstrapTooltip']
    },
    bootstrapScrollspy: {
      deps: ['jquery']
    },
    bootstrapTab: {
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapTooltip: {
      deps: ['jquery', 'bootstrapTransition']
    },
    bootstrapTransition: {
      deps: ['jquery']
    },

    underscore: {
      exports: '_'
    },

    flight: {
      deps: [
        'jquery', 
        'es5shim', 
        'es5sham'
      ],
      exports: 'flight'
    },
    
    jqueryObserve: {
      deps: [
        'jquery',
      ],
    },

  }

});
