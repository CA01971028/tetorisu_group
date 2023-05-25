var cvs = document.getElementById("can");
var ctx = cvs.getContext("2d");
var bg = new Image();//背景
var st = new Image();//星の作成
st.src = "fot/star_fot.png"
bg.src = "fot/bg.png";//背景の正規表現
//星の動き
let stra_y = 0;
let stra_x =0;
let star_x = 90;
let star_y = 0;
let hayasa_x = 0;
let hayasa_y = 0;

let rand=()=>{
return Math.floor(Math.random()*900);
}

function draw()
{
  hayasa_x += 4;
  hayasa_y += 4;
  stra_y += 3;
  stra_x += 3;
  star_x += 4;
  star_y += 4;
    ctx.drawImage(bg,0,0,900,500);//背景の設定
    ctx.drawImage(st,stra_x,stra_y,50,50);//星の設定
    ctx.drawImage(st,star_x,star_y,50,50);//星の設定
    requestAnimationFrame(draw);//処理速度の制御
}
draw();

