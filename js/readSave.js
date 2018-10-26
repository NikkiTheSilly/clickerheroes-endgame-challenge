function readSave() {
	let txt = $("#saveInput").val();
	let data;
	if (txt.indexOf("Fe12NAfA3R6z4k0z") > -1 || txt.substring(0, 32) == "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
		if (txt.substring(0, 32) == "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
			try {
				data = JSON.parse(pako.inflate(atob(txt.substring(32)), {to: 'string'}));
			} catch(e) {
				$("#saveInput").val("");
				return;
			}
		} else {
			var result = txt.split("Fe12NAfA3R6z4k0z");
			txt = "";
			for (var i = 0; i < result[0].length; i += 2) {
				txt += result[0][i];
			}
			data = JSON.parse(atob(txt));
		}
		$("#inputAS").val(data.ancientSoulsTotal);
        $("#inputLgHS").val(data.stats.currentAscension.heroSoulsStart);
        $("#xylInput").val(data.outsiders.outsiders[1].level);
        $("#chorInput").val(data.outsiders.outsiders[2].level);
        $("#ponyInput").val(data.outsiders.outsiders[5].level);
        $("#borbInput").val(data.outsiders.outsiders[6].level);
        $("#ACInput").val(data.autoclickers);
		calculateProgression();
	} else if (txt)
		$("#saveInput").val("");
}