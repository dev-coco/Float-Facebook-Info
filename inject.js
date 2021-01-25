var check_url = location.href;
var reg = RegExp(/groups|watchparty|\/wp\/|marketplace|watch|search/);
if (check_url.match(reg)) {
    console.log("url_include");
} else {
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
                let response = await fetch('https://graph.facebook.com/' + facebookID + '?fields=location,hometown,name,languages,religion,education,birthday&access_token=' + token + '&pretty=0')
                let text1 = await response.text()
                try {
                    try {
                        var city = text1.match(/(?<=location":{"id":".*?","name":").*?(?="},"hometown)/g)[0];
                    } catch {
                        try {
                            var city = text1.match(/(?<=location":{"id":".*?","name":").*?(?="},"name)/g)[0];
                        } catch {
                            var city = "未知";
                        }
                    }
                    var city_str = eval("`" + city + "`");
                    try {
                        var hometown = text1.match(/(?<=hometown":{"id":".*?","name":").*?(?="},"name)/g)[0];
                    } catch {
                        var hometown = "未知";
                    }
                    var hometown_str = eval("`" + hometown + "`");
                    try {
                        var language = text1.match(/(?<=languages":\[).*?(?=])/g)[0].replace(/id":".*?"|,|name|"|:/g, "");
                    } catch {
                        var language = "未知";
                    }
                    var language_str = eval("`" + language + "`");
                    try {
                        var religion = text1.match(/(?<=religion":").*?(?=",)/g)[0];
                    } catch {
                        var religion = "未知";
                    }
                    var religion_str = eval("`" + religion + "`");

                    try {
                        var college = text1.match(/(?<=education":\[).+(?="type":"College")/g)[0].replace(/^{|id":".*?"|,|name|:|"school"|"year"|,|"|type":".*?"|concentration":\[.*?\]/g, "").replace(/}{|{[0-9].*?[0-9]}|classes\[.*?\]|}\]|degree/g, "");
                    } catch {
                        var college = "未知";
                    }
                    var college_str = eval("`" + college + "`");

                    try {
                        var birthday = text1.match(/(?<=birthday":").*?(?=","id)/g, "")[0].replace(/\\/g, "");
                    } catch {
                        var birthday = "未知";
                    }
                    // This is just a demo, if you want to use it, you need to customize it.
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
                } catch {}
                var str = `<div style="text-align:center;">⚠️请勿截图</div>所在地：` + city_str + `<br>家乡：` + hometown_str + `<br>信仰：` + religion_str + `<br>语言：` + language_str + `<br>大学：` + college_str + `<br>生日：` + birthday + bad_people;
                document.getElementById("facebook_info").innerHTML = str;
            } catch {}
        })();
    })
}
