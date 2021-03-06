
//	--------------------
//	Conversion Functions
//	--------------------

function decToHex(d) { var dr = Number(d).toString(16); while(dr.length < 4) { dr = "0"+dr; } return "0x"+dr.toUpperCase(); }
function hexToChar(u) { return String.fromCharCode(u); }
function charToHex(s) { return decToHex(String(s).charCodeAt(0)); }
function hexToHTML(h) { return ("&#"+parseInt(h,16)+";"); }

//	--------------------
//	Range functions
//	--------------------

function addCustomCharacterRange(){
	var newrange = {"begin":0, "end":0};
	newrange.begin = parseInt(document.getElementById('customrangebegin').value, 16);
	newrange.end = parseInt(document.getElementById('customrangeend').value, 16);
	document.getElementById('customrangebegin').value = '';
	document.getElementById('customrangeend').value = '';

	if(isNaN(newrange.begin) || isNaN(newrange.end)){
		document.getElementById('customrangeerror').style.display = 'block';
		setTimeout(function(){document.getElementById('customrangeerror').style.display = 'none';}, 2500);
	} else {

		// flip
		if(newrange.begin > newrange.end){
			var tempbegin = newrange.begin;
			newrange.begin = newrange.end;
			newrange.end = tempbegin;
		}

		// maxes
		newrange.begin = Math.max(newrange.begin, (_UI.latinextendedb.end+1));
		newrange.end = Math.max(newrange.end, (_UI.latinextendedb.end+2));
		newrange.begin = Math.min(newrange.begin, 0xFFFE);
		newrange.end = Math.min(newrange.end, 0xFFFF);

		// format
		newrange.begin = decToHex(newrange.begin);
		newrange.end = decToHex(newrange.end);

		// Update
		_GP.projectsettings.charrange.custom.unshift(newrange);
		updateCustomRangeTable();
	}
}

function updateCustomRangeTable(){
	var cr = _GP.projectsettings.charrange.custom;
	debug("UPDATECUSTOMRANGETABLE - \n\t custom is " + JSON.stringify(cr));
	var content = "";
	if(cr.length){
		content += "Existing custom character ranges:<br><table style='margin-top:8px;'>";
		for(var c=0; c<cr.length; c++){
			content += "<tr><td class='customrangeline'>";
			content += cr[c].begin + "&nbsp;&nbsp;through&nbsp;&nbsp;" + cr[c].end + "&nbsp;&nbsp;";
			content += "</td><td>";
			content += "<input type='button' value='remove' onclick='removeCustomCharacterRange("+c+");'>";
			content += "</td></tr>";
		}
		content += "</table><br>";
		content += "Note, removing a custom range will not delete character data from your Glyphr Project.  ";
		content += "Custom ranges only determine what is shown in the UI, and what is exported to fonts.";
	}
	document.getElementById('customrangetable').innerHTML = content;
}

function removeCustomCharacterRange(i){
	var cr = _GP.projectsettings.charrange.custom;
	debug("REMOVECUSTOMCHARACTERRANGE - called on index " + i + "\n\t custom is " + JSON.stringify(cr));
	cr.splice(i,1);
	updateCustomRangeTable();
	debug("REMOVECUSTOMCHARACTERRANGE - \n\t custom is " + JSON.stringify(cr));
}


//	-----------------
//	Global Vars
//	-----------------

_UI.basiclatinorder = ["0x0041","0x0042","0x0043","0x0044","0x0045","0x0046","0x0047","0x0048","0x0049","0x004A","0x004B","0x004C","0x004D","0x004E","0x004F","0x0050","0x0051","0x0052","0x0053","0x0054","0x0055","0x0056","0x0057","0x0058","0x0059","0x005A","0x0061","0x0062","0x0063","0x0064","0x0065","0x0066","0x0067","0x0068","0x0069","0x006A","0x006B","0x006C","0x006D","0x006E","0x006F","0x0070","0x0071","0x0072","0x0073","0x0074","0x0075","0x0076","0x0077","0x0078","0x0079","0x007A","0x0030","0x0031","0x0032","0x0033","0x0034","0x0035","0x0036","0x0037","0x0038","0x0039","0x0021","0x0022","0x0023","0x0024","0x0025","0x0026","0x0027","0x0028","0x0029","0x002A","0x002B","0x002C","0x002D","0x002E","0x002F","0x003A","0x003B","0x003C","0x003D","0x003E","0x003F","0x0040","0x005B","0x005C","0x005D","0x005E","0x005F","0x0060","0x007B","0x007C","0x007D","0x007E","0x0020"];
_UI.latinsuppliment = {"begin":0x00A1, "end": 0x00FF};
_UI.latinextendeda = {"begin":0x0100, "end":0x017F};
_UI.latinextendedb = {"begin":0x0180, "end":0x024F};

_UI.unicodenames = {
// Basic Latin
	"0x0020": "Space",
	"0x0021": "Exclamation mark",
	"0x0022": "Quotation mark",
	"0x0023": "Number sign, Hash tag",
	"0x0024": "Dollar sign",
	"0x0025": "Percent sign",
	"0x0026": "Ampersand",
	"0x0027": "Apostrophe",
	"0x0028": "Left parenthesis",
	"0x0029": "Right parenthesis",
	"0x002A": "Asterisk",
	"0x002B": "Plus sign",
	"0x002C": "Comma",
	"0x002D": "Hyphen-minus",
	"0x002E": "Full stop",
	"0x002F": "Slash (Solidus)",
	"0x0030": "Digit Zero",
	"0x0031": "Digit One",
	"0x0032": "Digit Two",
	"0x0033": "Digit Three",
	"0x0034": "Digit Four",
	"0x0035": "Digit Five",
	"0x0036": "Digit Six",
	"0x0037": "Digit Seven",
	"0x0038": "Digit Eight",
	"0x0039": "Digit Nine",
	"0x003A": "Colon",
	"0x003B": "Semicolon",
	"0x003C": "Less-than sign",
	"0x003D": "Equal sign",
	"0x003E": "Greater-than sign",
	"0x003F": "Question mark",
	"0x0040": "At sign",
	"0x0041": "Latin Capital letter A",
	"0x0042": "Latin Capital letter B",
	"0x0043": "Latin Capital letter C",
	"0x0044": "Latin Capital letter D",
	"0x0045": "Latin Capital letter E",
	"0x0046": "Latin Capital letter F",
	"0x0047": "Latin Capital letter G",
	"0x0048": "Latin Capital letter H",
	"0x0049": "Latin Capital letter I",
	"0x004A": "Latin Capital letter J",
	"0x004B": "Latin Capital letter K",
	"0x004C": "Latin Capital letter L",
	"0x004D": "Latin Capital letter M",
	"0x004E": "Latin Capital letter N",
	"0x004F": "Latin Capital letter O",
	"0x0050": "Latin Capital letter P",
	"0x0051": "Latin Capital letter Q",
	"0x0052": "Latin Capital letter R",
	"0x0053": "Latin Capital letter S",
	"0x0054": "Latin Capital letter T",
	"0x0055": "Latin Capital letter U",
	"0x0056": "Latin Capital letter V",
	"0x0057": "Latin Capital letter W",
	"0x0058": "Latin Capital letter X",
	"0x0059": "Latin Capital letter Y",
	"0x005A": "Latin Capital letter Z",
	"0x005B": "Left Square Bracket",
	"0x005C": "Backslash",
	"0x005D": "Right Square Bracket",
	"0x005E": "Circumflex accent",
	"0x005F": "Low line",
	"0x0060": "Grave accent",
	"0x0061": "Latin Small Letter A",
	"0x0062": "Latin Small Letter B",
	"0x0063": "Latin Small Letter C",
	"0x0064": "Latin Small Letter D",
	"0x0065": "Latin Small Letter E",
	"0x0066": "Latin Small Letter F",
	"0x0067": "Latin Small Letter G",
	"0x0068": "Latin Small Letter H",
	"0x0069": "Latin Small Letter I",
	"0x006A": "Latin Small Letter J",
	"0x006B": "Latin Small Letter K",
	"0x006C": "Latin Small Letter L",
	"0x006D": "Latin Small Letter M",
	"0x006E": "Latin Small Letter N",
	"0x006F": "Latin Small Letter O",
	"0x0070": "Latin Small Letter P",
	"0x0071": "Latin Small Letter Q",
	"0x0072": "Latin Small Letter R",
	"0x0073": "Latin Small Letter S",
	"0x0074": "Latin Small Letter T",
	"0x0075": "Latin Small Letter U",
	"0x0076": "Latin Small Letter V",
	"0x0077": "Latin Small Letter W",
	"0x0078": "Latin Small Letter X",
	"0x0079": "Latin Small Letter Y",
	"0x007A": "Latin Small Letter Z",
	"0x007B": "Left Curly Bracket",
	"0x007C": "Vertical bar",
	"0x007D": "Right Curly Bracket",
	"0x007E": "Tilde",

// Latin-1 Suppliment
	"0x00A1": "Inverted Exclamation Mark",
	"0x00A2": "Cent sign",
	"0x00A3": "Pound sign",
	"0x00A4": "Currency sign",
	"0x00A5": "Yen sign",
	"0x00A6": "Broken bar",
	"0x00A7": "Section sign",
	"0x00A8": "Diaeresis",
	"0x00A9": "Copyright sign",
	"0x00AA": "Feminine Ordinal Indicator",
	"0x00AB": "Left-pointing double angle quotation mark",
	"0x00AC": "Not sign",
	"0x00AD": "Soft hyphen",
	"0x00AE": "Registered sign",
	"0x00AF": "Macron",
	"0x00B0": "Degree symbol",
	"0x00B1": "Plus-minus sign",
	"0x00B2": "Superscript two",
	"0x00B3": "Superscript three",
	"0x00B4": "Acute accent",
	"0x00B5": "Micro sign",
	"0x00B6": "Pilcrow sign",
	"0x00B7": "Middle dot",
	"0x00B8": "Cedilla",
	"0x00B9": "Superscript one",
	"0x00BA": "Masculine ordinal indicator",
	"0x00BB": "Right-pointing double angle quotation mark",
	"0x00BC": "Vulgar fraction one quarter",
	"0x00BD": "Vulgar fraction one half",
	"0x00BE": "Vulgar fraction three quarters",
	"0x00BF": "Inverted Question Mark",
	"0x00C0": "Latin Capital Letter A with grave",
	"0x00C1": "Latin Capital letter A with acute",
	"0x00C2": "Latin Capital letter A with circumflex",
	"0x00C3": "Latin Capital letter A with tilde",
	"0x00C4": "Latin Capital letter A with diaeresis",
	"0x00C5": "Latin Capital letter A with ring above",
	"0x00C6": "Latin Capital letter Æ",
	"0x00C7": "Latin Capital letter C with cedilla",
	"0x00C8": "Latin Capital letter E with grave",
	"0x00C9": "Latin Capital letter E with acute",
	"0x00CA": "Latin Capital letter E with circumflex",
	"0x00CB": "Latin Capital letter E with diaeresis",
	"0x00CC": "Latin Capital letter I with grave",
	"0x00CD": "Latin Capital letter I with acute",
	"0x00CE": "Latin Capital letter I with circumflex",
	"0x00CF": "Latin Capital letter I with diaeresis",
	"0x00D0": "Latin Capital letter Eth",
	"0x00D1": "Latin Capital letter N with tilde",
	"0x00D2": "Latin Capital letter O with grave",
	"0x00D3": "Latin Capital letter O with acute",
	"0x00D4": "Latin Capital letter O with circumflex",
	"0x00D5": "Latin Capital letter O with tilde",
	"0x00D6": "Latin Capital letter O with diaeresis",
	"0x00D7": "Multiplication sign",
	"0x00D8": "Latin Capital letter O with stroke",
	"0x00D9": "Latin Capital letter U with grave",
	"0x00DA": "Latin Capital letter U with acute",
	"0x00DB": "Latin Capital Letter U with circumflex",
	"0x00DC": "Latin Capital Letter U with diaeresis",
	"0x00DD": "Latin Capital Letter Y with acute",
	"0x00DE": "Latin Capital Letter Thorn",
	"0x00DF": "Latin Small Letter sharp S",
	"0x00E0": "Latin Small Letter A with grave",
	"0x00E1": "Latin Small Letter A with acute",
	"0x00E2": "Latin Small Letter A with circumflex",
	"0x00E3": "Latin Small Letter A with tilde",
	"0x00E4": "Latin Small Letter A with diaeresis",
	"0x00E5": "Latin Small Letter A with ring above",
	"0x00E6": "Latin Small Letter Æ",
	"0x00E7": "Latin Small Letter C with cedilla",
	"0x00E8": "Latin Small Letter E with grave",
	"0x00E9": "Latin Small Letter E with acute",
	"0x00EA": "Latin Small Letter E with circumflex",
	"0x00EB": "Latin Small Letter E with diaeresis",
	"0x00EC": "Latin Small Letter I with grave",
	"0x00ED": "Latin Small Letter I with acute",
	"0x00EE": "Latin Small Letter I with circumflex",
	"0x00EF": "Latin Small Letter I with diaeresis",
	"0x00F0": "Latin Small Letter Eth",
	"0x00F1": "Latin Small Letter N with tilde",
	"0x00F2": "Latin Small Letter O with grave",
	"0x00F3": "Latin Small Letter O with acute",
	"0x00F4": "Latin Small Letter O with circumflex",
	"0x00F5": "Latin Small Letter O with tilde",
	"0x00F6": "Latin Small Letter O with diaeresis",
	"0x00F7": "Division sign",
	"0x00F8": "Latin Small Letter O with stroke",
	"0x00F9": "Latin Small Letter U with grave",
	"0x00FA": "Latin Small Letter U with acute",
	"0x00FB": "Latin Small Letter U with circumflex",
	"0x00FC": "Latin Small Letter U with diaeresis",
	"0x00FD": "Latin Small Letter Y with acute",
	"0x00FE": "Latin Small Letter Thorn",
	"0x00FF": "Latin Small Letter Y with diaeresis",

// Latin Extended-A
	"0x0100": "Latin Capital Letter A with macron",
	"0x0101": "Latin Small Letter A with macron",
	"0x0102": "Latin Capital Letter A with breve",
	"0x0103": "Latin Small Letter A with breve",
	"0x0104": "Latin Capital Letter A with ogonek",
	"0x0105": "Latin Small Letter A with ogonek",
	"0x0106": "Latin Capital Letter C with acute",
	"0x0107": "Latin Small Letter C with acute",
	"0x0108": "Latin Capital Letter C with circumflex",
	"0x0109": "Latin Small Letter C with circumflex",
	"0x010A": "Latin Capital Letter C with dot above",
	"0x010B": "Latin Small Letter C with dot above",
	"0x010C": "Latin Capital Letter C with caron",
	"0x010D": "Latin Small Letter C with caron",
	"0x010E": "Latin Capital Letter D with caron",
	"0x010F": "Latin Small Letter D with caron",
	"0x0110": "Latin Capital Letter D with stroke",
	"0x0111": "Latin Small Letter D with stroke",
	"0x0112": "Latin Capital Letter E with macron",
	"0x0113": "Latin Small Letter E with macron",
	"0x0114": "Latin Capital Letter E with breve",
	"0x0115": "Latin Small Letter E with breve",
	"0x0116": "Latin Capital Letter E with dot above",
	"0x0117": "Latin Small Letter E with dot above",
	"0x0118": "Latin Capital Letter E with ogonek",
	"0x0119": "Latin Small Letter E with ogonek",
	"0x011A": "Latin Capital Letter E with caron",
	"0x011B": "Latin Small Letter E with caron",
	"0x011C": "Latin Capital Letter G with circumflex",
	"0x011D": "Latin Small Letter G with circumflex",
	"0x011E": "Latin Capital Letter G with breve",
	"0x011F": "Latin Small Letter G with breve",
	"0x0120": "Latin Capital Letter G with dot above",
	"0x0121": "Latin Small Letter G with dot above",
	"0x0122": "Latin Capital Letter G with cedilla",
	"0x0123": "Latin Small Letter G with cedilla",
	"0x0124": "Latin Capital Letter H with circumflex",
	"0x0125": "Latin Small Letter H with circumflex",
	"0x0126": "Latin Capital Letter H with stroke",
	"0x0127": "Latin Small Letter H with stroke",
	"0x0128": "Latin Capital Letter I with tilde",
	"0x0129": "Latin Small Letter I with tilde",
	"0x012A": "Latin Capital Letter I with macron",
	"0x012B": "Latin Small Letter I with macron",
	"0x012C": "Latin Capital Letter I with breve",
	"0x012D": "Latin Small Letter I with breve",
	"0x012E": "Latin Capital Letter I with ogonek",
	"0x012F": "Latin Small Letter I with ogonek",
	"0x0130": "Latin Capital Letter I with dot above",
	"0x0131": "Latin Small Letter dotless I",
	"0x0132": "Latin Capital Ligature IJ",
	"0x0133": "Latin Small Ligature IJ",
	"0x0134": "Latin Capital Letter J with circumflex",
	"0x0135": "Latin Small Letter J with circumflex",
	"0x0136": "Latin Capital Letter K with cedilla",
	"0x0137": "Latin Small Letter K with cedilla",
	"0x0138": "Latin Small Letter Kra",
	"0x0139": "Latin Capital Letter L with acute",
	"0x013A": "Latin Small Letter L with acute",
	"0x013B": "Latin Capital Letter L with cedilla",
	"0x013C": "Latin Small Letter L with cedilla",
	"0x013D": "Latin Capital Letter L with caron",
	"0x013E": "Latin Small Letter L with caron",
	"0x013F": "Latin Capital Letter L with middle dot",
	"0x0140": "Latin Small Letter L with middle dot",
	"0x0141": "Latin Capital Letter L with stroke",
	"0x0142": "Latin Small Letter L with stroke",
	"0x0143": "Latin Capital Letter N with acute",
	"0x0144": "Latin Small Letter N with acute",
	"0x0145": "Latin Capital Letter N with cedilla",
	"0x0146": "Latin Small Letter N with cedilla",
	"0x0147": "Latin Capital Letter N with caron",
	"0x0148": "Latin Small Letter N with caron",
	"0x0149": "Latin Small Letter N preceded by apostrophe[1]",
	"0x014A": "Latin Capital Letter Eng",
	"0x014B": "Latin Small Letter Eng",
	"0x014C": "Latin Capital Letter O with macron",
	"0x014D": "Latin Small Letter O with macron",
	"0x014E": "Latin Capital Letter O with breve",
	"0x014F": "Latin Small Letter O with breve",
	"0x0150": "Latin Capital Letter O with double acute",
	"0x0151": "Latin Small Letter O with double acute",
	"0x0152": "Latin Capital Ligature OE",
	"0x0153": "Latin Small Ligature OE",
	"0x0154": "Latin Capital Letter R with acute",
	"0x0155": "Latin Small Letter R with acute",
	"0x0156": "Latin Capital Letter R with cedilla",
	"0x0157": "Latin Small Letter R with cedilla",
	"0x0158": "Latin Capital Letter R with caron",
	"0x0159": "Latin Small Letter R with caron",
	"0x015A": "Latin Capital Letter S with acute",
	"0x015B": "Latin Small Letter S with acute",
	"0x015C": "Latin Capital Letter S with circumflex",
	"0x015D": "Latin Small Letter S with circumflex",
	"0x015E": "Latin Capital Letter S with cedilla",
	"0x015F": "Latin Small Letter S with cedilla",
	"0x0160": "Latin Capital Letter S with caron",
	"0x0161": "Latin Small Letter S with caron",
	"0x0162": "Latin Capital Letter T with cedilla",
	"0x0163": "Latin Small Letter T with cedilla",
	"0x0164": "Latin Capital Letter T with caron",
	"0x0165": "Latin Small Letter T with caron",
	"0x0166": "Latin Capital Letter T with stroke",
	"0x0167": "Latin Small Letter T with stroke",
	"0x0168": "Latin Capital Letter U with tilde",
	"0x0169": "Latin Small Letter U with tilde",
	"0x016A": "Latin Capital Letter U with macron",
	"0x016B": "Latin Small Letter U with macron",
	"0x016C": "Latin Capital Letter U with breve",
	"0x016D": "Latin Small Letter U with breve",
	"0x016E": "Latin Capital Letter U with ring above",
	"0x016F": "Latin Small Letter U with ring above",
	"0x0170": "Latin Capital Letter U with double acute",
	"0x0171": "Latin Small Letter U with double acute",
	"0x0172": "Latin Capital Letter U with ogonek",
	"0x0173": "Latin Small Letter U with ogonek",
	"0x0174": "Latin Capital Letter W with circumflex",
	"0x0175": "Latin Small Letter W with circumflex",
	"0x0176": "Latin Capital Letter Y with circumflex",
	"0x0177": "Latin Small Letter Y with circumflex",
	"0x0178": "Latin Capital Letter Y with diaeresis",
	"0x0179": "Latin Capital Letter Z with acute",
	"0x017A": "Latin Small Letter Z with acute",
	"0x017B": "Latin Capital Letter Z with dot above",
	"0x017C": "Latin Small Letter Z with dot above",
	"0x017D": "Latin Capital Letter Z with caron",
	"0x017E": "Latin Small Letter Z with caron",
	"0x017F": "Latin Small Letter long S",

// Latin Extended-B
	"0x0180": "Latin Small Letter B with stroke",
	"0x0181": "Latin Capital Letter B with hook",
	"0x0182": "Latin Capital Letter B with top bar",
	"0x0183": "Latin Small Letter B with top bar",
	"0x0184": "Latin Capital Letter Tone Six",
	"0x0185": "Latin Small Letter Tone Six",
	"0x0186": "Latin Capital Letter Open O",
	"0x0187": "Latin Capital Letter C with hook",
	"0x0188": "Latin Small Letter C with hook",
	"0x0189": "Latin Capital Letter African D",
	"0x018A": "Latin Capital Letter D with hook",
	"0x018B": "Latin Capital Letter D with top bar",
	"0x018C": "Latin Small Letter D with top bar",
	"0x018D": "Latin Small Letter Turned Delta",
	"0x018E": "Latin Capital Letter Reversed E",
	"0x018F": "Latin Capital Letter Schwa",
	"0x0190": "Latin Capital Letter Open E",
	"0x0191": "Latin Capital Letter F with hook",
	"0x0192": "Latin Small Letter F with hook",
	"0x0193": "Latin Capital Letter G with hook",
	"0x0194": "Latin Capital Letter Gamma",
	"0x0195": "Latin Small Letter HV",
	"0x0196": "Latin Capital Letter Iota",
	"0x0197": "Latin Capital Letter I with stroke",
	"0x0198": "Latin Capital Letter K with hook",
	"0x0199": "Latin Small Letter K with hook",
	"0x019A": "Latin Small Letter L with bar",
	"0x019B": "Latin Small Letter Lambda with stroke",
	"0x019C": "Latin Capital Letter Turned M",
	"0x019D": "Latin Capital Letter N with left hook",
	"0x019E": "Latin Small Letter N with long right leg",
	"0x019F": "Latin Capital Letter O with middle tilde",
	"0x01A0": "Latin Capital Letter O with horn",
	"0x01A1": "Latin Small Letter O with horn",
	"0x01A2": "Latin Capital Letter OI (= Latin Capital Letter Gha)",
	"0x01A3": "Latin Small Letter OI (= Latin Small Letter Gha)",
	"0x01A4": "Latin Capital Letter P with hook",
	"0x01A5": "Latin Small Letter P with hook",
	"0x01A6": "Latin Letter YR",
	"0x01A7": "Latin Capital Letter Tone Two",
	"0x01A8": "Latin Small Letter Tone Two",
	"0x01A9": "Latin Capital Letter Esh",
	"0x01AA": "Latin Letter Reversed Esh Loop",
	"0x01AB": "Latin Small Letter T with palatal hook",
	"0x01AC": "Latin Capital Letter T with hook",
	"0x01AD": "Latin Small Letter T with hook",
	"0x01AE": "Latin Capital Letter T with retroflex hook",
	"0x01AF": "Latin Capital Letter U with horn",
	"0x01B0": "Latin Small Letter U with horn",
	"0x01B1": "Latin Capital Letter Upsilon",
	"0x01B2": "Latin Capital Letter V with hook",
	"0x01B3": "Latin Capital Letter Y with hook",
	"0x01B4": "Latin Small Letter Y with hook",
	"0x01B5": "Latin Capital Letter Z with stroke",
	"0x01B6": "Latin Small Letter Z with stroke",
	"0x01B7": "Latin Capital Letter Ezh",
	"0x01B8": "Latin Capital Letter Ezh reversed",
	"0x01B9": "Latin Small Letter Ezh reversed",
	"0x01BA": "Latin Small Letter Ezh with tail",
	"0x01BB": "Latin Letter Two with stroke",
	"0x01BC": "Latin Capital Letter Tone Five",
	"0x01BD": "Latin Small Letter Tone Five",
	"0x01BE": "Latin Letter Inverted Glottal Stop with stroke",
	"0x01BF": "Latin Letter Wynn",
	"0x01C0": "Latin Letter Dental Click",
	"0x01C1": "Latin Letter Lateral Click",
	"0x01C2": "Latin Letter Alveolar Click",
	"0x01C3": "Latin Letter Retroflex Click",
	"0x01C4": "Latin Capital Letter DZ with caron",
	"0x01C5": "Latin Capital Letter D with Small Letter Z with caron",
	"0x01C6": "Latin Small Letter DZ with caron",
	"0x01C7": "Latin Capital Letter LJ",
	"0x01C8": "Latin Capital Letter L with Small Letter J",
	"0x01C9": "Latin Small Letter LJ",
	"0x01CA": "Latin Capital Letter NJ",
	"0x01CB": "Latin Capital Letter N with Small Letter J",
	"0x01CC": "Latin Small Letter NJ",
	"0x01CD": "Latin Capital Letter A with caron",
	"0x01CE": "Latin Small Letter A with caron",
	"0x01CF": "Latin Capital Letter I with caron",
	"0x01D0": "Latin Small Letter I with caron",
	"0x01D1": "Latin Capital Letter O with caron",
	"0x01D2": "Latin Small Letter O with caron",
	"0x01D3": "Latin Capital Letter U with caron",
	"0x01D4": "Latin Small Letter U with caron",
	"0x01D5": "Latin Capital Letter U with diaeresis and macron",
	"0x01D6": "Latin Small Letter U with diaeresis and macron",
	"0x01D7": "Latin Capital Letter U with diaeresis and acute",
	"0x01D8": "Latin Small Letter U with diaeresis and acute",
	"0x01D9": "Latin Capital Letter U with diaeresis and caron",
	"0x01DA": "Latin Small Letter U with diaeresis and caron",
	"0x01DB": "Latin Capital Letter U with diaeresis and grave",
	"0x01DC": "Latin Small Letter U with diaeresis and grave",
	"0x01DD": "Latin Small Letter Turned E",
	"0x01DE": "Latin Capital Letter A with diaeresis and macron",
	"0x01DF": "Latin Small Letter A with diaeresis and macron",
	"0x01E0": "Latin Capital Letter A with dot above and macron",
	"0x01E1": "Latin Small Letter A with dot above and macron",
	"0x01E2": "Latin Capital Letter Æ with macron",
	"0x01E3": "Latin Small Letter Æ with macron",
	"0x01E4": "Latin Capital Letter G with stroke",
	"0x01E5": "Latin Small Letter G with stroke",
	"0x01E6": "Latin Capital Letter G with caron",
	"0x01E7": "Latin Small Letter G with caron",
	"0x01E8": "Latin Capital Letter K with caron",
	"0x01E9": "Latin Small Letter K with caron",
	"0x01EA": "Latin Capital Letter O with ogonek",
	"0x01EB": "Latin Small Letter O with ogonek",
	"0x01EC": "Latin Capital Letter O with ogonek and macron",
	"0x01ED": "Latin Small Letter O with ogonek and macron",
	"0x01EE": "Latin Capital Letter Ezh with caron",
	"0x01EF": "Latin Small Letter Ezh with caron",
	"0x01F0": "Latin Small Letter J with caron",
	"0x01F1": "Latin Capital Letter DZ",
	"0x01F2": "Latin Capital Letter D with Small Letter Z",
	"0x01F3": "Latin Small Letter DZ",
	"0x01F4": "Latin Capital Letter G with acute",
	"0x01F5": "Latin Small Letter G with acute",
	"0x01F6": "Latin Capital Letter Hwair",
	"0x01F7": "Latin Capital Letter Wynn",
	"0x01F8": "Latin Capital Letter N with grave",
	"0x01F9": "Latin Small Letter N with grave",
	"0x01FA": "Latin Capital Letter A with ring above and acute",
	"0x01FB": "Latin Small Letter A with ring above and acute",
	"0x01FC": "Latin Capital Letter Æ with acute",
	"0x01FD": "Latin Small Letter Æ with acute",
	"0x01FE": "Latin Capital Letter O with stroke and acute",
	"0x01FF": "Latin Small Letter O with stroke and acute",
	"0x0200": "Latin Capital Letter A with double grave",
	"0x0201": "Latin Small Letter A with double grave",
	"0x0202": "Latin Capital Letter A with inverted breve",
	"0x0203": "Latin Small Letter A with inverted breve",
	"0x0204": "Latin Capital Letter E with double grave",
	"0x0205": "Latin Small Letter E with double grave",
	"0x0206": "Latin Capital Letter E with inverted breve",
	"0x0207": "Latin Small Letter E with inverted breve",
	"0x0208": "Latin Capital Letter I with double grave",
	"0x0209": "Latin Small Letter I with double grave",
	"0x020A": "Latin Capital Letter I with inverted breve",
	"0x020B": "Latin Small Letter I with inverted breve",
	"0x020C": "Latin Capital Letter O with double grave",
	"0x020D": "Latin Small Letter O with double grave",
	"0x020E": "Latin Capital Letter O with inverted breve",
	"0x020F": "Latin Small Letter O with inverted breve",
	"0x0210": "Latin Capital Letter R with double grave",
	"0x0211": "Latin Small Letter R with double grave",
	"0x0212": "Latin Capital Letter R with inverted breve",
	"0x0213": "Latin Small Letter R with inverted breve",
	"0x0214": "Latin Capital Letter U with double grave",
	"0x0215": "Latin Small Letter U with double grave",
	"0x0216": "Latin Capital Letter U with inverted breve",
	"0x0217": "Latin Small Letter U with inverted breve",
	"0x0218": "Latin Capital Letter S with comma below",
	"0x0219": "Latin Small Letter S with comma below",
	"0x021A": "Latin Capital Letter T with comma below",
	"0x021B": "Latin Small Letter T with comma below",
	"0x021C": "Latin Capital Letter Yogh",
	"0x021D": "Latin Small Letter Yogh",
	"0x021E": "Latin Capital Letter H with caron",
	"0x021F": "Latin Small Letter H with caron",
	"0x0220": "Latin Capital Letter N with long right leg",
	"0x0221": "Latin Small Letter D with curl",
	"0x0222": "Latin Capital Letter OU",
	"0x0223": "Latin Small Letter OU",
	"0x0224": "Latin Capital Letter Z with hook",
	"0x0225": "Latin Small Letter Z with hook",
	"0x0226": "Latin Capital Letter A with dot above",
	"0x0227": "Latin Small Letter A with dot above",
	"0x0228": "Latin Capital Letter E with cedilla",
	"0x0229": "Latin Small Letter E with cedilla",
	"0x022A": "Latin Capital Letter O with diaeresis and macron",
	"0x022B": "Latin Small Letter O with diaeresis and macron",
	"0x022C": "Latin Capital Letter O with tilde and macron",
	"0x022D": "Latin Small Letter O with tilde and macron",
	"0x022E": "Latin Capital Letter O with dot above",
	"0x022F": "Latin Small Letter O with dot above",
	"0x0230": "Latin Capital Letter O with dot above and macron",
	"0x0231": "Latin Small Letter O with dot above and macron",
	"0x0232": "Latin Capital Letter Y with macron",
	"0x0233": "Latin Small Letter Y with macron",
	"0x0234": "Latin Small Letter L with curl",
	"0x0235": "Latin Small Letter N with curl",
	"0x0236": "Latin Small Letter T with curl",
	"0x0237": "Latin Small Letter Dotless J",
	"0x0238": "Latin Small Letter DB Digraph",
	"0x0239": "Latin Small Letter QP Digraph",
	"0x023A": "Latin Capital Letter A with stroke",
	"0x023B": "Latin Capital Letter C with stroke",
	"0x023C": "Latin Small Letter C with stroke",
	"0x023D": "Latin Capital Letter L with bar",
	"0x023E": "Latin Capital Letter T with diagonal stroke",
	"0x023F": "Latin Small Letter S with swash tail",
	"0x0240": "Latin Small Letter Z with swash tail",
	"0x0241": "Latin Capital Letter Glottal Stop",
	"0x0242": "Latin Small Letter Glottal Stop",
	"0x0243": "Latin Capital Letter B with stroke",
	"0x0244": "Latin Capital Letter U bar",
	"0x0245": "Latin Capital Letter Turned V",
	"0x0246": "Latin Capital Letter E with stroke",
	"0x0247": "Latin Small Letter E with stroke",
	"0x0248": "Latin Capital Letter J with stroke",
	"0x0249": "Latin Small Letter J with stroke",
	"0x024A": "Latin Capital Letter Q with hook tail",
	"0x024B": "Latin Small Letter Q with hook tail",
	"0x024C": "Latin Capital Letter R with stroke",
	"0x024D": "Latin Small Letter R with stroke",
	"0x024E": "Latin Capital Letter Y with stroke",
	"0x024F": "Latin Small Letter Y with stroke"
};