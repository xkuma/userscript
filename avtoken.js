// ==UserScript==
// @name         AVToken
// @namespace    http://xynet.net/
// @version      1.0
// @description  http://code.jquery.com/jquery-1.12.4.min.js
// @author       xynet

// @require      https://raw.githubusercontent.com/xkuma/userscript/master/common.js
// @match        http://*.coolinet.com/*
// @match        https://*.coolinet.com/*

// @match        http://*.sexx109.com/*
// @match        http://*.sexx2000.com/*
// @match        http://*.sexx2001.com/*
// @match        http://*.gansex1.com/*
// @match        http://*.kedousex1.com/*
// @match        http://*.risex1.com/*
// @match        http://*.kkddsex1.com/*
// @match        http://*.pornsex10.com/*

// @match        http://*.vod60.com/*
// @match        http://*.vod0.top/*
// @match        http://*.vod1.top/*
// @match        http://*.vod2.top/*
// @match        http://*.vod0.top/*
// @match        http://*.vod2.top/*
// @match        http://*.vo5.top/*
// @match        http://*.vo8.top/*

// @match        http://*.caijizy.com/?m=vod-detail-id-*.html

// @match        http://*.qpgyy.co/*
// @match        https://*.pornhub.com/view_video.php?viewkey=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var UserExtension = {
        _play_scheme: "play://explorer.xynet.org/?url=",
        _download_scheme: "download://explorer.xynet.org/?url=",
        _baseURL: location.protocol + "//" + location.hostname,
        clearIntervalAll: function () {
            for (var i = 1; i < 1000; i++) {
                clearInterval(i);
            }
        },
        isAndroid: function () {
            return navigator.userAgent.indexOf("Android") > -1;
        },
        makeScheme: function (scheme, link, title, from) {
            if (link.startsWith("/"))
                link = UserExtension._baseURL + link;
            return scheme + btoa(link) + "&title=" + encodeURIComponent(title) + "&from=" + encodeURIComponent(from);
        },
        checkIsExist: function (list, host) {
            let state = false;
            list.forEach(it => {
                if (host.endsWith(it)) {
                    state = true;
                    return;
                }
            });
            return state;
        },
        _script: {
            common: {
                exec: function (from) {
                    if (UserExtension.isAndroid()) {
                        let items = $(".item");
                        if (items != null) {
                            items.each((index, obj) => {
                                let item = $(obj);
                                let thlink = item.find("a");
                                let href = thlink.attr("href");
                                let title =  thlink.attr("title");
                                let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, href, title, from);
                                thlink.attr({
                                    "href": VideoScheme,
                                    "target": "_blank"
                                });
                            });
                        }
                    }
                }
            },
            coolinet: {
                name: "酷爱",
                host: ["coolinet.com"],
                exec: function () {
                    if (UserExtension.isAndroid()) {
                        let videoPosts = $(".videoPost");
                        if (videoPosts != null) {
                            let from = UserExtension._script.coolinet.name;
                            $(".videoPost").each((index, videoPost) => {
                                let post = $(videoPost);
                                let thlink = $(post.find(".thlink").eq(0));
                                // let videoLink = $(post.find(".videoLink").eq(0));
                                // videoLink.attr("target","_blank");
                                let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, thlink.attr("href"), thlink.attr("title"), from);
                                thlink.attr({
                                    "href": VideoScheme,
                                    "target": "_blank"
                                });
                            });
                        }
                    }
                    window.onload = () => {
                        $("b").remove();
                    };
                }
            },
            kedouwo: {
                name: "蝌蚪窝",
                host: ["sexx109.com", "sexx2000.com", "sexx2001.com", "gansex1.com", "kedousex1.com", "www.risex1.com", "www.kkddsex1.com", "pornsex10.com"],
                exec: function () {

                    var isAndroid =UserExtension.isAndroid();
                    var path = location.pathname;
                    if(isAndroid){
                        if(path!="/categories/"){
                            $(".main-container").bind('DOMNodeInserted', function(e) {
                                // console.log($(e.target).text());
                                UserExtension._script.common.exec(UserExtension._script.kedouwo.name);
                            });
                            UserExtension._script.common.exec(UserExtension._script.kedouwo.name);
                        }

                    }
                    window.onload = () => {
                        $("#layui-layer-shade1").remove();
                        if (isAndroid) {
                            if (path.startsWith("/videos/")) {
                                $(".fp-ui").click();
                                let videoURL = $("video").attr("src");
                                if (videoURL != undefined) {
                                    let videoTitle = $("h1").text();
                                    $(".toggle-button").each((i, o) => {
                                        let btn = $(o);
                                        let text = btn.text();
                                        if (text == "分享") {
                                            let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, videoURL, videoTitle, UserExtension._script.kedouwo.name);
                                            btn.attr({
                                                "href": VideoScheme,
                                                "target": "_blank"
                                            });
                                            btn.text("播放");
                                        } else if (text == "投诉") {
                                            let downlaodScheme = UserExtension.makeScheme(UserExtension._download_scheme, videoURL, videoTitle, UserExtension._script.kedouwo.name);
                                            btn.attr({
                                                "href": downlaodScheme,
                                                "target": "_blank"
                                            });
                                            btn.text("下载");
                                        }
                                    });
                                }
                            }
                        }
                    };
                }
            },
            vod_movie: {
                name: "VOD视屏",
                host: ["vod60.com", "vod0.top", "vod1.top", "vod2.top", "vod0.top", "vod2.top", "vo5.top", "vo8.top"],
                exec: function () {
                    // UserExtension._script.common.exec(UserExtension._script.vod_movie.name);
                    if (UserExtension.isAndroid()) {
                        if (location.pathname.startsWith("/videos/")) {
                            let videoURL = $("video").attr("src");
                            if (videoURL != undefined) {
                                let videoTitle = $("h1").text();
                                $(".toggle-button").each((i, o) => {
                                    let btn = $(o);
                                    let text = btn.text();
                                    if (text == "分享") {
                                        let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, videoURL, videoTitle, UserExtension._script.vod_movie.name);
                                        btn.attr({
                                            "href": VideoScheme,
                                            "target": "_blank"
                                        });
                                        btn.text("播放");
                                    } else if (text == "下载") {
                                        let downlaodScheme = UserExtension.makeScheme(UserExtension._download_scheme, videoURL, videoTitle, UserExtension._script.vod_movie.name);
                                        btn.attr({
                                            "href": downlaodScheme,
                                            "target": "_blank"
                                        });
                                        btn.text("下载");
                                    }
                                });
                            }
                        }
                    }
                }
            },
            caijizy: {
                name: "云采集",
                host: ["caijizy.com"],
                exec: function () {
                    let contentURL = $(".contentURL");
                    if (contentURL) {
                        var videoObj = {
                            jsyun: [],
                            jsm3u8: []
                        };
                        var name = $("title").text().replace(" - 极速云免费资源采集网", "");
                        var isAndroid = UserExtension.isAndroid();
                        $("[type=checkbox]").each((i, o) => {
                            let value = $(o).attr("value");
                            let pos = value.indexOf("$");
                            if (pos > -1) {
                                let title = value.substring(0, pos);
                                let link = value.substring(pos + 1);
                                if (link.endsWith(".m3u8")) {
                                    videoObj.jsm3u8.push({
                                        "title": title,
                                        "link": link
                                    });
                                } else {
                                    videoObj.jsyun.push({
                                        "title": title,
                                        "link": link
                                    });
                                }
                            }
                        });
                        var html = "<h3>yun</h3><br/>";
                        videoObj.jsyun.forEach((obj) => {
                            if (isAndroid) {
                                let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, obj.link, name + " - " + obj.title, UserExtension._script.caijizy.name);
                                html += "<p><a href='" + VideoScheme + "' target='_blank'>" + obj.title + " - " + obj.link + "</a></p><br/>";
                            } else {
                                html += "<p><a href='" + obj.link + "' target='_blank'>" + obj.title + " - " + obj.link + "</a></p><br/>";
                            }
                        });
                        html += "<h3>m3u8</h3><br/>";
                        videoObj.jsm3u8.forEach((obj) => {
                            if (isAndroid) {
                                let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, obj.link, name + " - " + obj.title, UserExtension._script.caijizy.name);
                                html += "<p><a href='" + VideoScheme + "' target='_blank'>" + obj.title + " - " + obj.link + "</a></p><br/>";
                            } else {
                                html += "<p><a href='" + obj.link + "' target='_blank'>" + obj.title + " - " + obj.link + "</a></p><br/>";
                            }

                        });
                        contentURL.html(html);
                    }
                }
            },
            qpgyy: {
                name: "青苹果",
                host: ["qpgyy.co"],
                exec: function () {
                    if (UserExtension.isAndroid()) {
                        var onlineBtn = $(".online-button a");
                        if (onlineBtn) {
                            var listGroup = $(".dslist-group");
                            if (listGroup.length > 0) {
                                let url = location.protocol + "//" + location.hostname + onlineBtn.attr("href");
                                $.get(url, (text, status) => {
                                    if ("success" == status) {
                                        let videoText = Strings.subStrCenter(text, "var VideoInfoList=\"", "\"");
                                        var video = [];
                                        var src = "";
                                        videoText.split("$$$").forEach((s, i) => {
                                            let xyxyx = s.split("$$");
                                            if (xyxyx.length == 2) {
                                                video.push({
                                                    type: xyxyx[0],
                                                    data: []
                                                });
                                                xyxyx[1].split("#").forEach((sss) => {
                                                    let ssss = sss.split("$");
                                                    video[i].data.push({
                                                        "name": ssss[0],
                                                        "url": ssss[1]
                                                    });
                                                });
                                            }
                                        });
                                        var VideoTitle = $("h2").text();
                                        var h3 = $("h3");
                                        var getData = (type, size) => {
                                            let pos = -1;
                                            video.forEach((item, index) => {
                                                if (type == item.type && size == item.data.length) {
                                                    pos = index;
                                                    return;
                                                }
                                            });
                                            return pos == -1 ? null : video[pos].data;
                                        };
                                        if (listGroup.length == h3.length) {
                                            listGroup.each((i, o) => {
                                                src = h3.eq(i).text();
                                                let li = $(o).find("li a");
                                                let data = getData(src, li.size());
                                                if (data != null) {
                                                    li.each((pos, a) => {
                                                        let item = data[pos];
                                                        let VideoScheme = UserExtension.makeScheme(UserExtension._play_scheme, item.url, VideoTitle + " - " + item.name, UserExtension._script.qpgyy.name);
                                                        $(a).attr({
                                                            href: VideoScheme,
                                                            target: "_blank"
                                                        });
                                                    });
                                                }

                                            });
                                            // onlineBtn.attr({href:video[0].src[0].url,target:"_blank"})
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            },
            pornhub: {
                name: "pornhub",
                host: ["pornhub.com"],
                exec: function () {
                    if (UserExtension.isAndroid()) {
                        var videoJson = JSON.parse(Strings.subStrCenter($("script").text(), "var qualityItems_" + $("[name=video_id_field]").attr("value") + " = ", ";"));
                        if (videoJson) {
                            var videoTitle = $(".inlineFree").text();
                            var defaultURL = $("#videoShow").attr("data-default");
                            $("#shareModal").remove();
                            $("#downloadTansoDl").remove();
                            $(".underThumbButtons").append("<a id='extend_play' class='buttonClass extendBtn generalBtn shareButton floatLeft'  href='javascript:;'><i></i><span style='text-align:center'>Extend</span></a><a id='extend_download' class='buttonClass extendBtn generalBtn download  floatLeft' href='javascript:;'><i></i><span>Download</span></a>");
                            var getVideoUrl = (text) => {
                                let pos = -1;
                                if (text != undefined) {
                                    videoJson.forEach((item, index) => {
                                        if (item.text == text && item.url != "") {
                                            pos = index;
                                            return;
                                        }
                                    });
                                }
                                return pos == -1 ? defaultURL : videoJson[pos].url;
                            };
                            var getCurrentActived = () => {
                                return $(".mhp1138_track").find(".mhp1138_optionsItem.mhp1138_active").text().trim();
                            };

                            var doExtend = (s) => {
                                let text = getCurrentActived();
                                let url = getVideoUrl(text);
                                if (url != undefined) {
                                    let extendURL = UserExtension.makeScheme(s == 0 ? UserExtension._play_scheme : UserExtension._download_scheme, url, videoTitle, UserExtension._script.pornhub.name);
                                    open(extendURL);
                                }
                            };
                            $("#extend_play").on("click", () => {
                                doExtend(0);
                            });
                            $("#extend_download").on("click", () => {
                                doExtend(1);
                            });
                        }
                    }
                }
            }
        },
        run: function (host) {
            let script = UserExtension._script;
            if (UserExtension.checkIsExist(script.coolinet.host, host)) {
                script.coolinet.exec();
            } else if (UserExtension.checkIsExist(script.kedouwo.host, host)) {
                script.kedouwo.exec();
            } else if (UserExtension.checkIsExist(script.vod_movie.host, host)) {
                script.vod_movie.exec();
            } else if (UserExtension.checkIsExist(script.caijizy.host, host)) {
                script.caijizy.exec();
            } else if (UserExtension.checkIsExist(script.qpgyy.host, host)) {
                script.qpgyy.exec();
            } else if (UserExtension.checkIsExist(script.pornhub.host, host)) {
                script.pornhub.exec();
            }
        }
    };
    UserExtension.run(location.hostname);


})();
