const clockOutput = document.getElementById("clock-text");

const updateTimeInterval = setInterval(updateTime, 500);

function updateTime() {
      let datum = new Date;
      let hours = datum.getHours();
      let minutes = datum.getMinutes();
      let seconds = datum.getSeconds();

      if(seconds < 10) {
            seconds = "0" + seconds;
      }

      if(minutes < 10) {
            minutes = "0" + minutes;
      }

      clockOutput.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function gameInitiator() {
      let baterry_life = Math.floor((Math.random() * 50) + 1)

      console.log("battery_life " + baterry_life);

      while(baterry_life < 25) {
            console.log("too small - rerolling");
            baterry_life = baterry_life + Math.floor((Math.random() * 10) + 1)
      }

      console.log("battery_life " + baterry_life);

      let timer = 0


      const batteryTimerUpdate = setInterval(function() {
            timer++;
            console.log("timer " + timer);

            if(timer > baterry_life) {
                  clearInterval(updateTimeInterval);
                  clearInterval(batteryTimerUpdate);
            }
      }, 1000)   
}


