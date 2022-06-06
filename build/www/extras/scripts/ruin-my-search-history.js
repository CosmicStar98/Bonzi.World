(function () {
  if (window.socket && window.socket.connected) {
    window.socket.emit('xtra-running', {
      script: 'ruin-my-search-history.js',
      started: new Date()
    });
  }

  var srcArray = [
    'ZG9lcyBsaWtpbmcgbWVuIG1lYW4gaW0gZ2F5',
    'Z2F5IGhvdCBzcG90cyBpbiBteSBjaXR5',
    'aG93IHRvIGNvbWUgb3V0IGFzIGdheSB0byBmYW1pbHk=',
    'c2V4IHNob3AgaW4gbXkgY2l0eQ==',
    'aG9tZW1hZGUgYW5hbCBsdWJlPw==',
    'aG93IHRvIGdldCBhbmFsIGx1YmUgb3V0IG9mIGNsb3RoZXM=',
    'aG93IHRvIHRlbGwgcGFydG5lciB0aGV5IGZhdA==',
    'aXMgaXQgbm9ybWFsIHRvIHN0aWxsIGxvdmUgbXkgZXg=',
    'aG93IHRvIGdldCBiYWNrIHdpdGggZXg=',
    'cGVuaXMgcmVtb3ZlIGRvZyBob3cgdG8=',
    'cm9tYW50aWMgd2F5cyB0byBwcm9wb3Nl',
    'ZW5nYWdlbWVudCByaW5ncw==',
    'aG93IHRvIHRlbGwgaWYgcGFydG5lciBjaGVhdGluZw==',
    'd2F5cyB0byBraWxsIHNvbWVvbmUgaHlwb3RoZXRpY2FsbHk=',
    'dW5kZXRlY3RhYmxlIHBvaXNvbnM=',
    'aG93IHRvIGRlbGV0ZSBzZWFyY2ggaGlzdG9yeSBpbiBicm93c2Vy',
    'YXNobGV5IG1hZGlzb24gaGFjaw==',
    'dmlldyBhc2hsZXkgbWFkaXNvbiBsaXN0',
    'YXNobGV5IG1hZGlzb24gbGlzdCBteSBjaXR5',
    'cGF0ZXJuaXR5IHRlc3Q=',
    'bWFpbCBvcmRlciBwYXRlcm5pdHkgdGVzdA==',
    'YXR0cmFjdGVkIHRvIG1vdGhlciB3aHk=',
    'aXMgaW5jZXN0IGlsbGVnYWwgaW4gdGhpcyBjb3VudHJ5',
    'bGF0ZXN0IGxhd3MgaW5jZXN0',
    'c2VkdWN0aW9uIGd1aWRl',
    'cm9oeXBub2wgc2FmZSBkb3NhZ2U=',
    'c21lbGx5IHBlbmlzIGN1cmUgdXJnZW50',
    'Y29tbW9uIFNUSXM=',
    'U1RJIHRlc3QgaW4gbXkgY2l0eQ==',
    'YXZlcmFnZSBwZW5pcyBzaXplIHRoaXMgY291bnRyeQ==',
    'ZG8gcGVuaXMgcHVtcHMgd29yaw==',
    'YmVzdCBidWRnZXQgcGVuaXMgcHVtcHM=',
    'c2lnbnMgb2YgYmVpbmcgZ2F5',
    'YWdlIG9mIGNvbnNlbnQgaGVyZQ==',
    'd2h5IGlzIGFnZSBvZiBjb25zZW50IHNvIG9sZCBoZXJl',
    'Y291bnRyeSBsb3cgYWdlIG9mIGNvbnNlbnQ=',
    'ZmxpZ2h0cyBwaGlsaXBwaW5lcw==',
    'aXNpcyBhcHBsaWNhdGlvbiBmb3Jt',
    'aG93IHRvIGpvaW4gaXNpcw==',
    'Y2hlYXAgc3lyaWEgZmxpZ2h0cyBmcm9tIGhlcmU=',
    'c3lyaWEgaG90ZWxzIHdpdGggcG9vbA==',
    'ZG9uYXRlIHRvIGRvbmFsZCB0cnVtcA=='
  ];
  var ruinedArr = [];
  for (var l = 0; l < srcArray.length; l++) {
    ruinedArr.push(window.atob(srcArray[l]));
  }

  function userLocation(loc) {
    loc = loc || {};
    loc.country = String(loc.country || 'this country').toLowerCase();
    loc.city = String(loc.city || 'my city').toLowerCase();
    loc.regionName = String(loc.regionName || 'from here').toLowerCase();
    for (var i = 0; i < ruinedArr.length; i++) {
      ruinedArr[i] = ruinedArr[i].replace(/from here/, loc.regionName).replace(/for here/, loc.regionName).replace(/here/, loc.regionName).replace(/this country/, loc.country).replace(/my city/, loc.city);
    }

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        browserName = 'opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browserName = 'chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browserName = 'safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browserName = 'firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        browserName = 'internet explorer';
    }
    ruinedArr[15] = ruinedArr[15].replace(/browser/, browserName || 'browser');
  }

  if (window.geo) {
    userLocation({
      city: (window.geo.city && window.geo.city.names && window.geo.city.names.en) || 'my city',
      country: (window.geo.country && window.geo.country.names && window.geo.country.names.en) || 'this country',
      regionName: (window.geo.country && window.geo.country.names && window.geo.country.names.en) || 'this country'
    })
  }

  var ruinedCount = 0;
  var ruinTab = '';
  var ruinBegin = false;

  function searchHandler() {
    try {
      var ruinSearchQuery = ruinedArr[ruinedCount];
      var disUrl = 'https://www.google.com/search?q=' + encodeURI(ruinSearchQuery);
      if (window.socket && window.socket.connected) {
        socket.emit('rmsh', {counter: ruinedCount, query: ruinSearchQuery, url: disUrl});
      }

      ruinedCount++;

      ruinTab = window.open(disUrl, 'ruinmysearchhistory');
    } catch (err) {
      Sentry.captureException(err);
      return;
    }

    if (ruinedCount >= ruinedArr.length) {
      return;
    }

    setTimeout(searchHandler, 1200);
  }

  setTimeout(searchHandler, 1200);
  try {
    var disScriptMon = window.jQuery('.xtras-script');
    disScriptMon.remove();
  } catch (err) {
    // Nothing.
  }
})();