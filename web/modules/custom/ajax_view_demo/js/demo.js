(function ($, Drupal, drupalSettings) {

    var element = document.getElementById('calendar-today');

    element.onclick = function() {
        // This is where the actual date calculations will go
        console.log(this);
        // sessionStorage.setItem('date', '201710');
        var startdate = parseInt(sessionStorage.getItem('date'));
        var increment = 500;
        var date = startdate - increment;
        var view_args = date;
        sessionStorage.setItem('date', date.toString());

        console.log(view_args)
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
          element: this,
          event: 'click'
        };

        Drupal.ajax(ajax_settings);
        alert( "This calendar month." );
        alert(sessionStorage.getItem('date'));

   }

  $(document).ready(function() {
    var dates;
    $('#calendar').fullCalendar({
      navLinks: false,
      height: 'auto',
      defaultView: 'month',
      viewRender: function(view, element) {
         $.ajax({
          url: '/ajax_view_demo/demo_resource/' + view.intervalStart.format() + '?_format=json',
          type: 'GET',
           success: function(response) {
            dates = response;
            $('.fc-content-skeleton .fc-day-top').each(function() {
              var dataDate = $(this).attr('data-date');
              var hasPost = dates.indexOf(dataDate);
              if (hasPost != -1) {
                $(this).addClass('has-post');
              }
            });
          },
          error: function(response) {
            console.log(response);
          }
        });
      },
      dayClick: function(date, jsEvent, view) {
        var a = dates.indexOf(date.format("YYYY-MM-DD"));
        if (a != -1) {
         window.location.href = drupalSettings.path.baseUrl + 'archives/' + date.format("YYYY/MM/DD");
        }
      },
    });
  });
})(jQuery, Drupal, drupalSettings);


// jQuery(function ($) {
//   sessionStorage.setItem('date', '201711');
//   $( ".calendar-today" ).css( "border", "6px solid red" );
//   $( ".calendar-today" ).trigger('click');
//   $( ".calendar-today" ).trigger('click');
//  alert('the starting value is: ' + sessionStorage.getItem('date'));
//
// });
