window.onload = function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var targetUrl = "https://snap-lenses.vercel.app/";

  if (ua.indexOf("Instagram") > -1) {
    // 🚀 Detected Instagram in-app browser
    if (/android/i.test(ua)) {
      // Android → force Chrome
      window.location =
        "intent://" +
        targetUrl.replace(/^https?:\/\//, "") +
        "#Intent;scheme=https;package=com.android.chrome;end";
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      // iOS → try Safari
      window.location = targetUrl;
      setTimeout(function () {
        // fallback
        window.open(targetUrl, "_blank");
      }, 500);
    } else {
      // fallback for others
      window.location = targetUrl;
    }
  }
};
