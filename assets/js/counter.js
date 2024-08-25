function countTo(element, options) {
  options = options || {};

  // ตั้งค่า options สำหรับ element ปัจจุบัน
  var settings = Object.assign(
    {},
    {
      from: parseFloat(element.getAttribute("data-from")) || 0,
      to: parseFloat(element.getAttribute("data-to")) || 0,
      speed: parseFloat(element.getAttribute("data-speed")) || 1000,
      refreshInterval: parseFloat(element.getAttribute("data-refresh-interval")) || 100,
      decimals: parseInt(element.getAttribute("data-decimals")) || 0
    },
    options
  );

  // คำนวณจำนวนครั้งที่ต้องอัปเดต และจำนวนที่เพิ่มขึ้นในแต่ละครั้ง
  var loops = Math.ceil(settings.speed / settings.refreshInterval),
      increment = (settings.to - settings.from) / loops;

  var loopCount = 0,
      value = settings.from;

  // เริ่มการทำงาน
  render(value);
  var interval = setInterval(updateTimer, settings.refreshInterval);

  function updateTimer() {
    value += increment;
    loopCount++;

    render(value);

    if (typeof settings.onUpdate === "function") {
      settings.onUpdate(value);
    }

    if (loopCount >= loops) {
      clearInterval(interval);
      value = settings.to;

      if (typeof settings.onComplete === "function") {
        settings.onComplete(value);
      }
    }
  }

  function render(value) {
    var formattedValue = formatter(value, settings);
    element.innerHTML = formattedValue;
  }
}

function formatter(value, settings) {
  return value.toFixed(settings.decimals);
}

document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".timer");

  elements.forEach(function (element) {
    var customOptions = {
      formatter: function (value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    };
    countTo(element, customOptions);
  });
});
