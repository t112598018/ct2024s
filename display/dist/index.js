"use strict";
console.log("--==START==--");
const FONT_TABLE_PATH = "./FontTable.csv";
const FONT_BASE_NAME = "my-font-";
var studentData = [];
var fontDemoText;
//-----------------------------------------------------------
function setDemoFont(index) {
    console.log(index);
    fontDemoText.style.fontFamily = FONT_BASE_NAME + index;
} //---------------------------------------------------------
function buildUI() {
    var container = document.getElementById("UIContainer");
    document.body.classList.add("fonts-loaded");
    for (var i = 0; i < studentData.length; i++) {
        var currentData = studentData[i];
        if (currentData[0] == "")
            continue;
        var studentName = currentData[0];
        var studentId = currentData[1];
        var githubName = currentData[2];
        var githubUrl = currentData[3];
        var fontUrl = "./ttf/"+currentData[1]+".ttf";
        var group = document.createElement("div");
        var textContent = document.createElement("div");
        var nameText = document.createElement("div");
        nameText.className = "nameRect";
        nameText.appendChild(document.createTextNode(`◆${studentName} (${studentId})`));
        textContent.style.color = "#000000";
        if (githubName != "") {
            var link = document.createElement("a");
            link.style.color = "#EA7500";
            link.appendChild(document.createTextNode("※ " + githubName));
            link.href = githubUrl;
            textContent.appendChild(link);
            textContent.appendChild(document.createElement("br"));
        }
        else {
            textContent.appendChild(document.createTextNode("G I T H U B 錯 誤"));
            textContent.appendChild(document.createElement("br"));
        }
        function loadFont() {
            function loadSucess() {
                textContent.appendChild(document.createTextNode(`這是由${studentName}製作的字體`));
                textContent.appendChild(document.createElement("br"));
                textContent.appendChild(document.createTextNode("零壹貳參肆伍陸柒捌玖"));
                textContent.appendChild(document.createElement("br"));
                textContent.appendChild(document.createTextNode("甲乙丙丁戊己庚辛壬癸"));
                textContent.appendChild(document.createElement("br"));
                textContent.appendChild(document.createTextNode("子丑寅卯辰巳午未申酉戌亥"));
                textContent.appendChild(document.createElement("br"));
                buildButton(i);
            } //..........................................................
            function loadFail() {
                textContent.appendChild(document.createTextNode("字 形 載 入 失 敗 !"));
                textContent.appendChild(document.createElement("br"));
            } //.........................................................
            function buildButton(index) {
                var button = document.createElement("button");
                button.textContent = "套用";
                button.addEventListener("click", () => {
                    setDemoFont(index);
                });
                textContent.appendChild(button);
            } //.........................................................
            var fontName;
            var fontFace;
            if (fontUrl == "") {
                loadFail();
                return;
            }
            else {
                try {
                    fontName = FONT_BASE_NAME + i;
                    fontFace = new FontFace(fontName, `url(${fontUrl})`);
                    document.fonts.add(fontFace);
                    textContent.style.fontFamily = fontName;
                    loadSucess();
                }
                catch (e) {
                    loadFail();
                }
            }
        } //..........................................................
        loadFont();
        group.className = "UIGroup";
        group.appendChild(nameText);
        group.appendChild(textContent);
        container.appendChild(group);
    }
} //---------------------------------------------------------
function loadStudentData() {
    function startLoad() {
        dataString = dataLoader.responseText;
        //console.log( dataString );
        dataGroup = dataString.split("\n");
        //console.log( dataGroup );
        for (var i = 0; i < dataGroup.length; i++) {
            studentData.push(dataGroup[i].split(","));
        }
        console.log(studentData);
        loadFontDemoText();
        buildUI();
    } //..................................................
    var dataLoader = new XMLHttpRequest();
    var dataString;
    var dataGroup;
    dataLoader.onload = startLoad;
    dataLoader.open("GET", FONT_TABLE_PATH);
    dataLoader.overrideMimeType("text/plain; charset=BIG5");
    dataLoader.send();
} //-----------------------------------------------------------
function loadFontDemoText() {
    fontDemoText = document.getElementById("demoText");
    var demoString = "";
    for (var i = 0; i < studentData.length; i++) {
        if (studentData[i][0] == "")
            continue;
        demoString += studentData[i][0] + ", ";
    }
    fontDemoText.value = demoString;
} //-----------------------------------------------------------
loadStudentData();
