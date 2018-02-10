# Yakuemon.js
Yakuemon.js is a assistant for Japanese Typography.  
this plugin mark some tokens automatically by user configuration.  
in default version, this plugin mark token as decorated `span` element.  

Yakuemon.jsは日本語の組版する用に書いた、ちいさなJavaScriptプラグインです。  
設定された約物なんかを指定されたクラスでマークしてくれます。  
デフォルトでは、`span`要素に包んでくれます。  

## Example
first, you must make a instance of Yakuemon.  
an argument of dictionaly(object) must has a pair.  
left side is a token for matching.  
right side is a class name for matched token.  
last, mark the target by a method of applySelector :D

まず最初にYakuemonのインスタンスを生成してあげてください。  
Yakuemonの引数には、対象となる約物と、マーク時に使用するクラス名の対応を記したオブジェクトを与えてあげてください。  
最後に、生成したインスタンスからapplySelectorメソッド等を用いて、要素に適応させれば完了です。

```
.yakumono-half {
	font-feature-settings: "hwid" on;
}
```

```
window.addEventListener("load", function (){
	var yakuemon = new Yakuemon({ "、": "yakumono-half" });
	yakuemon.applySelector("*");
});
```

## Result

![Imgur](https://i.imgur.com/HDsSBxU.jpg)

## Lisence

this plugin released under GPL3.0
