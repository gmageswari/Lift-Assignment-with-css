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
    //liftElement.style.animationDelay = "2s";
    liftElement.style.animationFillMode = "forwards";
    liftElement.style.animationDuration = "5s";
    
    liftElement.classList.add("lift-room-movement");
    setTimeout(function(){
        if(waitingNavigations.length !== 0){
            //console.log("checking for on the way");
            waitingOnTheWay = waitingNavigations.filter((eachFromTo)=>(eachFromTo.from === liftIsAt && eachFromTo.to > liftIsAt && eachFromTo.to <= floorY)||(eachFromTo.from === 4 && eachFromTo.to < 4 && liftIsAt===4));
            //console.table(waitingOnTheWay);
        }
        if(waitingOnTheWay.length !== 0){
            console.log("Picking people");
            openClose = true;
            waitingNavigations = waitingNavigations.filter((eachFromTo)=>!waitingOnTheWay.includes(eachFromTo));
            currentNavigationList = [...currentNavigationList,...waitingOnTheWay];
            waitingOnTheWay = [];
            //console.table(currentNavigationList);
            //console.table(waitingNavigations);
            //console.table(waitingOnTheWay);
        }
        
        updatedCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>eachFromTo.to === liftIsAt && eachFromTo.from < liftIsAt);
        if(updatedCurrentNavigationList.length !== 0){
            updatedCurrentNavigationList.map((eachFromTo)=>eachFromTo.event.target.classList.remove("input-button-clicked-style"));
            console.table("Dropping people");
            //console.table(updatedCurrentNavigationList);
           openClose = true;
            stillInLift = currentNavigationList.filter((eachFromTo)=>!updatedCurrentNavigationList.includes(eachFromTo));
            currentNavigationList = [...stillInLift];
            updatedCurrentNavigationList=[];
            
        }
        console.log("From and To requests inside the lift");
        console.table(currentNavigationList);
        //console.log("After all opertaions all three array");
        //console.table(currentNavigationList);
        //console.table(waitingNavigations);
        //console.table(waitingOnTheWay);
        
        if(currentNavigationList.length === 0){
            console.log("Lift is empty");
            if(openClose === true){
                setTimeout(liftOpenClose,8000);
            }
            //liftElement.style.marginTop = `${toMarginValue}px`;
            clearInterval(moveToTimerId);
            timerId = setInterval(startNavigating,5000);
            
            return;
        }
        
        if(liftIsAt === floorY){
                //console.log("lift is at the floorY")
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
                    //liftElement.style.marginTop = `${toMarginValue}px`;
                    //console.table(currentNavigationList);
                    //console.table(waitingNavigations);
                    //console.table(waitingOnTheWay);
                    timerId = setInterval(startNavigating,5000);
                    
                    return;
                }
                if(openClose === true){
                    setTimeout(liftOpenClose,8000);
                }
                //liftElement.style.marginTop = `${toMarginValue}px`;
                //console.table(currentNavigationList);
                    //console.table(waitingNavigations);
                    //console.table(waitingOnTheWay);
                timerId = setInterval(startNavigating,5000);
                
                return;
        }
        if(openClose === true){
            setTimeout(liftOpenClose,3000);
            //liftElement.style.marginTop = `${toMarginValue}px`;
        }
        if(liftIsAt === 4){
            clearInterval(moveToTimerId);
            startNavigating();
        }
    },5000);
    
}

function goDown(floorX,floorY){

    
    liftIsAt = liftIsAt - 1;
    //liftElement.style.marginTop = `${liftIsAt * 160}px`;
    liftElement.style.animation = `lift-up-${liftIsAt+1}-${liftIsAt}`;
    //liftElement.style.animationDelay = "2s";
    liftElement.style.animationFillMode = "forwards";
    liftElement.style.animationDuration = "5s";
    
    liftElement.classList.add("lift-room-movement");
    console.log(`Lift is at ${liftIsAt}`);
    setTimeout(function(){
        if(waitingNavigations.length !== 0){
            //console.log("checking for on the way");
            waitingOnTheWay = waitingNavigations.filter((eachFromTo)=>(eachFromTo.from === liftIsAt && eachFromTo.to < liftIsAt && eachFromTo.to >= floorY)||(eachFromTo.from === 1 && eachFromTo.to > 1 && liftIsAt===1));
            //console.table(waitingOnTheWay);
        }
        
        
        if(waitingOnTheWay.length !== 0){
            console.log("Picking people");
            openCloseDown = true;
            waitingNavigations = waitingNavigations.filter((eachFromTo)=>!waitingOnTheWay.includes(eachFromTo));
            currentNavigationList = [...currentNavigationList,...waitingOnTheWay];
            waitingOnTheWay = [];
            //console.table(currentNavigationList);
            //console.table(waitingNavigations);
            //console.table(waitingOnTheWay);
        }
        
      
    
        updatedCurrentNavigationList = currentNavigationList.filter((eachFromTo)=>(eachFromTo.to === liftIsAt && eachFromTo.from >= liftIsAt)||(eachFromTo.from === 1 && eachFromTo.to > 1));
        if(updatedCurrentNavigationList.length !== 0){
            openCloseDown = true;
            updatedCurrentNavigationList.map((eachFromTo)=>eachFromTo.event.target.classList.remove("input-button-clicked-style"));
            console.table("Dropping people");
            //console.table(updatedCurrentNavigationList);
           
            stillInLift = currentNavigationList.filter((eachFromTo)=>!updatedCurrentNavigationList.includes(eachFromTo));
            currentNavigationList = [...stillInLift];
            updatedCurrentNavigationList=[];
            
        }
        //liftElement.style.marginTop = `${liftIsAt * 160}px`;
        console.log("From and To requests inside the lift");
        console.table(currentNavigationList);
        //console.table(currentNavigationList);
        //console.table(waitingNavigations);
        //console.table(waitingOnTheWay);
       
        if(currentNavigationList.length === 0){
            //console.log("Lift is empty");
            if(openCloseDown === true){
                setTimeout(liftOpenClose,3000);
            }
            clearInterval(moveToTimerId);
            
            timerId = setInterval(startNavigating,7000);
           
            return;
        }
        
         if(liftIsAt === floorY){
            //console.log("lift is at the floorY")
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
                    //console.table(currentNavigationList);
                    //console.table(waitingNavigations);
                    //console.table(waitingOnTheWay);
                    timerId = setInterval(startNavigating,5000);
                    
                   
                    
                    return;
                }
                if(openCloseDown === true){
                    setTimeout(liftOpenClose,3000);
                }
                //console.table(currentNavigationList);
                  //  console.table(waitingNavigations);
                    //console.table(waitingOnTheWay);
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
            //liftElement.classList.remove("lift-room-movement");
            liftElement.style.marginTop = `${4-liftIsAt*160}px`;
            console.log("Moving up");
            goUp(floorX,floorY);
            
        },15000);
    }
    else{
       
        moveToTimerId = setInterval(function(){
            //liftElement.classList.remove("lift-room-movement");
            liftElement.style.marginTop = `${4-liftIsAt*160}px`;
            console.log("Moving down");
            goDown(floorX,floorY);
        },15000);
    }
}


function startNavigating(){
    openClose = false;
    openCloseDown = false;
    //console.table(currentNavigationList);
    //console.table(waitingNavigations);
    //console.table(waitingOnTheWay);
   
    if(currentNavigationList.length === 0 && waitingNavigations.length === 0){
        liftStatus = 0;
        console.log("Stopped Navigation");
        clearInterval(timerId);
        return;
    }
    if(currentNavigationList.length === 0 && waitingNavigations.length !== 0){
        currentNavigationList = [...waitingNavigations];
        waitingNavigations = [];
        clearInterval(timerId);
    }
    if(currentNavigationList.length !== 0 && waitingNavigations.length > 0 && (liftIsAt === 1)){
        if(currentNavigationList[0].from >= waitingNavigations[0].from){
            let temp = currentNavigationList[0];
            currentNavigationList[0] = waitingNavigations[0];
            waitingNavigations[0] = temp;
           
        }
    }
    if(currentNavigationList.length !== 0 && waitingNavigations.length > 0 && (liftIsAt === 4)){
        if(currentNavigationList[0].from <= waitingNavigations[0].from){
            let temp = currentNavigationList[0];
            currentNavigationList[0] = waitingNavigations[0];
            waitingNavigations[0] = temp;
           
        }
    }
    
    console.log("From and To requests inside the lift");
    console.table(currentNavigationList);
    //console.table(waitingNavigations);
    //console.table(waitingOnTheWay);

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
        startNavigating();
    }
    else{
        waitingNavigations = [...waitingNavigations,{
            from,
            to,
            event
        }];
    }
}
