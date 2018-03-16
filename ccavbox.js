// ==UserScript==
// @name         ccavbox
// @namespace    https://raw.githubusercontent.com/xkuma/userscript/master/ccavbox.js
// @version      0.1
// @description  Home page show detail page.
// @author       XYNET
// @match        http://bdy.1024.ws/*
// @match        https://ccavbox.tumblr.com/*
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let siteHost = {
        "ccavbox": "ccavbox.tumblr.com",
        "bdy": "bdy.1024.ws"
    };
    let hostname = location.hostname;

    if(hostname==siteHost.bdy){
        let ea  = $(".entry a");
        if(ea.size()>1){
            let links = [];
            $(".entry a").each((index, obj) => {
                links.push($(obj).attr("href"));
            });
            let entrys = $(".entry");
            entrys.children().remove();
            links.forEach((link, index) => {
                $.get(link, (text) => {
                    let entry = $(text).find(".entry");
                    let img = entry.find("img");
                    let html="";
                    for(let i =0;i<img.size();i++){
                        html+= '<P><img width="100%" height="100%" src="'+img.eq(i).attr("src")+'" /></p>';
                    }
                    let str=entry.text().replace("\n","").replace("-----需要登录才能下载-----","");
                    str.split("【").forEach((line)=>{
                        if(line=="" || line.startsWith("图片") || line.startsWith("影图")) return;
                        if(line.indexOf("http")>-1){
                            line.split("http").forEach((link,index)=>{
                                if(index>0){
                                    link ="http"+link;
                                    if(link.indexOf("feemoo")>-1){
                                        link = link.replace("。",".");
                                        let fid = link.substring(link.indexOf('-') + 1, link.lastIndexOf('.'));
                                        html+='<p><a href="http://www.feemoo.com/wap.php?action=view&file_id='+fid+'" target="_blank">'+link+'</a></p>';
                                    }else{
                                        html+='<p><a href="'+link+'" target="_blank">'+link+'</a></p>';
                                    }
                                }
                            });
                        }else{
                            html+="<br/>【"+line;
                        }
                    });
                    entrys.eq(index).html(html);
                });
            });
        }
    }else if(hostname==siteHost.ccavbox){
        let element = $(".body-text");
        element.each((index,it)=>{
            let images =[];
            let html="";
            $(it).find("p").each((i,p)=>{
                let text= $(p).text();
                if(text.indexOf("去掉中文")>-1){
                    images.push("http://"+text.replace("去掉中文",""));
                }else if(text.indexOf("http")>-1){
                    if(text.indexOf("feemoo")>-1){
                        text=text.replace("。",".");
                        let fid = text.substring(text.indexOf('-') + 1, text.lastIndexOf('.'));
                        html+='<p><a href="http://www.feemoo.com/wap.php?action=view&file_id='+fid+'" target="_blank">'+text+'</a></p>';
                    }else{
                        html+='<p><a href="'+text+'" target="_blank">'+text+'</a></p>';
                    }
                }else{
                    html+=$(p).html();
                }
            });

            let imgs ="";
            images.forEach((img)=>{
                imgs+= '<P><img width="100%" height="100%" src="'+img+'" /></p>';
            });
            element.eq(index).html(imgs+html);
        });
    }
})();
