(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3-array'), require('d3plus-common')) :
	typeof define === 'function' && define.amd ? define('d3plus-text', ['exports', 'd3-selection', 'd3-transition', 'd3-array', 'd3plus-common'], factory) :
	(factory((global.d3plus_text = global.d3plus_text || {}),global.d3_selection,global.d3_transition,global.d3_array,global.d3plus_common));
}(this, function (exports,d3Selection,d3Transition,d3Array,d3plusCommon) { 'use strict';

	var version = "0.6.1";

	/**
	    @function stringify
	    @desc Coerces value into a String.
	    @param {String} value
	*/
	function stringify(value) {
	  if (value === void 0) value = "undefined";
	  else if (!(typeof value === "string" || value instanceof String)) value = JSON.stringify(value);
	  return value;
	}

	// scraped from http://www.fileformat.info/info/unicode/category/Mc/list.htm
	// and http://www.fileformat.info/info/unicode/category/Mn/list.htm
	// JSON.stringify([].slice.call(document.getElementsByClassName("table-list")[0].getElementsByTagName("tr")).filter(function(d){ return d.getElementsByTagName("a").length && d.getElementsByTagName("a")[0].innerHTML.length === 6; }).map(function(d){ return d.getElementsByTagName("a")[0].innerHTML.replace("U", "u").replace("+", ""); }).sort());
	var a = ["u0903", "u093B", "u093E", "u093F", "u0940", "u0949", "u094A", "u094B", "u094C", "u094E", "u094F", "u0982", "u0983", "u09BE", "u09BF", "u09C0", "u09C7", "u09C8", "u09CB", "u09CC", "u09D7", "u0A03", "u0A3E", "u0A3F", "u0A40", "u0A83", "u0ABE", "u0ABF", "u0AC0", "u0AC9", "u0ACB", "u0ACC", "u0B02", "u0B03", "u0B3E", "u0B40", "u0B47", "u0B48", "u0B4B", "u0B4C", "u0B57", "u0BBE", "u0BBF", "u0BC1", "u0BC2", "u0BC6", "u0BC7", "u0BC8", "u0BCA", "u0BCB", "u0BCC", "u0BD7", "u0C01", "u0C02", "u0C03", "u0C41", "u0C42", "u0C43", "u0C44", "u0C82", "u0C83", "u0CBE", "u0CC0", "u0CC1", "u0CC2", "u0CC3", "u0CC4", "u0CC7", "u0CC8", "u0CCA", "u0CCB", "u0CD5", "u0CD6", "u0D02", "u0D03", "u0D3E", "u0D3F", "u0D40", "u0D46", "u0D47", "u0D48", "u0D4A", "u0D4B", "u0D4C", "u0D57", "u0D82", "u0D83", "u0DCF", "u0DD0", "u0DD1", "u0DD8", "u0DD9", "u0DDA", "u0DDB", "u0DDC", "u0DDD", "u0DDE", "u0DDF", "u0DF2", "u0DF3", "u0F3E", "u0F3F", "u0F7F", "u102B", "u102C", "u1031", "u1038", "u103B", "u103C", "u1056", "u1057", "u1062", "u1063", "u1064", "u1067", "u1068", "u1069", "u106A", "u106B", "u106C", "u106D", "u1083", "u1084", "u1087", "u1088", "u1089", "u108A", "u108B", "u108C", "u108F", "u109A", "u109B", "u109C", "u17B6", "u17BE", "u17BF", "u17C0", "u17C1", "u17C2", "u17C3", "u17C4", "u17C5", "u17C7", "u17C8", "u1923", "u1924", "u1925", "u1926", "u1929", "u192A", "u192B", "u1930", "u1931", "u1933", "u1934", "u1935", "u1936", "u1937", "u1938", "u1A19", "u1A1A", "u1A55", "u1A57", "u1A61", "u1A63", "u1A64", "u1A6D", "u1A6E", "u1A6F", "u1A70", "u1A71", "u1A72", "u1B04", "u1B35", "u1B3B", "u1B3D", "u1B3E", "u1B3F", "u1B40", "u1B41", "u1B43", "u1B44", "u1B82", "u1BA1", "u1BA6", "u1BA7", "u1BAA", "u1BE7", "u1BEA", "u1BEB", "u1BEC", "u1BEE", "u1BF2", "u1BF3", "u1C24", "u1C25", "u1C26", "u1C27", "u1C28", "u1C29", "u1C2A", "u1C2B", "u1C34", "u1C35", "u1CE1", "u1CF2", "u1CF3", "u302E", "u302F", "uA823", "uA824", "uA827", "uA880", "uA881", "uA8B4", "uA8B5", "uA8B6", "uA8B7", "uA8B8", "uA8B9", "uA8BA", "uA8BB", "uA8BC", "uA8BD", "uA8BE", "uA8BF", "uA8C0", "uA8C1", "uA8C2", "uA8C3", "uA952", "uA953", "uA983", "uA9B4", "uA9B5", "uA9BA", "uA9BB", "uA9BD", "uA9BE", "uA9BF", "uA9C0", "uAA2F", "uAA30", "uAA33", "uAA34", "uAA4D", "uAA7B", "uAA7D", "uAAEB", "uAAEE", "uAAEF", "uAAF5", "uABE3", "uABE4", "uABE6", "uABE7", "uABE9", "uABEA", "uABEC"];
	var b = ["u0300", "u0301", "u0302", "u0303", "u0304", "u0305", "u0306", "u0307", "u0308", "u0309", "u030A", "u030B", "u030C", "u030D", "u030E", "u030F", "u0310", "u0311", "u0312", "u0313", "u0314", "u0315", "u0316", "u0317", "u0318", "u0319", "u031A", "u031B", "u031C", "u031D", "u031E", "u031F", "u0320", "u0321", "u0322", "u0323", "u0324", "u0325", "u0326", "u0327", "u0328", "u0329", "u032A", "u032B", "u032C", "u032D", "u032E", "u032F", "u0330", "u0331", "u0332", "u0333", "u0334", "u0335", "u0336", "u0337", "u0338", "u0339", "u033A", "u033B", "u033C", "u033D", "u033E", "u033F", "u0340", "u0341", "u0342", "u0343", "u0344", "u0345", "u0346", "u0347", "u0348", "u0349", "u034A", "u034B", "u034C", "u034D", "u034E", "u034F", "u0350", "u0351", "u0352", "u0353", "u0354", "u0355", "u0356", "u0357", "u0358", "u0359", "u035A", "u035B", "u035C", "u035D", "u035E", "u035F", "u0360", "u0361", "u0362", "u0363", "u0364", "u0365", "u0366", "u0367", "u0368", "u0369", "u036A", "u036B", "u036C", "u036D", "u036E", "u036F", "u0483", "u0484", "u0485", "u0486", "u0487", "u0591", "u0592", "u0593", "u0594", "u0595", "u0596", "u0597", "u0598", "u0599", "u059A", "u059B", "u059C", "u059D", "u059E", "u059F", "u05A0", "u05A1", "u05A2", "u05A3", "u05A4", "u05A5", "u05A6", "u05A7", "u05A8", "u05A9", "u05AA", "u05AB", "u05AC", "u05AD", "u05AE", "u05AF", "u05B0", "u05B1", "u05B2", "u05B3", "u05B4", "u05B5", "u05B6", "u05B7", "u05B8", "u05B9", "u05BA", "u05BB", "u05BC", "u05BD", "u05BF", "u05C1", "u05C2", "u05C4", "u05C5", "u05C7", "u0610", "u0611", "u0612", "u0613", "u0614", "u0615", "u0616", "u0617", "u0618", "u0619", "u061A", "u064B", "u064C", "u064D", "u064E", "u064F", "u0650", "u0651", "u0652", "u0653", "u0654", "u0655", "u0656", "u0657", "u0658", "u0659", "u065A", "u065B", "u065C", "u065D", "u065E", "u065F", "u0670", "u06D6", "u06D7", "u06D8", "u06D9", "u06DA", "u06DB", "u06DC", "u06DF", "u06E0", "u06E1", "u06E2", "u06E3", "u06E4", "u06E7", "u06E8", "u06EA", "u06EB", "u06EC", "u06ED", "u0711", "u0730", "u0731", "u0732", "u0733", "u0734", "u0735", "u0736", "u0737", "u0738", "u0739", "u073A", "u073B", "u073C", "u073D", "u073E", "u073F", "u0740", "u0741", "u0742", "u0743", "u0744", "u0745", "u0746", "u0747", "u0748", "u0749", "u074A", "u07A6", "u07A7", "u07A8", "u07A9", "u07AA", "u07AB", "u07AC", "u07AD", "u07AE", "u07AF", "u07B0", "u07EB", "u07EC", "u07ED", "u07EE", "u07EF", "u07F0", "u07F1", "u07F2", "u07F3", "u0816", "u0817", "u0818", "u0819", "u081B", "u081C", "u081D", "u081E", "u081F", "u0820", "u0821", "u0822", "u0823", "u0825", "u0826", "u0827", "u0829", "u082A", "u082B", "u082C", "u082D", "u0859", "u085A", "u085B", "u08E3", "u08E4", "u08E5", "u08E6", "u08E7", "u08E8", "u08E9", "u08EA", "u08EB", "u08EC", "u08ED", "u08EE", "u08EF", "u08F0", "u08F1", "u08F2", "u08F3", "u08F4", "u08F5", "u08F6", "u08F7", "u08F8", "u08F9", "u08FA", "u08FB", "u08FC", "u08FD", "u08FE", "u08FF", "u0900", "u0901", "u0902", "u093A", "u093C", "u0941", "u0942", "u0943", "u0944", "u0945", "u0946", "u0947", "u0948", "u094D", "u0951", "u0952", "u0953", "u0954", "u0955", "u0956", "u0957", "u0962", "u0963", "u0981", "u09BC", "u09C1", "u09C2", "u09C3", "u09C4", "u09CD", "u09E2", "u09E3", "u0A01", "u0A02", "u0A3C", "u0A41", "u0A42", "u0A47", "u0A48", "u0A4B", "u0A4C", "u0A4D", "u0A51", "u0A70", "u0A71", "u0A75", "u0A81", "u0A82", "u0ABC", "u0AC1", "u0AC2", "u0AC3", "u0AC4", "u0AC5", "u0AC7", "u0AC8", "u0ACD", "u0AE2", "u0AE3", "u0B01", "u0B3C", "u0B3F", "u0B41", "u0B42", "u0B43", "u0B44", "u0B4D", "u0B56", "u0B62", "u0B63", "u0B82", "u0BC0", "u0BCD", "u0C00", "u0C3E", "u0C3F", "u0C40", "u0C46", "u0C47", "u0C48", "u0C4A", "u0C4B", "u0C4C", "u0C4D", "u0C55", "u0C56", "u0C62", "u0C63", "u0C81", "u0CBC", "u0CBF", "u0CC6", "u0CCC", "u0CCD", "u0CE2", "u0CE3", "u0D01", "u0D41", "u0D42", "u0D43", "u0D44", "u0D4D", "u0D62", "u0D63", "u0DCA", "u0DD2", "u0DD3", "u0DD4", "u0DD6", "u0E31", "u0E34", "u0E35", "u0E36", "u0E37", "u0E38", "u0E39", "u0E3A", "u0E47", "u0E48", "u0E49", "u0E4A", "u0E4B", "u0E4C", "u0E4D", "u0E4E", "u0EB1", "u0EB4", "u0EB5", "u0EB6", "u0EB7", "u0EB8", "u0EB9", "u0EBB", "u0EBC", "u0EC8", "u0EC9", "u0ECA", "u0ECB", "u0ECC", "u0ECD", "u0F18", "u0F19", "u0F35", "u0F37", "u0F39", "u0F71", "u0F72", "u0F73", "u0F74", "u0F75", "u0F76", "u0F77", "u0F78", "u0F79", "u0F7A", "u0F7B", "u0F7C", "u0F7D", "u0F7E", "u0F80", "u0F81", "u0F82", "u0F83", "u0F84", "u0F86", "u0F87", "u0F8D", "u0F8E", "u0F8F", "u0F90", "u0F91", "u0F92", "u0F93", "u0F94", "u0F95", "u0F96", "u0F97", "u0F99", "u0F9A", "u0F9B", "u0F9C", "u0F9D", "u0F9E", "u0F9F", "u0FA0", "u0FA1", "u0FA2", "u0FA3", "u0FA4", "u0FA5", "u0FA6", "u0FA7", "u0FA8", "u0FA9", "u0FAA", "u0FAB", "u0FAC", "u0FAD", "u0FAE", "u0FAF", "u0FB0", "u0FB1", "u0FB2", "u0FB3", "u0FB4", "u0FB5", "u0FB6", "u0FB7", "u0FB8", "u0FB9", "u0FBA", "u0FBB", "u0FBC", "u0FC6", "u102D", "u102E", "u102F", "u1030", "u1032", "u1033", "u1034", "u1035", "u1036", "u1037", "u1039", "u103A", "u103D", "u103E", "u1058", "u1059", "u105E", "u105F", "u1060", "u1071", "u1072", "u1073", "u1074", "u1082", "u1085", "u1086", "u108D", "u109D", "u135D", "u135E", "u135F", "u1712", "u1713", "u1714", "u1732", "u1733", "u1734", "u1752", "u1753", "u1772", "u1773", "u17B4", "u17B5", "u17B7", "u17B8", "u17B9", "u17BA", "u17BB", "u17BC", "u17BD", "u17C6", "u17C9", "u17CA", "u17CB", "u17CC", "u17CD", "u17CE", "u17CF", "u17D0", "u17D1", "u17D2", "u17D3", "u17DD", "u180B", "u180C", "u180D", "u18A9", "u1920", "u1921", "u1922", "u1927", "u1928", "u1932", "u1939", "u193A", "u193B", "u1A17", "u1A18", "u1A1B", "u1A56", "u1A58", "u1A59", "u1A5A", "u1A5B", "u1A5C", "u1A5D", "u1A5E", "u1A60", "u1A62", "u1A65", "u1A66", "u1A67", "u1A68", "u1A69", "u1A6A", "u1A6B", "u1A6C", "u1A73", "u1A74", "u1A75", "u1A76", "u1A77", "u1A78", "u1A79", "u1A7A", "u1A7B", "u1A7C", "u1A7F", "u1AB0", "u1AB1", "u1AB2", "u1AB3", "u1AB4", "u1AB5", "u1AB6", "u1AB7", "u1AB8", "u1AB9", "u1ABA", "u1ABB", "u1ABC", "u1ABD", "u1B00", "u1B01", "u1B02", "u1B03", "u1B34", "u1B36", "u1B37", "u1B38", "u1B39", "u1B3A", "u1B3C", "u1B42", "u1B6B", "u1B6C", "u1B6D", "u1B6E", "u1B6F", "u1B70", "u1B71", "u1B72", "u1B73", "u1B80", "u1B81", "u1BA2", "u1BA3", "u1BA4", "u1BA5", "u1BA8", "u1BA9", "u1BAB", "u1BAC", "u1BAD", "u1BE6", "u1BE8", "u1BE9", "u1BED", "u1BEF", "u1BF0", "u1BF1", "u1C2C", "u1C2D", "u1C2E", "u1C2F", "u1C30", "u1C31", "u1C32", "u1C33", "u1C36", "u1C37", "u1CD0", "u1CD1", "u1CD2", "u1CD4", "u1CD5", "u1CD6", "u1CD7", "u1CD8", "u1CD9", "u1CDA", "u1CDB", "u1CDC", "u1CDD", "u1CDE", "u1CDF", "u1CE0", "u1CE2", "u1CE3", "u1CE4", "u1CE5", "u1CE6", "u1CE7", "u1CE8", "u1CED", "u1CF4", "u1CF8", "u1CF9", "u1DC0", "u1DC1", "u1DC2", "u1DC3", "u1DC4", "u1DC5", "u1DC6", "u1DC7", "u1DC8", "u1DC9", "u1DCA", "u1DCB", "u1DCC", "u1DCD", "u1DCE", "u1DCF", "u1DD0", "u1DD1", "u1DD2", "u1DD3", "u1DD4", "u1DD5", "u1DD6", "u1DD7", "u1DD8", "u1DD9", "u1DDA", "u1DDB", "u1DDC", "u1DDD", "u1DDE", "u1DDF", "u1DE0", "u1DE1", "u1DE2", "u1DE3", "u1DE4", "u1DE5", "u1DE6", "u1DE7", "u1DE8", "u1DE9", "u1DEA", "u1DEB", "u1DEC", "u1DED", "u1DEE", "u1DEF", "u1DF0", "u1DF1", "u1DF2", "u1DF3", "u1DF4", "u1DF5", "u1DFC", "u1DFD", "u1DFE", "u1DFF", "u20D0", "u20D1", "u20D2", "u20D3", "u20D4", "u20D5", "u20D6", "u20D7", "u20D8", "u20D9", "u20DA", "u20DB", "u20DC", "u20E1", "u20E5", "u20E6", "u20E7", "u20E8", "u20E9", "u20EA", "u20EB", "u20EC", "u20ED", "u20EE", "u20EF", "u20F0", "u2CEF", "u2CF0", "u2CF1", "u2D7F", "u2DE0", "u2DE1", "u2DE2", "u2DE3", "u2DE4", "u2DE5", "u2DE6", "u2DE7", "u2DE8", "u2DE9", "u2DEA", "u2DEB", "u2DEC", "u2DED", "u2DEE", "u2DEF", "u2DF0", "u2DF1", "u2DF2", "u2DF3", "u2DF4", "u2DF5", "u2DF6", "u2DF7", "u2DF8", "u2DF9", "u2DFA", "u2DFB", "u2DFC", "u2DFD", "u2DFE", "u2DFF", "u302A", "u302B", "u302C", "u302D", "u3099", "u309A", "uA66F", "uA674", "uA675", "uA676", "uA677", "uA678", "uA679", "uA67A", "uA67B", "uA67C", "uA67D", "uA69E", "uA69F", "uA6F0", "uA6F1", "uA802", "uA806", "uA80B", "uA825", "uA826", "uA8C4", "uA8E0", "uA8E1", "uA8E2", "uA8E3", "uA8E4", "uA8E5", "uA8E6", "uA8E7", "uA8E8", "uA8E9", "uA8EA", "uA8EB", "uA8EC", "uA8ED", "uA8EE", "uA8EF", "uA8F0", "uA8F1", "uA926", "uA927", "uA928", "uA929", "uA92A", "uA92B", "uA92C", "uA92D", "uA947", "uA948", "uA949", "uA94A", "uA94B", "uA94C", "uA94D", "uA94E", "uA94F", "uA950", "uA951", "uA980", "uA981", "uA982", "uA9B3", "uA9B6", "uA9B7", "uA9B8", "uA9B9", "uA9BC", "uA9E5", "uAA29", "uAA2A", "uAA2B", "uAA2C", "uAA2D", "uAA2E", "uAA31", "uAA32", "uAA35", "uAA36", "uAA43", "uAA4C", "uAA7C", "uAAB0", "uAAB2", "uAAB3", "uAAB4", "uAAB7", "uAAB8", "uAABE", "uAABF", "uAAC1", "uAAEC", "uAAED", "uAAF6", "uABE5", "uABE8", "uABED", "uFB1E", "uFE00", "uFE01", "uFE02", "uFE03", "uFE04", "uFE05", "uFE06", "uFE07", "uFE08", "uFE09", "uFE0A", "uFE0B", "uFE0C", "uFE0D", "uFE0E", "uFE0F", "uFE20", "uFE21", "uFE22", "uFE23", "uFE24", "uFE25", "uFE26", "uFE27", "uFE28", "uFE29", "uFE2A", "uFE2B", "uFE2C", "uFE2D", "uFE2E", "uFE2F"];
	var combiningMarks = a.concat(b);

	var splitChars = ["-",  "/",  ";",  ":",  "&",
	                    "u0E2F",  // thai character pairannoi
	                    "u0EAF",  // lao ellipsis
	                    "u0EC6",  // lao ko la (word repetition)
	                    "u0ECC",  // lao cancellation mark
	                    "u104A",  // myanmar sign little section
	                    "u104B",  // myanmar sign section
	                    "u104C",  // myanmar symbol locative
	                    "u104D",  // myanmar symbol completed
	                    "u104E",  // myanmar symbol aforementioned
	                    "u104F",  // myanmar symbol genitive
	                    "u2013",  // en dash
	                    "u2014",  // em dash
	                    "u2027",  // simplified chinese hyphenation point
	                    "u3000",  // simplified chinese ideographic space
	                    "u3001",  // simplified chinese ideographic comma
	                    "u3002",  // simplified chinese ideographic full stop
	                    "uFF5E"  // wave dash
	                  ];

	var prefixChars = ["'",  "<",  "(",  "{",  "[",
	                     "u00AB",  // left-pointing double angle quotation mark
	                     "u300A",  // left double angle bracket
	                     "u3008"  // left angle bracket
	                   ];

	var suffixChars = ["'",  ">",  ")",  "}",  "]",  ".",  "!",  "?",
	                     "u00BB",  // right-pointing double angle quotation mark
	                     "u300B",  // right double angle bracket
	                     "u3009"  // right angle bracket
	                   ].concat(splitChars);

	var burmeseRange = "\u1000-\u102A\u103F-\u1049\u1050-\u1055";
	var japaneseRange = "\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u3400-\u4dbf";
	var chineseRange = "\u3400-\u9FBF";
	var laoRange = "\u0E81-\u0EAE\u0EB0-\u0EC4\u0EC8-\u0ECB\u0ECD-\u0EDD";

	var noSpaceRange = burmeseRange + chineseRange + laoRange;

	var splitWords = new RegExp(("[^\\s|\\" + (splitChars.join("|\\")) + "]+(\\" + (splitChars.join("|\\")) + ")*"), "g");
	var japaneseChars = new RegExp(("[" + japaneseRange + "]"));
	var noSpaceLanguage = new RegExp(("[" + noSpaceRange + "]"));
	var splitAllChars = new RegExp(("(\\" + (prefixChars.join("|\\")) + ")*[" + noSpaceRange + "](\\" + (suffixChars.join("|\\")) + "|\\" + (combiningMarks.join("|\\")) + ")*|[a-z0-9]+"), "gi");

	/**
	    @function width
	    @desc Splits a given sentence into an array of words.
	    @param {String} sentence
	*/
	function defaultSplit(sentence) {
	  if (!noSpaceLanguage.test(sentence)) return stringify(sentence).match(splitWords);
	  return d3Array.merge(stringify(sentence).match(splitWords).map(function (d) {
	    if (!japaneseChars.test(d) && noSpaceLanguage.test(d)) return d.match(splitAllChars);
	    return [d];
	  }));
	}

	/**
	    @function width
	    @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
	    @param {String|Array} text Can be either a single string or an array of strings to analyze.
	    @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
	*/
	function measure(text, style) {
	  if ( style === void 0 ) style = {"font-size": 10, "font-family": "sans-serif"};


	  var context = document.createElement("canvas").getContext("2d");

	  var font = [];
	  if ("font-style" in style) font.push(style["font-style"]);
	  if ("font-variant" in style) font.push(style["font-variant"]);
	  if ("font-weight" in style) font.push(style["font-weight"]);
	  if ("font-size" in style) {
	    var s = (style["font-size"]) + "px";
	    if ("line-height" in style) s += "/" + (style["line-height"]) + "px";
	    font.push(s);
	  }
	  if ("font-family" in style) font.push(style["font-family"]);

	  context.font = font.join(" ");

	  if (text instanceof Array) return text.map(function (t) { return context.measureText(t).width; });
	  return context.measureText(text).width;

	}

	/**
	    @function wrap
	    @desc Based on the defined styles and dimensions, breaks a string into an array of strings for each line of text.
	*/
	function wrap() {

	  var fontFamily = "sans-serif",
	      fontSize = 10,
	      height = 200,
	      lineHeight,
	      overflow = false,
	      split = defaultSplit,
	      width = 200;

	  /**
	      The inner return object and wraps the text and returns the line data array.
	      @private
	  */
	  function wrap(sentence) {

	    sentence = stringify(sentence);

	    if (lineHeight === void 0) lineHeight = Math.ceil(fontSize * 1.1);

	    var words = split(sentence);

	    var style = {
	      "font-family": fontFamily,
	      "font-size": fontSize,
	      "line-height": lineHeight
	    };

	    var line = 1,
	        textProg = "",
	        truncated = false,
	        widthProg = 0;

	    var lineData = [""],
	          sizes = measure(words, style),
	          space = measure(" ", style);

	    for (var i = 0; i < words.length; i++) {
	      var word = words[i];
	      var nextChar = sentence.charAt(textProg.length + word.length),
	            wordWidth = sizes[words.indexOf(word)];
	      if (nextChar === " ") word += nextChar;
	      if (widthProg + wordWidth > width - fontSize) {
	        lineData[line - 1] = lineData[line - 1].trimRight();
	        line++;
	        if (lineHeight * line > height || wordWidth > width && !overflow) {
	          truncated = true;
	          break;
	        }
	        widthProg = 0;
	        lineData.push(word);
	      }
	      else lineData[line - 1] += word;
	      textProg += word;
	      widthProg += wordWidth;
	      if (nextChar === " ") widthProg += space;
	    }

	    return {
	      lines: lineData,
	      sentence: sentence, truncated: truncated, words: words
	    };

	  }

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family.
	      @param {Function|String} [*value*]
	  */
	  wrap.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = _, wrap) : fontFamily;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size.
	      @param {Function|Number} [*value*]
	  */
	  wrap.fontSize = function(_) {
	    return arguments.length ? (fontSize = _, wrap) : fontSize;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets height limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
	      @param {Number} [*value* = 200]
	  */
	  wrap.height = function(_) {
	    return arguments.length ? (height = _, wrap) : height;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#wrap.fontSize) by default.
	      @param {Function|Number} [*value*]
	  */
	  wrap.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = _, wrap) : lineHeight;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the overflow to the specified boolean and returns this generator. If *value* is not specified, returns the current overflow value.
	      @param {Boolean} [*value* = false]
	  */
	  wrap.overflow = function(_) {
	    return arguments.length ? (overflow = _, wrap) : overflow;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
	      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
	  */
	  wrap.split = function(_) {
	    return arguments.length ? (split = _, wrap) : split;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets width limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
	      @param {Number} [*value* = 200]
	  */
	  wrap.width = function(_) {
	    return arguments.length ? (width = _, wrap) : width;
	  };

	  return wrap;

	}

	var d3 = {
	  max: d3Array.max,
	  min: d3Array.min,
	  select: d3Selection.select,
	  sum: d3Array.sum,
	  transition: d3Transition.transition
	};

	/**
	    The default id accessor function.
	    @private
	*/
	function boxId(d, i) {
	  return d.id || ("" + i);
	}


	/**
	    @function box
	    @desc Creates a wrapped text box based on an array of data. If *data* is specified, immediately wraps the text based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#box.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"text": "Hello D3plus, please wrap this sentence for me."};
	@example <caption>passed to the generator</caption>
	box([data]);
	@example <caption>creates the following</caption>
	<text class="d3plus-text-box" id="d3plus-text-box-0" text-anchor="start" font-family="Helvetica Neue" font-size="16px" transform="translate(0,-3.6)">
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    Hello D3plus, please wrap
	  </tspan>
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    this sentence for me.
	  </tspan>
	</text>
	@example <caption>this is shorthand for the following</caption>
	box().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	box().data([data])(function() { alert("draw complete!"); })
	*/
	function box(data) {
	  if ( data === void 0 ) data = [];


	  /**
	      The default ellipsis function.
	      @private
	  */
	  function boxEllipsis(_) {
	    return (_ + "...");
	  }

	  var delay = 0,
	      duration = 0,
	      ellipsis = boxEllipsis,
	      fontColor,
	      fontFamily = d3plusCommon.constant("sans-serif"),
	      fontMax = d3plusCommon.constant(50),
	      fontMin = d3plusCommon.constant(8),
	      fontResize = d3plusCommon.constant(false),
	      fontSize = d3plusCommon.constant(10),
	      height = d3plusCommon.accessor("height", 200),
	      id = boxId,
	      lineHeight,
	      overflow = d3plusCommon.constant(false),
	      select,
	      split = defaultSplit,
	      text = d3plusCommon.accessor("text"),
	      textAnchor = d3plusCommon.constant("start"),
	      verticalAlign = d3plusCommon.constant("top"),
	      width = d3plusCommon.accessor("width", 200),
	      x = d3plusCommon.accessor("x", 0),
	      y = d3plusCommon.accessor("y", 0);

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function box(callback) {

	    if (select === void 0) box.select(d3.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    var boxes = select.selectAll(".d3plus-text-box").data(data, id);

	    var t = d3.transition().duration(duration);

	    boxes.exit().transition().delay(duration).remove();

	    boxes.exit().selectAll("tspan").transition(t)
	      .attr("opacity", 0);

	    boxes.enter().append("text")
	        .attr("class", "d3plus-text-box")
	        .attr("id", function (d, i) { return ("d3plus-text-box-" + (id(d, i))); })
	      .merge(boxes)
	        .attr("y", function (d, i) { return ((y(d, i)) + "px"); })
	        .attr("fill", function (d, i) { return fontColor(d, i); })
	        .attr("text-anchor", function (d, i) { return textAnchor(d, i); })
	        .attr("font-family", function (d, i) { return fontFamily(d, i); })
	        .each(function(d, i) {

	          var resize = fontResize(d, i);

	          var fS = resize ? fontMax(d, i) : fontSize(d, i),
	              lH = resize ? fS * 1.1 : lineHeight(d, i),
	              line = 1,
	              lineData = [""],
	              sizes;

	          var style = {
	            "font-family": fontFamily(d, i),
	            "font-size": fS,
	            "line-height": lH
	          };

	          var fMax = fontMax(d, i),
	                fMin = fontMin(d, i),
	                h = height(d, i),
	                t = text(d, i),
	                tA = textAnchor(d, i),
	                vA = verticalAlign(d, i),
	                w = width(d, i),
	                words = split(t, i);

	          var dx = tA === "start" ? 0 : tA === "end" ? w : w / 2;

	          var wrapper = wrap()
	            .fontFamily(style["font-family"])
	            .fontSize(fS)
	            .lineHeight(lH)
	            .height(h)
	            .overflow(overflow(d, i))
	            .width(w);

	          /**
	              Figures out the lineData to be used for wrapping.
	              @private
	          */
	          function checkSize() {

	            if (fS < fMin) {
	              lineData = [];
	              return;
	            }
	            else if (fS > fMax) fS = fMax;

	            if (resize) {
	              lH = fS * 1.1;
	              wrapper
	                .fontSize(fS)
	                .lineHeight(lH);
	              style["font-size"] = fS;
	              style["line-height"] = lH;
	            }

	            var wrapResults = wrapper(t);
	            lineData = wrapResults.lines;
	            line = lineData.length;

	            if (wrapResults.truncated)

	              if (resize) {
	                fS--;
	                if (fS < fMin) lineData = [];
	                else checkSize();
	              }
	              else if (line === 2 && !lineData[line - 2].length) lineData = [];
	              else lineData[line - 2] = ellipsis(lineData[line - 2]);


	          }

	          if (h > lH || resize) {

	            if (resize) {

	              sizes = measure(words, style);

	              var areaMod = 1.165 + w / h * 0.1,
	                    boxArea = w * h,
	                    maxWidth = d3.max(sizes),
	                    textArea = d3.sum(sizes, function (d) { return d * lH; }) * areaMod;

	              if (maxWidth > w || textArea > boxArea) {
	                var areaRatio = Math.sqrt(boxArea / textArea),
	                      widthRatio = w / maxWidth;
	                var sizeRatio = d3.min([areaRatio, widthRatio]);
	                fS = Math.floor(fS * sizeRatio);
	              }

	              var heightMax = Math.floor(h * 0.8);
	              if (fS > heightMax) fS = heightMax;

	            }

	            checkSize();

	            d3.select(this)
	              .attr("font-size", (fS + "px"))
	              .style("font-size", (fS + "px"));

	          }

	          var tB = d3.select(this),
	                tH = line * lH;
	          var y = vA === "top" ? 0 : vA === "middle" ? h / 2 - tH / 2 : h - tH;
	          y -= lH * 0.2;

	          if (tB.attr("transform") === null) tB.attr("transform", ("translate(0," + y + ")"));
	          else tB.transition(t).attr("transform", ("translate(0," + y + ")"));

	          /**
	              Styles to apply to each <tspan> element.
	              @private
	          */
	          function tspanStyle(tspan) {
	            tspan
	              .text(function (d) { return d.trimRight(); })
	              .attr("x", ((x(d, i)) + "px"))
	              .attr("dx", (dx + "px"))
	              .attr("dy", (lH + "px"));
	          }

	          var tspans = d3.select(this).selectAll("tspan").data(lineData);

	          tspans.transition(t).call(tspanStyle);

	          tspans.exit().transition(t)
	            .attr("opacity", 0).remove();

	          tspans.enter().append("tspan")
	            .attr("dominant-baseline", "alphabetic")
	            .style("baseline-shift", "0%")
	            .attr("opacity", 0)
	            .call(tspanStyle)
	            .transition(t).delay(delay)
	              .attr("opacity", 1);

	        });

	    if (callback) setTimeout(callback, duration + 100);

	    return box;

	  }

	  /**
	      @memberof box
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A text box will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  box.data = function(_) {
	    return arguments.length ? (data = _, box) : data;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation delay to the specified number and returns this generator. If *value* is not specified, returns the current animation delay.
	      @param {Number} [*value* = 0]
	  */
	  box.delay = function(_) {
	    return arguments.length ? (delay = _, box) : delay;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation duration to the specified number and returns this generator. If *value* is not specified, returns the current animation duration.
	      @param {Number} [*value* = 0]
	  */
	  box.duration = function(_) {
	    return arguments.length ? (duration = _, box) : duration;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the ellipsis method to the specified function or string and returns this generator. If *value* is not specified, returns the current ellipsis method, which simply adds an ellipsis to the string by default.
	      @param {Function|String} [*value*]
	      @example
	function(d) {
	  return d + "...";
	}
	  */
	  box.ellipsis = function(_) {
	    return arguments.length ? (ellipsis = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : ellipsis;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font color accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontColor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontFamily;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the maximum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current maximum font size accessor. The maximum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 50]
	  */
	  box.fontMax = function(_) {
	    return arguments.length ? (fontMax = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontMax;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the minimum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current minimum font size accessor. The minimum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 8]
	  */
	  box.fontMin = function(_) {
	    return arguments.length ? (fontMin = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontMin;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontResize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : fontSize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height || 200;
	}
	  */
	  box.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : height;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the id accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d, i) {
	  return d.id || i + "";
	}
	  */
	  box.id = function(_) {
	    return arguments.length ? (id = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : id;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#box.fontSize) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : lineHeight;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the overflow accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current overflow accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.overflow = function(_) {
	    return arguments.length ? (overflow = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : overflow;
	  };

	  /**
	      @memberof box
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which adds an SVG element to the page by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  box.select = function(_) {
	    if (arguments.length) {
	      select = d3.select(_);
	      if (fontColor === void 0) box.fontColor(select.style("font-color"));
	      if (fontFamily === void 0) box.fontFamily(select.style("font-family"));
	      if (fontSize === void 0) box.fontSize(parseFloat(select.style("font-size"), 10));
	      return box;
	    }
	    return select;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
	      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
	  */
	  box.split = function(_) {
	    return arguments.length ? (split = _, box) : split;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the text accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor.
	      @param {Function|String} [*value*]
	      @example
	function(d) {
	  return d.text;
	}
	  */
	  box.text = function(_) {
	    return arguments.length ? (text = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : text;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the horizontal text anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current horizontal text anchor accessor.
	      @param {Function|String} [*value* = "start"] Analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.
	  */
	  box.textAnchor = function(_) {
	    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : textAnchor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor.
	      @param {Function|String} [*value* = "top"] Accepts `"top"`, `"middle"`, and `"bottom"`.
	  */
	  box.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : verticalAlign;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width || 200;
	}
	  */
	  box.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : width;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the left position of the box.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x || 0;
	}
	  */
	  box.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : x;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the top position of the box.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y || 0;
	}
	  */
	  box.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : d3plusCommon.constant(_), box) : y;
	  };

	  return data.length ? box() : box;

	}

	exports.version = version;
	exports.box = box;
	exports.split = defaultSplit;
	exports.stringify = stringify;
	exports.width = measure;
	exports.wrap = wrap;

	Object.defineProperty(exports, '__esModule', { value: true });

}));