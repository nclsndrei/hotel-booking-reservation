$(document).ready(function () {

  $('.header').height($(window).height());

  $(".btn-guest").click(function () { //Guest Selector
    let target = $(this).data("target");
    let input = $("#" + target);
    let value = parseInt(input.val());

    if ($(this).hasClass("plus")) {
      input.val(value + 1);
    } else if ($(this).hasClass("minus")) {
      if (value > 0) input.val(value - 1);
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
});


//Puwede ka dito maghlagay baba neto pre
// Footer (year pre) -MOYA
document.getElementById('year').textContent = new Date().getFullYear();


document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  var titleEl = document.getElementById('feedbackTitle');
  var bodyEl = document.getElementById('feedbackBody');

  if (!name && !email && !message) {
    titleEl.textContent = 'Please fill out the form';
    bodyEl.textContent = 'You need to enter at least one field before sending.';
  } else {
    titleEl.textContent = 'Sent Successfully';
    bodyEl.textContent = 'Your message has been sent successfully.';
    this.reset();
  }

  $('#feedbackModal').modal('show');
});

// Reservation form submission
document.getElementById('confirmReservation').addEventListener('click', function () {
  let name = document.getElementById('guestName').value.trim();
  let email = document.getElementById('guestEmail').value.trim();
  let phone = document.getElementById('guestPhone').value.trim();
  let checkin = document.getElementById('checkin').value.trim();
  let checkout = document.getElementById('checkout').value.trim();
  let adults = document.getElementById('adults').value.trim();
  let children = document.getElementById('children').value.trim();
  let rooms = document.getElementById('rooms').value.trim();
  let roomType = document.getElementById('roomType').value.trim();

  let titleEl = document.getElementById('feedbackTitle');
  let bodyEl = document.getElementById('feedbackBody');

  if (!name || !email || !phone || !checkin || !checkout || parseInt(adults) < 1 || parseInt(rooms) < 1 || !roomType) {
    // ERROR → show feedback immediately
    titleEl.textContent = 'Missing Information';
    bodyEl.textContent = 'Please fill out all fields before confirming your reservation.';
    $('#feedbackModal').modal('show');
  } else {
    // SUCCESS
    let now = new Date();
    let timestamp = now.toLocaleString();

    titleEl.textContent = 'Reservation Confirmed';
    bodyEl.innerHTML = `
      Thank you, <b>${name}</b>!<br>
      Your booking from <b>${checkin}</b> to <b>${checkout}</b><br>
      for <b>${adults} adult(s)</b>, <b>${children} child(ren)</b>, and <b>${rooms} room(s)</b><br>
      in a <b>${roomType}</b> has been reserved.<br><br>
      A confirmation has been sent to <b>${email}</b>. We may also contact you at <b>${phone}</b>.<br><br>
      <small>Booking confirmed on: ${timestamp}</small>
    `;

    // Reset form values
    document.getElementById('reservation-form').reset();
    document.getElementById('adults').value = 1;
    document.getElementById('children').value = 0;
    document.getElementById('rooms').value = 1;

    // Close reservation modal first
    $('#reservationModal').modal('hide');

    // After it's fully closed, THEN show feedback
    $('#reservationModal').one('hidden.bs.modal', function () {
      $('#feedbackModal').modal('show');
    });
  }
});

$('body').scrollspy({ target: '.navbar', offset: 70 }); // Adjust offset 

$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $('#backToTop').fadeIn();
  } else {
    $('#backToTop').fadeOut();
  }
});

// Back to Top Button
let backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"   // smooth scroll instead of instant jump
  });
}
