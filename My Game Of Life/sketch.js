function create2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i<rows;i++){
    arr[i] = new Array(cols);
  }
  for(let i = 1;i<rows;i++){
    for(let j = 1;j<cols;j++){
      arr[i][j] = floor(random(2));
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
let rows = 150;
let cols = 150;
let res = 10;

function setup() {
  grid = create2DArray(rows, cols);
  createCanvas(res*rows, res*cols); 
  
}


function draw() {
  background(0);
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(grid[i][j]==1){
        fill(255);
        rect(i*res, j*res, res, res);
      }
    }
  }

  let next = createEmpty2DArray(rows, cols);
  let sum;
  for(let i = 1;i<rows-1;i++){
    for(let j = 1;j<cols-1;j++){
      sum=0;
      if(grid[i][j]==1){
        sum += grid[i-1][j-1];
        sum += grid[i-1][j];
        sum += grid[i-1][j+1];

        sum += grid[i][j-1];
        sum += grid[i][j+1];

        sum += grid[i+1][j-1];
        sum += grid[i+1][j];
        sum += grid[i+1][j+1];
        
        if(sum==2 || sum==3){
          next[i][j]=1;
        }
        else{
          next[i][j]=0;
        }
      }
      else{
        sum += grid[i-1][j-1];
        sum += grid[i-1][j];
        sum += grid[i-1][j+1];

        sum += grid[i][j-1];
        sum += grid[i][j+1];

        sum += grid[i+1][j-1];
        sum += grid[i+1][j];
        sum += grid[i+1][j+1];
        
        if(sum==3){
          next[i][j]=1;
        }
        else{
          next[i][j]=0;
        }
      }
      
    }
  }

  grid = next;
  
} 