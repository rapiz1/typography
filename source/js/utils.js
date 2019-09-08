var quotes = new Array();
quotes[0] = "我们都是星星。"
quotes[1] = "是为了什么而流着血，是为了谁而流眼泪。我躲在夜里嘲笑黑，因为没有人能杀死鬼。"
quotes[2] = '杂 乱 诗 篇';
quotes[3] = '勇气就是做你害怕的事。如果你不害怕，就谈不上勇气。'

function showSolution(str) {
  foo = document.getElementById(str);
  if (foo.style.display == "block") foo.style.display="none";
  else foo.style.display="block";
}
function ChangeQuote() {
  var x = Math.ceil(Math.random()*quotes.length) - 1;
  document.getElementById('quote').innerHTML = quotes[x];
}
function ToggleCodeBlock(sp) {
  var foo = sp.parentNode.parentNode.getElementsByTagName('table')[0];
  if (foo.style.display == "block") foo.style.display="none";
  else foo.style.display="block";
}
function Toggle(x) {
  if (x.className == "collapse") x.className="expand";
  else x.className = "collapse";
}
function FoldCodeInit() {
  var preblocks = document.getElementsByTagName('pre');
  for (var i = 0; i < preblocks.length; i++) {
    var block = preblocks[i], code = block.lastChild.innerHTML, linesCnt = 0;
    if (block.firstChild == block.lastChild) continue;
    for (var j = 0; j < code.length; j++) if (code[j] == '\n') linesCnt++;
    if (linesCnt > 30 || block.lastChild.firstChild.innerHTML.substring(0, 6) == "//hide") block.firstChild.setAttribute("onclick", "Toggle(parentNode)"), Toggle(block);
  }
}
function ToggleFanfou() {
	var x = document.getElementById('fanfou_statuses_userrapiz');
	if (x.classList.contains('hidden-fanfou')) {
		x.classList.add('shown-fanfou');
		x.classList.remove('hidden-fanfou');
	}
	else {
		x.classList.add('hidden-fanfou');
		x.classList.remove('shown-fanfou');
	}	
}
window.onload = function () {
  var but = document.getElementById('fanfouButton');
  if (but) {
    but.onclick = function() {ToggleFanfou();}
  }
}
