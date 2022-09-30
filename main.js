//ブロック1マスの大きさ
const blockSize = 30;
//ボードサイズ
const boardRow = 20;
const boardCol = 10;
//キャンバスの取得
const cvs = document.getElementById('cvs');
//2dコンテキストを取得
const ctx = cvs.getContext('2d');
//キャンバスサイズ
const canvasW = blockSize * boardCol;
cvs.width = canvasW;
cvs.height = canvasH;
//コンテナの設定
const container = document.getElementById('container');
container.style.width = canvasW + 'px';

//tetの1辺の大きさ
const tetSize = 4;
//T型のtet
let tet = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
];

//テトリミノのオフセット量(何マス分ずれているか)
let offsetX = 0;
let offsetY = 0;

//描画処理
const draw = () => {
  //塗りに黒を設定
  ctx.fillStyle = '#000';
  //キャンバスを塗りつぶす
  ctx.fillRect(0, 0, canvasW, canvasH);

  //塗りに赤を設定
  //ctx.fillStyle = '#f00';
  //x座標50,y座標50の場所に幅30,縦30の四角を描画
  //ctx.fillRect(150, 150, blockSize, blockSize);

  //テトリミノの描画
  for (let y = 0; y < tetSize; y++) {
    for (let x = 0; x < tetSize; x++) {
      if (tet[y][x]) {
        drawBlock(offsetX+x,offsetY+y);
      }
    }
  }
};
//ブロック一つを描画する
const drawBlock = (x, y) => {
  let px = x * blockSize;
  let py = y * blockSize;
  //塗りを設定
  ctx.fillStyle = '#f00';
  ctx.fillRect(px, py, blockSize, blockSize);
  //線を設定
  ctx.strokeStyle = 'black';
  //線を描画
  ctx.strokeRect(px, py, blockSize, blockSize);
};

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 65: //左
      offsetX--;
      break;
    case 87: //上
      offsetY--;
      break;
    case 68: //右
      offsetX++;
      break;
    case 83: //下
      offsetY++;
      break;
  }
  draw();
};
//
//初期化処理
const init = () => {
  draw();
};