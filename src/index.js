import png1 from "./res/1.png"
import pngQr from "./res/qr.png"
import { TW_AddLoadEvent } from "./js/twloader"
import { RandomInt,GetRandQueueInRange, GetRandQueue } from "./js/math"
import {Toast,Dialog} from "./js/ttui"

const TT = {};
window.game = TT;

TW_AddLoadEvent(Start);

//游戏规则
//全局参数
//移1根：=0
let m_DictSelf = { 0: [6, 9], 2: [3], 3: [2, 5], 5: [3], 6: [9, 0],9: [6, 0]};
//加1根：=1
let m_DictPlus = { 0: [8], 1: [7], 3: [9], 5: [6, 9], 6: [8], 9: [8] };
//减1根：=2
let m_DictMinus = { 6: [5], 7: [1], 8: [9, 6, 0], 9: [5, 3],10:[11]};

//每个数字所能操作的对照表
let m_DictOptr = {0:[0,1],1:[1],2:[0],3:[0,1],4:[],5:[0,1],6:[0,1,2],7:[2],8:[2],9:[0,1,2],10:[2],11:[],12:[]};

//////////////////////
//程序入口
////////////////////
function Start() {
    TT.canvas = document.getElementById("board");
    TT.ctx = TT.canvas.getContext("2d");
    TT.width = TT.canvas.width;
    TT.height = TT.canvas.height;

    //添加事件
    SetupBtnClick('btn1',()=>{CreateA4(1);});
}

function SetupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

function SetupBtnClick(btnName, cb){
    document.getElementById(btnName).addEventListener('click', cb);;  
}

//成行显示
function WriteTextsH(arr1, x, y, hei, scale) {
    let tbWid = 0;
    let x2 = x;
    let arr2 = [];
    for (let i = 0; i < arr1.length; ++i) {
        x2 = x2 + tbWid;
        let oTxt = WriteText(arr1[i], x2, y, hei, scale);
        //计算宽度
        tbWid = arr1[i].length * hei * 0.8;
        arr2.push(oTxt);
    }

    return arr2;
}

//绘制题目
function WriteText(str1, x, y, hei, scale) {
    scale = scale || 60;
    let fontHei = hei * scale + "px";
    TT.ctx.font = "normal " + fontHei + " Arial";
    TT.ctx.fillStyle = "#000000";
    TT.ctx.fillText(str1, x * scale, y * scale);

    return { txt: str1, x: x, y: y, h: hei, s: scale };
}

var m_hard = 1;

//生成题目
function CreateA4(hard){
    console.log("create "+hard);
    var toastDlg = new Toast({
        text: "生成中"
    });
    toastDlg.Show();
    TT.ctx.fillStyle = "white";
    TT.ctx.fillRect(0, 0, TT.width, TT.height);
    console.log(TT);
    //1.title
    WriteText("移动火柴棒", 7.5, 1.5, 1.0);
    //2.sub-title
    WriteTextsH(["班级________", "姓名________", "用时________", "得分________"], 2.5, 3.5, 0.5);

    //生成题目
let numA = RandomInt(0, 9);
    let numAA = SplitNumber(numA);

    let numB = RandomInt(0, 9);
    let numBB = SplitNumber(numB);

    let numC = numA + numB;
    let numCC = SplitNumber(numC);

    let arrOut = [...numAA, 10, ...numBB, 12, ...numCC];
    //绘制公式
    DrawFormula(arrOut, 10, 310);
    //移动火柴棒
    let arrNew = [...arrOut];
    CreateAfterFormula(arrNew);
    DrawFormula(arrNew, 10, 420);
    //显示
    //二维码
    DrawImage(pngQr, () => {
        toastDlg.Close();
        ShowImageDlg();
    });
}

//绘制图片
function DrawImage(img0, cb) {
    let imgObj = new Image();
    imgObj.src = img0;
    imgObj.onload = function () {
        TT.ctx.drawImage(imgObj, 10, 10, 150, 150);
        if (typeof cb == "function") {
            cb();
        }
    }
}

//显示生成的题目图片，长按保存
function ShowImageDlg() {
    let strImg = "<img ";
    strImg += "src=" + TT.canvas.toDataURL('png', 1.0);
    strImg += " style='width:350px;height:500px;'></img>";
    let dlg1 = new Dialog({
        title: "长按图片，保存下载",
        text: strImg
    });

    dlg1.Show();
}

function SplitNumber(numA) {
    let numAA = [];
    let numAAS =  Array.from(numA.toString());
    numAAS.forEach(item=>{
        numAA.push(parseInt(item));
    })

    return numAA;
}

function CreateAfterFormula(theArr){
    //console.log(theArr);
    for(let i=0;i<1000;i++)
    {
        let arrIdx = GetRandQueueInRange(2,0, theArr.length-1);
        let numA = theArr[arrIdx[0]];
        let iModes = m_DictOptr[numA];   //0 本身移动  1:增加   2:减少
        //console.log(arrIdx, numA, iModes)
        if(iModes.length == 0) continue;
        //获得 单个元素 所能支持的 变化
        let idx2 = RandomInt(0, iModes.length-1);
        let iMode = iModes[idx2];
        if(iMode == 0){
            //支持自身移动
            theArr[arrIdx[0]] = GetRandQueue(m_DictSelf[numA],1)[0];
            break;
        }else if(iMode == 1){
            //支持增加
            //第二个需要支持减少
            let numB = theArr[arrIdx[1]];
            let iModes2 = m_DictOptr[numB];
            if(iModes2.includes(2) == false){
                //不含增加 就是无效
                continue;
            }
            theArr[arrIdx[0]] = GetRandQueue(m_DictPlus[numA],1)[0];
            theArr[arrIdx[1]] = GetRandQueue(m_DictMinus[numB],1)[0];
            break;
        }else if(iMode == 2){
            //支持减少
            //第二个需要支持增加
            let numB = theArr[arrIdx[1]];
            let iModes2 = m_DictOptr[numB];
            if(iModes2.includes(1) == false){
                //不含增加 就是无效
                continue;
            }
            theArr[arrIdx[0]] = GetRandQueue(m_DictMinus[numA],1)[0];
            theArr[arrIdx[1]] = GetRandQueue(m_DictPlus[numB],1)[0];
            break;
        }
    }
}

//绘制火柴棒算式
function DrawFormula(iNums, DrawX, DrawY) {
    iNums.forEach(iNum => {
        if (iNum < 0) iNum = -iNum;
        let [iPosX1, iWidth1] = GetPngPosition(iNum);
        DrawFormulaImage(png1, [iPosX1, 0, iWidth1, 100, DrawX, DrawY, iWidth1, 100], null);
        DrawX += iWidth1;
    });

}

function GetPngPosition(iNum) {
    let iStep = 14.7;
    let iWidth = 61;
    let iPosX = iWidth * iNum + iStep * iNum;
    return [iPosX, iWidth];
}

//绘制图片
function DrawFormulaImage(img0, params, cb) {
    let imgObj = new Image();
    imgObj.src = img0;
    imgObj.onload = () => {
        TT.ctx.drawImage(imgObj, ...params);
        if (typeof cb == "function") {
            cb();
        }
    }
}




