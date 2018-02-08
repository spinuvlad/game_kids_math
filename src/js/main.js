var timerOut = document.getElementById('timer-out');

var timer = document.getElementById('timer-time');

var countExer = document.getElementById('count-exer');

var outMessage = document.getElementById('out-message');

var numExer = document.getElementById('timer-exer');

var levels = document.querySelectorAll('.levels input');

var numExerInput = document.getElementById('number-exer');

var timerExer = document.getElementById('timer-exer');

var show = document.getElementById('show');

var objLevels = {lev1: pushLevel1, lev2: pushLevel2}
var timerE, numE;
levels[0].addEventListener('click', objLevels.lev1);
levels[1].addEventListener('click', objLevels.lev2);

var arr1 = [];
var arr2 = [];
var arrResult = [];
var userResult = [];


function runTimer(){
	timerOut.style.display = 'block';
	timer.innerHTML = timerE;
	
	if (timerE < timerExer.value/2) timer.style.color = '#7fc641';
	if (timerE < timerExer.value/3) timer.style.color = '#f29807';
	if (timerE < 60) timer.style.color = 'red';

	if (timerE <= 0) {
		outMessage.style.display = 'block';
		outMessage.innerHTML = 'Timpul rezervat a luat sfârșit! <br>Apasă aici pentru a reîncepe jocul';
		outMessage.addEventListener('click', refrashDoc);	

		var allInputsUser = show.querySelectorAll('.input-result');
		for (var i = 0; i < allInputsUser.length; i++){
				allInputsUser[i].disabled = true;
			}

		}

	if (timerE > 0) window.setTimeout(runTimer, 1000);
	
	timerE--;
}

function checkResult(){
	var iconsNo = show.querySelectorAll('.fa-times');
	var iconsYes = show.querySelectorAll('.fa-thumbs-up');
	var allInputsUser = show.querySelectorAll('.input-result');

	for (var i = 0; i < allInputsUser.length; i++){
		userResult[i] = +allInputsUser[i].value;

		if (userResult[i] != arrResult[i]) {
			allInputsUser[i].style.borderColor = 'red';
			iconsNo[i].style.cssText = 'visibility: visible; margin-left: 10px; color: red';
			iconsYes[i].style.cssText = 'visibility: hidden';

			outMessage.style.display = 'block';
			outMessage.innerHTML = 'Unele exercitii sunt incorecte...';
			outMessage.removeEventListener('click', refrashDoc);
			outMessage.addEventListener('click', clouseMessage);
		}

		else {
			allInputsUser[i].style.background = '';
			iconsYes[i].style.cssText = 'visibility: visible; margin-left: -10px; color: green';
			iconsNo[i].style.cssText = 'visibility: hidden';
			allInputsUser[i].style.borderColor = 'green';
		}
  }

  if (arrSum(userResult) == arrSum(arrResult)){
  		outMessage.style.display = 'block';
  		outMessage.style.background = 'green';
			outMessage.innerHTML = 'Felicitări!!! <br> Ai reușit să rezolvi corect toate exercițiile!';
			outMessage.addEventListener('click', refrashDoc);
  }
}

function pushLevel2(){
	getInputNumber();
	disabledHead();
	generateNum(100);
	runTimer();	
	
	for (var i = 0; i < numE; i++){
		var span = document.createElement('span');
		var input = document.createElement('input');
				input.className = 'input-result';
				input.addEventListener('mouseout', mouseOver);

		var iconNo = document.createElement('i');
				iconNo.style.visibility = 'hidden';
				iconNo.innerHTML = '<i class="fas fa-times"></i>';

		var	iconYes = document.createElement('i');
				iconYes.style.visibility = 'hidden';
				iconYes.innerHTML = '<i class="fas fa-thumbs-up"></i>'

		var br = document.createElement('br');

		span.innerHTML = arr1[i] + ' + ' + arr2[i] + ' = ';
		arrResult[i] = arr1[i] + arr2[i];

		show.appendChild(span);
		show.appendChild(input);
		show.appendChild(iconNo);
		show.appendChild(iconYes);
		show.appendChild(br);
	}

	var button = document.createElement('input');
			button.type = 'submit';
			button.value = 'Verifica!';
			button.id = 'button';
	show.appendChild(button);

	butt = document.getElementById('button');
	butt.addEventListener('click', checkResult);
}


function pushLevel1(){	
	getInputNumber();
	disabledHead();
	runTimer();
	generateNum(10);

	for (var i = 0; i < numE; i++){
		var span = document.createElement('span');
		var input = document.createElement('input');
				input.className = 'input-result';
				input.addEventListener('mouseout', mouseOver);

		var iconNo = document.createElement('i');
				iconNo.style.visibility = 'hidden';
				iconNo.innerHTML = '<i class="fas fa-times"></i>';

		var	iconYes = document.createElement('i');
				iconYes.style.visibility = 'hidden';
				iconYes.innerHTML = '<i class="fas fa-thumbs-up"></i>'

		var br = document.createElement('br');

		span.innerHTML = arr1[i] + ' + ' + arr2[i] + ' = ';
		arrResult[i] = arr1[i] + arr2[i];

		show.appendChild(span);
		show.appendChild(input);
		show.appendChild(iconNo);
		show.appendChild(iconYes);
		show.appendChild(br);
	}

	var button = document.createElement('input');
			button.type = 'submit';
			button.value = 'Verifica!';
			button.id = 'button';
	show.appendChild(button);

	var butt = document.getElementById('button');
	butt.addEventListener('click', checkResult);
}


function generateNum(num){
	for (var i = 0; i < numE; i++){
		arr1[i] = Math.floor(Math.random() * Math.floor(num));
		arr2[i] = Math.floor(Math.random() * Math.floor(num));
	}
}

function refrashDoc(){
	window.location.reload();
}


function disabledHead(){
	numExerInput.disabled = true;
	timerExer.disabled = true;

	for (var i = 0; i < levels.length; i++){
		levels[i].disabled = true;
		levels[i].style.cssText = 'background: silver; color: white';
	}
}

function getInputNumber(){
	timerE =  Number(document.getElementById('timer-exer').value);
	numE =  Number(document.getElementById('number-exer').value);
}

function clouseMessage(){
	this.style.display = 'none';
}


function arrSum(arr){
	var summ = 0;
	for (var i = 0; i < arr.length; i++){
		summ += arr[i];
	}
	return summ;
}


function mouseOver(){
	var allInputsUser = show.querySelectorAll('.input-result');
	var count = 0;
	var arrTemp =[];
	for (var i = 0; i < allInputsUser.length; i++){
		if (allInputsUser[i].value != '') count++;
	}
	countExer.innerHTML = arrResult.length - count;
}


function checkStart(){ 
	if (numExerInput.value == '' || timerExer.value == '') {
		outMessage.style.display = 'block';
		outMessage.innerHTML = 'Introduce-ti campurile libere...';
	}
		outMessage.addEventListener('click', refrashDoc);
}
