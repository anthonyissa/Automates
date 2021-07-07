function create2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i<rows;i++){
    arr[i] = new Array(cols);
  }
  for(let i = 1;i<rows-1;i++){
    for(let j = 1;j<cols-1;j++){
      if(floor(random(3)<2)){
        arr[i][j]=1;
      }
    }
  }
  return arr;
}

function createEmpty2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i<rows;i++){
    arr[i] = new Array(cols);
  }
  return arr;
}

let grid;
let rows = 104;
let cols = 72;
let res = 40;

function setup() {
  frameRate(10);
  grid = create2DArray(rows, cols);
  grid[rows/2][cols/2]=2;
  createCanvas(res*rows, res*cols); 

}

function copyTab(arr){
  let next = createEmpty2DArray(rows, cols);
  for(let i = 0 ; i<rows; i++){
    for(let j = 0 ; j<cols; j++){
      next[i][j]=arr[i][j];
    }
  }
  return next;
}


function draw() {
  
  background(255);
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(grid[i][j]==1){
        fill("#00FF00");
        rect(i*res, j*res, res, res);
      }
      if(grid[i][j]==2){
        fill("#FF0000");
        rect(i*res, j*res, res, res);
      }
      if(grid[i][j]==3){
        fill("#787878");
        rect(i*res, j*res, res, res);
      }
    }
  }

  let next = copyTab(grid);
  
  for(let i = 1;i<rows-1;i++){
    for(let j = 1;j<cols-1;j++){

      if(grid[i][j]==2){
        next[i][j]=3;
        if(grid[i-1][j]==1){
          next[i-1][j]=2;
        }
        if(grid[i+1][j]==1){
          next[i+1][j]=2;
        }
        if(grid[i][j-1]==1){
          next[i][j-1]=2;
        }
        if(grid[i][j+1]==1){
          next[i][j+1]=2;
        }
        
      }
      else if(grid[i][j]==3){
        next[i][j]=0;
      }
      
    }
  }
  
  grid = copyTab(next);

} 