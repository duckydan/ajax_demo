(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ajaxViewDemoToday = {
    attach: function (context, settings) {
      // Attach ajax action click event of each view pager.
      $('.calendar-today').once('attach-links').each(this.attachLink);
   },

    attachLink: function (idx, pager) {

      // This is where the actual date calculations will go
      sessionStorage.setItem('date', 201711);
      var date = sessionStorage.getItem('date');
      var view_args = date;
      
      // Everything we need to specify about the view.
      var view_info = {
        view_name: 'calendar',
        view_display_id: 'embed_1',
        view_args: view_args,
        view_dom_id: 'ajax-demo'
      };

      // Details of the ajax action.
      var ajax_settings = {
        submit: view_info,
        url: '/views/ajax',
        element: pager,
        event: 'click'
      };
      
      alert( "This calendar month." );


      Drupal.ajax(ajax_settings);
    }
    
  };
})(jQuery, Drupal, drupalSettings);

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ajaxViewDemoPrev = {
    attach: function (context, settings) {
      // Attach ajax action click event of each view pager.
      $('.calendar-prev').once('attach-links').each(this.attachLink);
   },

    attachLink: function (idx, pager) {

      // This is where the actual date calculations will go
      var startdate = parseInt(sessionStorage.getItem('date'));
      var increment = 100;
      var date = startdate - increment;
      var view_args = date;
      sessionStorage.setItem('date', date.toString());
      
      // Everything we need to specify about the view.
      var view_info = {
        view_name: 'calendar',
        view_display_id: 'embed_1',
        view_args: view_args,
        view_dom_id: 'ajax-demo'
      };

      // Details of the ajax action.
      var ajax_settings = {
        submit: view_info,
        url: '/views/ajax',
        element: pager,
        event: 'click'
      };

      alert( "Previous calendar month." );

      Drupal.ajax(ajax_settings);
    }
    
  };
})(jQuery, Drupal, drupalSettings);

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ajaxViewDemoNext = {
    attach: function (context, settings) {
      // Attach ajax action click event of each view pager.
      $('.calendar-next').once('attach-links').each(this.attachLink);
   },

    attachLink: function (idx, pager) {

      // This is where the actual date calculations will go
      var startdate = parseInt(sessionStorage.getItem('date'));
      var increment = 500;
      var date = startdate + increment;
      var view_args = date;
      var results = sessionStorage.setItem('date', date.toString());
      $('body').append(results);

      // Everything we need to specify about the view.
      var view_info = {
        view_name: 'calendar',
        view_display_id: 'embed_1',
        view_args: view_args,
        view_dom_id: 'ajax-demo'
      };

      // Details of the ajax action.
      var ajax_settings = {
        submit: view_info,
        url: '/views/ajax',
        element: pager,
        event: 'click'
      };

      alert( "Next calendar month." );

      Drupal.ajax(ajax_settings);
    }
    
  };
})(jQuery, Drupal, drupalSettings);

jQuery(function ($) {
  $('body').append('<p>Hello World! ');
  var date = sessionStorage.getItem('date');
  $('body').append(date);
  $('body').append('</p>');
  $( ".calendar-today" ).css( "border", "6px solid red" );
  $( ".calendar-today" ).trigger('click');
});