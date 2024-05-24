/**
 * Page Booking Vehicle
 */

'use strict';

$(function () {
  const timeBooking = document.querySelector('#timeBooking');
  const formBookingVehicle = $('.formBookingVehicle');
  const select2 = $('.select2');
  let dataVehicle = [];

  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        dropdownParent: $this.parent(),
        placeholder: $this.data('placeholder'), // for dynamic placeholder
        dropdownCss: {
          minWidth: '150px' // set a minimum width for the dropdown
        }
      });
    });
    $('.select2-selection__rendered').addClass('w-px-150');
  }

  if (typeof timeBooking != undefined) {
    timeBooking.flatpickr({
      mode: 'range'
    });
  }

  loadVehicles();
  loadDrivers();
  loadApprovers();

  $(document).on('click', '.btn-booked', function () {
    let idVehicle = $(this).data('id');
    showFormBookedVehicle(idVehicle);
  });

  $(document).on('click', '#selectTypeVehicle', function () {
    let type = $(this).val();
    renderVehicle(type);
  });

  formBookingVehicle.submit(function (e) {
    e.preventDefault();
    formBookingVehicle.block({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/bookings',
      type: 'POST',
      data: $(this).serialize(),
      success: function (d) {
        loadVehicles();
        formBookingVehicle.unblock();
        $('#modalBookingVehicle').modal('hide');
        Swal.fire({ title: 'Good job!', text: d.msg, icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      },
      error: function (e) {
        formBookingVehicle.unblock();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  });

  function loadVehicles() {
    $.get('/api/vehicles', function (data) {
      dataVehicle = data;
      $('.descVehicle').html(`Total ada ${data.length} kendaraan yang tersedia`);
      renderVehicle('all');
    });
  }

  function renderVehicle(type) {
    let filteredVehicle;
    if (type !== 'all') {
      filteredVehicle = dataVehicle.filter(vehicle => vehicle.type === type);
    } else {
      filteredVehicle = dataVehicle;
    }

    const status = {
      available: { title: 'Tersedia', class: 'success', icon: 'check' },
      maintenance: { title: 'Perbaikan', class: 'warning', icon: 'x' }
    };

    if (filteredVehicle.length) {
      $('#listVehicles').html('');
      filteredVehicle.forEach(vehicle => {
        $('#listVehicles').append(`<div class="col-sm-6 col-lg-4">
          <div class="card p-2 h-100 shadow-none border">
              <div class="rounded-2 text-center mb-3">
                <img class="img-fluid" src="${vehicle.thumbnail}" alt="${vehicle.name}"/>
              </div>
              <div class="card-body p-3 pt-2">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-label-primary">${vehicle.type === 'people-transport' ? 'Angkutan Orang' : 'Angkutan Barang'}</span>
                  <!--<h6 class="d-flex align-items-center justify-content-center gap-1 mb-0">
                    4.4 <span class="text-warning"><i class="ti ti-star-filled me-1 mt-n1"></i></span><span class="text-muted">(1.23k)</span>
                  </h6>-->
                </div>
                <h5>${vehicle.name}</h5>
                <p class="mt-2">${vehicle.description}</p>
                <p class="d-flex align-items-center text-${status[vehicle.status].class}"><i class="ti ti-${status[vehicle.status].icon} me-2 mt-n1"></i>${status[vehicle.status].title}</p>
                <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                  <button class="app-academy-md-50 btn btn-label-primary d-flex align-items-center btn-booked" data-id="${vehicle._id}">
                    <span class="me-2">Pesan</span><i class="ti ti-shopping-cart-up ti-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
      });
    }
  }

  function loadDrivers() {
    $.get('/api/drivers', function (data) {
      data.forEach(driver => {
        $('#listDrivers').append(`<option value="${driver._id}">${driver.name}</option>`);
      });
    });
  }

  function loadApprovers() {
    $.get('/api/approvers', function (data) {
      data.forEach(approver => {
        $('#listApprovers').append(`<option value="${approver._id}">${approver.username}</option>`);
      });
    });
  }

  function showFormBookedVehicle(id) {
    $('#vehicleId').val(id);
    $('#modalBookingVehicle').modal('show');
  }
});
