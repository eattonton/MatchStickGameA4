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
let m_DictNumber = {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'+',11:'-',12:'='};
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
    SetupBtnClick('btn2',()=>{CreateA4(2);});
    SetupBtnClick('btn3',()=>{CreateA4(1,2);});
    SetupBtnClick('btn4',()=>{CreateA4(1,1,2);});
    SetupBtnClick('btn5',()=>{CreateA4(2,1,2);});
    SetupBtnClick('btn6',()=>{CreateA4(1,2,2);});
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
var m_mode = 1;
var m_move = 1;   //移动次数
//生成题目
function CreateA4(hard,mode,move){
    m_hard = hard;
    m_mode = mode || 1;
    m_move = move || 1;
    var toastDlg = new Toast({
        text: "生成中"
    });
    toastDlg.Show();
    TT.ctx.fillStyle = "white";
    TT.ctx.fillRect(0, 0, TT.width, TT.height);
    //1.title
    WriteText("移动火柴棒", 7.5, 1.5, 1.0);
    //2.sub-title
    WriteTextsH(["班级________", "姓名________", "用时________", "得分________"], 2.5, 3.5, 0.5);

    //生成题目
    for(let i=0;i<4;i++)
    {
        if(!DrawOneLine(i)){
            --i;
        }
    }
    
    //显示
    //二维码
    DrawImage(pngQr, () => {
        toastDlg.Close();
        ShowImageDlg();
    });
}

function DrawOneLine(idx){
    let arrOut = [];
    if(m_mode == 1){
        arrOut = GenerationFormulaA();
    }else if(m_mode == 2){
        arrOut = GenerationFormulaTwo();
    }

    //移动火柴棒
    let arrNew = [...arrOut];
    CreateAfterFormula(arrNew);
    //检查是否有效
    if(CheckEqual(arrNew)) return false;
 
    let x0 = 4.5 - (arrOut.length - 5)*0.3;
    let y0 = 6 + idx*6;
    WriteText("题目 "+(idx+1)+"：移动（ "+m_move+"）根火柴棒使下面的算式成立：", 2.5, y0-1.0, 0.5);

    //绘制正确公式
   // DrawFormula(arrOut, x0, y0);
    let hei = 1.6;
    if(arrNew.length >= 9) hei=1.4;
    DrawFormula(arrNew, x0, y0, 1.6);

    return true;
}

function GenerationFormulaA(){
    let numMax = 9;
    if(m_hard == 2){
        numMax = 99;
    }
    let numA = RandomInt(0, numMax);
    let numAA = SplitNumber(numA);

    let numB = RandomInt(numA, numMax);
    let numBB = SplitNumber(numB);

    let numC = numA + numB;
    let numCC = SplitNumber(numC);

    let oper = RandomInt(0,1);
    let arrOut = [];
    if(oper == 0){
        //加法
        arrOut = [...numAA, 10, ...numBB, 12, ...numCC];
    }
    else{
        //减法
        arrOut = [...numCC, 11, ...numBB, 12, ...numAA];
    }

    return arrOut;
}

function GenerationFormulaTwo(){
    let numMax = 9;
    if(m_hard == 2){
        numMax = 99;
    }
    let numA = RandomInt(1, numMax-1);
    let numAA = SplitNumber(numA);

    let numB = RandomInt(numA, numMax);
    let numBB = SplitNumber(numB);

    let numC = numA + numB;
    let numCC = SplitNumber(numC);

    let oper = RandomInt(0, 3);
    let arrOut = [];
    if(oper == 0){
        let numD = RandomInt(0,numC);
        let numDD = SplitNumber(numD);
        let numE = numC - numD;
        let numEE = SplitNumber(numE);
        //加法 = 加法
        arrOut = [...numAA, 10, ...numBB, 12, ...numDD, 10, ...numEE];
    } else if(oper == 1){
        let numD = RandomInt(0,numA);
        let numDD = SplitNumber(numD);
        let numE = numA - numD;
        let numEE = SplitNumber(numE);
        //减法 = 加法
        arrOut = [...numCC, 11, ...numBB, 12, ...numDD, 10, ...numEE];
    }else if(oper == 2){
        let numD = RandomInt(numC, numC+10);
        let numDD = SplitNumber(numD);
        let numE = numD - numC;
        let numEE = SplitNumber(numE);
        //加法 = 减法
        arrOut = [...numAA, 10, ...numBB, 12, ...numDD, 11, ...numEE];
    }else if(oper == 3){
        let numD = RandomInt(numA, numA+10);
        let numDD = SplitNumber(numD);
        let numE = numD - numA;
        let numEE = SplitNumber(numE);
        //减法 = 减法
        arrOut = [...numCC, 11, ...numBB, 12, ...numDD, 11, ...numEE];
    }

    return arrOut;
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
    for(let i=0;i<1000;i++)
    {
        let arrIdx = GetRandQueueInRange(m_move*2,0, theArr.length-1);
        let flag = true;
        for(let j=0; j < m_move;j++)
        {
            flag = MoveOneMatchStick(theArr, [arrIdx[m_move*j], arrIdx[m_move*j + 1]]);
            if(flag == false){
                break;
            }
        }
        
        if(flag){
            break;
        }
    }
}

function MoveOneMatchStick(theArr, arrIdx){
    //移动一根
    let numA = theArr[arrIdx[0]];
    let iModes = m_DictOptr[numA];   //0 本身移动  1:增加   2:减少
    if(iModes.length == 0) return false;
    //获得 单个元素 所能支持的 变化
    let idx2 = RandomInt(0, iModes.length-1);
    let iMode = iModes[idx2];
    if(iMode == 0){
        //支持自身移动
        theArr[arrIdx[0]] = GetRandQueue(m_DictSelf[numA],1)[0];
        return true;
    }else if(iMode == 1){
        //支持增加
        //第二个需要支持减少
        let numB = theArr[arrIdx[1]];
        let iModes2 = m_DictOptr[numB];
        if(iModes2.includes(2) == false){
            //不含增加 就是无效
            return false;
        }
        theArr[arrIdx[0]] = GetRandQueue(m_DictPlus[numA],1)[0];
        theArr[arrIdx[1]] = GetRandQueue(m_DictMinus[numB],1)[0];
        return true;
    }else if(iMode == 2){
        //支持减少
        //第二个需要支持增加
        let numB = theArr[arrIdx[1]];
        let iModes2 = m_DictOptr[numB];
        if(iModes2.includes(1) == false){
            //不含增加 就是无效
            return false;
        }
        theArr[arrIdx[0]] = GetRandQueue(m_DictMinus[numA],1)[0];
        theArr[arrIdx[1]] = GetRandQueue(m_DictPlus[numB],1)[0];
        return true;
    }

    return false;
}

//绘制火柴棒算式
function DrawFormula(iNums, DrawX, DrawY, Width, scale) {
    scale = scale || 60;
    DrawX = DrawX * scale;
    DrawY = DrawY * scale;
    let DrawWidth = Width*scale;
    let DrawHeight = 100/60*DrawWidth;
    iNums.forEach(iNum => {
        if (iNum < 0) iNum = -iNum;
        let [iPosX1, iWidth1] = GetPngPosition(iNum);
        DrawFormulaImage(png1, [iPosX1, 0, iWidth1, 100, DrawX, DrawY, DrawWidth, DrawHeight], null);
        DrawX += DrawWidth;
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

//判断等式是否成立
function CheckEqual(arr1){
    let strLeft = "";
    let strRight = "";
    let flagR = false;

    for(let i=0;i<arr1.length;i++){
        let c1 = m_DictNumber[arr1[i]];
        
        if(c1 == "="){
            flagR = true;
            continue;
        }
        if(!flagR)
        {
            strLeft += c1;
        }
        else
        {
            strRight += c1;
        }
    }

    if(eval(strLeft) == eval(strRight)){
        return true;
    }

    return false;
}



