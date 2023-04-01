$(document).ready(function(){ //executes once the page loads
    //declaring variables
    let colors = ["red","blue","green","yellow","purple","orange"];
    codepegArray = [];
    answerCode = [];
    let round = 0;

    //randomizing an answer code
    for (i=0; i<4; i++){
        colorIndex = Math.floor(Math.random()*5);
        newColor = colors[colorIndex];
        answerCode.push(newColor);
    };

    console.log("answer code: "+answerCode);
    colorsPresent = [];
    
    //checks for colors present in answer code
    for (i=0;i<4;i++){
        console.log(colorsPresent.includes(answerCode[i].color));
        if (colorsPresent.includes(answerCode[i].color) == false){
            colorsPresent.push(answerCode[i].color);
            //console.log("colorspresent: "+colorsPresent);
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

    //call the function & add the HTML code 
    for(let i=0; i<7; i++){
        newCodepegRow = [];
        for (let j=0; j<4; j++){
            newCodepeg = new codepeg("grey",i,j);
            codepegCol.innerHTML += "<span class = \"dot_codepeg\" id = \"codepeg_" +i +"_"+j+"\" style=\"background-color: grey\"></span>";
            newCodepegRow.push(newCodepeg);
        };
        codepegArray.push(newCodepegRow);
        codepegCol.innerHTML += "<br>";
    };
    // console.log(codepegCol.innerHTML);
    // console.log("printing codepegArray");
    // console.log(codepegArray);
    // console.log("codepegsHTML: "+col.innerHTML);

    //creating empty hint pegs
    hintpegCol = document.getElementById("hintpegs");
    for(let i=0; i<7; i++){
        for (let j=0; j<4; j++){
            hintpegCol.innerHTML += "<span class = \"dot_hintpeg\" id = \"hintpeg_" +i +"_"+j+"\" style=\"background-color: grey\"></span>";
        };
        hintpegCol.innerHTML += "<br>";
    };
    
    //default
    currentColor = "grey";

    colorDropper = function(colorSelected){
        //update the current color variable
        if (currentColor != colorSelected){
            currentColor = colorSelected;
        }
        //add event listeners to the current codepegs of this round
        for (j=0;j<4;j++){
            document.getElementById("codepeg_"+round+"_"+j).addEventListener("click",changeColor(currentColor,j));
        }
    }

    //change the color of the codepeg selected
    changeColor = function(colorSelected,pegCol){
        //finding which OBJECT the codepeg is
        for(i=0;i<codepegArray.length;i++){
            codepegObj = codepegArray[i];
            if (codepegObj.codepegRow == round && codepegObj.codepegCol == pegCol){
                //change the style attribute in the codepeg html
                codepegElement = document.getElementById("codepeg_"+round+"_"+pegCol);
                codepegElement.innerHTML = "<span class = \"dot_codepeg\" id = \"codepeg_" +round +"_"+pegCol+"\" style=\"background-color: "+colorSelected+"\"></span>";
                selectedCodepeg = codepegArray[i];
                break;
            }
        }
        codepegElement.color = colorSelected;
    }

    for (i=0;i<6;i++){
        document.getElementById(colors[i]).addEventListener("click",colorDropper(colors[i]));
        //possible to change cursor to a color dropper??
    }
