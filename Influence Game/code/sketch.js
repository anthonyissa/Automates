
function create2DArray(rows, cols){
	let arr = new Array(rows);
	for(let i=0;i<rows;i++){
		arr[i] = new Array(cols);
	}
	for(let i=1;i<rows-1;i++){
		for(let j=1;j<cols-1;j++){
			arr[i][j] = floor((random()*5)+1);
		}
	}
	// FLICS:
	
	for(let i=0;i<nbreFlics;i++){
		arr[floor(random()*(rows-1)+1)][floor(random()*(cols-1)+1)]=17;
	}
	return arr;
}

function createEmpty2DArray(rows, cols){
	let arr = new Array(rows);
	for(let i=0;i<rows;i++){
		arr[i] = new Array(cols);
	}
	return arr;
}

function yaUnRougeACoté(grid, i, j){
	if(grid[i-1][j-1]==2 || grid[i-1][j-1]==1){
		return true;
	}
	if(grid[i-1][j]==2 || grid[i-1][j]==1){
		return true;
	}
	if(grid[i-1][j+1]==2 || grid[i-1][j+1]==1){
		return true;
	}

	if(grid[i][j-1]==2 || grid[i][j-1]==1){
		return true;
	}
	if(grid[i][j+1]==2 || grid[i][j+1]==1){
		return true;
	}

	if(grid[i+1][j-1]==2 || grid[i+1][j-1]==1){
		return true;
	}
	if(grid[i+1][j]==2 || grid[i+1][j]==1){
		return true;
	}
	if(grid[i+1][j+1]==2 || grid[i+1][j+1]==1){
		return true;
	}

	return false;
}

function copSeDéplace(grid, i, j){
	let r = floor(random()*4);
	if(i-1==0){
		clone[i][j]=3;
		clone[i+1][j]=17;
	}
	else if(i+1==rows-1){
		clone[i][j]=3;
		clone[i-1][j]=17;
	}
	else if(j-1==0){
		clone[i][j]=3;
		clone[i][j+1]=17;
	}
	else if(j+1==cols-1){
		clone[i][j]=3;
		clone[i][j-1]=17;
	}
	else{
		if(r==0){
			clone[i][j]=3;
			clone[i][j+1]=17;
		}
		else if(r==1){
			clone[i][j]=3;
			clone[i][j-1]=17;
		}
		else if(r==2){
			clone[i][j]=3;
			clone[i-1][j]=17;
		}
		else if(r==3){
			clone[i][j]=3;
			clone[i+1][j]=17;
		}
	}
}

let grid;
let FPS = 30;
let rows = 100;
let cols = 100;
let res = 10;
let clone = createEmpty2DArray(rows, cols);
let nbreFlics = 100;

function setup() {
	frameRate(FPS);
	createCanvas(res*rows,res*cols);
	grid = create2DArray(rows, cols);

}

function draw() {
 	background(0);
 	for(let i=1;i<rows-1;i++){
		for(let j=1;j<cols-1;j++){
			if(grid[i][j]==3){
				fill(255); // neutre
				rect(i*res, j*res, res, res);
			}
			else if(grid[i][j]==2){
				fill("#ff5733"); // rouge
				rect(i*res, j*res, res, res);
			}	
			else if(grid[i][j]==1){
				fill("#ff2d00"); // ROUGE
				rect(i*res, j*res, res, res);
			}
			else if(grid[i][j]==4){
				fill("#52ff00"); // vert
				rect(i*res, j*res, res, res);
			}
			else if(grid[i][j]==5){
				fill("#297f00"); // VERT
				rect(i*res, j*res, res, res);
			}
			else if(grid[i][j]==17){
				fill("#0051ff"); // cops
				rect(i*res, j*res, res, res);
			}
		}
	}
	
	clone = grid;

	for(let i=1;i<rows-1;i++){
		for(let j=1;j<cols-1;j++){
			if(grid[i][j]==4){
				if(yaUnRougeACoté(grid, i, j)){
					if(Math.random()<0.55){
						clone[i][j]=5;
					}
					else{
						clone[i][j]=3;
					}
				}
				else{
					if(Math.random()<0.7){
						clone[i][j]=5;
					}
					else{
						clone[i][j]=3;
					}
				}
			}
			else if(grid[i][j]==5){
				if(yaUnRougeACoté(grid, i, j)){
					if(Math.random()<0.65){
						clone[i][j]=5;
					}
					else{
						clone[i][j]=4;
					}
				}
				else{
					if(Math.random()<0.8){
						clone[i][j]=5;
					}
					else{
						clone[i][j]=4;
					}
				}
			}
			else if(grid[i][j]==3){
				if(yaUnRougeACoté(grid, i, j)){
					if(Math.random()<0.35){
						clone[i][j]=4;
					}
					else{
						clone[i][j]=2;
					}
				}
				else{
					if(Math.random()<0.5){
						clone[i][j]=4;
					}
					else{
						clone[i][j]=2;
					}
				}
			}
			else if(grid[i][j]==2){
				if(Math.random()<0.7){
					clone[i][j]=1;
				}
				else{
					clone[i][j]=3;
				}
			}
			else if(grid[i][j]==1){
				if(Math.random()<0.8){
					clone[i][j]=1;
				}
				else{
					clone[i][j]=2;
				}
			}
			else if(grid[i][j]==17){
				grid[i-1][j-1]=5;
				grid[i-1][j]=5;
				grid[i-1][j+1]=5;

				grid[i][j-1]=5;
				grid[i][j+1]=5;

				grid[i+1][j-1]=5;
				grid[i+1][j]=5;
				grid[i+1][j+1]=5;
				copSeDéplace(grid, i, j);
			}
		}
	}
	let cops=0, verts=0, rouges=0, neutres=0;
	for(let i=1;i<rows-1;i++){
		for(let j=1;j<cols-1;j++){
			if(grid[i][j]==1 || grid[i][j]==2){
				rouges++;
			}
			else if(grid[i][j]==3){
				neutres++;
			}
			else if(grid[i][j]==4 || grid[i][j]==5){
				verts++;
			}
			else if(grid[i][j]==17){
				cops++;
			}
		}
	}
	if(cops!=nbreFlics){
		for(let i=0;i<nbreFlics-cops;i++){
			grid[floor(random()*(rows-1)+1)][floor(random()*(cols-1)+1)]=17;
		}
		
	}

	document.getElementById('cops').innerHTML = "Policiers: "+cops;
	document.getElementById('verts').innerHTML = "Gentils: "+verts;
	document.getElementById('neutres').innerHTML = "Neutres: "+neutres;
	document.getElementById('rouges').innerHTML = "Malveillants: "+rouges;
	grid = clone;
}
// ROUGE -> 80% mauvais
// rouge -> 70% mauvais
// NEUTRE -> 50% gentil
// vert -> 70% gentil
// VERT -> 80% gentil

// Cops -> autour de lui, rouge/ROUGE devient blanc

// rouge -> enlève 15% de gentillesse à vert/VERT/NEUTRE
