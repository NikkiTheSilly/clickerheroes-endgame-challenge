function readSave() {
  let txt = $("#saveInput").val();
  let data;
  let ANTI_CHEAT_CODE = "Fe12NAfA3R6z4k0z";
  let zlib = "7a990d405d2c6fb93aa8fbb0ec1a3b23";
  let deflate = "7e8bb5a89f2842ac4af01b3b7e228592";
  if (
    txt.indexOf(ANTI_CHEAT_CODE) > -1 ||
    txt.substring(0, 32) == zlib ||
    txt.substring(0, 32) == deflate
  ) {
    if (txt.substring(0, 32) == zlib) {
      try {
        data = JSON.parse(
          fflate.strFromU8(
            fflate.inflateSync(stringToUint8Array(atob(txt.substring(32))))
          )
        );
      } catch (e) {
        $("#saveInput").val("");
        console.error(error);
        return;
      }
    } else if (txt.substring(0, 32) == deflate) {
      try {
        data = JSON.parse(
          fflate.strFromU8(
            fflate.inflateSync(stringToUint8Array(atob(txt.substring(32))))
          )
        );
      } catch (e) {
        $("#saveInput").val("");
        console.error(e);
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
    $("#inputLgHS").val(
      data.stats.currentAscension.heroSoulsStart == "0"
        ? data.heroSouls
        : data.stats.currentAscension.heroSoulsStart
    );
    $("#xylInput").val(data.outsiders.outsiders[1].level);
    $("#chorInput").val(data.outsiders.outsiders[2].level);
    $("#ponyInput").val(data.outsiders.outsiders[5].level);
    $("#borbInput").val(data.outsiders.outsiders[6].level);
    $("#dogcogInput").val(data.ancients.ancients[11].level);
    $("#ACInput").val(data.autoclickers);
    calculateProgression();
  } else if (txt) $("#saveInput").val("");
}

function stringToUint8Array(string) {
  const array = new Uint8Array(string.length);

  for (let i = 0; i < string.length; i++) {
    array[i] = string.charCodeAt(i);
  }

  return array;
}
