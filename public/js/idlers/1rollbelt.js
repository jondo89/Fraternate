

function drawmaterial1roll(x,y,height,width,angle,rolloverlap,radiussetback,thickness,beltwidth,freeboard,surcharge) {

xstart=x;
ystart=y+thickness;
//console.log(x,y,thickness,angle,surcharge*180/Math.PI,angle)
var belting = ([[x,y+thickness]]);//starting coordinate
var lengthbelt=0;

//1
x=x+(beltwidth/2-freeboard);
y=y+thickness;
belting.push([x,y]);
//console.log("1",x,y)
//2
x=xstart;
y=y+(beltwidth/2-freeboard)*Math.tan(surcharge);
belting.push([x,y]);

//3
x=x-(beltwidth/2-freeboard);
y=y-(beltwidth/2-freeboard)*Math.tan(surcharge);

belting.push([x,y]);
//console.log("3",x,y)
//close the belting
belting.push([xstart,ystart]);

//populate the text paragraph box for autocad
      var belttext = "pline "
      for (var i = belting.length - 1; i >= 0; i--) {
                   belttext=belttext.concat((belting[i][0]) +","+ (belting[i][1]) + " ")
      };
      belttext=belttext.concat("c ")
//jquery fill the text box with variable.
 $("#belting").append(belttext);
//console.log(belttext)
return  belting

}
