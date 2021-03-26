var check_url = location.href;
var reg = RegExp(/groups|watchparty|\/wp\/|marketplace|watch|search|pages|community|live_videos/);
if (check_url.match(reg)) {} else {
    try {
        var para = document.createElement("p");
        var node = document.createTextNode("");
        para.appendChild(node);
        var element = document.querySelector("body");
        element.appendChild(para);
        para.setAttribute("id", "facebook_info");
        para.setAttribute('style', 'border:1px solid;padding:3px 12px;border-radius:10px;color:#fff;background-color:#46bd62;bottom:auto;left:auto;top:40px;right:30px;auto;z-index:9999;position:fixed;font-size:16px;max-width:300px;');
        para.setAttribute("ondblclick", "document.getElementById('facebook_info').style.display='none'");
    } catch {}
    chrome.storage.local.get({
            token: ''
        }, ({
            token
        }) => {
            (async function() {
                    var get_html = document.documentElement.outerHTML;
                    try {
                        var facebookID = get_html.match(/(?<=userID":")[0-9].*?[0-9](?=")/g)[0];
                        var MyFacebookID = get_html.match(/(?<=CurrentUserInitialData",\[\],{"USER_ID":").*?(?=")/g)[0];
                        if (MyFacebookID == facebookID) {
                            return;
                        }
                        let response = await fetch('https://graph.facebook.com/' + facebookID + '?fields=location,hometown,name,languages,religion,education,birthday,gender,updated_time&access_token=' + token + '&pretty=0')
                        let text1 = await response.text()
                        try {
                            try {
                                var city = text1.match(/(?<=location":{"id":".*?","name":").*?(?="},"hometown)/g)[0];
                            } catch {
                                try {
                                    var city = text1.match(/(?<=location":{"id":".*?","name":").*?(?="},"name)/g)[0];
                                } catch {
                                    var city = "\u672A\u77E5";
                                }
                            }
                            var city_str = eval("`" + city + "`");
                            try {
                                var hometown = text1.match(/(?<=hometown":{"id":".*?","name":").*?(?="},"name)/g)[0];
                            } catch {
                                var hometown = "\u672A\u77E5";
                            }
                            var hometown_str = eval("`" + hometown + "`");
                            try {
                                var language = text1.match(/(?<=languages":\[).*?(?=])/g)[0].replace(/id":".*?"|,|name|"|:/g, "");
                            } catch {
                                var language = "\u672A\u77E5";
                            }
                            var language_str = eval("`" + language + "`");
                            try {
                                var religion = text1.match(/(?<=religion":").*?(?=",)/g)[0];
                            } catch {
                                var religion = "\u672A\u77E5";
                            }
                            var religion_str = eval("`" + religion + "`");

                            try {
                                var college = text1.match(/(?<=education":\[).+(?="type":"College")/g)[0].replace(/^{|id":".*?"|,|name|:|"school"|"year"|,|"|type":".*?"|concentration":\[.*?\]/g, "").replace(/}{|{[0-9].*?[0-9]}|classes\[.*?\]|}\]|degree/g, "");
                            } catch {
                                var college = "\u672A\u77E5";
                            }
                            var college_str = eval("`" + college + "`");

                            try {
                                var birthday = text1.match(/(?<=birthday":").*?(?=")/g)[0].replace(/\\/g, "");
                            } catch {
                                var birthday = "\u672A\u77E5";
                            }

                            try {
                                var update_time = text1.match(/(?<=updated_time":").*?(?=T)/g)[0];
                            } catch {
                                var update_time = "\u672A\u77E5";
                            }
                            try {
                                var gender = text1.match(/(?<=gender":").*?(?=")/g)[0];
                                if (gender == "female") {
                                    var gender_str = "\u5973";
                                } else if (gender == "male") {
                                    var gender_str = "\u7537";
                                } else {
                                    var gender_str = "\u672A\u77E5";
                                }
                            } catch {
                                var gender_str = "\u672A\u77E5";
                            }
                            // This is just an example, if you want to use it, you need to customize it.
                            /*
                            var bad_people_id = RegExp(//g);
                                try {
                                    if (facebookID.match(bad_people_id)) {
                                        var bad_people = "<br><span style=\"font-size:25px;\">❌</span>";
                                    } else {
                                        var bad_people = "";
                                    }
                                } catch {
                                    var bad_people = "";
                                }
                             */
                            }
                            catch {}
                            var str = `<div style="text-align:center;">⚠️\u8BF7\u52FF\u622A\u56FE</div>\u6240\u5728\u5730：` + city_str + `<br>\u5BB6\u4E61：` + hometown_str + `<br>\u4FE1\u4EF0：` + religion_str + `<br>\u8BED\u8A00：` + language_str + `<br>\u5927\u5B66：` + college_str + `<br>\u6027\u522B：` + gender_str + `<br>\u751F\u65E5：` + birthday + `<br>\u6D3B\u8DC3\u65F6\u95F4：` + update_time /* + bad_people */ ;
                            document.getElementById("facebook_info").innerHTML = str;
                        } catch {}
                    })();
            })
    }
