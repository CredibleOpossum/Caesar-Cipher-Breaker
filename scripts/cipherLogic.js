var vaild = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var frequencys = {
	a: 8.497,
	b: 1.492,
	c: 2.202,
	d: 4.253,
	e: 11.162,
	f: 2.228,
	g: 2.015,
	h: 6.094,
	i: 7.546,
	j: 0.153,
	k: 1.292,
	l: 4.025,
	m: 2.406,
	n: 6.749,
	o: 7.507,
	p: 1.929,
	q: 0.095,
	r: 7.587,
	s: 6.327,
	t: 9.356,
	u: 2.758,
	v: 0.978,
	w: 2.56,
	x: 0.15,
	y: 1.994,
	z: 0.077,
};

function doShift() {
	//Grabs cipher text from text area.
	var cipherText = document.getElementById("cipherText").value;
	//Handles shift value out of range or negative.
	var shiftValue = parseInt(document.getElementById("shiftValue").value) % 26;
	//Sets the text area to the output of the shift.
	document.getElementById("cipherText").value = getShift(cipherText, shiftValue);
}

function doBreak() {
	var cipherText = document.getElementById("cipherText").value;
	//Grabs cipher text from text area.
	bestEntropy = getLowestEntropy(cipherText);
	//Sets the text area to the best solution.
	document.getElementById("cipherText").value = getShift(cipherText, bestEntropy);
	//Sets the number selector to what it was cipher text shifted by.
	document.getElementById("shiftValue").value = bestEntropy;
}

function getLowestEntropy(cipherText) {
	shiftText = cipherText;
	//infinite, makes the first entropy get set to the lowest.
	lowestEntropy = Infinity;
	lowestEntropyShift = 0;
	for (shift = 0; shift < 26; shift++) {
		//Goes through all shifts and calculate the entropy.
		currentEntropy = calculateEntropy(shiftText);
		if (currentEntropy < lowestEntropy) {
			lowestEntropy = currentEntropy;
			lowestEntropyShift = shift;
		}
		shiftText = getShift(shiftText, 1);
	}
	//Returns the shift value of the lowest entropy.
	return lowestEntropyShift;
}

function calculateEntropy(cipherText) {
	sum = 0;
	for (characterPos = 0; characterPos < cipherText.length; characterPos++) {
		if (vaild.includes(cipherText[characterPos])) {
			sum += Math.log(frequencys[cipherText[characterPos].toLowerCase()]);
		}
	}
	return -sum;
}

function getShift(string, shiftValue) {
	var output = "";
	for (characterPos = 0; characterPos < string.length; characterPos++) {
		if (vaild.includes(string[characterPos])) {
			charData = getCharData(string[characterPos]);
			//Calculates the character of the string + the shift value.
			output += getChar(charData[0] + shiftValue, charData[1]);
		} else {
			//If character is invalid, just push it into the output.
			output += string[characterPos];
		}
	}
	return output;
}
