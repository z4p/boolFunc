function bykakashka(n, m, a) {

var eb=0, s=0; // m - кол-во иксов n -  кол-во строк. их считать
e=n;
//var a = new Array(20);
var b = new Array(50);
var sk = new Array(50);

for (i=0; i<50; i++) {
//  a[i] = new Array(m+1);
  b[i] = new Array(m+1);
  sk[i] = new Array(m+1);
  a[0][i] = false;
  b[0][i] = false;
}

// ввод массива
/*
a[1][1]=-1;
a[2][1]=-1;
a[3][1]=1;

a[1][2]=-1;
a[2][2]=1;
a[3][2]=-1;

a[1][3]=-1;
a[2][3]=1;
a[3][3]=1;

a[1][4]=1;
a[2][4]=-1;
a[3][4]=-1;

a[1][5]=1;
a[2][5]=-1;
a[3][5]=1;

a[1][6]=1;
a[2][6]=1;
a[3][6]=-1;
*/

function check(i, j, a){
  bool = false;
  for (k=1; k<=m;k++) { 
    if ( (a[k][i] == 0) ^ (a[k][j] == 0) ) return(false);
    if (a[k][i] != a[k][j]) {if (bool) {return(false);} else bool=true; }
  }
  return(bool); 
}
function push(i, j, a){
  e++;
  a[0][i] = true;
  a[0][j] = true;
  for (k=1; k<=m; k++) {
    if (a[k][i] == a[k][j]) {a[k][e]=a[k][i];}
	else a[k][e] = 0; 
  }
}
function skdnf (sk, a) {
  function sdvig (l, r, sk) {
    var i, j;
    for (i=l; i<r; i++)
      for (j=1; j<=m; j++)
        sk[j][i] = sk[j][i+1];
  } 
for(i=1; i<=e; i++) //скднф
  if (!a[0][i]) {
    s++;
    for (j=1; j<=m; j++) 
	  sk[j][s] = a[j][i];
}
// удаление повторения 
for (i=1; i<s; i++)
  for (j=i+1; j<=s; j++){
    bool = true;
    for (k=1; k<=m; k++)
      if (sk[k][i] != sk[k][j]) {bool=false; break;}
	if (bool) {sdvig(j, s, sk); s--;j--;}
} 
} 
function fillb() {
for(i=1; i<=s; i++) 
    for (j=1; j<=n; j++) {
	  bool=true;
      for (k=1; k<=m; k++) if ( (sk[k][i]!=0) && (sk[k][i]!=a[k][j]) ) bool=false;
      b[i][j] = bool; // строчки - скднф, столбцы - где ф-ция тру
    } 
}

for (i=1; i<e; i++) 
  for (j=i+1; j<=e; j++) 
    if (check(i, j, a)) {push(i, j, a);}
	
skdnf(sk, a);

fillb();

var res = ''; // строка результата, блеать!
var konj = []; // массив строк элем. коньюнкций

for (i=1; i<=s; i++){
	var tmp = new Array(m+1);
	for (j=1; j<=m; j++) {
		tmp[j] = sk[j][i];
	}
	konj[i] = konj2html(tmp);
	res += konj[i] + (i==s ? '':' V ');
}

res += '<hr><table cellspacing="0" cellpadding="5" border="1">';

for (i=1; i<=s; i++) { // таблица (строки - скднф, столбцы - где ф-ция тру)
	res += '<tr>';
	for (j=0; j<=n; j++) {
		if (j==0) {
			res += '<td>' + konj[i] + '</td>';
		} else {
			res += '<td>' + (b[i][j] ? '*' : '') + '</td>';
		}
	}
	res += '</tr>';
}

res += '</table><hr>';
 
  bool=false;
  var i = new Array(7);
  Quine.skdnf_count = konj.length;
  Quine.mdnf_count = 0;
  
  for (i[1]=0; i[1]<s; i[1]++) { if (bool) return res;
  for (i[2]=i[1]; i[2]<s; i[2]++) { if (bool) return res;
  for (i[3]=i[2]; i[3]<s; i[3]++) { if (bool) return res;
  for (i[4]=i[3]; i[4]<s; i[4]++) { if (bool) return res;
  for (i[5]=i[4]; i[5]<s; i[5]++) { if (bool) return res;
  for (i[6]=i[5]; i[6]<=s; i[6]++) {
    bool=true;
    for (var k=1; k<=n; k++)
      if ( b[i[1]][k] || b[i[2]][k] || b[i[3]][k] || b[i[4]][k] || b[i[5]][k] || b[i[6]][k]) {}
      else {bool=false; break;}
    if (bool) {
		for(var j=1; j<=6; j++)
			if (i[j]!=0) {
				res += konj[i[j]]+' v ';
				Quine.mdnf_count++;
			}
			res += '<br>';
		} //в этом ифе ты знаешь один из вариантов ответа. p.s. i[j] - столбец в массиве sk. если i[j] =0, то его не надо выводить (логично же)
	  
  } } } } } }

	return res;
}


// z4p, 16.03.2014

function konj2html(a) {
//[0,  1,-1,0,1] => "X1 ^X2 X4"
	var s = '';
	for (var i = 1; i <= a.length; i++) {
		if (a[i] == 0) {
			continue;
		}
		if (a[i] == 1) {
			s += '<b><font color="#000">x<sub>'+i+'</sub></font></b>';
		}
		if (a[i] == -1) {
			s += '<b><font color="#c00">x<sub>'+i+'</sub></font></b>';
		}
	}
	return s;
}

function drawFuncTable() {		 // отрисовка таблицы истинности
	window.Quine = {};			 // глобальный объект-хранитель
	$('#func_table').empty();
	var m = parseInt($('#x_count').val()); // количество переменных
	var n = Math.pow(2,m);       // количество значений функции
	Quine.n = n;
	Quine.m = m;
	Quine.A = new Array(n); // массив значений функции
	
	// заголовок таблицы истинности
	var head = "<tr>";
	for(var i = 1; i <= m; i++) {
		var v = new Array(m);
		v[i] = 1;
		head += '<th>'+konj2html(v)+'</th>';
	}
	head += '<th class="lst">F</th></tr>';
	$('#func_table').append( head );
	
	// таблица истинности
	for(var i = 0; i < n; i++) {
		var a = [];
		var d = i;
		for(var j = 0; j < m; j++) {
			a[j] = d%2;
			d = Math.floor(d / 2);
		}
		a.reverse();
		var tr = "<tr onclick='inverseA("+i+")'>";
		for(var j = 0; j < m; j++) {
			tr += '<td>'+a[j]+'</td>';
		}
		tr += '<td class="lst"><span class="funcVal" id="f'+i+'">0<span></td>';
		$('#func_table').append( tr );
	}
	
	$('.lst').css('backgroundColor','#ccc');
	// отображаем таблицу
	$('#main').hide(0);
	$('#main').fadeIn(700);
}

function inverseA(k) { // инверсия значения функции (клик по таблице)
	Quine.A[k] = Quine.A[k] ^ 1;
	$('#f'+k).text( Quine.A[k] );
}

function solve() { // клик по "мимими" - запуск минимизации
	//console.log(Quine);
	var input = [];
	var c = 0;
	input[0] = [];
	for(var j = 1; j <= Quine.m; j++) {
		input[j] = new Array(0);
	}
	
	for(var i = 0; i < Quine.n; i++) {
		if (Quine.A[i] != 1) {
			continue;
		}
		c++;
		var a = [];
		var d = i;
		for(var j = 0; j < Quine.m; j++) {
			a[j] = d % 2;
			d = Math.floor(d / 2);
			if (a[j] == 0) {
				a[j] = -1;
			}
		}
		a.reverse();
		
		for(var j = 0; j < Quine.m; j++) {
			input[j+1][c] = a[j];
		}
	}
	//console.log(input);
	var res = bykakashka(c, Quine.m, input);
	
	if (Quine.skdnf_length == Quine.mdnf_length) {
		res += '(таблица избыточна, ибо СкДНФ поляризована)';
	}
	
	$('#results').html( res );
}
