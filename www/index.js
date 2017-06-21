var fringes_img;
var peaks_img;
var lochs_img;
var rubysea_img;
var yanxia_img;
var azimsteppe_img;

$(document).ready(function() {
	init();

	$('#merge').click(function() {
		$.ajax({
			type: 'GET',
			url: 'share/'+$('#receive_id').val()
		}).done(function(data) {
			merge(JSON.parse(data));
		}).fail(function() {
			alert('error');
		});
	});

	$('#submit').click(function() {
		$.ajax({
			type: 'POST',
			url: 'share',
			contentType: 'application/json',
			data: JSON.stringify(MonsterDataArray)
		}).done(function(data) {
			$('#send_id').val(data);
		}).fail(function() {
			alert('error');
		});
	});

	$('#name').autocomplete({
		source: function(request, response) {
			var dataList = createAutocompleteList();
			var re   = new RegExp('(' + request.term + ')');
			var list = [];

			$.each(dataList, function(i, values) {
				if(values[0].match(re) || values[1].match(re)) {
					list.push(values[1]);
				}
			});
			response(list);
		}
	});

	$('#name').keypress( function ( e ) {
		if(e.which == 13) {
			add($("#name").val());
			$("#name").val('');
		}
	});

	$('#add').click(function() {
		add($("#name").val());
		$("#name").val('');
	});
});

function convertStr(str) {
	return str.replace(/[ァ-ン]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) - 0x60);
	});
}

function createAutocompleteList() {
	var arr = $.extend(true, [], kanjiNameList);
	MonsterDataArray.forEach(function(monster) {
		arr.push([convertStr(monster.name), monster.name]);
	});
	return arr;
}

function merge(mergeMonsterDataArray) {
	mergeMonsterDataArray.forEach(function(mergeMonster) {
		if(mergeMonster.visible) {
			MonsterDataArray.forEach(function(monster) {
				if(mergeMonster.name == monster.name) {
					monster.visible = true;
				}
			});
		}
	});
	update();
}


function update() {
	init();

	MonsterDataArray.forEach(function(monster) {
		if(monster.visible) {
			// 表に追加
			$('#MonsterVisibleList').append('<tr><td class="name">' + monster.name + '</td><td class="area">' + monster.area + '</td><td><button class="hogehoge">削除</button></tr>');

			// 座標変換
			var pos = eorzeaToCanvas(monster.pos, monster.area);

			// キャンバスに追加
			var ctx = $('#'+monster.area)[0].getContext('2d');
			ctx.beginPath();
			ctx.fillStyle = 'rgba(192, 80, 77, 0.4)'; // 赤
			ctx.arc(pos.x, pos.y, 30, 0, Math.PI*2, false);
			ctx.fill();
		}
	});

	$('.hogehoge').click(function() {
		invisible($(this).parent().prevAll('.name')[0].innerHTML);
	});
}


function eorzeaToCanvas(pos, area) {
	return {x: (pos.x-1)*9.7560975609756097560975609756098, y: (pos.y-1)*9.7560975609756097560975609756098};

}


function add(name) {
	MonsterDataArray.forEach(function(monster) {
		if(monster.name.match(new RegExp(name))) {
			monster.visible = true;
		}
	});
	update();
}


function invisible(name) {
	MonsterDataArray.forEach(function(monster) {
		if(monster.name==name) {
			monster.visible = false;
		}
	});
	update();
}


function init() {
	if(!fringes_img) {
		fringes_img = new Image();
		fringes_img.src = "img/fringes.png";
		fringes_img.onload = init;
	}

	if(!peaks_img) {
		peaks_img = new Image();
		peaks_img.src = "img/peaks.png";
		peaks_img.onload = init;
	}

	if(!lochs_img) {
		lochs_img = new Image();
		lochs_img.src = "img/lochs.png";
		lochs_img.onload = init;
	}

	if(!rubysea_img) {
		rubysea_img = new Image();
		rubysea_img.src = "img/ruby_sea.png";
		rubysea_img.onload = init;
	}

	if(!yanxia_img) {
		yanxia_img = new Image();
		yanxia_img.src = "img/yanxia.png";
		yanxia_img.onload = init;
	}

	if(!azimsteppe_img) {
		azimsteppe_img = new Image();
		azimsteppe_img.src = "img/azim_steppe.png";
		azimsteppe_img.onload = init;
	}

	$('#MonsterVisibleList').empty();

	$('#Fringes')[0].getContext('2d').clearRect(0, 0, $('#Fringes')[0].width, $('#Fringes')[0].height);
	$('#Fringes')[0].getContext('2d').drawImage(fringes_img, 0, 0, 400, 400);

	$('#Peaks')[0].getContext('2d').clearRect(0, 0, $('#Peaks')[0].width, $('#Peaks')[0].height);
	$('#Peaks')[0].getContext('2d').drawImage(peaks_img, 0, 0, 400, 400);

	$('#Lochs')[0].getContext('2d').clearRect(0, 0, $('#Lochs')[0].width, $('#Lochs')[0].height);
	$('#Lochs')[0].getContext('2d').drawImage(lochs_img, 0, 0, 400, 400);

	$('#RubySea')[0].getContext('2d').clearRect(0, 0, $('#RubySea')[0].width, $('#RubySea')[0].height);
	$('#RubySea')[0].getContext('2d').drawImage(rubysea_img, 0, 0, 400, 400);

	$('#Yanxia')[0].getContext('2d').clearRect(0, 0, $('#Yanxia')[0].width, $('#Yanxia')[0].height);
	$('#Yanxia')[0].getContext('2d').drawImage(yanxia_img, 0, 0, 400, 400);

	$('#AzimSteppe')[0].getContext('2d').clearRect(0, 0, $('#AzimSteppe')[0].width, $('#AzimSteppe')[0].height);
	$('#AzimSteppe')[0].getContext('2d').drawImage(azimsteppe_img,0, 0, 400, 400);
}
