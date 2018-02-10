
function YakuemonTable (table){
	this.table = table;
}

YakuemonTable.prototype.has = function (char){
	return this.table.hasOwnProperty(char);
};

YakuemonTable.prototype.get = function (char){
	return this.has(char) ? this.table[char] : null;
};

YakuemonTable.prototype.set = function (char, classname){
	return this.table[char] = classname;
};

function YakuemonParser (table){
	this.table = table;
	this.nodes = new Array();
	this.text = new Text();
}

YakuemonParser.prototype.put = function (char){
	this.table.has(char) ? 
		this.putYakumono(char): 
		this.putUnYakumono(char);
};

YakuemonParser.prototype.putYakumono = function (char){
	return this.pushYakumono(char);
};

YakuemonParser.prototype.putUnYakumono = function (char){
	this.text.data += char;
};

YakuemonParser.prototype.pushYakumono = function (char){
	this.pushUnYakumono();
	var yakumono = this.generateYakumono(char);
	this.nodes.push(yakumono);
};

YakuemonParser.prototype.generateYakumono = function (char){
	var span = document.createElement("span");
	var spanContent = document.createTextNode(char);
	span.appendChild(spanContent);
	span.className = this.table.get(char);
	return span;
}

YakuemonParser.prototype.pushUnYakumono = function (){
	this.text.data.length && 
		this.nodes.push(this.text);
	this.resetYakumono();
};

YakuemonParser.prototype.resetYakumono = function (){
	this.text = this.text.data.length ? new Text() : this.text;
};

YakuemonParser.prototype.getNodes = function (){
	return this.text.data.length ? 
		this.nodes.concat([ this.text ]):
		this.nodes;
};

function Yakuemon (table){
	this.table = new YakuemonTable(table);
}

Yakuemon.prototype.applySelector = function (selector, parent){
	parent = parent ? parent : document;
	Array.from(parent.querySelectorAll(selector)).map(this.applyNode, this);
};

Yakuemon.prototype.applyNode = function (node){
	Array.from(node.childNodes).map(this.applyTextNode, this);
};

Yakuemon.prototype.applyTextNode = function (node){
	if (node instanceof Text){
		var parser = new YakuemonParser(this.table);
		Array.from(node.data).map(parser.put, parser);
		parser.getNodes().map(
			function (nd){
				node.parentNode.insertBefore(nd, node);
			});
		node.parentNode.removeChild(node);
	}
};
