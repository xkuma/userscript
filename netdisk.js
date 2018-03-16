// ==UserScript==
// @name         Netdisk download helper
// @namespace    https://raw.githubusercontent.com/xkuma/userscript/master/netdisk.js
// @version      0.1
// @description  Fetch download link
// @author       XYNET
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @match        http://www.feemoo.com/file-*.html
// @match        http://www.feemoo.com/wap.php?*
// @match        http://www.66pan.cc/file-*.html
// @match        http://www.999pan.cc/file-*.html
// @match        http://www.88pan.cc/file-*.html
// @match        http://www.yousuwp.com/file-*.html
// @match        http://www.678pan.cc/file-*.html
// @match        http://www.ccchoo.com/file-*.html
// @match        http://*.dfpan.com/fs/*/
// @match        http://www.fxpan.com/down*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let siteHost = {
        "飞猫": "www.feemoo.com",
        "牛盘": [
            "www.999pan.cc",
            "www.66pan.cc",
            "www.88pan.cc"
        ],
        "优速": "www.yousuwp.com",
        "678盘": "www.678pan.cc",
        "彩虹云": "www.ccchoo.com",
        "云File":"dfpan.com",
        "分享盘":"www.fxpan.com"
    };

    let clearIntervalAll = () => {
        for (var i = 1; i < 1000; i++) {
            clearInterval(i);
        }
    };

    function checkIsExist(list,text){
        let state = false;
        list.forEach(it => {
           if(it.startsWith(text)){
            state= true;
            return;
           }
        });
        return state;
    }

    let url = location.href;
    let hostname = location.hostname;
    if (siteHost["飞猫"].endsWith(hostname)) {
        if (url.indexOf("/s/") > -1 || url.indexOf("file-") > -1) {
            let text = $("script").text();
            if (text.indexOf("wap.php?") > -1) {
                let urls = text.match(/http:\/\/www.feemoo.com\/wap.php\?action=view&file_id=[\d]*/ig);
                if (urls) {
                    window.location = urls[0];
                }
            }
        } else if (url.indexOf("wap.php") > -1) {
            $(".file_down_btn").attr("fty", "any").css("cursor", "pointer"); //.click();
        }
    } else if (checkIsExist(siteHost["牛盘"],hostname)) {
        clearIntervalAll();
        let id = url.substring(url.indexOf('-') + 1, url.lastIndexOf('.'));
        if (url.indexOf("file-") > -1) {
            $(".file_item").eq(1).remove();
            $("#down_link").html("<img src=\"images/ajax_loading.gif\" align=\"absmiddle\" border=\"0\" /><span class=\"f14\">下载地址获取中...</span>");
            $.ajax({
                type: 'post',
                url: 'ajax.php',
                data: 'action=load_down_addr2&file_id=' + id,
                dataType: 'text',
                success: function (msg) {
                    var arr = msg.split('|');
                    if (arr[0] == 'true') {
                        var text = arr[1];
                        let pos = text.lastIndexOf("href=") + 6;
                        text = text.substring(pos);
                        pos = text.indexOf("\"");
                        text = "<div align='center'><a href='" + text.substring(0, pos) + "' class='down_btn'><span>免费限速下载</span></a></div>";
                        $("#down_link").html(text);
                    }
                }
            });
        }
    } else if (siteHost["优速"].endsWith(hostname)) {
        clearIntervalAll();
        let id = url.substring(url.indexOf('-') + 1, url.lastIndexOf('.'));
        if (url.indexOf("file-") > -1) {
            $("#down_link").html("<img src=\"images/ajax_loading.gif\" align=\"absmiddle\" border=\"0\" /><span class=\"f14\">下载地址获取中...</span>");
            $.ajax({
                type: 'post',
                url: 'ajax.php',
                data: 'action=load_down_addr1&file_id=' + id,
                dataType: 'text',
                success: function (msg) {
                    var arr = msg.split('|');
                    if (arr[0] == 'true') {
                        var text = arr[1];
                        let pos = text.lastIndexOf("data-url=") + 10;
                        text = text.substring(pos);
                        pos = text.indexOf("\"");
                        text = "<a href='" + text.substring(0, pos) + "' class='down_now'><span>免费下载</span></a>";
                        $("#down_link").html(text);
                    }
                },
                error: function () {}
            });
        }
    } else if (siteHost["678盘"].endsWith(hostname)) {
        clearIntervalAll();
        let id = url.substring(url.indexOf('-') + 1, url.lastIndexOf('.'));
        if (url.indexOf("file-") > -1) {
            $("#down_link").html("<img src=\"images/ajax_loading.gif\" align=\"absmiddle\" border=\"0\" /><span class=\"f14\">下载地址获取中...</span>");
            $.ajax({
                type: 'post',
                url: 'ajax.php',
                data: 'action=load_down_addr1&file_id=' + id,
                dataType: 'text',
                success: function (msg) {
                    var arr = msg.split('|');
                    if (arr[0] == 'true') {
                        var text = arr[1];
                        let pos = text.lastIndexOf("href=") + 6;
                        text = text.substring(pos);
                        pos = text.indexOf("\"");
                        text = "<a href='" + text.substring(0, pos) + "' class='down_now'><span>免费下载</span></a>";
                        $("#down_link").html(text);
                    }
                },
                error: function () {}
            });
        }
    } else if (siteHost["彩虹云"].endsWith(hostname)) {
        let id = url.substring(url.indexOf('-') + 1, url.lastIndexOf('.'));
        if (url.indexOf("file-")>-1){
            $(".bc").remove();
            $(".down_one_lf").eq(0).find("p").eq(1).append("<a class='bc' id ='free_down' style='background-color: #4FB2FC;' href='#'>加载中...</a>");
            $.ajax({
                type : 'post',
                url : 'ajax.php',
                data : 'action=load_down_addr1&vipd=0&file_id='+id,
                dataType : 'text',
                success:function(msg){
                    var arr = msg.split('|');
                    if(arr[0] == 'true'){
                        var text= arr[1];
                        let pos =text.lastIndexOf("href=")+6;
                        text = text.substring(pos);
                        pos = text.indexOf("\"");
                        $("#free_down").attr("href",text.substring(0,pos)).text("免费下载") ;
                    }
                }
            });
        }
    } else if (hostname.endsWith(siteHost["云File"])) {
        let redirectDownPage22 =()=> {
            var downpage_link = document.getElementById('downpage_link');
            var url = "/file/down/asasav/ddbe229b.html";
            if (document.getElementById('vcode').value==""){
                alert("请输入正确的验证码!");
                return false ;
            }
            url = url.replace(".html","/"+document.getElementById('vcode').value+".html");
            downpage_link.setAttribute("href",url);
            if(downpage_link.click){
                downpage_link.click();
                if(isFF5())
                    window.location = url;
            }
            else{
                window.location = url;
            }
        };
        let show_vcode22 =()=>{
            if(document.body.clientWidth>100){
                var cvimgvip2 = document.getElementById("cvimg2");
                cvimgvip2.setAttribute("src","/verifyimg/getPcv"+""+".html");
            }
            document.getElementById('slow_th').style.display = "none";
            document.getElementById('vip_th').style.display = "none";
            document.getElementById('vcode_th').style.display = "";
        };
        window.onload=()=>{
            show_vcode22();
            // let vcode= $("#vcode");
            // vcode.attr("onkeypress","");
            // vcode.on("keypress",(e)=>{
            //     if (e.keyCode == 13){
            //         redirectDownPage22();
            //     }
            //    return true;
            // });
        };
    } else if (siteHost["分享盘"].endsWith(hostname)) {
        // let ysbtn = $(".ysbtn");
        // if(ysbtn && ysbtn.size()>1){
        //     ysbtn.eq(0).click();
        // }
        let tt = $("#time");
        if (tt)
            tt.text("0");
        let d3 =$(".d3");
        if (d3){
            let link = d3.find("a").attr("href");
            if (link.startsWith("http"))window.location = link;
        }
    }



})();




