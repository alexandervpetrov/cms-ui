'use strict';

require(['setup'], function (setup) {
  
  require(
    [
      'jquery',
      'flight/lib/index',
      'flight/lib/debug',
      'jqueryObserve',
      'hbs/handlebars',
      'application',
    ],
    function (
      $,
      flight,
      flightDebug,
      jqObs,
      Handlebars,
      Application
    ) {

      require([
        'bootstrapCollapse',
        'bootstrapDropdown',
        'jqueryObserve',
      ]);

      //console.log('Running jQuery %s', $().jquery);

      flight.compose.mixin(flight.registry,
        [flight.advice.withAdvice, flight.logger]
      );

      //flightDebug.enable(true);
      //flightDebug.events.logAll();
      //flightDebug.events.logByAction('trigger');
      //flightDebug.events.logByName('ui*');
      //flightDebug.events.logByName('data*');

      Handlebars.registerHelper('url', function(ref) {
        return '#!' + ref;
        //return new Handlebars.SafeString(result);
      });

      Application.attachTo(document);
      
    }
  );

});
