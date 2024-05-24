$(document).ready(function () {
  loadBookings();

  $(document).on('click', '.booking-approved', function () {
    let idBooking = $(this).data('id');
    Swal.fire({ text: 'Apakah anda yakin ingin menerima pesanan ini?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light', cancelButton: 'btn btn-outline-danger ms-2 waves-effect waves-light' }, buttonsStyling: false }).then(function (result) {
      if (result.value) {
        approvedBooking(idBooking);
      }
    });
  });

  $(document).on('click', '.booking-rejected', function () {
    let idBooking = $(this).data('id');
    Swal.fire({ text: 'Apakah anda yakin ingin menolak pesanan ini?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light', cancelButton: 'btn btn-outline-danger ms-2 waves-effect waves-light' }, buttonsStyling: false }).then(function (result) {
      if (result.value) {
        rejectedBooking(idBooking);
      }
    });
  });

  function loadBookings() {
    $('#listBookings').html('');
    $('.card').block({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });

    $.get('/api/bookings', function (data) {
      $('.card').unblock();

      data.forEach(booking => {
        const btnApprove = `<button type="button" class="btn btn-sm rounded-pill btn-label-success booking-approved" data-id="${booking._id}">
              <span class="ti-xs ti ti-check me-1"></span>Terima
            </button>
            <button type="button" class="btn btn-sm rounded-pill btn-label-danger booking-rejected" data-id="${booking._id}">
              <span class="ti-xs ti ti-x me-1"></span>Tolak
            </button>`;
            
        $('#listBookings').append(`<tr>
          <td>${booking.vehicle.name}</td>
          <td>${booking.user.username}</td>
          <td>${new Date(booking.startDate).toLocaleDateString()}</td>
          <td>${new Date(booking.endDate).toLocaleDateString()}</td>
          <td><span class="badge bg-label-${booking.status === 'approved' ? 'success' : booking.status === 'pending' ? 'warning' : 'danger'} me-1">${booking.status.toUpperCase()}</span></td>
          <td>${booking.status === 'pending' ? btnApprove : '-'}</td>
        </tr>`);
      });
    });
  }

  function approvedBooking(id) {
    $.blockUI({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/bookings/' + id + '/approve',
      type: 'POST',
      success: function (d) {
        $.unblockUI();
        loadBookings();
        Swal.fire({ title: 'Good job!', text: d.msg, icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      },
      error: function (e) {
        $.unblockUI();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  }

  function rejectedBooking(id) {
    $.blockUI({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/bookings/' + id + '/reject',
      type: 'POST',
      success: function (d) {
        $.unblockUI();
        loadBookings();
        Swal.fire({ title: 'Good job!', text: d.msg, icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      },
      error: function (e) {
        $.unblockUI();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  }
});
