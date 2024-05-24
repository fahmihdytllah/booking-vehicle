/**
 * Dashboard Admin
 */

'use strict';

(function () {
  function loadDataStatistic() {
    $.get('/api/dashboard-admin', function (data) {
      if (data.status) {
        $('.totalBookings').html(data.totalBookings);
        $('.pendingBookings').html(data.pendingBookings);
        $('.approvedBookings').html(data.approvedBookings);
        $('.rejectedBookings').html(data.rejectedBookings);
      }
    });
  }

  loadDataStatistic();
})();
