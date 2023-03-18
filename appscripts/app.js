$(document).ready(function(){ //executes once the page loads
    //randomize answer code
    colors = [red,blue,green,yellow,purple,orange];

    //creating empty code pegs
    for(let i=0; i<28; i++){
        let peg = "<div class=\"emptycodepeg\" id=\"codepeg_" + i + "\" ></div>";
        console.log(peg);
    }

    //creating empty hint pegs
    for(let i=0; i<28; i++){
        let peg = "<div class=\"emptykeypegs\" id=\"keypeg_" + i + "\" ></div>";
    }
})


function checkCode(userCode,answerCode){
    //insert code here
    return true;
}