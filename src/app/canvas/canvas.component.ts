import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: any;
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  image: HTMLImageElement = {} as HTMLImageElement;
  drawing = false;
  lastX: number=0;
  lastY: number=0;


  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.loadImage();
  }

  loadImage() {
    this.image = new Image();
    this.image.src = '../assets/img/uña.png'; // Ruta de la imagen de la uña
    this.image.onload = () => {
      const centerX = (this.canvas.nativeElement.width - this.image.width) / 2;
      const centerY = (this.canvas.nativeElement.height - this.image.height) / 2;
      this.ctx.drawImage(this.image, centerX, centerY);
    };
  }

  onMouseDown(e: MouseEvent) {
    if (this.isWithinBounds(e.offsetX, e.offsetY)) {
      this.drawing = true;
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.drawing) {
      const x = e.offsetX;
      const y = e.offsetY;
      this.draw(this.lastX, this.lastY, x, y);
      this.lastX = x;
      this.lastY = y;
    }
  }

  onMouseUp() {
    this.drawing = false;
  }

  draw(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const centerX = (this.canvas.nativeElement.width - this.image.width) / 2;
    const centerY = (this.canvas.nativeElement.height - this.image.height) / 2;
    this.ctx.drawImage(this.image, centerX, centerY);
  }

  downloadImage() {
    const image = this.canvas.nativeElement.toDataURL(); // Convertir el lienzo a imagen
    const link = document.createElement('a');
    link.href = image;
    link.download = 'mi_dibujo.png';
    link.click();
  }

  isWithinBounds(x: number, y: number): boolean {
    const centerX = (this.canvas.nativeElement.width - 300) / 2;
    const centerY = (this.canvas.nativeElement.height - 520) / 2;
  
    return x >= centerX && x <= centerX + 300 && y >= centerY && y <= centerY + 520;
  }
}