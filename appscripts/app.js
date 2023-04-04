$(document).ready(function(){ //executes once the page loads
    //declaring variables
    let colors = ["red","blue","green","yellow","purple","orange"];
    codepegArray = [];
    answerCode = [];
    let roundRow = 6;

    //randomizing an answer code
    for (i=0; i<4; i++){
        colorIndex = Math.floor(Math.random()*5);
        newColor = colors[colorIndex];
        answerCode.push(newColor);
    };

    console.log("answer code: "+answerCode);
    colorsPresent = [];
    
    for (i=0;i<4;i++){
        console.log(colorsPresent.includes(answerCode[i].color));
        if (colorsPresent.includes(answerCode[i].color) == false){
            colorsPresent.push(answerCode[i].color);
            console.log("colorspresent: "+colorsPresent);
        };
    };

    //creating empty code pegs

    //function to initiate an empty codpeg OBJECT
    function codepeg(color,codepegRow,codepegCol){
        this.color = color;
        this.codepegRow = codepegRow;
        this.codepegCol = codepegCol;
    };
    
    codepegCol = document.getElementById("codepegs");

    for(let i=0; i<7; i++){
        codepegCol.innerHTML += "<div class = \"codeRows\" id = \"codeRow_"+ i +"\" ></div>"
        codepegRow = document.getElementById("codeRow_"+i);
        newCodepegRow = [];
        for (let j=0; j<4; j++){
            newCodepeg = new codepeg("grey",i,j);
            newCodepegRow.push(newCodepeg);
            codepegRow.innerHTML += "<div class = \"dot_codepeg\" id = \"codepeg_" +i +"_"+j+"\" style=\"background-color: grey\"></div>";
        };
        codepegArray.push(newCodepegRow);
        codepegRow.innerHTML += "<br></div>";
    };

    console.log(document.getElementById("codepegs").innerHTML);

    //version i'm editing on
    hintpegCol = document.getElementById("hintpegs");

    for(let i=0; i<7; i++){
        hintpegCol.innerHTML += "<div class = \"hintRows\" id = \"hintRow_"+ i +"\" ></div>"
        hintpegRow = document.getElementById("hintRow_"+i);
        for (let j=0; j<4; j++){
            hintpegRow.innerHTML += "<div class = \"dot_hintpeg\" id = \"hintpeg_" +i +"_"+j+"\" style=\"background-color: grey\"></div>";
            if (j==1){
                hintpegRow.innerHTML+="<br>";
            }
        };
        hintpegRow.innerHTML += "<br></div>";
    };

    console.log(document.getElementById("hintpegs").innerHTML);
    
    //default
    currentColor = "grey";

    colorDropper = function(colorSelected){
        if (currentColor != colorSelected){
            currentColor = colorSelected;
        }
        row = [0,1,2,3];
        for (const pegCol of row){
            curID = "codepeg_"+roundRow+"_"+pegCol;
            document.getElementById("codepeg_"+roundRow+"_"+pegCol).addEventListener("click",function(){changeColor(currentColor,pegCol);});
        }
    }

    changeColor = function(colorSelected,pegCol){
        //changing the HTML style attribute
        codepegElement = document.getElementById("codepeg_"+roundRow+"_"+pegCol);
        codepegElement.innerHTML = "<div class = \"dot_codepeg\" id = \"codepeg_" +roundRow +"_"+pegCol+"\" style=\"background-color: "+colorSelected+"\"></div>";
        
        //changing the "color" attribute of the OBJECT
        curObjRow = codepegArray[roundRow];
        const tarCodepeg = curObjRow.find(item => item.codepegCol === pegCol);
        tarCodepeg.color = colorSelected;
    }

    for (const curColor of colors){
        document.getElementById(curColor).addEventListener("click",function(){colorDropper(curColor);});
    }

    checkAnswer = function(){
        currentRowCode = codepegArray[roundRow];
        userAns = [];
        const correctAns = [...answerCode];
        console.log("for this round, the answer code starts at: "+correctAns);
        for (j=0;j<4;j++){
            userAns.push(currentRowCode[j].color);
            console.log(userAns);
        }
        blackHints = 0;
        whiteHints = 0;
        if (userAns.includes("grey")){
            window.alert("Round voided.");
        }
        else {
            for (i=0;i<4;i++){
                if (userAns[i] == correctAns[i] && userAns[i]!="NIL"){
                    console.log("checking for black hints: ")
                    console.log("user ans: "+userAns[i]);
                    console.log("user ans: "+correctAns[i]);
                    blackHints += 1;
                    userAns[i] = "NIL";
                    correctAns[i] = "NIL";
                }
            }
            for (k=0;k<4;k++){
                if (userAns[k]!="NIL"){
                    for (m=0;m<4;m++){
                        if (userAns[k] == correctAns[m]){
                            whiteHints += 1;
                            userAns[k] = "NIL";
                            correctAns[m] = "NIL";
                            break;
                        }
                    }
                }
            }      
        }
        // console.log("end of function");
        displayHints(blackHints,whiteHints,roundRow);
        if (blackHints == 4){
            window.alert("CONGRATULATIONS! You have cracked the code!");
        }
        roundRow -= 1;
    }

    displayHints = function(blackHints,whiteHints,roundRow){
        bHints = blackHints*1;
        wHints = whiteHints*1;
        numOfHints = bHints + wHints;
        
        for(i=0;i<bHints;i++){
            // console.log("i loop is called: "+i);
            curHintpegBlack = document.getElementById("hintpeg_"+roundRow+"_"+i);
            curHintpegBlack.innerHTML = "<div class = \"dot_hintpeg\" id = \"hintpeg_" +roundRow +"_"+i+"\" style=\"background-color: black\"></div>";
        }

        for(j=bHints;j<numOfHints;j++){
            curHintpegBlack = document.getElementById("hintpeg_"+roundRow+"_"+j);
            curHintpegBlack.innerHTML = "<div class = \"dot_hintpeg\" id = \"hintpeg_" +roundRow +"_"+j+"\" style=\"background-color: white\"></div>";
        }
    }

    document.getElementById("checkButton").addEventListener("click", function(){checkAnswer();});
});
