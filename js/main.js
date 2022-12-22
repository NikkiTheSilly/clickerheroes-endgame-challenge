var MAX_ZONE = 2**31 - 1;
var GOLD_SCALE = 1.15;
var HP_SCALE;   // 2xn array. First row is zones. Second row is hpscales
var HEROES;
var ROOT2 = false;
var ANCIENT_SOULS;

var xyl;
var chor;
var pony;
var borb;
var dogcog;
var ACs;
var xylBonus;
var borbLimit;
var cps;
var gildBonus;
var classes;

var goldBonus140 = Math.log10(1.6 / 1.15) * 139;
    goldBonus140 -= 2; // 1% TCC
var hsSplit = Math.log10(1 / 11);
var hsActiveDmgAdjust = Math.log10(2) / 2 * 3 + Math.log10(2.5) * 2 / 5;
var hsIdleDmgAdjust = Math.log10(2) / 2 * 2 + Math.log10(2.5) * 2 / 5;
var hsGoldAdjust = Math.log10(2) / 2 * 3;

var comboTime;

var totalDuration;
var borbLimitReached;

function prepareHPScale() {
    if (!ROOT2) {
        HP_SCALE = [[1, 140], [1.55, 1.145]];
        for (i=1; i<=400; i++) {
            HP_SCALE[0].push(500 * i);
            HP_SCALE[1].push(1.145 + 0.001 * i);
        }
    } else {
        var bps = root2_customized_bps(ANCIENT_SOULS);
        HP_SCALE = [[1], [1.55]];
        for (i=0; i<bps.length; i++) {
            HP_SCALE[0].push(bps[i][3]);
            HP_SCALE[1].push(bps[i][2]);
        }
    }
    
}

var HERO_TABLE_COLUMNS = {
    'name': 0,
    'lv1cost': 1,
    'costScale': 2,
    'damageScale': 3,
    'reqlevel': 4,
    'dps': 5
}

function getHeroAttr(hnum, attr) {
    return HEROES[hnum][HERO_TABLE_COLUMNS[attr]];
}

function getAdvancedInputs() {
    let xyliqilLevel = parseFloat($("#xylInput").val() || 0);
    if (xyliqilLevel < 0) { xyliqilLevel = 0; }
    xyliqilLevel = Math.floor(xyliqilLevel);
    $("#xylInput").val(xyliqilLevel.toString().replace(/\+/g,''));

    let chorLevel = parseFloat($("#chorInput").val() || 0);
    if (chorLevel < 0) { chorLevel = 0; }
    if (chorLevel > 150) { chorLevel = 150; }
    chorLevel = Math.floor(chorLevel);
    $("#chorInput").val(chorLevel.toString().replace(/\+/g,''));

    let ponyLevel = parseFloat($("#ponyInput").val() || 0);
    if (ponyLevel < 0) { ponyLevel = 30; }
    ponyLevel = Math.floor(ponyLevel);
    $("#ponyInput").val(ponyLevel.toString().replace(/\+/g,''));
    
    let borbLevel = parseFloat($("#borbInput").val() || 0);
    if (borbLevel < 0) { borbLevel = 0; }
    borbLevel = Math.floor(borbLevel);
    $("#borbInput").val(borbLevel.toString().replace(/\+/g,''));
    
    let dogcogLevel = parseFloat($("#dogcogInput").val() || 0);
    if (dogcogLevel < 0) { dogcogLevel = 0; }
    if (dogcogLevel > 3743) { dogcogLevel = 3743; }
    dogcogLevel = Math.floor(dogcogLevel);
    $("#dogcogInput").val(dogcogLevel.toString().replace(/\+/g,''));

    let autoClickers = parseFloat($("#ACInput").val() || 0);
    if (autoClickers < 0) { autoClickers = 0; }
    autoClickers = Math.floor(autoClickers);
    $("#ACInput").val(autoClickers.toString().replace(/\+/g,''));
    
    return [xyliqilLevel, chorLevel, ponyLevel, borbLevel, dogcogLevel, autoClickers];
}

function calculateProgression() {
    
    ANCIENT_SOULS = parseFloat($("#inputAS").val());
    
    let heroSoulsInput = $("#inputLgHS").val();
    var lghs = "";
    if (heroSoulsInput.indexOf("e") > -1) {
        let mantissa = heroSoulsInput.substr(0, heroSoulsInput.indexOf("e"));
        let exponent = heroSoulsInput.substr(heroSoulsInput.lastIndexOf("e") + 1);
        mantissa = parseFloat(mantissa || 0);
        exponent = parseFloat(exponent || 0);
        if ((isNaN(mantissa)) || isNaN(exponent)) {
            $("#inputLgHS").val("");
        }
        lghs = exponent + Math.log10(mantissa);
        mantissa = Math.pow(10, lghs % 1).toFixed(3);
        exponent = Math.floor(lghs);
        $("#inputLgHS").val(mantissa + "e" + exponent);
    } else {
        lghs = parseFloat(heroSoulsInput || 0);
        $("#inputLgHS").val(lghs.toFixed(4));
    }
    
    var advancedInputs = getAdvancedInputs();
    xyl = advancedInputs[0];
    chor = advancedInputs[1];
    pony = advancedInputs[2];
    borb = advancedInputs[3];
    dogcog = advancedInputs[4];
    ACs = advancedInputs[5];
    cps = ACs > 4 ? Math.log10(1.5) * (ACs - 1) + 1: Math.log10(ACs + 1) + 1;
    dogcogScaling = (99.99999999 * (1 - Math.pow(Math.E, -.01 * dogcog))) / 100;

    var ponyBonus = pony > 100
        ? Math.log10(pony) * 2 + 1
        : Math.log10(pony * pony * 10 + 1);
    
    var errMsg = "";
    if (isNaN(ANCIENT_SOULS) || isNaN(lghs) ||
       $("#gameRoot2").prop("checked") == $("#gameVanilla").prop("checked")) {
        errMsg = "Please enter all inputs";
    } else if (lghs < 100) {
        errMsg = "Requires lgHS >= 100";
    }
    
    if (errMsg.length > 0) {
        $("#inputWarning").html(errMsg);
        $("#progressTbl tbody").html("");
        return;
    } else {
        $("#inputWarning").html("");
    }
    
    totalDuration = 0;
    borbLimitReached = false;
    ROOT2 = $("#gameRoot2").prop("checked");
    HEROES = ROOT2 ? HEROES_ROOT2 : HEROES_VANILLA;
    
    xylBonus = xyl * Math.log10(1.5);
    
    prepareHPScale();

    var tp = ROOT2 ? root2_tp(ANCIENT_SOULS) : 
        0.25 - 0.23 * Math.exp(-0.0003 * ANCIENT_SOULS);
    $("#outputTP").val(tp.toFixed(6));
    
    var data = [];
    var start = 0;
    var startTL = 0;
    var lghsStart = lghs;
    var hlevel, lghsEnd;
    
    classes = [];
    
    var t0 = performance.now();
    
    var effectivelghs;
    
    for (i = 0; i < 250; i++) {
        comboTime = 0;
        effectivelghs = lghsStart + Math.log10(1 / 0.95) * chor + hsSplit;
        let gilds = Math.max(1, Math.floor((lghsStart - ponyBonus) / Math.log10(1 + tp) / 10 - 10));
        gildBonus = Math.log10(gilds);
        
        let kumaEffect;
        if (effectivelghs > 4511 && !ROOT2) {
            kumaEffect = 8;
        } else {
            let kumaLevel = Math.floor(effectivelghs / Math.log10(2) - 7);
            if (ROOT2) {
                let a = 2.5 + borb * 0.1 + 0.00008 * borb * borb;
                kumaEffect = a * Math.log(kumaLevel + 2.719);
            } else {
                kumaEffect = 8 * (1 - Math.exp(-0.025 * kumaLevel));
            }
        }
        
        borbLimit = ROOT2 ? kumaEffect * 5000 :kumaEffect * borb / 8 * 5000;
        
        if (ROOT2) {
            let nogBonus = xyl > 0 ? 1 + 0.2505 * (1 - Math.exp(xyl * -0.04)) : 0;
            let nog = (lghsStart + Math.log10(1 / 0.95) * chor + hsSplit) / 2.5 + Math.log10(2.5) * 2 / 5;
            xylBonus = nog * nogBonus;
        }
        
        hnumTL = heroReached(effectivelghs, startTL, active=false);
        zoneTL = zoneReached(effectivelghs, hnumTL, active=false);
        
        gilds = Math.max(gilds, Math.floor(zoneTL / 10 - 10));
        gildBonus = Math.log10(gilds);
        
        hnumTL = heroReached(effectivelghs, hnumTL, active=false);
        zoneTL = zoneReached(effectivelghs, hnumTL, active=false);
        
        hnum = heroReached(effectivelghs, start);
        zone = zoneReached(effectivelghs, hnum);

        if (zoneTL > zone) {
            if (zoneTL > MAX_ZONE) zoneTL = MAX_ZONE;
            hnum = hnumTL;
            zone = zoneTL;
        } else {
            if (zone > MAX_ZONE) {
                zone = MAX_ZONE;
            } else {
                let time = (zone - zoneTL) / 8050 * 3600;
                comboTime = Math.max(0, Math.log10(time));
                gilds = Math.max(gilds, Math.floor(zone / 10 - 10));
                gildBonus = Math.log10(gilds);
                hnum = heroReached(effectivelghs, hnum);
                zone = zoneReached(effectivelghs, hnum);
                if (zone > MAX_ZONE) zone = MAX_ZONE;
            }
        }
        
        var goldBonus = zone > zoneTL // Autoclickers or Xyliqil gold increase
            ? Math.min(306, cps)
            : ROOT2 ? 0 : xylBonus;
        
        hlevel = (zone * Math.log10(GOLD_SCALE) + 1.5 * effectivelghs + hsGoldAdjust + goldBonus140 
            - (getHeroAttr(hnum, "lv1cost") + dogcogScaling) + goldBonus - Math.log10(15)) / 
            Math.log10(getHeroAttr(hnum, "costScale"));
        lghsEnd = (zone / 5 - 20) * Math.log10(1 + tp) 
            + Math.log10(20 * (1 + tp) / tp);
        lghsEnd += ponyBonus;
        if (ANCIENT_SOULS >= 21000 && !ROOT2) lghsEnd -= zone > 1e6
            ? Math.log10(400)
            : Math.log10(20);
        lghsChange = lghsEnd - lghsStart > 50 ? lghsEnd - lghsStart 
            : Math.log10(1 + Math.pow(10, lghsEnd - lghsStart));
        
        if (zoneTL > (borbLimit + 499)) {
            classes[i] = "redBG";
        } else if (zone > (borbLimit + 499)) {
            classes[i] = "yellowBG";
        }
        
        let durationSeconds = 0;
        if (zone > (borbLimit + 499)) {
            let flatZones = Math.max(0, borbLimit - zoneTL);
            let n = zone - borbLimit;
            let highZones = n + (n * n) / 10830;
            let j = borbLimit < zoneTL ? zoneTL - borbLimit: 0;
            let preTLMax =  j + (j * j) / 10830;
            let zonesTraveled = flatZones + highZones - preTLMax;
            durationSeconds = Math.ceil(zonesTraveled / 8050 * 3600);
            if (!borbLimitReached) {
                let activeZones = borbLimit + 500 - zoneTL;
                totalDuration += Math.floor(activeZones / 8050 * 3600);
                borbLimitReached = true;
            }
        } else if (zone > zoneTL) {
            let activeZones = zone - zoneTL;
            durationSeconds = Math.floor(activeZones / 8050 * 3600);
            totalDuration += durationSeconds;
        }
        data.push([
            i,
            lghsStart.toFixed(2),
            getHeroAttr(hnum, "name"),
            zone.toFixed(0),
            hlevel.toFixed(0),
            lghsChange.toFixed(2),
            zoneTL.toFixed(0),
            formatTime(durationSeconds)
        ])
        if (zone >= MAX_ZONE) { // Stop if encountering infinite ascension
            break;
        }
        lghsStart += lghsChange;
        start = hnum;
        startTL = hnumTL;
    }
    var t1 = performance.now();
    console.log("Performance:", t1 - t0);
    console.log("Time until borbLimit:", formatTime(totalDuration));
    $("#progressTbl tbody").html(dataArrayToHTML(data));
}

function formatTime(durationSeconds) {
    let hours = Math.floor(durationSeconds / 3600);
    if (hours < 72) {
        let minutes = Math.floor((durationSeconds - (hours * 3600)) / 60);
        let seconds = durationSeconds - hours * 3600 - minutes * 60;
        if (hours   < 10) { hours   = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        let dl = durationSeconds;
        let years = Math.floor(dl / 31557600);
        dl -= years * 31557600;
        let days = Math.floor(dl / 86400);
        dl -= days * 86400;
        hours = dl / 3600;
        return (years > 0 ? years.toLocaleString() + "y " : "") + days + "d " + hours.toFixed(2) + "h";
    }
}

function heroReached(lgHS, start=0, active=true) {
    // start is used to search for reachable hero 
    // from the previous ascension, to save execution time
    var zone, gold;
    var i = start;
    for (; i < HEROES.length; i++) {
        zone = zoneReached(lgHS, i, active);
        gold = zone * Math.log10(GOLD_SCALE) + 1.5 * lgHS + hsGoldAdjust + goldBonus140 - Math.log10(15);
        gold += active // Autoclickers or Xyliqil gold increase
            ? Math.min(306, cps)
            : ROOT2 ? 0 : xylBonus;
        if (zone == MAX_ZONE || i == HEROES.length - 1 || 
            gold < heroUpgradeBaseCost(i + 1)) {
            break;
        }
    }
    return i;
}

function zoneReached(lgHS, i, active=true) {
    let R = Math.log10(getHeroAttr(i, "damageScale")) / 
        Math.log10(getHeroAttr(i, "costScale")) / 25;
    let lgDmgMultPerZone = Math.log10(GOLD_SCALE) * R + 
        ROOT2 * (ANCIENT_SOULS >= 6400) * Math.log10(1.01) / 10;
    let efficiency = getHeroAttr(i, 'dps') - 
        R * ((getHeroAttr(i, "lv1cost") + dogcogScaling) + 175 * Math.log10(getHeroAttr(i, "costScale")));

    let startingGold = hsGoldAdjust + 1.5 * lgHS + goldBonus140 - Math.log10(15);
    startingGold += active // Autoclickers or Xyliqil gold increase
        ? Math.min(306, cps)
        : ROOT2 ? 0 : xylBonus;
    startingGold += ROOT2 * (i >= 47) * 98; // BomberMax global gold boost on Root2
    
    let RHS = efficiency + (2.4 + active * 0.5) * lgHS 
        - 2 + startingGold * R;   // Minus 2 to account for boss HP
    RHS += active
        ? hsActiveDmgAdjust
        : hsIdleDmgAdjust;
    RHS += active // Autoclickers or Xyliqil damage increase
        ? Math.min(306, cps) * 2
        : ROOT2
            ? xylBonus + (ACs > 2e9 ? 0 : cps)
            : xylBonus * 2 + (ACs > 2e9 ? 0 : cps);
    RHS += gildBonus + comboTime;
    RHS += ROOT2 * (i >= 48) * 43.64;   // Gog global DPS boost on Root2
    
    let reqzone = (heroUpgradeBaseCost(i) - startingGold) / 
        Math.log10(GOLD_SCALE);
    
    let lghp0 = 1;  // lgHP at zone 1
    let nbp = HP_SCALE[0].length;
    for(j = 0; j < nbp - 1; j++) {
        // Loop through every HP breakpoint
        let hpscale = HP_SCALE[1][j];
        let lghp1 = lghp0 + (HP_SCALE[0][j + 1] - HP_SCALE[0][j]) * 
            Math.log10(hpscale);
        let z0 = HP_SCALE[0][j];
        let z1 = HP_SCALE[0][j + 1];
        
        if(z1 >= reqzone && lghp0 - lgDmgMultPerZone * z0 <= RHS && lghp1 - lgDmgMultPerZone * z1 > RHS) {
            // In the middle of two breakpoints. 
            // Also must be approximately above the required zone to get this hero
            // Solve linear equation.
            let M = 1 / (Math.log10(hpscale) - lgDmgMultPerZone);
            let zone = M * (RHS - lghp0 + z0 * Math.log10(hpscale));
            return zone;
        }
        lghp0 = lghp1;
    }
    
    let M = 1 / (Math.log10(HP_SCALE[1][nbp - 1]) - lgDmgMultPerZone);
    if (M < 0) {    // Infinite ascension (monster scaling < damage increase)
        return MAX_ZONE;
    }
    let zone = M * (RHS - lghp0 + Math.log10(HP_SCALE[1][nbp - 1]) * HP_SCALE[0][nbp - 1]);
    return zone;
}

function heroUpgradeBaseCost(hnum) {
    let level = getHeroAttr(hnum, "reqlevel");
    // Force Yachiyl7 on Root2 to use Yachiyl6's cost scaling
    let costScale = getHeroAttr(
        hnum - (ROOT2 && hnum == HEROES.length - 1), "costScale");
    return (getHeroAttr(hnum, "lv1cost") + dogcogScaling) + Math.log10(costScale) * level;
}

function dataArrayToHTML(data) {
    var data2 = [];
    for (i = 0; i < data.length; i++) {
        tdclass = classes[i] || "";
        data2.push("<td class=" + tdclass + ">" + data[i].join("</td><td>") + "</td>");
    }
    datastr = "<tr>" + data2.join("</tr><tr>") + "</tr";
    return datastr;
}

function enterKey(ev) {
    if (ev.which === 13) calculateProgression();
}

$(document).keyup(enterKey);