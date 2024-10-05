function undefzero(val)
{
	if( typeof val == "undefined" )
		return 0;
	else
		return val;
}

function zapsurplus(inv, it1, it2, it3)
{
	var surplus = 0;
	if( undefzero(inv[it1]) > 1 )
		surplus += inv[it1] - 1;
	if( undefzero(inv[it2]) > 1 )
		surplus += inv[it2] - 1;
	if( undefzero(inv[it3]) > 1 )
		surplus += inv[it3] - 1;
	return surplus;
}

function outfitgroup(inv, it1, it2, it3)
{
	var surplus = zapsurplus(inv, it1, it2, it3);
	var group = "";
	num1 = undefzero(inv[it1]);
	num2 = undefzero(inv[it2]);
	num3 = undefzero(inv[it3]);
	if( num1 == 0 && surplus > 0 )
	{
		num1++;
		surplus--;
	}
	if( num2 == 0 && surplus > 0 )
	{
		num2++;
		surplus--;
	}
	if( num3 == 0 && surplus > 0 )
	{
		num3++;
		surplus--;
	}
	group += num1 > 0 ? "H," : "W,";
	group += num2 > 0 ? "H," : "W,";
	group += num3 > 0 ? "H," : "W,";
	return group;
}

function hobopolis(id, name, inv)
{
	var lootline = name + " (#" + id + "),, ";

	// Ol' Scratch
	lootline += outfitgroup(inv, "3248", "3246", "3247");
	lootline += undefzero(inv["3380"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3382"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3381"]) > 0 ? "H, " : "W, ";
	// Frosty
	lootline += outfitgroup(inv, "3251", "3253", "3252");
	lootline += undefzero(inv["3391"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3389"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3286"]) > 0 ? "H, " : "W, ";
	// Oscus
	lootline += outfitgroup(inv, "3256", "3254", "3255");
	lootline += undefzero(inv["3394"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3392"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3393"]) > 0 ? "H, " : "W, ";
	// Zombo
	lootline += outfitgroup(inv, "3259", "3258", "3257");
	lootline += undefzero(inv["3388"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3386"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3387"]) > 0 ? "H, " : "W, ";
	// Chester
	lootline += outfitgroup(inv, "3261", "3262", "3260");
	lootline += undefzero(inv["3385"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3384"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3383"]) > 0 ? "H, " : "W, ";
	// Hodgman
	lootline += outfitgroup(inv, "3397", "3395", "3396");
	lootline += undefzero(inv["3407"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3405"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3410"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3406"]) > 0 ? "H, " : "W, ";
	lootline += undefzero(inv["3408"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3409"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3411"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3138"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3143"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["3139"]) > 0 ? "H" : "W";
	return lootline;
}

function slimetube(id, name, inv, hasfam, skillbrain, skillhypo, skillgland)
{
	var lootline = name + " (#" + id + "),, ";
	var countbrain = 0;
	var counthypo = 0;
	var countgland = 0;
	var skillsurplus = 0;
	var nodulestuff = 0;

	// First see if there's > 10 of skill-granters and current points
	countbrain = skillbrain + undefzero(inv["3992"]);
	if( countbrain > 10 )
	{
		skillsurplus += countbrain - 10;
		countbrain = 10;
	}
	counthypo = skillhypo + undefzero(inv["3991"]);
	if( counthypo > 10 )
	{
		skillsurplus += counthypo - 10;
		counthypo = 10;
	}
	countgland = skillgland + undefzero(inv["3993"]);
	if( countgland > 10 )
	{
		skillsurplus += countgland - 10;
		countgland = 10;
	}
	
	// Apply the surpluses to each in turn
	countbrain += skillsurplus;
	skillsurplus = 0;
	if( countbrain > 10 )
	{
		skillsurplus = countbrain - 10;
		countbrain = 10;
	}
	counthypo += skillsurplus;
	skillsurplus = 0;
	if( counthypo > 10 )
	{
		skillsurplus = counthypo - 10;
		counthypo = 10;
	}
	countgland += skillsurplus;
	skillsurplus = 0;
	if( countgland > 10 )
	{
		skillsurplus = countgland - 10;
		countgland = 10;
	}

	// Caustic slime nodules and what can be made from them (excluding bitter pill)
	nodulestuff += undefzero(inv["4036"]);
	nodulestuff += undefzero(inv["4075"]);
	nodulestuff += undefzero(inv["4076"]);
	nodulestuff += undefzero(inv["4077"]);
	nodulestuff += undefzero(inv["4078"]);
	nodulestuff += undefzero(inv["4079"]);
	nodulestuff += undefzero(inv["4080"]);
	nodulestuff += undefzero(inv["4081"]);
	nodulestuff += undefzero(inv["4082"]);
	nodulestuff = nodulestuff > 8 ? 8 : nodulestuff;

	// Hardened slime
	lootline += outfitgroup(inv, "4129", "4127", "4128");
	// Slime skills
	lootline += " '" + countbrain + "/10,";
	lootline += " '" + counthypo + "/10,";
	lootline += " '" + countgland + "/10,";
	// Caustic slime nodules
	lootline += " '" + nodulestuff + "/8,";
	// Slimeling
	lootline += hasfam || undefzero(inv["4017"]) > 0 ? "H" : "W";
	return lootline;
}

function dread(id, name, inv, hasfam, skills)
{
	var lootline = name + " (#" + id + "),, ";
	var skillcount = 0;
	var capcount;

	skillcount += skills.indexOf( 92 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 93 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 94 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 95 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 96 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 97 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 98 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 99 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 100 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 101 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 102 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 103 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 104 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 105 ) != -1 ? 1 : 0;
	skillcount += skills.indexOf( 106 ) != -1 ? 1 : 0;

	capcount = parseInt( skillcount / 3 ) + undefzero(inv["6512"]);
	capcount = capcount > 5 ? 5 : capcount;

	// Falls-From-Sky
	lootline += outfitgroup(inv, "6441", "6442", "6440");
	lootline += undefzero(inv["6445"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6444"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6443"]) > 0 ? "H," : "W,";
	lootline += "W, "; // Consumable
	// Great Wolf of the Air
	lootline += outfitgroup(inv, "6447", "6449", "6448");
	lootline += undefzero(inv["6452"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6450"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6451"]) > 0 ? "H," : "W,";
	lootline += "W, "; // Consumable
	// Mayor Ghost
	lootline += outfitgroup(inv, "6463", "6464", "6462");
	lootline += undefzero(inv["6467"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6466"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6465"]) > 0 ? "H," : "W,";
	lootline += "W, "; // Consumable
	// Zombie Homeowners' Association
	lootline += outfitgroup(inv, "6454", "6455", "6456");
	lootline += undefzero(inv["6457"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6458"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6459"]) > 0 ? "H," : "W,";
	// Nosy Nose
	lootline += hasfam || undefzero(inv["6460"]) > 0 ? "H, " : "W, ";
	// Count Drunkula
	lootline += outfitgroup(inv, "6469", "6471", "6470");
	lootline += undefzero(inv["6473"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6472"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6474"]) > 0 ? "H," : "W,";
	lootline += "W, "; // Consumable
	// The Unkillable Skeleton
	lootline += outfitgroup(inv, "6476", "6478", "6477");
	lootline += undefzero(inv["6480"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6479"]) > 0 ? "H," : "W,";
	lootline += undefzero(inv["6481"]) > 0 ? "H," : "W,";
	lootline += "W, "; // Consumable
	// Skull capacitor (or skills therefrom)
	lootline += "'" + capcount + "/5";
	return lootline
}

function process()
{
	var fullinv = {};
	var hasSlimeling;
	var hasNose;
	var allskills = [];
	var slimelevel1;
	var slimelevel2;
	var slimelevel3;

	var familiar_equippable = {};
	// hats
	familiar_equippable["288475507"] = "3247";
	familiar_equippable["535393288"] = "3251";
	familiar_equippable["970898531"] = "3257";
	familiar_equippable["667103288"] = "3395";
	familiar_equippable["904156487"] = "4079";
	familiar_equippable["721459450"] = "4127";
	familiar_equippable["294652787"] = "6440";
	familiar_equippable["601471657"] = "6447";
	familiar_equippable["401379524"] = "6462";
	familiar_equippable["694432828"] = "6454";
	familiar_equippable["890136862"] = "6469";
	familiar_equippable["226371100"] = "6476";
	// Pants
	familiar_equippable["175959334"] = "3246";
	familiar_equippable["878350523"] = "3256";
	familiar_equippable["587267531"] = "3259";
	familiar_equippable["505652258"] = "3262";
	familiar_equippable["138953077"] = "3394";
	familiar_equippable["159000068"] = "3396";
	familiar_equippable["956208229"] = "4081";
	familiar_equippable["255854067"] = "4128";
	familiar_equippable["489060732"] = "6442";
	familiar_equippable["370491221"] = "6451";
	familiar_equippable["593943883"] = "6456";
	familiar_equippable["870625180"] = "6464";
	familiar_equippable["312358141"] = "6471";
	familiar_equippable["629921726"] = "6478";
	// Weapons (1-handed)
	familiar_equippable["118492859"] = "3138";
	familiar_equippable["858648754"] = "3286";
	familiar_equippable["968257348"] = "3389";
	familiar_equippable["828398092"] = "4077";
	familiar_equippable["728374904"] = "4082";
	familiar_equippable["523051317"] = "6449";
	familiar_equippable["455940650"] = "6455";
	familiar_equippable["572924821"] = "6465";

	var dataFields = [ "dataStatus", "dataInventory", "dataCloset", "dataStorage", "dataDC", "dataFamiliar", "dataCharsheet", "dataSlimeSkill1", "dataSlimeSkill2", "dataSlimeSkill3" ];
	for( var i = 0; i < dataFields.length; i++ )
	{
		if( document.getElementById( dataFields[ i ] ).value.substring(0, 1) != "ABCDEFGHIJ".substring( i, i + 1 ) )
		{
			alert( "Missing or incorrect data in field: " + dataFields[ i ] );
			document.getElementById( dataFields[ i ] ).focus();
			document.getElementById( dataFields[ i ] ).select();
			return;
		}
	}

	var dataStatus = JSON.parse(document.getElementById("dataStatus").value.substring(1));
	fullinv[dataStatus.equipment.hat] = 1;
	fullinv[dataStatus.equipment.container] = 1;
	fullinv[dataStatus.equipment.shirt] = 1;
	fullinv[dataStatus.equipment.weapon] = 1;
	fullinv[dataStatus.equipment.offhand] = 1;
	fullinv[dataStatus.equipment.pants] = 1;
	fullinv[dataStatus.equipment.acc1] = 1;
	fullinv[dataStatus.equipment.acc2] = 1;
	fullinv[dataStatus.equipment.acc3] = 1;

	var dataInventory = JSON.parse(document.getElementById("dataInventory").value.substring(1));
	for( var key in dataInventory )
	{
		fullinv[key] = undefzero(fullinv[key]) + parseInt(dataInventory[key]);
	}

	var dataCloset = JSON.parse(document.getElementById("dataCloset").value.substring(1));
	for( var key in dataCloset )
	{
		fullinv[key] = undefzero(fullinv[key]) + parseInt(dataCloset[key]);
	}

	var dataStorage = JSON.parse(document.getElementById("dataStorage").value.substring(1));
	for( var key in dataStorage )
	{
		fullinv[key] = undefzero(fullinv[key]) + parseInt(dataStorage[key]);
	}

	var dchtml = document.getElementById("dataDC").value.substring(1);
	if( dchtml.indexOf( "Take stuff out of the case" ) != -1 && dchtml.indexOf( "Your case contains no items" ) == -1 )
	{
		dchtml = dchtml.replace(/.*Take stuff out of the case:(.*?)\|\/select\|.*/, '$1');
		dchtml = dchtml.replace(/.*?\|option value=0\|-select an item-\|\/option\|(\|option.*)/, '$1');
		dchtml = "{" + dchtml.replace(/\|option value='(\d*)' descid='.*?'\|.*? \((\d*)\)\|\/option\|/g, '"$1":$2,') + "\"0\":0}";
		var dataDC = JSON.parse(dchtml);
		for( var key in dataDC )
		{
			fullinv[key] = undefzero(fullinv[key]) + parseInt(dataDC[key]);
		}
	}

	var dataFamiliar = document.getElementById("dataFamiliar").value.substring(1);
	hasSlimeling = dataFamiliar.indexOf("|option value=112|") !== -1;
	hasNose = dataFamiliar.indexOf("|option value=173|") !== -1;
	dataFamiliar = dataFamiliar.match(/descitem\(\d*\)/g);
	if( dataFamiliar != null )
	{
		for( var i = 0; i < dataFamiliar.length; i++ )
		{
			var descid = dataFamiliar[i].replace(/descitem.(\d*)./, '$1');
			var itemid = familiar_equippable[descid];
			if( typeof itemid != "undefined" )
			{
				fullinv[itemid] = undefzero(fullinv[itemid]) + 1;
			}
		}
	}

	var charsheethtml = document.getElementById("dataCharsheet").value.substring(1);
	charsheethtml = charsheethtml.match(/desc_skill.php.whichskill=\d*/g);
	for( var i = 0; i < charsheethtml.length; i++ )
	{	
		allskills.push(parseInt(charsheethtml[i].replace(/desc_skill.php.whichskill=(\d*)/, '$1')));
	}

	var skillhtml = document.getElementById("dataSlimeSkill1").value.substring(1);
	if( skillhtml.indexOf("|b|Maximum HP") == -1 )
		slimelevel1 = 0;
	else
		slimelevel1 =	parseInt(skillhtml.replace(/.*\|b\|Maximum HP \+(\d*)\|\/b\|.*/, '$1')) / 2;

	var skillhtml = document.getElementById("dataSlimeSkill2").value.substring(1);
	if( skillhtml.indexOf("|b|Maximum MP") == -1 )
		slimelevel2 = 0;
	else
		slimelevel2 =	parseInt(skillhtml.replace(/.*\|b\|Maximum MP \+(\d*)\|\/b\|.*/, '$1'));

	var skillhtml = document.getElementById("dataSlimeSkill3").value.substring(1);
	if( skillhtml.indexOf("Combat Initiative|/b|") == -1 )
		slimelevel3 = 0;
	else
		slimelevel3 =	parseInt(skillhtml.replace(/.*\|b\|\+(\d*)% Combat Initiative\|\/b\|.*/, '$1')) / 2;

	if( dataStatus.hardcore == "1" || parseInt( dataStatus.roninleft ) > 0 || parseInt( dataStatus.path ) > 0 )
	{
		alert( "Warning: This may not give the correct results in ronin/HC and while on a special path" );
	}
	if( undefzero(fullinv["3430"]) > 0 || undefzero(fullinv["4115"]) > 0 || undefzero(fullinv["6581"]) > 0 )
	{
		alert( "You have unopened dungeon distribution packages, will not continue" );
	}
	else
	{
		prompt("Copy this and paste it into a kmail to the dungeon administrator",
			hobopolis(dataStatus.playerid, dataStatus.name, fullinv) + "/// " +
			slimetube(dataStatus.playerid, dataStatus.name, fullinv, hasSlimeling, slimelevel2, slimelevel1, slimelevel3) + "/// " +
			dread(dataStatus.playerid, dataStatus.name, fullinv, hasNose, allskills)
			);
	}
}
