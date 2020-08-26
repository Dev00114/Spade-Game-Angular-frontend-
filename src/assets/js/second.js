var date = new Date();

var supportsSvg = false;

try {
  supportsSvg = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#Image",
    "1.1"
  );
} catch (ex) {}

var theme = ""; //Special themes for Halloween, christmas etc.

if (date.getDate() == 31 && date.getMonth() == 9) {
  theme = "halloween";
}

if (date.getMonth() == 11 && date.getDate() >= 10 && date.getDate() <= 26) {
  theme = "xmas";
}

var easterSundays = [
  new Date(2016, 2, 27),
  new Date(2017, 3, 16),
  new Date(2018, 3, 1),
  new Date(2019, 3, 21),
];

var timestamp = date.getTime();
for (var i = 0; i < easterSundays.length; i++) {
  var easterSunday = easterSundays[i];
  var oneDay = 24 * 60 * 60 * 1000;
  var minDay = easterSunday.getTime() - 7 * oneDay;
  var maxDay = easterSunday.getTime() + oneDay;
  if (timestamp >= minDay && timestamp < maxDay && supportsSvg) {
    theme = "easter";
  }
}

if (document.cookie.indexOf(theme + "=0") != -1) {
  //User has turned off the theme...
  theme = "";
}

//Overrides...
if (document.location.search.match(/\btheme=(\w+)/)) {
  theme = RegExp.$1;
}

if (theme) {
  document.write(
    "<link href='/shared/themes/827/" +
      theme +
      ".min.css' rel='stylesheet' type='text/css'>"
  );
  var html = document.getElementsByTagName("html");
  if (html && html[0]) {
    html[0].className += " themed " + theme;
  }

  function turnOffTheme(e) {
    var html = (document.getElementsByTagName("html")[0].className = slug);
    document.cookie = theme + "=0; path=/";
  }
}
