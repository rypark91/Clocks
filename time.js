let time = new Date();
let clock = document.querySelector("#clock");
let otherClock = document.querySelector("#otherClock");
let secondHand = document.querySelector("#hand");
let minuteHand = document.querySelector("#minuteHand");
let hourHand = document.querySelector("#hourHand");
let othersecondHand = document.querySelector("#otherhand");
let otherminuteHand = document.querySelector("#otherminuteHand");
let otherhourHand = document.querySelector("#otherhourHand");
let otherLabel = document.querySelector("#otherLabel");

let classic = document.querySelector("#classic");
let otherClassic = document.querySelector("#otherClassic");
let digital = document.querySelector("#digital");
let classicButton = document.querySelector("#classicButton");
let digitalButton = document.querySelector("#digitalButton");
let twelveButton = document.querySelector("#twelveButton");
let twentyFourButton = document.querySelector("#twentyFourButton");
let timeZone = document.querySelector("#timeZone");

let otherMinute = 0;
let otherHour = 0;

let othermin10Digit = 0
let othermin1Digit = 0
let otherhour10Digit = 0
let otherhour1Digit = 0

let previousMinute = time.getMinutes();
let previousHour = time.getHours();

let grandOtherHourData = 0;



const url = 'https://timeapi.io/api/timezone/availabletimezones';
const options = {
	method: 'GET'
};


classicButton.addEventListener("click",function(){
    classic.style.display = "inline-block";
    otherClassic.style.display = "inline-block";
    digital.style.display = "none";
});
digitalButton.addEventListener("click",function(){
    classic.style.display = "none";
    otherClassic.style.display = "none";
    digital.style.display = "inline-block";
});
timeZone.addEventListener("change",function(){
    var newUrl = String(this.value).replace("/","%2F");
    console.log(newUrl);
    console.log(`https://timeapi.io/api/time/current/zone?timeZone=${newUrl}`);
    fetch(`https://timeapi.io/api/time/current/zone?timeZone=${newUrl}`, options)
	.then(response => response.json())
	.then(response => {console.log(response)

		console.log(response.hour);
	    otherHour = response.hour;
        grandOtherHourData = response.hour;
        if(twelveButton.checked){
            if(response.hour === 0){
                otherHour = 12;
            }
            else if(response.hour > 12){
                otherHour = response.hour - 12;
            }
        }
        otherMinute = response.minute;
        othermin10Digit = Math.floor(otherMinute / 10);
        othermin1Digit = otherMinute % 10;
        otherhour10Digit = Math.floor(otherHour / 10);
        otherhour1Digit = otherHour % 10;
        finalOtherHours = String(otherhour10Digit) + String(otherhour1Digit);
        finalOtherMinutes = String(othermin10Digit) + String(othermin1Digit); 
        otherClock.textContent = String(finalOtherHours) + ":" + String(finalOtherMinutes);
		 })
});

setInterval(function(){
    time = new Date();
    if(twelveButton.checked){
        if(time.getHours() === 0){
            time.setHours(12);
            previousHour = time.getHours();
        }
        else if(time.getHours() > 12){
            time.setHours(time.getHours() - 12);
            previousHour -= time.getHours() - 12;
        }
    }
    
    
    var minutes = time.getMinutes();
    if(minutes > previousMinute)
    {
        previousMinute = minutes;
    }
    else if(minutes == 0 && previousMinute == 59){
        previousMinute = 0;
    }
    var min10Digit = Math.floor(minutes / 10);
    var min1Digit = minutes % 10;
    var hours = time.getHours();
    if(hours > previousHour)
    {
        previousHour = hours;
        otherHour++;
        grandOtherHourData++;
    }
    else if(hours == 1 && previousHour == 12){
        previousHour = 1;
        otherHour++;
        grandOtherHourData++;
    }
    else if(hours == 0 && previousHour == 23){
        previousHour = 0;
        otherHour++;
        grandOtherHourData++;
    }
    
    var hour10Digit = Math.floor(hours / 10);
    var hour1Digit = hours % 10;
    var finalHours = String(hour10Digit) + String(hour1Digit);
    var finalMinutes = String(min10Digit) + String(min1Digit);

    
    clock.textContent = `${finalHours}:${finalMinutes}`;

    if(twelveButton.checked){
        if(grandOtherHourData > 12){
            otherHour = grandOtherHourData % 12;
        }
        if(grandOtherHourData % 12 == 0){
            otherHour = 12;
        }
    }
    if(twentyFourButton.checked){
        
        otherHour = grandOtherHourData % 24;
        
    }

    othermin10Digit = Math.floor(minutes / 10);
    othermin1Digit = minutes % 10;
    otherhour10Digit = Math.floor(otherHour / 10);
    otherhour1Digit = otherHour % 10;
    finalOtherHours = String(otherhour10Digit) + String(otherhour1Digit);
    finalOtherMinutes = String(othermin10Digit) + String(othermin1Digit); 
    otherClock.textContent = String(finalOtherHours) + ":" + String(finalOtherMinutes);
    
    secondHand.style.transform = `rotate(${(time.getSeconds()*6 - 90)}deg)`;
    minuteHand.style.transform = `rotate(${(time.getMinutes()*6) - 90}deg)`;
    hourHand.style.transform = `rotate(${(time.getHours()*30) - 90}deg)`;

    othersecondHand.style.transform = `rotate(${(time.getSeconds()*6 - 90)}deg)`;
    otherminuteHand.style.transform = `rotate(${(time.getMinutes()*6) - 90}deg)`;
    otherhourHand.style.transform = `rotate(${(otherHour*30) - 90}deg)`;
    
},10);

function init(){
    digital.checked = true;
    twelveButton.checked = true;
    classic.style.display = "none";
    otherClassic.style.display = "none";
    fetch(url, options)
	.then(response => response.json())
	.then(response => {console.log(response)

		
		console.log(response);
		
		for(var i = 0; i < response.length; i++){
            var newTimeZone = document.createElement("option");
            newTimeZone.text = response[i];
            timeZone.add(newTimeZone);
        }
        timeZone.options[589].selected = true;
        fetch(`https://timeapi.io/api/time/current/zone?timeZone=US%2FMountain`, options)
	    .then(response => response.json())
	    .then(response => {console.log(response)
	        otherHour = response.hour;
            grandOtherHourData = response.hour;
            if(twelveButton.checked){
                if(response.hour === 0){
                    otherHour = 12;
                }
                else if(response.hour > 12){
                    otherHour = response.hour - 12;
                }
            }
            otherMinute = response.minute;
            othermin10Digit = Math.floor(otherMinute / 10);
            othermin1Digit = otherMinute % 10;
            otherhour10Digit = Math.floor(otherHour / 10);
            otherhour1Digit = otherHour % 10;
            finalOtherHours = String(otherhour10Digit) + String(otherhour1Digit);
            finalOtherMinutes = String(othermin10Digit) + String(othermin1Digit); 
            otherClock.textContent = String(finalOtherHours) + ":" + String(finalOtherMinutes);
		    })

		 })
}
init();