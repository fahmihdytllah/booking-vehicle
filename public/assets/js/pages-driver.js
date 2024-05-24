$(document).ready(function () {
  const formAddDriver = $('.formAddDriver');
  const formEditDriver = $('.formEditDriver');
  let idDriver;

  loadDrivers();

  $(document).on('click', '.driver-delete', function () {
    let idDriver = $(this).data('id');
    Swal.fire({ text: 'Apakah anda yakin ingin menghapus driver ini?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light', cancelButton: 'btn btn-outline-danger ms-2 waves-effect waves-light' }, buttonsStyling: false }).then(function (result) {
      if (result.value) {
        deleteDriver(idDriver);
      }
    });
  });

  $(document).on('click', '.driver-edit', function () {
    let idDriver = $(this).data('id');
    showModalEditDriver(idDriver);
  });

  formAddDriver.submit(function (e) {
    e.preventDefault();
    formAddDriver.block({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/drivers',
      type: 'POST',
      data: $(this).serialize(),
      success: function (d) {
        loadDrivers();
        formAddDriver.unblock();
        formAddDriver[0].reset();
        $('#modalAddDriver').modal('hide');
        Swal.fire({ title: 'Good job!', text: d.msg, icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      },
      error: function (e) {
        formAddDriver.unblock();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  });

  formEditDriver.submit(function (e) {
    e.preventDefault();
    formEditDriver.block({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/drivers/' + idDriver,
      type: 'PUT',
      data: $(this).serialize(),
      success: function (d) {
        loadDrivers();
        formEditDriver.unblock();
        formEditDriver[0].reset();
        $('#modalEditDriver').modal('hide');
        Swal.fire({ title: 'Good job!', text: d.msg, icon: 'success', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      },
      error: function (e) {
        formEditDriver.unblock();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  });

  function loadDrivers() {
    $('#listDrivers').html('');
    $('.card-table').block({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });

    $.get('/api/drivers', function (data) {
      $('.card-table').unblock();

      data.forEach(driver => {
        $('#listDrivers').append(`<tr>
          <td>${driver.name}</td>
          <td><span class="badge bg-label-secondary me-1">${driver.licenseNumber}</span></td>
          <td><span class="badge bg-label-${driver.status === 'available' ? 'success' : 'danger'} me-1">${driver.status === 'unavailable' ? 'Tidak Tersedia' : 'Tersedia'}</span></td>
          <td>${driver.phoneNumber}</td>
          <td>
            <div class="dropdown">
              <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></button>
              <div class="dropdown-menu">
                <a class="dropdown-item driver-edit" data-id="${driver._id}" ><i class="ti ti-pencil me-1"></i> Edit</a>
                <a class="dropdown-item driver-delete" data-id="${driver._id}" ><i class="ti ti-trash me-1"></i> Delete</a>
              </div>
            </div>
          </td>
        </tr>`);
      });
    });
  }

  function showModalEditDriver(id) {
    $.blockUI({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/drivers/' + id,
      type: 'GET',
      success: function (d) {
        $.unblockUI();
        idDriver = id;
        $('#editName').val(d.name);
        $('#editLicenseNumber').val(d.licenseNumber);
        $('#editPhoneNumber').val(d.phoneNumber);
        $('#editStatus').val(d.status);
        $('#modalEditDriver').modal('show');
      },
      error: function (e) {
        $.unblockUI();
        let msg = e.responseJSON.msg;
        Swal.fire({ title: 'Upss!', text: msg ? msg : 'There is an error!', icon: 'error', customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' }, buttonsStyling: !1 });
      }
    });
  }

  function deleteDriver(id) {
    $.blockUI({ message: itemLoader, css: { backgroundColor: 'transparent', border: '0' }, overlayCSS: { backgroundColor: '#fff', opacity: 0.8 } });
    $.ajax({
      url: '/api/drivers/' + id,
      type: 'DELETE',
      success: function (d) {
        $.unblockUI();
        loadDrivers();
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
