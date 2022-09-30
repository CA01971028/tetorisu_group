 //落下サイクル(小さい方が速い)
 const speed = 300;
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
 const canvasH = blockSize * boardRow;
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

 //ボード本体
 const board = [];

 //タイマーID
 let timerId = NaN;

 //描画処理
 const draw = () => {
   //塗りに黒を設定
   ctx.fillStyle = '#000';
   //キャンバスを塗りつぶす
   ctx.fillRect(0, 0, canvasW, canvasH);

   //ボードに存在しているブロックを塗る
   for (let y = 0; y < boardRow; y++) {
     for (let x = 0; x < boardCol; x++) {
       if (board[y][x]) {
         drawBlock(x, y);
       }
     }
   }

   //テトリミノの描画
   for (let y = 0; y < tetSize; y++) {
     for (let x = 0; x < tetSize; x++) {
       if (tet[y][x]) {
         drawBlock(offsetX + x, offsetY + y);
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

 //指定された方向に移動できるか？(x移動量,y移動量,対象tet)
 const canMove = (dx, dy, nowTet = tet) => {
   for (let y = 0; y < tetSize; y++) {
     for (let x = 0; x < tetSize; x++) {
       //その場所にブロックがあれば
       if (nowTet[y][x]) {
         //ボード座標に変換（offsetX(-2~8)+x(0~3)+移動量(-1~1)
         let nx = offsetX + x + dx;
         let ny = offsetY + y + dy;
         if (
           //調査する座標がボード外だったらできない
           ny < 0 ||
           nx < 0 ||
           ny >= boardRow ||
           nx >= boardCol ||
           //移動したいボード上の場所にすでに存在してたらできない
           board[ny][nx]
         ) {
           //移動できない
           return false;
         }
       }
     }
   }
   //移動できる
   return true;
 };
 //回転
 const createRotateTet = () => {
   //新しいtetを作る
   let newTet = [];
   for (let y = 0; y < tetSize; y++) {
     newTet[y] = [];
     for (let x = 0; x < tetSize; x++) {
       //時計回りに90度回転させる
       newTet[y][x] = tet[tetSize - 1 - x][y];
     }
   }
   return newTet;
 };

 document.onkeydown = (e) => {
   switch (e.keyCode) {
     case 65: //左
       if (canMove(-1, 0)) offsetX--;
       break;
     case 87: //上
       if (canMove(0, -1)) offsetY--;
       break;
     case 68: //右
       if (canMove(1, 0)) offsetX++;
       break;
     case 83: //下
       if (canMove(0, 1)) offsetY++;
       break;
     case 13: //enter
       let newTet = createRotateTet();
       if (canMove(0, 0, newTet)) {
         tet = newTet;
       }
   }
   draw();
 };
 //繰り返し行われる落下処理
 const dropTet = () => {
   //下に行けたら
   if (canMove(0, 1)) {
     //下に行く
     offsetY++;
   } else {
   }
   draw();
 };
 const initStartPos = () => {
   offsetX = boardCol / 2 - tetSize / 2;
   offsetY = 0;
 };
 //初期化処理
 const init = () => {
   //ボード(20*10を0埋め)
   for (let y = 0; y < boardRow; y++) {
     board[y] = [];
     for (let x = 0; x < boardCol; x++) {
       board[y][x] = 0;
     }
   }
   //テスト用
   //board[3][5]=1;
   initStartPos();
   //繰り返し処理
   timerId=setInterval(dropTet,speed);

   draw();
 };