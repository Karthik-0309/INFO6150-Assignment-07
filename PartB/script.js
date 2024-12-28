$(document).ready(() => {
  let timeIntervalId;
  let startTime = 0;

  $("#datePicker").on("keydown", (e) => {
    e.preventDefault();
  });

  $("#datePicker").val(new Date().toISOString().split("T")[0]);

  $("#startButton").on("click", async () => {
    try {
      await startTimer();
    } catch (error) {
      console.log(error);
    }
  });

  $("#stopButton").on("click", async () => {
    try {
      await stopTimer();
    } catch (error) {
      console.log(error);
    }
  });

  $("#resetButton").on("click", async () => {
    try {
      await resetTimer();
    } catch (error) {
      console.log(error);
    }
  });

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  };

  const updateTimer = () => {
    startTime++;
    $("#timeLabel").text(formatTime(startTime));
  };

  const startTimer = () => {
    return new Promise((reslove, reject) => {
      if (!timeIntervalId) {
        timeIntervalId = setInterval(() => {
          updateTimer(startTime);
        }, 1000);
        reslove("Timer started.");
      } else {
        reject("Timer is already running.");
      }
    });
  };

  const stopTimer = () => {
    return new Promise((reslove, reject) => {
      if (timeIntervalId) {
        timeIntervalId = clearInterval(timeIntervalId);
        reslove("Timer stopped.");
      } else {
        reject("Timer is not running.");
      }
    });
  };

  const resetTimer = () => {
    return new Promise((reslove, reject) => {
      timeIntervalId = clearInterval(timeIntervalId);
      startTime = 0;
      $("#timeLabel").html("00:00:00");
      reslove("Timer reset.");
    });
  };
});
