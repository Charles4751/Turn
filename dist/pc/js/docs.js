!function(){var e={start:function(){mis?(this.initContainerMis(),this.preview(mis)):(this.initContainerUser(),this.preview()),this.initEvent()},cdnUrl:function(){return location.href.indexOf("www")!=-1?"//cdn.mycolordiary.com":"//www.mycolordiary.com"},initContainerUser:function(){$("#book-zoom").css("height",350*1.6348)},initContainerMis:function(){this.initContainerUser(),$(".front, .later").css("display","block").addClass("describe"),$("#txtFront, #txtLater").css("display","block"),$("#book-zoom").addClass("describe"),$(".turnjs-slider").css({float:"left","margin-left":"400px"}),$("#canvas").css({width:"1450px",margin:"0 auto"}),$("#share, .share, #download").css("display","none"),$("#rightPage, #leftPage").css("right","-59%")},preview:function(t){var a={};a=t?{cmd:"Book.preview",ownerUserId:0,_mis:1,bookId:bookId}:{cmd:"Book.preview",ownerUserId:0,bookId:93713},$.get("/s/api",a,function(t){"ok"==t.err?e.initBook(t.res):console.log(t.err)})},previewPage:function(e){return promise=new Promise(function(t,a){$.post("/s/api",{cmd:"Book.previewPage",ownerUserId:0,pageContent:JSON.stringify(e)},function(e){"ok"==e.err?t(e):a(e.err)})})},initEvent:function(){var e=!1;$("#share").socialShare({url:location.href,title:t.doc.title,content:"",pic:""}),$("#share").click(function(){e?($(".share").fadeIn(),e=!1):($(".share").fadeOut(),e=!0)}),$("div").bind("selectstart",function(){return!1})},initBook:function(t){var a,i;Book=$(".sample-docs"),Width=700,t.pageNum%2==0?(a=t.pageNum+4,i=2):(a=t.pageNum+3,i=1),Book.turn({width:Width,height:Width/2*1.6348,pages:a,autoCenter:!0,gradients:!0,duration:1e3,elevation:50,when:{missing:function(n,r){for(var o=0,d=r.length;o<d;o++){var s,c=r[o];1==i?2==c||4==c||c==a-1?e.addBlankEle(Book,c,a):(s=3==c?2:c>=5&&c<a-1?c-2:c==a?c-3:c,e.addEle(Book,s,a,t.pages,c)):2==c||4==c||c==a-1||c==a-2?e.addBlankEle(Book,c,a):(s=3==c?2:c>=5&&c<a-2?c-2:c==a?c-4:c,e.addEle(Book,s,a,t.pages,c))}},turned:function(n,r,o){$(this);$("#slider").slider("value",e.setSliderNumber(r)),e.setPreview($("#slider").slider("value")),e.updatePreview(i,a,o,t)}}}),$("#book-zoom").css({"background-color":"transparent","padding-top":0}).find(".loader").remove(),$(".sample-docs").css("display","block"),$("#slider").slider({min:1,max:100,start:function(e,t){},slide:function(t,a){e.setPreview(a.value)},stop:function(e,t){$(".sample-docs").turn("page",1==t.value?1:2*(t.value-1))}}),$("#slider").slider("option","max",e.setSliderMax(Book));var n=$("<div />",{id:"pageNumber",html:"封面"});$("#slider a").append(n),$(document).keydown(function(e){switch(e.keyCode){case 37:$(".sample-docs").turn("previous");break;case 39:$(".sample-docs").turn("next")}}),Book.addClass("animated"),$("#leftPage").click(function(){Book.turn("next")}),$("#rightPage").click(function(){Book.turn("previous")})},backDiv:function(e,t){var a=$("<div />").css({width:350,height:350*1.6348,background:"#fff"});return 1!=e&&2!=e&&e!=t&&e!=t-1||a.addClass("hard"),1!=e&&e!=t&&a.append('<div class="gradient"></div>'),a},addBlankEle:function(t,a,i){var n=e.backDiv(a,i);t.turn("addPage",n,a)},updatePreview:function(e,a,i,n){var r,o,d,s,c=$(".front"),h=$(".later"),l=$("#txtFront"),g=$("#txtLater");if(o=0==i[1]?i[0]:i[1],1==e){if(!(o>=5&&o<=a-1))return c.html(""),h.html(""),l.html(""),void g.html("");r=o-2}else{if(!(o>=5&&o<a-2))return c.html(""),h.html(""),l.html(""),void g.html("");r=o-2}s=n.pages[r-1].pageDiaryPreview?'<a href="'+t.cdn+"/s/img/"+n.pages[r-1].pageDiaryPreview+'" target="_blank">                     <img src="'+t.cdn+"/s/img/"+n.pages[r-1].pageDiaryPreview+'" class="aBlock">                   </a>':"",d=n.pages[r-2].pageDiaryPreview?'<a href="'+t.cdn+"/s/img/"+n.pages[r-2].pageDiaryPreview+'" target="_blank">                     <img src="'+t.cdn+"/s/img/"+n.pages[r-2].pageDiaryPreview+'" class="aBlock">                   </a>':"",c.html(d),h.html(s),l.html(n.pages[r-2].pageDiary),g.html(n.pages[r-1].pageDiary)},formatData:function(e){for(var t=0,a=e.length;t<a;t++);},addEle:function(a,i,n,r,o){var d=this.backDiv(o,n);a.turn("addPage",d,o),this.previewPage(r[i-1]).then(function(a){var i,n,r=!1,s=a.res.contentJson,c=[],h=[];if(t.stepCounter[o]=0,s.hasOwnProperty("sys")||s.datas.some(function(e,t){e.hasOwnProperty("mImagePath")&&(r=!0)}),1.6348==s.totalHeight)n=350,i=350*1.6348,d.append('<canvas id="c'+o+'" width="'+n+'" height="'+i+'"></canvas>');else if(s.totalHeight<1.6348){n=350,i=n*s.totalHeight,d.append('<div style="width: '+n+"px;height: "+i+'px "><canvas id="c'+o+'" width="'+n+'" height="'+i+'"></canvas></div>');var l=(350*1.6348-i)/2;$("#c"+o).parent().css("padding-top",l)}else s.totalHeight>1.6348&&(i=350*1.6348-20,n=i/s.totalHeight,i+=10,d.append('<div style="width: '+n+"px;height: "+i+'px; margin: 5px auto 0"><canvas id="c'+o+'" width="'+n+'" height="'+i+'"></canvas></div>'));var g=new fabric.StaticCanvas("c"+o);if(g.renderOnAddRemove=!1,$("#c"+o).css({position:"absolute",top:"-9999px"}),s.diaryBg&&(s.diaryBg.bodyImageSign&&new Promise(function(e,a){fabric.Image.fromURL(t.cdn+"/s/img/"+s.diaryBg.bodyImageSign,function(t){e(t)})}).then(function(e){var a=e.width;d.css({width:350,height:350*1.6348,"background-image":"url("+t.cdn+"/s/img/"+s.diaryBg.bodyImageSign+")","background-size":parseInt(a*d.width()/1242),"background-repeat":"repeat"})}),s.diaryBg.backgroundColor&&d.css({"background-color":s.diaryBg.backgroundColor})),s.laces)for(var u=0,f=s.laces.length;u<f;u++)e.drawLaces(s.laces[u],g,$("#c"+o),c,h,o,r);if(s.datas)for(var u=0,f=s.datas.length;u<f;u++)e.drawDatas(s.datas[u],g,$("#c"+o),c,h,o);setTimeout(function(){if(t.stepCounter[o]==c.length)return void Promise.all(c).then(function(){h.sort(function(e,t){return e.index-t.index});for(var e=0,t=h.length;e<t;e++)g.moveTo(h[e].img,e);g.renderAll(),$("#c"+o).css({top:"0"})});setTimeout(arguments.callee,500)},50)})},drawLaces:function(e,t,a,i,n,r,o){var d=a.width();e.signs?this.lacePen(e,t,d,i,n,r,o):this.lightPen(e,t,d,i,n,r)},lacePen:function(a,i,n,r,o,d,s){var c="",h="";s?(c="left",h="top"):(c="center",h="center"),a.points.forEach(function(s,l){a.index||(a.index=0);var g=l+a.index;if(g<=a.signs.length-1?g=g:g%=a.signs.length,a.signs[g]){t.stepCounter[d]+=1;var u=new Promise(function(e,i){var n=new Image;n.src=t.cdn+"/s/img/"+a.signs[g],n.onload=function(){e(n)}}).then(function(t){var d;d=a.laceWidth<=.001||!a.laceWidth?.05*n:a.laceWidth*n;var l,g=d,f=g/(t.width/t.height),p=new fabric.Image(t,{originX:c,originY:h,width:Math.round(g),height:Math.round(f),top:Math.round(s.y*n),left:Math.round(s.x*n)});i.add(p),l=e.adjustment(i,p,-50),o.push(l),r.push(u)})}})},lightPen:function(t,a,i,n,r,o){var d="",s=0;t.laceWidth<=1?(s=t.laceWidth,s*=i):16==t.laceWidth?(s=.05,s*=i):s=t.laceWidth,t.points.forEach(function(e,t,a){d+=t%3==0?"C"+Math.round(e.x*i)+","+Math.round(e.y*i):","+Math.round(e.x*i)+","+Math.round(e.y*i)});var c=d.slice(0,d.lastIndexOf("C")),h={},l=new fabric.Path(c);a.add(l.set({opacity:t.lightPen.lightAlpha,stroke:t.lightPen.lightColor,strokeLineCap:t.lightPen.lightShape,strokeWidth:s,fill:!1,strokeLineJoin:"round"})),h=e.adjustment(a,l,-50),r.push(h)},drawDatas:function(a,i,n,r,o,d){if(a.imageSign)if("/"!=a.imageSign.charAt(0)){var s=n.width(),c=0;t.stepCounter[d]+=1;var h=new Promise(function(e,i){var n=new Image;n.src=t.cdn+"/s/img/"+a.imageSign,n.onload=function(){e(n)}});h.then(function(t){var n=a.width*s*a.scale;imgHeight=a.height*s*a.scale,imgSingArr=["02b6838508a7b2d3016c5417a99f3009","0fb96a0a0c9bf24a3f761c0223ebe8e0","c1946943c38e9bfb067423d60c6841c6","c568d280827044a96891536eca77940d","d452c848e1f0739b39824f86aace4080","1e48131f01f3ec0710d519b30547cb28","de8855f3dea91a181f185cc10ee70ca2","8672df01b36b3d998bf0edb18674b2ad","4ce1fcfa0f580d16a73ed0766e5f8df1","df863b88fe19a305e2d539f2b02cd198","121ff6b85f76f704c924387b8c5bcd88","3e111f6993d0c0d736cfbb6661c1e257"],imgSingArr.forEach(function(e){if(a.imageSign==e){var i=t.width/t.height;i>a.width/a.height?imgHeight=n/i:n=imgHeight*i}});var d=new fabric.Image(t,{originX:"center",originY:"center",width:Math.round(n),height:Math.round(imgHeight),top:Math.round(a.yRate*s),left:Math.round(a.xRate*s),angle:Math.round(a.rotate)});1==a.reflectType?d.setFlipX(!0):2==a.reflectType&&d.setFlipY(!0),i.add(d),c=a.zIndex<0?100*a.zIndex:a.zIndex;var l=e.adjustment(i,d,c);o.push(l),r.push(h)})}else e.drawImageText(a,i,n,r,o,d)},drawImageText:function(a,i,n,r,o,d){var s=n.width(),c=0;t.stepCounter[d]+=1;var h=new Promise(function(e,i){var n=new Image;n.src=t.cdn+a.imageSign,n.onload=function(){e(n)}});h.then(function(t){var n=new fabric.Image(t,{originX:"center",originY:"center",width:Math.round(a.width*s*a.scale),height:Math.round(a.height*s*a.scale),top:Math.round(a.yRate*s),left:Math.round(a.xRate*s),angle:Math.round(a.rotate)});1==a.reflectType?n.setFlipX(!0):2==a.reflectType&&n.setFlipY(!0),i.add(n),c=a.zIndex<0?100*a.zIndex:a.zIndex;var d=e.adjustment(i,n,c);o.push(d),r.push(h)})},adjustment:function(e,t,a){var i=new Object;return i.canvas=e,i.img=t,i.index=a,i},setSliderNumber:function(e){return Math.ceil((e+1)/2)},setSliderMax:function(e){return parseInt(e.turn("pages")/2+1,10)},setPreview:function(e){var t="";t=1==e?"封面":2==e?"扉页－"+(2*e-1):e==$("#slider").slider("option","max")?"封底":2*(e-1)+"－"+(2*e-1),$("#pageNumber").html(t)}},t={doc:document,stepCounter:{},cdn:e.cdnUrl()};e.start()}();