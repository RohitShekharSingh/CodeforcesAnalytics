// alert("hlo");
document.getElementById("wa").innerHTML=0;
document.getElementById("ac").innerHTML=0;
document.getElementById("tle").innerHTML=0;
document.getElementById("ce").innerHTML=0;
document.getElementById("re").innerHTML=0;

var text = '' ;
var ele=document.getElementById("box");

ele.addEventListener("change",function(e)
{
    e.preventDefault();

    text= e.target.value;
});



document.getElementById("btn").addEventListener("click",function(){

    ele.value=' ';

    var handle = text;

    text = '' ;
    
    
    var xmll = new XMLHttpRequest();

    xmll.onreadystatechange = function(){

        if(this.readyState==4 && this.status == 200){

            var myobj=JSON.parse(this.responseText);

            // console.log(myobj);

            document.getElementById("conts").innerHTML=myobj.result.length;

           

        }
    }

    xmll.open("GET" ,"https://codeforces.com/api/user.rating?handle="+handle , true);
    xmll.send();

    var xmlll = new XMLHttpRequest();



    xmlll.onreadystatechange = function(){

        if(this.readyState==4 && this.status == 200){

            var myobj=JSON.parse(this.responseText);

            var name=myobj.result[0].firstName+myobj.result[0].lastName;

            // console.log(typeof(name));

            
            if(typeof(name)=="number"){document.getElementById("handlle").innerHTML="NotProvided";}
            else
            {document.getElementById("handlle").innerHTML=name;}

            document.getElementById("rating").innerHTML=myobj.result[0].rank;



        }
    }

    xmlll.open("GET" ,"https://codeforces.com/api/user.info?handles="+handle , true);
    xmlll.send();

    var xmllll = new XMLHttpRequest();



    xmllll.onreadystatechange = function(){

        if(this.readyState==4 && this.status == 200){

            var myobj=JSON.parse(this.responseText);

        
            console.log("bjbkjb",myobj);

            var wa=0,ac=0,tle=0,ce=0,re=0,hrted=0,nme='';

            for(var i=0;i<myobj.result.length;i++)
            {
                if(myobj.result[i].verdict=="TIME_LIMIT_EXCEEDED"){tle++;}
                if(myobj.result[i].verdict=="OK"){ac++;

                    if(myobj.result[i].problem.rating>hrted)
                    {hrted=myobj.result[i].problem.rating;
                    nme=myobj.result[i].problem.name;}
                
                }
                if(myobj.result[i].verdict=="WRONG_ANSWER"){wa++;}
                          
                if(myobj.result[i].verdict=="COMPILATION_ERROR"){ce++;}
                if(myobj.result[i].verdict=="RUNTIME_ERROR"){re++;}
            }
            document.getElementById("tried").innerHTML=myobj.result.length;



            document.getElementById("wa").innerHTML=wa;
            document.getElementById("ac").innerHTML=ac;
            document.getElementById("tle").innerHTML=tle;
            document.getElementById("ce").innerHTML=ce;
            document.getElementById("re").innerHTML=re;

            document.getElementById("hrated").innerHTML=hrted + "  Name => ("+nme+")" ;




        


        }
    }

    xmllll.open("GET" ,"https://codeforces.com/api/user.status?handle="+handle , true);
    xmllll.send();
});


