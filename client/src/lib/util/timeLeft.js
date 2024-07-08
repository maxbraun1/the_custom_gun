// Convert string in ISO8601 format to date object
// e.g. 2013-02-08T02:40:00Z
//
function isoToObj(s) {
  var b = s.split(/[-TZ:]/i);

  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
}

export function calcTimeLeft(s) {
  // Convert string to date object
  var d = isoToObj(s);
  var diff = d - new Date();

  // Allow for previous times
  var sign = diff < 0 ? "-" : "";
  diff = Math.abs(diff);

  // Get time components
  var hours = (diff / 3.6e6) | 0;
  var mins = ((diff % 3.6e6) / 6e4) | 0;
  var secs = Math.round((diff % 6e4) / 1e3);

  // Return formatted string

  if (sign == "-") {
    return "Listing Ended";
  }

  if (hours < 1) {
    let totalSeconds = mins * 60 + secs;
    return { seconds: totalSeconds };
  } else if (hours < 24 && hours >= 1) {
    return hours + " Hours " + mins + " Minutes";
  } else {
    let days = Math.floor(hours / 24);
    let remainingHours = hours % 24;
    return days + " Days " + remainingHours + " Hours";
  }
}

export function isEnded(s) {
  // Convert string to date object
  var d = isoToObj(s);
  var diff = d - new Date();

  if (diff <= 0) return true;
  return false;
}
