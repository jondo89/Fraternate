function drawbelt5roll(x,y,height,width,angle,rolloverlap,radiussetback,thickness,beltwidth) {

xstart=x;
ystart=y;


var belting = ([[x,y,"yes"]]);//starting coordinate
var angle=angle*(3.14159/180);
var lengthbelt=0;
//console.log(angle);

//1
x=x+(width/2)-rolloverlap-radiussetback;
y=y;
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));

//2
x=x+radiussetback;
y=y;
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));

//3
x=x+(radiussetback)*Math.cos(angle)
y=y+(radiussetback)*Math.sin(angle)
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));

//4
x=x+((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle)
y=y+((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle)
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));

//5
x=x+(radiussetback)*Math.cos(angle)
y=y+(radiussetback)*Math.sin(angle)
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));

//6
x=x+(radiussetback)*Math.cos(angle*2)
y=y+(radiussetback)*Math.sin(angle*2)
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));


//7
x=x+((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle*2)
y=y+((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle*2)
belting.push([x,y]);
lengthbelt=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
console.log(lengthbelt)

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

//NA belt thickness
x=x-(thickness)*Math.sin(angle*2)
y=y+(thickness)*Math.cos(angle*2)
belting.push([x,y]);

//stage 2

var newradiussetback = radiussetback-thickness*Math.tan(angle/2)


//77
x=x-((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle*2)
y=y-((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle*2)
belting.push([x,y]);

//6
x=x-(newradiussetback)*Math.cos(angle*2)
y=y-(newradiussetback)*Math.sin(angle*2)
belting.push([x,y]);



//5
x=x-(newradiussetback)*Math.cos(angle)
y=y-(newradiussetback)*Math.sin(angle)
belting.push([x,y]);


//4
x=x-((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle)
y=y-((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle)
belting.push([x,y]);

//3
x=x-(newradiussetback)*Math.cos(angle)
y=y-(newradiussetback)*Math.sin(angle)
belting.push([x,y]);


//2
x=x-newradiussetback;
y=y;
belting.push([x,y]);


//1
x=x-((width/2)-rolloverlap-radiussetback);
y=y;
belting.push([x,y]);


//side 3

//1
x=x-((width/2)-rolloverlap-radiussetback);
y=y;
belting.push([x,y]);



//2
x=x-newradiussetback;
y=y;
belting.push([x,y]);


//3
x=x-(newradiussetback)*Math.cos(angle)
y=y+(newradiussetback)*Math.sin(angle)
belting.push([x,y]);



//4
x=x-((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle)
y=y+((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle)
belting.push([x,y]);

//5
x=x-(newradiussetback)*Math.cos(angle)
y=y+(newradiussetback)*Math.sin(angle)
belting.push([x,y]);


//6
x=x-(newradiussetback)*Math.cos(angle*2)
y=y+(newradiussetback)*Math.sin(angle*2)
belting.push([x,y]);


//77
x=x-((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle*2)
y=y+((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle*2)
belting.push([x,y]);


//NA belt thickness
x=x-(thickness)*Math.sin(angle*2)
y=y-(thickness)*Math.cos(angle*2)
belting.push([x,y]);


//7
x=x+((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle*2)
y=y-((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle*2)
belting.push([x,y]);

//6
x=x+(radiussetback)*Math.cos(angle*2)
y=y-(radiussetback)*Math.sin(angle*2)
belting.push([x,y]);


//5
x=x+(radiussetback)*Math.cos(angle)
y=y-(radiussetback)*Math.sin(angle)
belting.push([x,y]);

//4
x=x+((width)-rolloverlap*2-radiussetback*2)*Math.cos(angle)
y=y-((width)-rolloverlap*2-radiussetback*2)*Math.sin(angle)
belting.push([x,y]);


//3
x=x+(radiussetback)*Math.cos(angle)
y=y-(radiussetback)*Math.sin(angle)
belting.push([x,y]);


//2
x=x+radiussetback;
y=y;
belting.push([x,y]);


//1
x=x+(width/2)-rolloverlap-radiussetback;
y=y;
belting.push([x,y]);



//close the beltinggle
belting.push([xstart,ystart,"yes"]);



//populate the text paragraph box for autocad
      var belttext = "pline "
      for (var i = belting.length - 1; i >= 0; i--) {
                   belttext=belttext.concat((belting[i][0]) +","+ (belting[i][1]) + " ")
      };
      belttext=belttext.concat("c ")
//jquery fill the text box with variable.
 $("#belting").append(belttext);

return  belting;

}

