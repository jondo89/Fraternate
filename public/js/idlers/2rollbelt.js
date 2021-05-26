/*
Buglist

General
	*Ideally the idler shafts should be drawn.
	*allow for stepped shafts and radius (mmmmmm).
	*Need to check all lengths of belting , specifically where input lengths equal node points.
	*there is a legacy red line on the canvas 
1 roll
	*Gauge length is incorrectly calculated - Corrected 20141126.
	*Add the segment of material - Corrected 20141127.
	*area calculation and area draw based on loading
	*error on zero radius
	*there is a legacy red line on the canvas 
2 roll
	*Gauge length is incorrectly calculated - Corrected 20141127.
	*surcharge at zero 
	*belt length lower than the segment length
	*trough angle over 90 ( belt thickness comes into this.)
	*closer of polyline of belt is a problem with the cl command in CAD , start end point will have to be relocated on CAD draw component.
	*area calculation and area draw based on loading
	*error on zero radius
	*there is a legacy red line on the canvas 
3 roll
	*Gauge length is incorrectly calculated - Corrected 20141127.
	*Belt matrix - Correct 20141201
	*Material matrix
	*Draw CAD
	*Draw Canvas
	*area calculation and area draw based on loading
	*error on zero radius
	*there is a legacy red line on the canvas 
5 roll
	*Gauge length is incorrectly calculated - Corrected 20141127.
	*Belt matrix
	*Material matrix
	*Draw CAD
	*Draw Canvas
	*area calculation and area draw based on loading
	*error on zero radius
	*there is a legacy red line on the canvas 
*/

function drawbelt2roll(x,y,height,width,angle,rolloverlap,radiussetback,thickness,beltwidth,numberofrolls,Tracking,freeboard) {

xstart=x;
ystart=y;

//this concole.log is useful for debugging
//console.log(x,y,height,width,angle,rolloverlap,radiussetback,"thickness",thickness,beltwidth,"here",numberofrolls)

beltwidth=beltwidth/2;

//two varibales are declared , belting defines the profile of the belt belt along the full idler.
//belting actuctual will hold the profile for the belt to be drawn.

//used to plot the entire belt
var belting = ([[x,y,"yes"]]);//starting coordinate
//used to measure the belt length
var beltingactual = ([[x,y,"yes"]]);//starting coordinate
//array used to store segment length
var segmentlength = ([0]);//starting coordinate
//array used to offsets

var offsetbelting = ([[]]);//starting coordinate
//console.log("0",offsetbelting)
//this is to allow for the turn up on the last idler in 5 roll belting.
if (numberofrolls==1) {
var angle1=0
var angle2=0
var angle3=0
};
if (numberofrolls==2) {
var angle1=(angle*(Math.PI/180));
var angle2=(angle*(Math.PI/180));
var angle3=(angle*(Math.PI/180));
};
if (numberofrolls==3) {
var angle1=0
var angle2=(angle*(Math.PI/180));
var angle3=(angle*(Math.PI/180));
};

if (numberofrolls==5) {
var angle1=0
var angle2=(angle*(Math.PI/180));
var angle3=(angle*(Math.PI/180))*2;
};

//console.log(angle1*180/Math.PI,angle2*180/Math.PI,angle3*180/Math.PI)


//this is the quadrant selector and is used to determine the quadrant ( 7 quadrants in total 5 roll ) that the belt width will be drawn in.
function checklength(arraybelting)
{
var lengthbelt=0;
for (var i = 0; i < arraybelting.length; i++) {
	try	{
		x1=arraybelting[i-1][0]
		y1=arraybelting[i-1][1]
	}
	catch(e){
		var x1=0
		var	y1=0
	}	
		x2=arraybelting[i][0]
		y2=arraybelting[i][1]
		lengthbelt=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))+lengthbelt;
		//console.log(lengthbelt)
		if (beltwidth/2>lengthbelt) {



		} else{};
	};
	
	};


//this batch of varibalies stores the new circle radius , very complicated , but defines the length of the line between the circle center and intersection roll
//face line , it is to do with the calcualtion of the cords of the cirle.
radiussetback1=radiussetback*Math.tan(angle1)

//this batch of varibalies stores the circle center points.
var centerpoints = ([[x,radiussetback/Math.cos(angle1),"yes"]]);//starting coordinate

//define direction and length of segments
var removed = offsetbelting.splice(0, 1); 
// for some un godly reason there is an additional point in the array ,  I cannot explain
//1 ok

var lengthtemp=(Math.sqrt(Math.pow((radiussetback*angle1),2)+Math.pow((radiussetback*angle1*Math.tan(angle1)),2)))
lengthtemp = ((2*radiussetback*Math.sin(angle1*2/2))/2)/(Math.cos(angle1))
//console.log(lengthtemp)
offsetbelting.push([(lengthtemp)*Math.cos(angle1),(lengthtemp)*Math.sin(angle1)]);
//console.log("1",offsetbelting[0][0],offsetbelting[0][1])

if (numberofrolls==2) {
//2 ok
//this is the first offset on the v return
offsetbelting.push([(-lengthtemp-rolloverlap)*Math.cos(angle1),(-lengthtemp-rolloverlap)*Math.sin(angle1)]);
//console.log("2",offsetbelting[1][0],offsetbelting[1][1])
//3 ok
offsetbelting.push([(width)*Math.cos(angle1),(width)*Math.sin(angle1)]);
//console.log("3",offsetbelting[2][0],offsetbelting[2][1])
//split---------------------------------------------
//4
offsetbelting.push([(width/2)*Math.cos(angle1),(width/2)*Math.sin(angle1)]);
//console.log("4",offsetbelting[3][0],offsetbelting[3][1])
//5
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle1),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle1)]);
//console.log("5",offsetbelting[4][0],offsetbelting[4][1])
//6 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle1),(radiussetback*Math.tan(angle2/2))*Math.sin(angle1)]);
//console.log("6",offsetbelting[5][0],offsetbelting[5][1])
//7 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle2),(radiussetback*Math.tan(angle2/2))*Math.sin(angle2)]);
//console.log("7",offsetbelting[6][0],offsetbelting[6][1])
//8
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle2),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle2)]);
//console.log("8",offsetbelting[7][0],offsetbelting[7][1])
//split---------------------------------------------
//9 good
offsetbelting.push([(width)*Math.cos(angle2),(width)*Math.sin(angle2)]);
//console.log("9",offsetbelting[8][0],offsetbelting[8][1])
//10 good
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle2),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle2)]);
//console.log("10",offsetbelting[9][0],offsetbelting[9][1])
//11
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle2),(radiussetback*Math.tan(angle2/2))*Math.sin(angle2)]);
//console.log("11",offsetbelting[10][0],offsetbelting[10][1])
//12 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle3),(radiussetback*Math.tan(angle2/2))*Math.sin(angle3)]);
//console.log("12",offsetbelting[11][0],offsetbelting[11][1])
//13
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle3),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle3)]);
//console.log("13",offsetbelting[12][0],offsetbelting[12][1])
//split---------------------------------------------
} 
else{
//2 ok
//this is the first offset on the v return
var lengthtemp=(Math.sqrt(Math.pow((radiussetback*angle1),2)+Math.pow((radiussetback*angle1*Math.tan(angle1)),2)))
offsetbelting.push([(-1*0-lengthtemp)*Math.cos(angle1),(-1*rolloverlap-lengthtemp)*Math.sin(angle1)]);
//console.log("2",offsetbelting[1][0],offsetbelting[1][1])
//3 
offsetbelting.push([(-1*0-lengthtemp)*Math.cos(angle1),(-1*rolloverlap-lengthtemp)*Math.sin(angle1)]);
//console.log("3",offsetbelting[2][0],offsetbelting[2][1])
//split---------------------------------------------
//4
offsetbelting.push([(width/2)*Math.cos(angle1),(width/2)*Math.sin(angle1)]);
//console.log("4",offsetbelting[3][0],offsetbelting[3][1])
//5
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle1),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle1)]);
//console.log("5",offsetbelting[4][0],offsetbelting[4][1])
//6 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle1),(radiussetback*Math.tan(angle2/2))*Math.sin(angle1)]);
//console.log("6",offsetbelting[5][0],offsetbelting[5][1])
//7 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle2),(radiussetback*Math.tan(angle2/2))*Math.sin(angle2)]);
//console.log("7",offsetbelting[6][0],offsetbelting[6][1])
//8
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle2),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle2)]);
//console.log("8",offsetbelting[7][0],offsetbelting[7][1])
//split---------------------------------------------
//9 good
offsetbelting.push([(width)*Math.cos(angle2),(width)*Math.sin(angle2)]);
//console.log("9",offsetbelting[8][0],offsetbelting[8][1])
//10 good
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle2),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle2)]);
//console.log("10",offsetbelting[9][0],offsetbelting[9][1])
//11
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle2),(radiussetback*Math.tan(angle2/2))*Math.sin(angle2)]);
//console.log("11",offsetbelting[10][0],offsetbelting[10][1])
//12 
offsetbelting.push([(radiussetback*Math.tan(angle2/2))*Math.cos(angle3),(radiussetback*Math.tan(angle2/2))*Math.sin(angle3)]);
//console.log("12",offsetbelting[11][0],offsetbelting[11][1])
//13
offsetbelting.push([(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.cos(angle3),(-1*rolloverlap-(radiussetback*Math.tan(angle2/2)))*Math.sin(angle3)]);
//console.log("13",offsetbelting[12][0],offsetbelting[12][1])
//split---------------------------------------------
};




//------------------------------------------------------------------------------------------
//This pushes the offsets in the belting varibale . therfor the belting array is the points 1 to 13 in cartesian coordinates.
for (var i = 0; i < offsetbelting.length; i++) {
	//console.log(offsetbelting)
	x=x+offsetbelting[i][0];
	y=y+offsetbelting[i][1];
	belting.push([x,y]);
};
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//Radius cicle centers
//this is the second circle center
var xtemp1=offsetbelting[1][0]*2+offsetbelting[2][0]+offsetbelting[3][0]+offsetbelting[4][0]
var ytemp1=offsetbelting[1][1]*2+offsetbelting[2][1]+offsetbelting[3][1]+offsetbelting[4][1]
//this batch of varibalies stores the circle center points.
centerpoints.push([centerpoints[0][0]+xtemp1,centerpoints[0][1]+ytemp1]);

//this is the third circle center
var xtemp1=offsetbelting[1][0]*2+offsetbelting[2][0]+offsetbelting[3][0]+offsetbelting[4][0]+offsetbelting[7][0]+offsetbelting[8][0]+offsetbelting[9][0]
var ytemp1=offsetbelting[1][1]*2+offsetbelting[2][1]+offsetbelting[3][1]+offsetbelting[4][1]+offsetbelting[7][1]+offsetbelting[8][1]+offsetbelting[9][1]
//this batch of varibalies stores the circle center points.
centerpoints.push([centerpoints[0][0]+xtemp1,centerpoints[0][1]+ytemp1]);

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------


//stage 2
//start belt draw new
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//stage 2
//start belt draw new

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//Detemine which segment is being worked in ,

var drawseglength= [];
var maxsegmentlength = [0];
maxsegmentlength.push(angle1*radiussetback);
maxsegmentlength.push(offsetbelting[3][0]+offsetbelting[4][0]);
maxsegmentlength.push(angle2*radiussetback);
maxsegmentlength.push((offsetbelting[3][0]+offsetbelting[4][0])*2);
maxsegmentlength.push(angle2*radiussetback);
// console.log(maxsegmentlength)

var templength=0
var workinglength=0;
for (var i = 0; i < maxsegmentlength.length; i++) {
	workinglength=maxsegmentlength[i]+workinglength
	switch (true) {
		case workinglength >= beltwidth:
			drawseglength.push(templength);
			var templength=0;
			//console.log(templength)
			//console.log("Dont Draw",i)
		break;
		case workinglength < beltwidth:
			//console.log("Draw",i)
			templength=beltwidth-workinglength
			//console.log(maxsegmentlength[i])
			drawseglength.push(maxsegmentlength[i])
			//console.log(i,templength)
		break;
	}
};

//trim of belt draw array for use , seperates the closure angles for 1 2 3 5 rolls.
var tempdrawlength=0
for (var i = 0; i < drawseglength.length; i++) {
	tempdrawlength=drawseglength[i]+tempdrawlength
};

switch (true) {
	case numberofrolls==1:
		drawseglength.splice(2)
		templength=beltwidth - drawseglength[1]
		drawseglength.push (templength)
	break;

	case numberofrolls==2:
		drawseglength.splice(2)
		templength=beltwidth - drawseglength[1]
		drawseglength.push (templength)
	break;

	case numberofrolls==3:
		//drawseglength.splice(4)
		templength=beltwidth - tempdrawlength
		drawseglength.push (templength)
	break;

	case numberofrolls==5:
		drawseglength.splice(6)
		templength=beltwidth - tempdrawlength
		drawseglength.push (templength)
	break;

}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

//this drawseglength variable now needs to be translated back into a co-ordinate matrix. This is critical to be able to draw into CAD
//and also in the event of any further changes or improvements.

var actualbeltline = ([[0,0]]);//starting coordinate
//vaiable formats of the drawsegement length

switch (true) {
	case numberofrolls==1:
		//1 roll drawseglength [0, 0, 826] 
		//create belting matrix
		actualbeltline.push ([drawseglength[1],0])
		actualbeltline.push ([drawseglength[2],0])
		actualbeltline.push ([drawseglength[2],thickness])
		actualbeltline.push ([drawseglength[1],thickness])
		actualbeltline.push ([-drawseglength[2],thickness])
		actualbeltline.push ([-drawseglength[2],0])

		//send to CAD
		var belttext = "pline "	
		for (var i = 0; i < actualbeltline.length; i++) {
			belttext=belttext.concat((actualbeltline[i][0]) +","+ (actualbeltline[i][1]) + " ")
		};
		belttext=belttext.concat("c ")
		$("#belting").append(belttext);

		//Send to Canvas
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo (drawseglength[2],0)
		ctx.lineTo (drawseglength[2],thickness)
		ctx.lineTo (drawseglength[1],thickness)
		ctx.lineTo (-drawseglength[2],thickness)
		ctx.lineTo (-drawseglength[2],0)
		ctx.lineTo(0,0);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#000000 ';
		ctx.fillStyle = '#CCCCCC';
		ctx.fill();
		ctx.stroke();
	break;

		case numberofrolls==2:
		//2 roll drawseglength [0, 45.814892864851146, 780.1851071351489] 

	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
	ctx.beginPath();
	startangle=0-Math.PI/2
	length=drawseglength[1]
	endangle=(length/radiussetback)-Math.PI/2
	var maxlength=angle1*radiussetback;
	//console.log("1",maxlength,length)
	switch (true) {
	//create belting matrix
	//send to CAD
	//Send to Canvas
	case maxlength == 0:
	break;
	case maxlength<length:
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback,
		startangle,
		angle1-Math.PI/2,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
	//console.log("Draw 1")
	break;

	case maxlength==length:
	//create belting matrix
	//console.log(drawseglength)		
	var actualbeltline=([[0,centerpoints[0][1]-radiussetback]])
	templengthvalue = drawseglength[1];
	tempvariable1 = templengthvalue/radiussetback
	tempvariable2=2*radiussetback*Math.sin(tempvariable1/2);
	actualbeltline.push ([(tempvariable2*Math.cos(tempvariable1/2))+actualbeltline[0][0],(tempvariable2*Math.sin(tempvariable1/2))+actualbeltline[0][1]])
	templengthvalue = drawseglength[1];
	tempvariable1 = templengthvalue/radiussetback
	//console.log(tempvariable1*180/Math.PI)
	actualbeltline.push([(-thickness*Math.sin(tempvariable1)+actualbeltline[1][0]),(thickness*Math.cos(tempvariable1)+actualbeltline[1][1])])

	//send to CAD

	//Send to Canvas
	ctx.beginPath();
	//console.log("Draw 3")
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

    ctx.scale(-1, 1);

	ctx.beginPath();
	//console.log("Draw 3")
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
	//console.log("Draw 3")
	ctx.scale(-1, 1);
	break;

	case maxlength>length:

	//create belting matrix
	console.log(drawseglength)		
	var actualbeltline=([[0,centerpoints[0][1]-radiussetback]])
	templengthvalue = drawseglength[1];
	tempvariable1 = templengthvalue/radiussetback
	tempvariable2=2*radiussetback*Math.sin(tempvariable1/2);
	actualbeltline.push ([(tempvariable2*Math.cos(tempvariable1/2))+actualbeltline[0][0],(tempvariable2*Math.sin(tempvariable1/2))+actualbeltline[0][1]])
	templengthvalue = drawseglength[1];
	tempvariable1 = templengthvalue/radiussetback
	console.log(tempvariable1*180/Math.PI)
	actualbeltline.push([(-thickness*Math.sin(tempvariable1)+actualbeltline[1][0]),(thickness*Math.cos(tempvariable1)+actualbeltline[1][1])])
	//send to CAD

	//Send to Canvas
	ctx.beginPath();
	//console.log("Draw 3")
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

    ctx.scale(-1, 1);

	ctx.beginPath();
	//console.log("Draw 3")
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centerpoints[0][0],
		centerpoints[0][1],
		radiussetback,
		startangle,
		endangle,
		false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
	//console.log("Draw 3")
	ctx.scale(-1, 1);
	break;

}
	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

	//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
	length=drawseglength[2]


	//create belting matrix
	actualbeltline.push([(length*Math.cos(angle1)+actualbeltline[1][0]),(length*Math.sin(angle1)+actualbeltline[1][1])])
	actualbeltline.push([(length*Math.cos(angle1)+actualbeltline[2][0]),(length*Math.sin(angle1)+actualbeltline[2][1])])



	//console.log(length)
	//console.log(actualbeltline)

	//send to CAD


	//Send to Canvas
	ctx.beginPath();
	ctx.moveTo(actualbeltline[1][0],actualbeltline[1][1]);
	ctx.lineTo(actualbeltline[3][0],actualbeltline[3][1]);
	ctx.lineTo(actualbeltline[4][0],actualbeltline[4][1]);
	ctx.lineTo(actualbeltline[2][0],actualbeltline[2][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
		ctx.scale(-1, 1);
	ctx.beginPath();
	ctx.moveTo(actualbeltline[1][0],actualbeltline[1][1]);
	ctx.lineTo(actualbeltline[3][0],actualbeltline[3][1]);
	ctx.lineTo(actualbeltline[4][0],actualbeltline[4][1]);
	ctx.lineTo(actualbeltline[2][0],actualbeltline[2][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
		ctx.scale(-1, 1);
	//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

	//333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
	ctx.beginPath();
	startangle=angle1-Math.PI/2
	length=drawseglength[3]
	endangle=startangle+(length/radiussetback)
	var maxlength=angle2*radiussetback;
	//console.log("3",maxlength,length)

	if (maxlength>length) {
					//create belting matrix
			//send to CAD

			//Send to Canvas
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			endangle,
			false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
				//console.log("Draw 1")
	} else{
					//create belting matrix
			//send to CAD

			//Send to Canvas
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			angle2-Math.PI/2,
			false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
			//	console.log("Draw 2")
	};

	//333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

	//444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
			//create belting matrix
			//send to CAD
			//Send to Canvas
	length=drawseglength[4]
	x=belting[7][0]+length*Math.cos(angle2)
	y=belting[7][1]+length*Math.sin(angle2)
	ctx.beginPath();
	ctx.moveTo(
		belting[7][0], 
		belting[7][1]);
	ctx.lineTo(x, y);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	//444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444

	//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
	ctx.beginPath();
	startangle=angle2-Math.PI/2
	length=drawseglength[5]
	endangle=startangle+(length/radiussetback)
	var maxlength=angle2*radiussetback;
	//console.log(maxlength)
	if (maxlength>length) {
					//create belting matrix
			//send to CAD
			//Send to Canvas
		ctx.arc(centerpoints[2][0],
			centerpoints[2][1],
			radiussetback,
			startangle,
			endangle,
			false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
	} else{
					//create belting matrix
			//send to CAD
			//Send to Canvas
		ctx.arc(centerpoints[2][0],
			centerpoints[2][1],
			radiussetback,
			startangle,
			angle3-Math.PI/2,
			false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#ff0000';
		ctx.stroke();
	};
	//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555

	//666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
		//create belting matrix
		actualbeltline.push([actualbeltline[0][0],actualbeltline[0][1]+thickness])
		actualbeltline.push([centerpoints[0][0],centerpoints[0][1]])

		//send to CAD
		var belttext = "pline "
		belttext=belttext.concat(actualbeltline[0][0] + ","+ actualbeltline[0][1] + " ")
		belttext=belttext.concat("arc ")
		belttext=belttext.concat("ce ")
		belttext=belttext.concat(centerpoints[0][0] + ","+ centerpoints[0][1] + " ")
		belttext=belttext.concat("length ")
		belttext=belttext.concat(drawseglength[1] + " ")
		$("#belting").append(belttext);

		var belttext = "line "
		belttext=belttext.concat(actualbeltline[3][0] + ","+ actualbeltline[3][1] + " ")
		belttext=belttext.concat(actualbeltline[4][0] + ","+ actualbeltline[4][1] + " ")
		belttext=belttext.concat(actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
		belttext=belttext.concat("arc ")
		belttext=belttext.concat(actualbeltline[5][0] + ","+ actualbeltline[5][1] + " ")
		$("#belting").append(belttext);

		var belttext = "arc "	
		belttext=belttext.concat(-actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
		$("#belting").append(belttext);

		var belttext = "line "
		belttext=belttext.concat(-actualbeltline[4][0] + ","+ actualbeltline[4][1] + " ")
		belttext=belttext.concat(-actualbeltline[3][0] + ","+ actualbeltline[3][1] + " ")
		belttext=belttext.concat(-actualbeltline[1][0] + ","+ actualbeltline[1][1] + " ")
		$("#belting").append(belttext);

		var belttext = "arc "	
		var belttext = "ce "	
		belttext=belttext.concat(centerpoints[0][0] + ","+ centerpoints[0][1] + " ")
		belttext=belttext.concat(actualbeltline[0][0] + ","+ actualbeltline[0][1] + " ")
				var belttext = "cl "
				//console.log(actualbeltline)
		$("#belting").append(belttext);

		//Send to Canvas
		length=drawseglength[6]
		x=belting[12][0]+length*Math.cos(angle3)
		y=belting[12][1]+length*Math.sin(angle3)
		ctx.beginPath();
		ctx.moveTo(
			belting[12][0], 
			belting[12][1]);
		ctx.lineTo(x, y);
		ctx.stroke();


	//666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
	break;

	case numberofrolls==3:
	//3 roll drawseglength [0, 0, 101.35259083407624, 45.814892864851146, 430.312441768069] 

	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
	var actualbeltline=([[0,0]])

	switch (true){
	case (drawseglength[2]<maxsegmentlength[2]):
	//only this segment
	//console.log("only this segment")
	//create belting matrix
	actualbeltline.push([drawseglength[2],0])
	//send to CAD

	//Send to Canvas
	ctx.beginPath();
	ctx.moveTo(
		actualbeltline[0][0], 
		actualbeltline[0][1]);
	ctx.lineTo(
		actualbeltline[1][0], 
		actualbeltline[1][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	break;

	case (drawseglength[2]>=maxsegmentlength[2]):
	//full length
	//console.log("full length")
	//create belting matrix
	actualbeltline.push([maxsegmentlength[2],0])
	//send to CAD

	//Send to Canvas
	}
	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

	//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
	switch (true) {

	case drawseglength[3] == 0:
	//console.log("==0 or do not draw segment")
	//create belting matrix
	actualbeltline.push([actualbeltline[1][0],thickness])
	actualbeltline.push([actualbeltline[1][0],0])
	//send to CAD
	var belttext = "pline "
	belttext=belttext.concat(actualbeltline[0][0] + ","+ actualbeltline[0][1] + " ")
	belttext=belttext.concat(actualbeltline[1][0] + ","+ actualbeltline[1][1] + " ")
	belttext=belttext.concat(actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
	belttext=belttext.concat(-actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
	belttext=belttext.concat(-actualbeltline[1][0] + ","+ actualbeltline[0][1] + " ")
	belttext=belttext.concat("cl ")
	$("#belting").append(belttext);
	//Send to Canvas
	ctx.beginPath();
	ctx.moveTo(
		actualbeltline[0][0], 
		actualbeltline[0][1]);
	ctx.lineTo(
		actualbeltline[1][0], 
		actualbeltline[1][1]);
	ctx.lineTo(
		actualbeltline[2][0], 
		actualbeltline[2][1]);
	ctx.lineTo(
		-actualbeltline[2][0], 
		actualbeltline[2][1]);
	ctx.lineTo(
		-actualbeltline[1][0], 
		actualbeltline[1][1]);
	ctx.lineTo(
		actualbeltline[0][0], 
		actualbeltline[0][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
	break;

	case drawseglength[3]<maxsegmentlength[3]:
	//console.log("< this is the working area , ie where the varied length segment is drawn")
	//create belting matrix
	var actualbeltline=([[0,0]])
	actualbeltline.push([drawseglength[2],0])
	templengthvalue = drawseglength[3];
	tempvariable1 = templengthvalue/radiussetback
	tempvariable2=2*radiussetback*Math.sin(tempvariable1/2);
	actualbeltline.push ([(tempvariable2*Math.cos(tempvariable1/2))+drawseglength[2],(tempvariable2*Math.sin(tempvariable1/2))+actualbeltline[0][1]])
	templengthvalue = drawseglength[3];
	tempvariable1 = templengthvalue/radiussetback
	//console.log(templengthvalue, tempvariable2,tempvariable1*180/Math.PI)
	actualbeltline.push([(-thickness*Math.sin(tempvariable1)+actualbeltline[2][0]),(thickness*Math.cos(tempvariable1)+actualbeltline[2][1])])
	actualbeltline.push([actualbeltline[1][0],thickness])
	actualbeltline.push([0,thickness])

	//send to CAD
	var belttext = "pline "
	belttext=belttext.concat(actualbeltline[0][0] + ","+ actualbeltline[0][1] + " ")
	belttext=belttext.concat(actualbeltline[1][0] + ","+ actualbeltline[1][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("length ")
	belttext=belttext.concat(drawseglength[3] + " ")
	$("#belting").append(belttext);

	var belttext = "line "
	belttext=belttext.concat(actualbeltline[3][0] + ","+ actualbeltline[3][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(-tempvariable1*180/Math.PI + " ")
	$("#belting").append(belttext);

	var belttext = "line "
	belttext=belttext.concat(-actualbeltline[1][0] + ","+ thickness + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(-centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(-tempvariable1*180/Math.PI + " ")
	$("#belting").append(belttext);

	var belttext = "line "
	belttext=belttext.concat(-actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(-centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(tempvariable1*180/Math.PI + " ")
	belttext=belttext.concat("cl ")
	$("#belting").append(belttext);

	//Send to Canvas
		startangle=angle1-Math.PI/2
		length=drawseglength[3]
		endangle=startangle+(length/radiussetback)
		ctx.beginPath();
		ctx.moveTo(
			actualbeltline[0][0], 
			actualbeltline[0][1]);
		ctx.lineTo(
			actualbeltline[1][0], 
			actualbeltline[1][1]);
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			endangle,
			false);
	//console.log("Draw 3")
	ctx.lineTo(
		actualbeltline[3][0], 
		actualbeltline[3][1]);
	ctx.moveTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);
	ctx.arc(centerpoints[1][0],
		centerpoints[1][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);

	ctx.moveTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);
	ctx.lineTo(
		actualbeltline[0][0], 
		thickness);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
		ctx.scale(-1, 1);
				ctx.beginPath();
		ctx.beginPath();
		ctx.moveTo(
			actualbeltline[0][0], 
			actualbeltline[0][1]);
		ctx.lineTo(
			actualbeltline[1][0], 
			actualbeltline[1][1]);
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			endangle,
			false);
	//console.log("Draw 3")
	ctx.lineTo(
		actualbeltline[3][0], 
		actualbeltline[3][1]);
	ctx.moveTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);
	ctx.arc(centerpoints[1][0],
		centerpoints[1][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);
	
	ctx.moveTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);
	ctx.lineTo(
		actualbeltline[0][0], 
		thickness);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
	ctx.scale(-1, 1);
	break;

	case drawseglength[3]==maxsegmentlength[3]:
	//console.log("== this is equal to segmentlength , this is draw full segment")
	
	//create belting matrix
	var actualbeltline=([[0,0]])
	actualbeltline.push([drawseglength[2],0])
	templengthvalue = drawseglength[3];
	tempvariable1 = templengthvalue/radiussetback
	tempvariable2=2*radiussetback*Math.sin(tempvariable1/2);
	actualbeltline.push ([(tempvariable2*Math.cos(tempvariable1/2))+drawseglength[2],(tempvariable2*Math.sin(tempvariable1/2))+actualbeltline[0][1]])
	templengthvalue = drawseglength[3];
	tempvariable1 = templengthvalue/radiussetback
	//console.log(templengthvalue, tempvariable2,tempvariable1*180/Math.PI)
	actualbeltline.push([actualbeltline[2][0]+drawseglength[4]*Math.cos(angle2),actualbeltline[2][1]+drawseglength[4]*Math.sin(angle2)])
	actualbeltline.push([actualbeltline[3][0]+thickness*Math.cos(angle2+90*Math.PI/180),actualbeltline[3][1]+thickness*Math.sin(angle2+90*Math.PI/180)])
	actualbeltline.push([actualbeltline[4][0]-drawseglength[4]*Math.cos(angle2),actualbeltline[4][1]-drawseglength[4]*Math.sin(angle2)])

	actualbeltline.push([(-thickness*Math.sin(tempvariable1)+actualbeltline[2][0]),(thickness*Math.cos(tempvariable1)+actualbeltline[2][1])])
	//console.log(drawseglength[4],angle2*180/Math.PI)
	actualbeltline.push([actualbeltline[1][0],thickness])
	actualbeltline.push([0,thickness])

	//send to CAD
	var belttext = "pline "
	belttext=belttext.concat(actualbeltline[0][0] + ","+ actualbeltline[0][1] + " ")
	belttext=belttext.concat(actualbeltline[1][0] + ","+ actualbeltline[1][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("length ")
	belttext=belttext.concat(drawseglength[3] + " ")
	$("#belting").append(belttext);

	var belttext = "line "

	belttext=belttext.concat(actualbeltline[3][0] + ","+ actualbeltline[3][1] + " ")
	belttext=belttext.concat(actualbeltline[4][0] + ","+ actualbeltline[4][1] + " ")
	belttext=belttext.concat(actualbeltline[5][0] + ","+ actualbeltline[5][1] + " ")
	$("#belting").append(belttext);	

	var belttext = "line "
	belttext=belttext.concat(actualbeltline[6][0] + ","+ actualbeltline[6][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(-tempvariable1*180/Math.PI + " ")
	$("#belting").append(belttext);

	var belttext = "line "
	belttext=belttext.concat(-actualbeltline[1][0] + ","+ thickness + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(-centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(-tempvariable1*180/Math.PI + " ")
	$("#belting").append(belttext);

	var belttext = "line "
	belttext=belttext.concat(-actualbeltline[4][0] + ","+ actualbeltline[4][1] + " ")
	belttext=belttext.concat(-actualbeltline[3][0] + ","+ actualbeltline[3][1] + " ")
	belttext=belttext.concat(-actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")

	$("#belting").append(belttext);	


	var belttext = "line "
	belttext=belttext.concat(-actualbeltline[2][0] + ","+ actualbeltline[2][1] + " ")
	belttext=belttext.concat("arc ")
	belttext=belttext.concat("ce ")
	belttext=belttext.concat(-centerpoints[1][0] + ","+ centerpoints[1][1] + " ")
	belttext=belttext.concat("angle ")
	belttext=belttext.concat(tempvariable1*180/Math.PI + " ")
	belttext=belttext.concat("cl ")
	$("#belting").append(belttext);

	//Send to Canvas
		startangle=angle1-Math.PI/2
		length=drawseglength[3]
		endangle=startangle+(length/radiussetback)
		ctx.beginPath();
		ctx.moveTo(
			actualbeltline[0][0], 
			actualbeltline[0][1]);
		ctx.lineTo(
			actualbeltline[1][0], 
			actualbeltline[1][1]);
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			endangle,
			false);
	//console.log("Draw 3")

	ctx.lineTo(
		actualbeltline[3][0], 
		actualbeltline[3][1]);

	ctx.lineTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);

	ctx.lineTo(
		actualbeltline[5][0], 
		actualbeltline[5][1]);

	ctx.moveTo(
		actualbeltline[7][0], 
		actualbeltline[7][1]);

	ctx.arc(centerpoints[1][0],
		centerpoints[1][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);

	ctx.moveTo(
		actualbeltline[7][0], 
		actualbeltline[7][1]);
	ctx.lineTo(
		actualbeltline[0][0], 
		thickness);

	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();


		ctx.scale(-1, 1);
		ctx.beginPath();
		ctx.moveTo(
			actualbeltline[0][0], 
			actualbeltline[0][1]);
		ctx.lineTo(
			actualbeltline[1][0], 
			actualbeltline[1][1]);
		ctx.arc(centerpoints[1][0],
			centerpoints[1][1],
			radiussetback,
			startangle,
			endangle,
			false);
	//console.log("Draw 3")

	ctx.lineTo(
		actualbeltline[3][0], 
		actualbeltline[3][1]);

	ctx.lineTo(
		actualbeltline[4][0], 
		actualbeltline[4][1]);

	ctx.lineTo(
		actualbeltline[5][0], 
		actualbeltline[5][1]);

	ctx.moveTo(
		actualbeltline[7][0], 
		actualbeltline[7][1]);

	ctx.arc(centerpoints[1][0],
		centerpoints[1][1],
		radiussetback-thickness,
		startangle,
		endangle,
		false);

	ctx.moveTo(
		actualbeltline[7][0], 
		actualbeltline[7][1]);
	ctx.lineTo(
		actualbeltline[0][0], 
		thickness);

	ctx.lineWidth = 5;
	ctx.strokeStyle = '#505050';
	ctx.stroke();
		ctx.scale(-1, 1);
	break;

	case drawseglength[3]>=maxsegmentlength[3]:
	//console.log("> this is greater than the max segement , this should never happen")
	//create belting matrix
	//send to CAD
	//Send to Canvas
	break;

	}

	//console.log(drawseglength)
	//console.log(maxsegmentlength)
	//console.log(actualbeltline)
	
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

//this is the material draw area.
switch (true) {
  case actualbeltline.length==9:
//what is the starting co ordinate of the segment for the surcharge angle ???
	console.log("heres")
	console.log(drawseglength)

	console.log(freeboard)
	switch (true) {
	/*	case drawseglength[5]

		break;

		case drawseglength[5]

		break;
		case drawseglength[2]

		break;*/

		case drawseglength[5]==freeboard:
		console.log("This is fairly easy as the radius is now on the segment end")
		break;

		case drawseglength[5]>freeboard:
		console.log("this is fairly easy as the segment will be on the staright section of the idler")
		break;
break;
  }
}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

	break;

	case numberofrolls==5:
	//5 roll drawseglength [0, 0, 113.45639592051282, 22.907446432425573, 226.91279184102564, 22.907446432425573, 439.8159193736104] 

	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
	var actualbeltline=([[0,0]])

	switch (true){
	case (drawseglength[2]<maxsegmentlength[2]):
	//only this segment
	console.log("only this segment")
	//create belting matrix
	actualbeltline.push([drawseglength[2],0])
	//send to CAD

	//Send to Canvas
	ctx.beginPath();
	ctx.moveTo(
		actualbeltline[0][0], 
		actualbeltline[0][1]);
	ctx.lineTo(
		actualbeltline[1][0], 
		actualbeltline[1][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	break;

	case (drawseglength[2]>=maxsegmentlength[2]):
	//full length
	console.log("full length")
	//create belting matrix
	actualbeltline.push([maxsegmentlength[2],0])
	//send to CAD

	//Send to Canvas
	ctx.beginPath();
	ctx.moveTo(
		actualbeltline[0][0], 
		actualbeltline[0][1]);
	ctx.lineTo(
		actualbeltline[1][0], 
		actualbeltline[1][1]);
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#ff0000';
	ctx.stroke();
	break;
	}
	//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

	//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
	//create belting matrix
	//send to CAD
	//Send to Canvas
	//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222

	//333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
	//create belting matrix
	//send to CAD
	//Send to Canvas
	//333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

	//444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
	//create belting matrix
	//send to CAD
	//Send to Canvas
	//444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444

	//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
	//create belting matrix
	//send to CAD
	//Send to Canvas
	//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555

	//666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
	//create belting matrix
	//send to CAD
	//Send to Canvas
	//666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666

	break;
}

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------


//console.log("offsetbelting",offsetbelting)
//console.log("drawseglength",drawseglength)
//console.log("belting",belting)
//console.log("actualbeltline",actualbeltline)
//console.log("Conterpoints",centerpoints)


/*
for (var i = 0; i < belting.length; i++) {
      ctx.beginPath();
      ctx.arc(belting[i][0], belting[i][1], 1, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
};
  
for (var i = 0; i < belting.length; i++) {

ctx.fillStyle = 'blue';	
ctx.font = "5px Arial";
ctx.fillText(i,-belting[i][0],-belting[i][1]-3);
};
   */
ctx.scale(-1, -1);    
return  actualbeltline;

}

