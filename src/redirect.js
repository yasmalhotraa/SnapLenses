(function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var targetUrl = "https://google.com"; // test with google first!

  if (ua.indexOf("Instagram") > -1) {
    console.log("Instagram browser detected, forcing external redirect...");

    // Try method 1: Android Chrome intent
    if (/android/i.test(ua)) {
      window.location =
        "intent://" +
        targetUrl.replace(/^https?:\/\//, "") +
        "#Intent;scheme=https;package=com.android.chrome;end";
    }

    // Try method 2: iOS Safari direct + fallback
    else if (/iPhone|iPad|iPod/i.test(ua)) {
      setTimeout(function () {
        window.location.href = targetUrl;
      }, 100);

      setTimeout(function () {
        window.open(targetUrl, "_blank");
      }, 500);
    }

    // Fallback method: meta refresh injection
    setTimeout(function () {
      var meta = document.createElement("meta");
      meta.httpEquiv = "refresh";
      meta.content = "0; url=" + targetUrl;
      document.getElementsByTagName("head")[0].appendChild(meta);
    }, 1000);
  }
})();
