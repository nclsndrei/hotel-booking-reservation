$(document).ready(function () {

  $('.header').height($(window).height());

  $(".btn-guest").click(function () { //Guest Selector
    let target = $(this).data("target");
    let input = $("#" + target);
    let value = parseInt(input.val());

    if ($(this).hasClass("plus")) {
      input.val(value + 1);
    } else if ($(this).hasClass("minus")) {
      if (value > 0) {
        input.val(value - 1);
      }
    }
  });


  $("#checkin").on("change", function () { //Date Validation
    let checkinDate = $(this).val();
    $("#checkout").attr("min", checkinDate);

    if ($("#checkout").val() && $("#checkout").val() < checkinDate) {
      $("#checkout").val(checkinDate);
    }
  });

  $("#checkout").on("change", function () {
    let checkinDate = $("#checkin").val();
    let checkoutDate = $(this).val();

    if (checkoutDate < checkinDate) {
      alert("Checkout date cannot be earlier than check-in date.");
      $(this).val(checkinDate);
    }
  });

  $('#year').text(new Date().getFullYear());  // Modified footer 

  $('#contact-form').on('submit', function (e) { // Modified contact form submit handler
    e.preventDefault();

    var $form = $(this);
    var name = $.trim($('#name').val());
    var message = $.trim($('#message').val());
    var email = $.trim($('#email').val());

    var $titleEl = $('#feedbackTitle');
    var $bodyEl = $('#feedbackBody');

    if (!name && !email && !message) {
      $titleEl.text('Please fill out the form');
      $bodyEl.text('You need to enter at least one field before sending.');
    } else {
      $titleEl.text('Sent Successfully');
      $bodyEl.text('Your message has been sent successfully.');
      $form[0].reset(); // DOM reset via the form element
    }

    $('#feedbackModal').modal('show');

  });

  $('#confirmReservation').on('click', function () {
    var name = $.trim($('#guestName').val());
    var email = $.trim($('#guestEmail').val());
    var phone = $.trim($('#guestPhone').val());
    var checkin = $.trim($('#checkin').val());
    var checkout = $.trim($('#checkout').val());
    var adults = $.trim($('#adults').val());
    var children = $.trim($('#children').val());
    var rooms = $.trim($('#rooms').val());
    var roomType = $.trim($('#roomType').val());

    var $titleEl = $('#feedbackTitle');
    var $bodyEl = $('#feedbackBody');

    if (!name || !email || !phone || !checkin || !checkout ||
      parseInt(adults, 10) < 1 || parseInt(rooms, 10) < 1 || !roomType) {
      $titleEl.text('Missing Information');
      $bodyEl.text('Please fill out all fields before confirming your reservation.');
      $('#feedbackModal').modal('show');
      return;
    }

    var now = new Date();
    var timestamp = now.toLocaleString();

    $titleEl.text('Reservation Confirmed');
    $bodyEl.html(
      'Thank you, <b>' + name + '</b>!<br>' +
      'Your booking from <b>' + checkin + '</b> to <b>' + checkout + '</b><br>' +
      'for <b>' + adults + ' adult(s)</b>, <b>' + children + ' child(ren)</b>, and <b>' + rooms + ' room(s)</b><br>' +
      'in a <b>' + roomType + '</b> has been reserved.<br><br>' +
      'A confirmation has been sent to <b>' + email + '</b>. We may also contact you at <b>' + phone + '</b>.<br><br>' +
      '<small>Booking confirmed on: ' + timestamp + '</small>'
    );

    // Reset values using jQuery
    $('#reservation-form')[0].reset();
    $('#adults').val(1);
    $('#children').val(0);
    $('#rooms').val(1);

    // Close reservation modal then show feedback
    $('#reservationModal').modal('hide');
    $('#reservationModal').one('hidden.bs.modal', function () {
      $('#feedbackModal').modal('show');
    });
  });

  $('body').scrollspy({ target: '.navbar', offset: 70 }); // Adjust offset 

  $(document).ready(function () {
    var $backToTopBtn = $("#backToTop");

    // Show/hide on scroll
    $(window).on("scroll", function () {
      if ($(document).scrollTop() > 200) {
        $backToTopBtn.fadeIn();
      } else {
        $backToTopBtn.fadeOut();
      }
    });

    // Smooth scroll to top
    $backToTopBtn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500); // 500ms smooth scroll
    });
  });

  // jQuery UI widgets

  // Datepicker on reservation form
  $("#checkin, #checkout").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0
  });

  // FAQ Accordion
  $("#accordion").accordion({
    collapsible: true,
    heightStyle: "content"
  });

  // Special Offer Dialog (auto opens after 3 sec)
  $("#specialOffer").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      "Close": function () {
        $(this).dialog("close");
      }
    }
  });

  // Example: open after 3 seconds
  setTimeout(function () {
    $("#specialOffer").dialog("open");
  }, 3000);



}); 