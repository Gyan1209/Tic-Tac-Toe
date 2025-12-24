let turn='x';

let ansGrid=new Array(9).fill('E');

let winCond=[[0,1,2],[3,4,5],[6,7,8],
             [0,3,6],[1,4,7],[2,5,8],
             [0,4,8],[2,4,6]
            ];

function checkWinner(){
    for(let [i,j,k] of winCond){
        if(ansGrid[i]!='E'&& (ansGrid[i]==ansGrid[j]&&ansGrid[j]==ansGrid[k]))
            return 1;
    }
    return 0;
}
function checkDraw(){
    for(let i of ansGrid){
        if(i=='E') return 0;
    }
    return 1;
}

const game=(e)=>{
    
    const el=e.target;

    if(ansGrid[el.id] !='E' || checkWinner()) return;
    
    // if(turn==x){
    //     playerx.style.scale='2';
    //     playero.style.scale='1';
    // }
    // else{
    //     playero.style.scale='2';
    //     playerx.style.scale='1';
    // }

    el.innerHTML=`${turn}`
    
    ansGrid[el.id]=`${turn}`
    
    //check for winner
    if(checkWinner()){
        console.log("winner declared!")
        let winnerEle=document.createElement("p");
        winnerEle.innerHTML=`Winner is ${turn}`;
        winnerEle.className='game-result';
        document.querySelector('.game-section').appendChild(winnerEle);
        playBoard.removeEventListener('click',game);
        return;
    }

    //check for draw
    if(checkDraw()){
        let drawmsg=document.createElement("p");
        drawmsg.innerHTML=`Match Draw`;
        drawmsg.className='game-result';
        document.querySelector('.game-section').appendChild(drawmsg);
        playBoard.removeEventListener('click',game);
    }

    turn=turn=='x'?'o':'x';
    document.querySelector(`#player-img-${turn}`).style.transform='scale(1.2)';
    document.querySelector(`#player-img-${turn=='x'?'o':'x'}`).style.transform='scale(1)';
}


const playBoard=document.querySelector('.grids');
playBoard.addEventListener('click',game);


document.querySelector('.restart').addEventListener('click',(e)=>{
    //value set
    turn='x';
    // ansGrid reset 
    ansGrid.forEach((val,i)=>{
        ansGrid[i]='E';
    })
    // ui cleanup
    const grids=document.querySelectorAll('.box');
    grids.forEach((el)=>{
        el.innerHTML='';
    })

    // player ui reset
    document.querySelector(`#player-img-${turn}`).style.transform='scale(1.2)';
    document.querySelector(`#player-img-${turn=='x'?'o':'x'}`).style.transform='scale(1)';

    playBoard.addEventListener('click',game);

    // location.reload();  // not prefered just fun
})