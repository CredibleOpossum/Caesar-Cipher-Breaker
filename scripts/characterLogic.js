function getChar(code, capitalized) {
	//Handles negitive numbers.
	if (code < 0) {
		code = (26 + code) % 26;
	}
	//Handles capitalized characters.
	if (capitalized) {
		return String.fromCharCode((code % 26) + 65);
	} else {
		return String.fromCharCode((code % 26) + 97);
	}
}

function getCharData(char) {
	//Handles capitalized characters, true is a capital character.
	if (isUpperCase(char)) {
		return [char.charCodeAt(0) - 65, true];
	} else {
		return [char.charCodeAt(0) - 97, false];
	}
}

function isUpperCase(char) {
	//Returns the capitalization of the character, true is capital.
	if (char == char.toUpperCase()) {
		return true;
	} else {
		return false;
	}
}
