let liftStatus = 0;
let requestNow = [];
let waitingRequests = [];
let openClose = false;
let openCloseDown = false;
let liftIsAt = 1;
let currentNavigationList = [];
let waitingNavigations = [];
let moveToTimerId;
let waitingOnTheWay = [];
let newCurrentNavigationList = [];
let stillInLift = [];
let timerId;
let updatedCurrentNavigationList = [];
let leftDoorElement = document.getElementById("left-door");
let rightDoorElement = document.getElementById("right-door");
let liftElement = document.getElementById("lift");

function liftOpenClose(){
    console.log(`Lift opened at ${liftIsAt}`);
    leftDoorElement.classList.add("left-lift-open-animation");
        rightDoorElement.classList.add("right-lift-open-animation");
        setTimeout(function(){
            leftDoorElement.classList.add("left-lift-close-animation");
            rightDoorElement.classList.add("right-lift-close-animation");
        },2000);
        setTimeout(function(){
            leftDoorElement.classList.remove("left-lift-open-animation");
            rightDoorElement.classList.remove("right-lift-open-animation");
            leftDoorElement.classList.remove("left-lift-close-animation");
            rightDoorElement.classList.remove("right-lift-close-animation");
        },5000)
}


function goUp(floorX,floorY){
    
    liftIsAt = liftIsAt + 1;
    console.log(`Lift is at ${liftIsAt}`);
    liftElement.style.animation = `lift-up-${liftIsAt-1}-${liftIsAt}`;
    liftElement.style.animationFillMode = "forwards";
    liftElement.style.animationDuration = "5s";
    liftElement.classList.add("lift-room-movement");
    setTimeout(function(){
        if(waitingNavigations.length !== 0){
            waitingOnTheWay = waitingNavigations.filter((eachFromTo)=>(eachFromTo.from === liftIsAt && eachFromTo.to > liftIsAt && eachFromTo.to <=  4)||(eachFromTo.from === 4 && eachFromTo.to < 4 && liftIsAt===4));
        }
        if(waitingOnTheWay.length !== 0){
            console.log("Picking people");
            openClose = true;
            waitingNavigations = waitingNavigations.filter((eachFromTo)=>!waitingOnTheWay.includes(eachFromTo));
            currentNavigationList = [...currentNavigationList,...waitingOnTheWay];
            waitingOnTheWay = [];
        }
        
        updatedCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>eachFromTo.to === liftIsAt && eachFromTo.from < liftIsAt);
        if(updatedCurrentNavigationList.length !== 0){
            updatedCurrentNavigationList.map((eachFromTo)=>eachFromTo.event.target.classList.remove("input-button-clicked-style"));
            console.table("Dropping people");
           openClose = true;
            stillInLift = currentNavigationList.filter((eachFromTo)=>!updatedCurrentNavigationList.includes(eachFromTo));
            currentNavigationList = [...stillInLift];
            updatedCurrentNavigationList=[];
            
        }
        console.log("From and To requests inside the lift");
        console.table(currentNavigationList);
        if(currentNavigationList.length === 0){
            console.log("Lift is empty");
            if(openClose === true){
                setTimeout(liftOpenClose,8000);
            }
            clearInterval(moveToTimerId);
            timerId = setTimeout(startNavigating,5000);
            
            return;
        }
        
        if(liftIsAt === floorY){
                clearInterval(moveToTimerId);
                openClose = true;
                if(liftIsAt === currentNavigationList[0].to){
                    console.table("Dropping people");
                    currentNavigationList.shift();
                    openClose = true;
                    newCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>eachFromTo.to !== liftIsAt);
                    currentNavigationList.map((eachFromTo)=>{
                        if(eachFromTo.to === liftIsAt){
                            eachFromTo.event.target.classList.remove("input-button-clicked-style");
                        }
                    })
                    
                    currentNavigationList = [...newCurrentNavigationList];
                    if(openClose === true){
                        setTimeout(liftOpenClose,8000);
                    }
                    timerId = setInterval(startNavigating,5000);
                    return;
                }
                if(openClose === true){
                    setTimeout(liftOpenClose,8000);
                }
                timerId = setInterval(startNavigating,5000);
                return;
        }
        if(openClose === true){
            setTimeout(liftOpenClose,3000);
        }
        if(liftIsAt === 4){
            clearInterval(moveToTimerId);
            startNavigating();
        }
    },5000);
    
}

function goDown(floorX,floorY){

    
    liftIsAt = liftIsAt - 1;
    liftElement.style.animation = `lift-up-${liftIsAt+1}-${liftIsAt}`;
    liftElement.style.animationFillMode = "forwards";
    liftElement.style.animationDuration = "5s"; 
    liftElement.classList.add("lift-room-movement");
    console.log(`Lift is at ${liftIsAt}`);
    setTimeout(function(){
        if(waitingNavigations.length !== 0){
            waitingOnTheWay = waitingNavigations.filter((eachFromTo)=>(eachFromTo.from === liftIsAt && eachFromTo.to < liftIsAt && eachFromTo.to >= 1)||(eachFromTo.from === 1 && eachFromTo.to > 1 && liftIsAt===1));
        }
        if(waitingOnTheWay.length !== 0){
            console.log("Picking people");
            openCloseDown = true;
            waitingNavigations = waitingNavigations.filter((eachFromTo)=>!waitingOnTheWay.includes(eachFromTo));
            currentNavigationList = [...currentNavigationList,...waitingOnTheWay];
            waitingOnTheWay = [];
        }
        updatedCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>(eachFromTo.to === liftIsAt && eachFromTo.from >= liftIsAt)||(eachFromTo.from === 1 && eachFromTo.to > 1));
        if(updatedCurrentNavigationList.length !== 0){
            openCloseDown = true;
            updatedCurrentNavigationList.map((eachFromTo)=>eachFromTo.event.target.classList.remove("input-button-clicked-style"));
            console.table("Dropping people");
            stillInLift = currentNavigationList.filter((eachFromTo)=>!updatedCurrentNavigationList.includes(eachFromTo));
            currentNavigationList = [...stillInLift];
            updatedCurrentNavigationList=[];
            
        }
        console.log("From and To requests inside the lift");
        console.table(currentNavigationList);
        if(currentNavigationList.length === 0){
            if(openCloseDown === true){
                setTimeout(liftOpenClose,3000);
            }
            clearInterval(moveToTimerId);
            timerId = setInterval(startNavigating,7000);
            return;
        }
         if(liftIsAt === floorY){
                clearInterval(moveToTimerId);
                openCloseDown= true;
                if(liftIsAt === currentNavigationList[0].to){
                    console.table("Dropping people");
                    currentNavigationList.shift();
                    openCloseDown= true;
                    newCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>eachFromTo.to !== liftIsAt);
                    currentNavigationList.map((eachFromTo)=>{
                        if(eachFromTo.to === liftIsAt){
                            eachFromTo.event.target.classList.remove("input-button-clicked-style");
                        }
                    })
                    currentNavigationList = [...newCurrentNavigationList];
                    if(openCloseDown === true){
                        setTimeout(liftOpenClose,3000);
                    }
                    timerId = setInterval(startNavigating,5000);
                    return;
                }
                if(openCloseDown === true){
                    setTimeout(liftOpenClose,3000);
                }
                timerId = setInterval(startNavigating,5000);
                return;
            }
            if(openCloseDown === true){
                setTimeout(liftOpenClose,3000);
            }
        if(liftIsAt === 1){
            clearInterval(moveToTimerId);
            startNavigating();
        }
    },5000);
}



//to move from floorX to floorY
function moveTo(floorX,floorY){
    clearInterval(timerId);
    if(floorY > liftIsAt){
        moveToTimerId = setInterval(function(){
            liftElement.style.marginTop = `${4-liftIsAt*160}px`;
            console.log("Moving up");
            goUp(floorX,4);
        },15000);
    }
    else{
        moveToTimerId = setInterval(function(){
            liftElement.style.marginTop = `${4-liftIsAt*160}px`;
            console.log("Moving down");
            goDown(floorX,1);
        },15000);
    }
}


function startNavigating(){
    openClose = false;
    openCloseDown = false;
    if(currentNavigationList.length === 0 && waitingNavigations.length === 0){
        liftStatus = 0;
        console.log("Stopped Navigation");
        clearInterval(timerId);
        return;
    }
    if(currentNavigationList.length !== 0 && waitingNavigations.length !== 0){
        let a = waitingNavigations.filter((eachFromTo)=>eachFromTo.from===liftIsAt);
        currentNavigationList = [...currentNavigationList,...a];
        waitingNavigations = waitingNavigations.filter((eachFromTo)=>!a.includes(eachFromTo));
        clearInterval(timerId);
    }
    if(currentNavigationList.length == 0 && waitingNavigations.length !== 0){
        currentNavigationList = [...waitingNavigations];
        waitingNavigations = [];
    } 
    console.log("From and To requests inside the lift");
    console.table(currentNavigationList);
    let currentFrom = currentNavigationList[0].from;
    let currentTo = currentNavigationList[0].to;
    
    if(liftIsAt === currentFrom){
        liftOpenClose();
        moveTo(currentFrom,currentTo);
    }
    else{
        moveTo(liftIsAt,currentFrom);
    }
}


function findingFloor(from,to,event){ //gets the input and finds the from floor and to floor and pushes into the array
    event.target.classList.add("input-button-clicked-style");
    if(liftStatus === 0){
        currentNavigationList = [{
            from,
            to,
            event
        }];
        liftStatus = 1;
        console.log("Starting Navigation");
        setTimeout(startNavigating,8000);
    }
    else{
        waitingNavigations = [...waitingNavigations,{
            from,
            to,
            event
        }];
    }
}
