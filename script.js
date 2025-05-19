const gearDisplay = document.getElementById("gair")
const countDisplay = document.getElementById("clickCount");
const rangedisplay = document.getElementById("range");
const mode = document.getElementById("mode");
const mode1 = document.getElementById("mode1");
const mode2 = document.getElementById("mode2");

let isBlinking = false;
let intervalId;
let pressureEffect = 0;

//give alert when battery volts is less than 24
function battery() {
    const battery = document.getElementById("battery").value;
    if (battery <= 24) {
        alert("battery is low...")
    }
}

//give alert pressure is 0
function pressure() {
    const psi = document.getElementById("psure").value;
    const psi2 = document.getElementById("psure2").value;
    if (psi <= 0) {
        alert("Not working with pressure 0..")
    }
    if (psi2 <= 0) {
        alert("Not working with pressure 0..")
    }
}

//drop-down
const options = document.getElementById("option")
options.addEventListener("change", () => {
    if (options.value === "neutral") {
        count = 0;
    }
    countDisplay.textContent = count;
    updateGear(count);
})

function updateGear(speed) {
    let gear = "neutral"
    if (options.value === "driving" && speed === 0) gear = "1st"
    else if (speed > 0 && speed <= 10) gear = "1st";
    else if (speed >= 10 && speed <= 15) gear = "2nd";
    else if (speed >= 15 && speed <= 20) gear = "3rd";
    else if (speed >= 20 && speed <= 25) gear = "4th";
    else if (speed >= 20) gear = "5th";
    else if (speed === 0) gear = "Neutral";

    if (options.value === "reverse") {
        gear = "reverse";
    }

    if (options.value === "driving" && speed > 0) {
        options.querySelector('[value="reverse"]').disabled = true;
        options.querySelector('[value="neutral"]').disabled = true;
    } else if (options.value === "reverse" && speed > 0) {
        options.querySelector('[value="driving"]').disabled = true;
        options.querySelector('[value="neutral"]').disabled = true;
    }
    else {
        options.querySelector('[value="driving"]').disabled = false;
        options.querySelector('[value="neutral"]').disabled = false;
        options.querySelector('[value="reverse"]').disabled = false;
    }

    if (speed === 0) {
        mode1.disabled = false;
        mode2.disabled = false;
    } else if (options.value === "driving" && speed > 0) {
        if (mode.value === "mode2x2") {
            mode1.disabled = false;
            mode2.disabled = true;
        } else if (mode.value === "mode4x4") {
            mode1.disabled = true;
            mode2.disabled = false;
        }
    }
    gearDisplay.textContent = gear;
    return gear;
}

//speed 
const button = document.getElementById("myBtn");

let interval;
let count = 0;

button.addEventListener("mouseover", () => {
    battery()
    pressure()
    if (options.value === "neutral") return;
    if (options.value === "reverse") {
        if (num < 10) {
            count++;
            countDisplay.textContent = `${count}km`;
            updateGear(count)
            return;
        }
    }

    interval = setInterval(() => {
        if (count < 200) {
            count++;
            countDisplay.textContent = `${count}km`;
            updateGear(count)
        }

    }, 1000)
});

button.addEventListener('mouseout', () => {
    clearInterval(interval);
});

//break button
const buttonbrk = document.getElementById("brkBtn");
const brklight = document.getElementsByClassName("brk")[0];
buttonbrk.addEventListener("mouseover", () => {
    brklight.style.backgroundColor = "red";
    interval = setInterval(() => {
        if (options.value === "neutral") {
            buttonbrk.removeEventListener("click");
        }
        let dec = options.value === "reverse" ? 1 : 5;
        if (count >= dec) {
            count -= dec;
        } else {
            count = 0;
        }
        countDisplay.textContent = `${count}km`;
        updateGear(count)
    }, 1000)
});

buttonbrk.addEventListener('mouseout', () => {
    clearInterval(interval);
    brklight.style.backgroundColor = "white";
});

//range
const fueldsply = document.getElementById("fuel");
setInterval(() => {
    const gear = gearDisplay.textContent;
    let range = 0;
    let fuel = 10;
    if (gear === "1st") range = 3 * fuel;
    else if (gear === "2nd") range = 5 * fuel;
    else if (gear === "3rd") range = 7 * fuel;
    else if (gear === "4th") range = 13 * fuel;
    else if (gear === "5th") range = 15 * fuel;
    rangedisplay.textContent = `range: ${range} km`;
}, 3000)

//indicator
const left_indi_button = document.getElementById("lindicator");
const right_indi_btn = document.getElementById("rindicator");
const circle = document.getElementsByClassName("innerclass")[0];
const circle2 = document.getElementsByClassName("innerclass")[1];

left_indi_button.addEventListener("click", function () {
    if (isBlinking) {
        clearInterval(intervalId);
        circle.classList.remove("blink");
        isBlinking = false;
    } else {
        circle.classList.add("blink");
        intervalId = setInterval(() => {
            //
        }, 1000);
        isBlinking = true;
    }
});

right_indi_btn.addEventListener("click", function () {
    if (isBlinking) {
        clearInterval(intervalId);
        circle2.classList.remove("blink");
        isBlinking = false;
    } else {
        circle2.classList.add("blink");
        intervalId = setInterval(() => {
            //
        }, 1000);
        isBlinking = true;
    }
});

//hazard
const hazard = document.getElementById("hazard")
hazard.addEventListener("click", () => {
    if (isBlinking) {
        circle.classList.remove("blink");
        circle2.classList.remove("blink");
        isBlinking = false;
    } else {
        circle.classList.add("blink");
        circle2.classList.add("blink");
        isBlinking = true;
    }
})

// stering 
const stringbtnleft = document.getElementById("sbtnleft");
const stringbtnright = document.getElementById("sbtnright");

stringbtnleft.addEventListener("mouseover", function () {
    setTimeout(() => {
        if (isBlinking) {
            circle.classList.remove('blink');
            // circle2.classList.remove('blink');
        }
    }, 2000);
})

stringbtnright.addEventListener("mouseover", function () {
    setTimeout(() => {
        if (isBlinking) {
            circle2.classList.remove('blink');
        }
    }, 2000)
})

//audio 
const audio = document.getElementById('myAudio');
const playbutton = document.getElementById('playButton');

playbutton.addEventListener('click', () => {
    audio.play();
});

//sitbelt and airbag
const mybtn = document.querySelector(".sitbelt");
const airbag = document.querySelector(".airbag");

function btncolor() {
    if (mybtn.style.backgroundColor == "salmon") {
        mybtn.style.backgroundColor = "white";
        airbag.style.backgroundColor = "white";
    } else {
        mybtn.style.backgroundColor = "salmon";
    }
}

mybtn.addEventListener('click', btncolor);

airbag.addEventListener('click', () => {
    if (mybtn.style.backgroundColor == "salmon") {
        airbag.style.backgroundColor = airbag.style.backgroundColor == "green" ? "white" : "green";
    }
})

// const mode = document.getElementById("mode2")
// let avg;
// let mod;
// if (avg = 6) {
//     mod = avg / 2;
//     mode.textContent = `Mode 4/4 :  ${mod}`;
// }

// RPM

let currentRpm = 0;
let leverUp;
let rpmInterval;
let delayINterval;

const rpmDisplay = document.getElementById("rpm");
const rpmMaxDisplay = document.getElementById("rpmMaxDisplay");
const leverButton = document.getElementById("myBtn");
const averageDisplay = document.getElementById("average");

let tempTime; let Temp2sec; let Temp1sec;
let currentTemp = 25;

function tempaUpdate() {
    if (tempTime) return;
    tempTime = setInterval(() => {
        currentTemp += 1;
        if (currentTemp > 70) currentTemp = 70;
        document.getElementById("tempInput").value = currentTemp;
        checkTemperature();
    }, 3000);
}

function stopTemprature() {
    clearInterval(tempTime);
    tempTime = null;
}

function RpmDisplay(rpmValue) {

    rpmDisplay.textContent = `RPM: ${rpmValue}`;

    if (rpmValue >= 1 && rpmValue <= 5) tempaUpdate();
    else stopTemprature();

    if (rpmValue > 5 && rpmValue <= 8) {
        if (Temp2sec) return;
        Temp2sec = setTimeout(() => {
            currentTemp++;
            if (currentTemp > 70) currentTemp = 70;
            document.getElementById("tempInput").value = currentTemp;
            checkTemperature();
        }, 2000);
    } else {
        clearInterval(Temp2sec);
        Temp2sec = null;
    }

    if (rpmValue > 8 && rpmValue <= 12) {
        if (Temp1sec) return;
        Temp1sec = setTimeout(() => {
            currentTemp++;
            if (currentTemp > 70) currentTemp = 70;
            document.getElementById("tempInput").value = currentTemp;
            checkTemperature();
        }, 1000);
    } else {
        clearInterval(Temp1sec);
        Temp1sec = null;
    }

    if (rpmValue >= 10.5) {
        rpmMaxDisplay.textContent = "Max RPM";
        rpmMaxDisplay.classList.add("blink");
    } else {
        rpmMaxDisplay.textContent = "";
        rpmMaxDisplay.classList.remove("blink");
    }

    let average = "-";
    if (rpmValue >= 1 && rpmValue <= 3) {
        average = "5 km/l";
    } else if (rpmValue >= 4 && rpmValue <= 7) {
        average = "15 km/l";
    } else if (rpmValue > 7 && rpmValue <= 9) {
        average = "13 km/l";
    } else if (rpmValue > 9) {
        average = "3 km/l";
    }

    if (average !== "-") {
        average += pressureEffect;
        if (average < 0) average = 0;
        averageDisplay.textContent = `Average: ${average} km/l`;
    } else {
        averageDisplay.textContent = `Average: -`;
    }
    averageDisplay.textContent = `Average: ${average}`;
}

leverButton.addEventListener("mouseover", () => {
    leverUp = Date.now();

    rpmInterval = setInterval(() => {
        const elapsed = (Date.now() - leverUp) / 1000;
        let rpmValue = currentRpm;

        if (elapsed >= 1 && elapsed < 3 && currentRpm < 4) rpmValue = 2;
        else if (elapsed >= 5 && elapsed < 7 && currentRpm < 5) rpmValue = 4;
        else if (elapsed >= 9 && elapsed < 10 && currentRpm < 9) rpmValue = 6;
        else if (elapsed >= 10 && elapsed < 11 && currentRpm < 10) rpmValue = 8;
        else if (elapsed >= 11 && elapsed < 12 && currentRpm < 10.5) rpmValue = 10.5;
        else if (elapsed >= 12 && elapsed < 14 && currentRpm < 11) rpmValue = 11;
        else if (elapsed >= 15 && currentRpm < 12) rpmValue = 12;

        if (rpmValue !== currentRpm) {
            currentRpm = rpmValue;
            RpmDisplay(currentRpm);
        }
    }, 500);
});

leverButton.addEventListener("mouseout", () => {
    clearInterval(rpmInterval);

    delayInterval = setInterval(() => {
        if (currentRpm > 1) {
            currentRpm -= 1;
            if (currentRpm < 1) currentRpm = 1;
            RpmDisplay(currentRpm);
        } else {
            clearInterval(delayInterval);
        }
    }, 1000);

    setTimeout(() => {
        if (tempaUpdate) currentTemp -= 5;
    }, 4000);
});

// Oil
const oilInput = document.getElementById("oilInput");
const oilLevelDisplay = document.getElementById("oilLevelDisplay");
oilInput.addEventListener("input", () => {
    let oilValue = parseFloat(oilInput.value);

    // Limit input to 10 max
    if (oilValue > 10) {
        oilValue = 10;
        oilInput.value = 10;
    }

    oilLevelDisplay.classList.remove("blink-red");

    // Alert condition for low oil
    if (oilValue <= 7) {
        alert("Engine oil low");
        oilLevelDisplay.classList.add("blink-red");
        oilLevelDisplay.textContent = `Oil Level: ${oilValue}L - Low`;
    } else {
        oilLevelDisplay.textContent = `Oil Level: ${oilValue}L`;
    }
});

// Temp....
const alertDisplay = document.getElementById("temperatureAlert");
const temp = document.getElementById("tempInput").value;
const tempDisplay = document.getElementById("temperatureDisplay");

function checkTemperature() {
    const temp = parseFloat(document.getElementById("tempInput").value);
    tempDisplay.textContent = `Temperature: ${temp}°C`;

    if (isNaN(temp)) {
        alertDisplay.textContent = "enter temp.";
        alertDisplay.style.color = "black";
        return;
    }

    if (temp < 10 || temp > 70) {
        alertDisplay.textContent = "10-70";
    } else if (temp < 15) {
        alertDisplay.textContent = "Low Temperature";
    } else if (temp >= 70) {
        document.body.style.backgroundColor = "red"
    } else if (temp >= 60) {
        alertDisplay.textContent = "High Temperature";
        document.body.style.backgroundColor = "white";
    } else {
        alertDisplay.textContent = " Normal.";
        document.body.style.backgroundColor = "white";
    }
}

// Radiator

function checkRadiatorWater() {
    const water = parseFloat(document.getElementById("rediatorInput").value);
    const display = document.getElementById("rediatorDisplay");

    if (isNaN(water)) {
        display.textContent = "Radiator Water Level: -";
        return;
    }

    display.textContent = ` Water Level: ${water}L`;

    if (water < 5) {
        showTopAlert(" Low water level", "low");
    }
}

// Front/Rear Pressure

const frontPressureInput = document.getElementById('psure');
const rearPressureInput = document.getElementById('psure2');

frontPressureInput.addEventListener('input', () => {
    const value = parseFloat(frontPressureInput.value);
    if (value >= 23 && value <= 27) {
        pressureEffect += 1;
    } else if (value > 27) {
        alert('Front tyre pressure too high!');
    } else if (value < 23) {
        pressureEffect -= 3;
    }
});

rearPressureInput.addEventListener('input', () => {
    const value = parseFloat(rearPressureInput.value);
    if (value >= 27 && value <= 33) {
        pressureEffect += 1;
    } else if (value > 33) {
        alert('Rear tyre pressure too high!');
    } else if (value < 25) {
        pressureEffect -= 3;
    }
});

// change avrage acording to pressure

function calculatePressureEffect() {
    const front = parseFloat(frontPressureInput.value);
    const rear = parseFloat(rearPressureInput.value);
    let effect = 0;

    if (front >= 23 && front <= 27) effect += 1;
    else if (front < 23) effect -= 3;

    if (rear >= 27 && rear <= 33) effect += 1;
    else if (rear < 25) effect -= 3;

    pressureEffect = effect;
}

frontPressureInput.addEventListener('input', () => {
    calculatePressureEffect();
    updateRPMDisplay(currentRpm);
});

rearPressureInput.addEventListener('input', () => {
    calculatePressureEffect();
    updateRPMDisplay(currentRpm);
});

//avg/2 = range when in 4x4 mode
const avgdisplay = document.getElementById("avg");
let num = 0;
setInterval(() => {
    // num+=5;
    if (mode.value === "mode4x4") {
        rangedisplay.textContent = `range: ${num / 2} km`;
    }
    avgdisplay.textContent = `Average - ${num}`;
}, 1000)