/*
===============================================================================
 Name        : DrawLine.c
 Author      : $RJ
 Version     :
 Copyright   : $(copyright)
 Description : main definition
===============================================================================
*/

#include <cr_section_macros.h>
#include <NXP/crp.h>
#include "LPC17xx.h"                        /* LPC17xx definitions */
#include "ssp.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>



/* Be careful with the port number and location number, because

some of the location may not exist in that port. */

#define PORT_NUM            0


uint8_t src_addr[SSP_BUFSIZE];
uint8_t dest_addr[SSP_BUFSIZE];


#define ST7735_TFTWIDTH 127
#define ST7735_TFTHEIGHT 159

#define ST7735_CASET 0x2A
#define ST7735_RASET 0x2B
#define ST7735_RAMWR 0x2C
#define ST7735_SLPOUT 0x11
#define ST7735_DISPON 0x29



#define swap(x, y) {x = x + y; y = x - y; x = x - y ;}

// defining color values

#define BLACK  0x000000
#define WHITE  0xFFFFFF
#define GREEN  0x00FF00
#define RED    0xFF0000
#define BLUE   0x0000FF
#define YELLOW 0xFFFF00
#define CYAN   0x00FFFF
#define MAGENTA 0xFF00FF
#define PURPLE 0x8000FF
#define ORANGE 0xFF8000
#define OLIVE 0x808000
#define LTBLUE 0x9090FF
#define BROWN 0xA52A2A
#define WHEAT 0xF5DEB3
#define LIGHTGREEN 0x90EE90



int _height = ST7735_TFTHEIGHT;
int _width = ST7735_TFTWIDTH;
int x_list[3800];
int y_list[3800];
int cursor_x = 0, cursor_y = 0;

// Vertex definition
struct Vertex {

	int x;
	int y;
};

// Point definition
struct Point {

	float x;
	float y;
};

void spiwrite(uint8_t c)

{

 int pnum = 0;

 src_addr[0] = c;

 SSP_SSELToggle( pnum, 0 );

 SSPSend( pnum, (uint8_t *)src_addr, 1 );

 SSP_SSELToggle( pnum, 1 );

}



void writecommand(uint8_t c)

{

 LPC_GPIO0->FIOCLR |= (0x1<<21);

 spiwrite(c);

}



void writedata(uint8_t c)

{

 LPC_GPIO0->FIOSET |= (0x1<<21);

 spiwrite(c);

}



void writeword(uint16_t c)

{

 uint8_t d;

 d = c >> 8;

 writedata(d);

 d = c & 0xFF;

 writedata(d);

}



void write888(uint32_t color, uint32_t repeat)

{

 uint8_t red, green, blue;

 int i;

 red = (color >> 16);

 green = (color >> 8) & 0xFF;

 blue = color & 0xFF;

 for (i = 0; i< repeat; i++) {

  writedata(red);

  writedata(green);

  writedata(blue);

 }

}



void setAddrWindow(uint16_t x0, uint16_t y0, uint16_t x1, uint16_t y1)

{

 writecommand(ST7735_CASET);

 writeword(x0);

 writeword(x1);

 writecommand(ST7735_RASET);

 writeword(y0);

 writeword(y1);

}


void fillrect(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint32_t color)

{

 int16_t i;

 int16_t width, height;

 width = x1-x0+1;

 height = y1-y0+1;

 setAddrWindow(x0,y0,x1,y1);

 writecommand(ST7735_RAMWR);

 write888(color,width*height);

}



void lcddelay(int ms)

{

 int count = 24000;

 int i;

 for ( i = count*ms; i--; i > 0);

}



void lcd_init()

{

 int i;
 printf("LCD Demo Begins!!!\n");
 // Set pins P0.16, P0.21, P0.22 as output
 LPC_GPIO0->FIODIR |= (0x1<<16);

 LPC_GPIO0->FIODIR |= (0x1<<21);

 LPC_GPIO0->FIODIR |= (0x1<<22);

 // Hardware Reset Sequence
 LPC_GPIO0->FIOSET |= (0x1<<22);
 lcddelay(500);

 LPC_GPIO0->FIOCLR |= (0x1<<22);
 lcddelay(500);

 LPC_GPIO0->FIOSET |= (0x1<<22);
 lcddelay(500);

 // initialize buffers
 for ( i = 0; i < SSP_BUFSIZE; i++ )
 {

   src_addr[i] = 0;
   dest_addr[i] = 0;
 }

 // Take LCD display out of sleep mode
 writecommand(ST7735_SLPOUT);
 lcddelay(200);

 // Turn LCD display on
 writecommand(ST7735_DISPON);
 lcddelay(200);

}




void drawPixel(int16_t x, int16_t y, uint32_t color)

{

 if ((x < 0) || (x >= _width) || (y < 0) || (y >= _height))

 return;

 setAddrWindow(x, y, x + 1, y + 1);

 writecommand(ST7735_RAMWR);

 write888(color, 1);

}



/*****************************************************************************


** Descriptions:        Draw line function

**

** parameters:           Starting point (x0,y0), Ending point(x1,y1) and color

** Returned value:        None

**

*****************************************************************************/


void drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint32_t color)

{

 int16_t slope = abs(y1 - y0) > abs(x1 - x0);

 if (slope) {

  swap(x0, y0);

  swap(x1, y1);

 }

 if (x0 > x1) {

  swap(x0, x1);

  swap(y0, y1);

 }

 int16_t dx, dy;

 dx = x1 - x0;

 dy = abs(y1 - y0);

 int16_t err = dx / 2;

 int16_t ystep;

 if (y0 < y1) {

  ystep = 1;

 }

 else {

  ystep = -1;

 }

 for (; x0 <= x1; x0++) {

  if (slope) {

   drawPixel(y0, x0, color);

  }

  else {

   drawPixel(x0, y0, color);

  }

  err -= dy;

  if (err < 0) {

   y0 += ystep;

   err += dx;

  }

 }

}


/*

 Main Function main()

*/

void fill_tree_point(int index,int right_index, int x_list[], int y_list[]){
	int x0  = x_list[index];
	int y0 = y_list[index];

	int x1, y1, x, y;

	x1 = x_list[right_index];
	y1 = y_list[right_index];

	x = x1 + 0.8 * (x1 - x0);
	y = y1 + 0.8* (y1 - y0);

	#define delta_x -x1
	#define delta_y -y1
	#define pi 3.14
	#define alpha pi/6
	int x_prime = x + delta_x;
	int y_prime = y + delta_y;

	int x_doubleprime = cos(alpha) * x_prime - sin(alpha)*y_prime;
	int y_doubleprime = sin(alpha) * x_prime + cos(alpha)* y_prime;
	int x_doubleprime_right = cos(-alpha) * x_prime - sin(-alpha)*y_prime;
	int y_doubleprime_right = sin(-alpha) * x_prime + cos(-alpha)* y_prime;

	int x_temp = x_doubleprime - delta_x;
	int y_temp = y_doubleprime- delta_y;
	int x_temp_right = x_doubleprime_right - delta_x;
	int y_temp_right = y_doubleprime_right- delta_y;
	x_list[right_index* 3 - 1] = x_temp;
	y_list[right_index* 3 - 1] = y_temp;
	x_list[right_index* 3] = x;
	y_list[right_index* 3 ] = y;
	x_list[right_index* 3 + 1] = x_temp_right;
	y_list[right_index* 3 + 1] = y_temp_right;


}
int transX(int x_coordinate){
	int x_new = x_coordinate + _width * 0.5;
	return x_new;
}

int transY(int y_coordinate){
	int y_new = _height - y_coordinate;
	return y_new;
}

void rotate_Point(struct Point begin, struct Point *end, int angle) {

	float temp_x, temp_y, rot_x, rot_y;
	float cos_val, sin_val, rotation_angle;

	rotation_angle = angle * (3.14159265359 / 180);

	temp_x = end->x - begin.x;
	temp_y = end->y - begin.y;
	cos_val = cos(rotation_angle); // compute trig. functions only once
	sin_val = sin(rotation_angle);
	rot_x = temp_x * cos_val - temp_y * sin_val;
	rot_y = temp_x * sin_val + temp_y * cos_val;
	end->x = rot_x + begin.x;
	end->y = rot_y + begin.y;
	return;
}

void GenerateTrees(struct Point begin, struct Point end, uint16_t color, int value) {

	if (value <= 0)
		return;
	int angle = 30;
	drawLine(begin.x, begin.y, end.x, end.y, BROWN);
	struct Point temp;
	temp.x = begin.x;
	temp.y = begin.y;
	begin.x = end.x;
	begin.y = end.y;
	end.x = end.x+ (begin.x - temp.x) * .8;
	end.y = end.y+ (begin.y - temp.y) * .8;

	int deviation = 0;
	time_t t;
	/* Intializes random number generator */
	//srand((unsigned) time(&t));

	//deviation = rand() % 10;
	rotate_Point(begin, &end, angle + deviation);
	drawLine(begin.x, begin.y, end.x, end.y, color);
	GenerateTrees(begin, end, BROWN, value - 1);

	//deviation = rand() % 30;
	rotate_Point(begin, &end, 360-angle-deviation);
	drawLine(begin.x, begin.y, end.x, end.y, color);
	GenerateTrees(begin, end, GREEN, value- 1);

	//deviation = rand() % 10;
	rotate_Point(begin, &end, 360-angle-deviation);
	drawLine(begin.x, begin.y, end.x, end.y, color);
	GenerateTrees(begin, end, GREEN, value - 1);

}
void DrawSquares(){
	int base_CoOrdinates[4][2]={{5,5},{5,50},{150,150},{150,150}};
	int new_CoOrdinates[4][2]={{0,0},{0,0},{0,0},{0,0}};
	uint32_t *color[9] ={0xFF0000,0x003399,0x00CC00,0x9933FF,0x00FFFF,0xFF6600,0xFF3399,0x006666,0x80000};
	int num_Savers=0;

	while(num_Savers<6){

		int intSquareSize=rand()%(80)+20;
		int x=rand()%(50)+0;
		int y=rand()%(70)+0;
		base_CoOrdinates[0][0]=x;
		base_CoOrdinates[0][1]=y;
		base_CoOrdinates[1][0]=x;
		base_CoOrdinates[1][1]=y+intSquareSize;
		base_CoOrdinates[2][0]=x+intSquareSize;
		base_CoOrdinates[2][1]=y+intSquareSize;
		base_CoOrdinates[3][0]=x+intSquareSize;
		base_CoOrdinates[3][1]= y;
		int intColor=rand()%(8)+0;
		int saverItrations=0;
		while(saverItrations<11){
			int i=0;

			while(i<4){

				if(i==3){
					drawLine(base_CoOrdinates[i][0],base_CoOrdinates[i][1],base_CoOrdinates[0][0],base_CoOrdinates[0][1],color[intColor]);
					new_CoOrdinates[i][0]=base_CoOrdinates[i][0]+0.2*(base_CoOrdinates[0][0]-base_CoOrdinates[i][0]);
					new_CoOrdinates[i][1]=base_CoOrdinates[i][1]+0.2*(base_CoOrdinates[0][1]-base_CoOrdinates[i][1]);
				}
				else{
					drawLine(base_CoOrdinates[i][0],base_CoOrdinates[i][1],base_CoOrdinates[i+1][0],base_CoOrdinates[i+1][1],color[intColor]);
					new_CoOrdinates[i][0]=base_CoOrdinates[i][0]+0.2*(base_CoOrdinates[i+1][0]-base_CoOrdinates[i][0]);
					new_CoOrdinates[i][1]=base_CoOrdinates[i][1]+0.2*(base_CoOrdinates[i+1][1]-base_CoOrdinates[i][1]);
				}
				i++;
			}

			memcpy(base_CoOrdinates, new_CoOrdinates, sizeof(base_CoOrdinates));
			saverItrations++;

		}
		num_Savers++;
	}

}

int main (void)

{

	 uint32_t pnum = PORT_NUM;

	 pnum = 0 ;

	 if ( pnum == 0 )
		 SSP0Init();

	 else
		 puts("Port number is not correct");

	 lcd_init();

	 fillrect(0, 0, ST7735_TFTWIDTH, ST7735_TFTHEIGHT, WHITE);
	 DrawSquares();
//	 	struct Point p0, p1;
//	 	uint8_t D = 15;
//	 	uint8_t temp_x = 40, temp_y = 20;
//
//	 	fillrect(0,0,_width,_height,BLACK);
//
//	 	fillrect(0,0,_width,_height,CYAN);
//	 	fillrect(0,0,_width,_height,BLACK);
//	 	int count =2;
//	 	do {
//
//	 		p0.x = temp_x;
//	 		p0.y = temp_y;
//	 		p1.x = temp_x;
//	 		p1.y = temp_y + D;
//
//	 		GenerateTrees(p0, p1, GREEN, 10);
//
//
//
//	 		temp_x = rand() % 100;
//	 		temp_y = rand() % 70;
//	 		D = (rand() % 20) + 5;
//	 		count = count-1;
//
//	 	} while (count > 0);
//	 x_list[0] = 0;
//	 	 y_list[0] = 0;
//	 	 x_list[1] = 0;
//	 	 y_list[1] = 30;
//
//	 	 for(int i = 0; i<400;i++){
//	 		 if (3*i - 1 >0){
//	 			 fill_tree_point(i,3*i - 1, x_list, y_list);
//	 		 }
//	 		 if (3*i >0){
//	 			 fill_tree_point(i, 3*i, x_list, y_list);
//	 		 }
//	 		 if (3*i + 1 >0){
//	 			 fill_tree_point(i, 3*i + 1,x_list, y_list);
//	 		 }
//
//	 	 }
//	 	 for (int i = 0; i < 1190;i++){
//	 		 if (3*i - 1 >0){
//	 		 			 drawLine(transX(x_list[i]),transY(y_list[i]), transX(x_list[3*i - 1]), transY(y_list[3*i - 1]),BLUE);
//	 		 		 }
//	 		 		 if (3*i >0){
//	 		 			 drawLine(transX(x_list[i]),transY(y_list[i]), transX(x_list[3*i]), transY(y_list[3*i]),RED);
//	 		 		 }
//	 		 		 if (3*i + 1 >0){
//	 		 			 drawLine(transX(x_list[i]),transY(y_list[i]), transX(x_list[3*i + 1]), transY(y_list[3*i + 1]),GREEN);
//	 		 		 }
//	 	 }



	  return 0;

}

