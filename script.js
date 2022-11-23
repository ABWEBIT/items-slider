'use strict';
class ItemsSlider{
  constructor(id,width){
    this.element = document.getElementById(id);
    this.box = this.element.querySelector('.section .box');
    this.style = window.getComputedStyle(this.box);
    this.gap = parseInt(this.style.getPropertyValue('column-gap'));
    this.prev = this.element.querySelector('.section .button[data-nav="prev"]');
    this.next = this.element.querySelector('.section .button[data-nav="next"]');
    this.prev.addEventListener('click',()=>this._prev());
    this.next.addEventListener('click',()=>this._next());
    this.items = this.box.querySelectorAll('.section .item');
    this.itemWidth = width;
    this.min = 0;
    this.max = 0;
    this.pos = 0;
    this.divider;
    this._calc();
    window.addEventListener('resize',()=>this._calc());
  };
  _calc(){
    this.divider = Math.floor(this.box.clientWidth / this.itemWidth);
    if(this.divider < 1) this.divider = 1;
    this.max = ((100 / this.divider) * this.items.length) - 100;

    let indent = this.gap - (this.gap / this.divider);
    for(let item of this.items) item.style.minWidth = 'calc(100% / '+this.divider+' - '+indent+'px)';
    this.pos = 0;
    this._move();
  };
  _next(){
    if(this.pos >= this.min && this.pos < this.max){
      if(this.max - this.pos >= 100) this.pos += 100
      else this.pos += this.max - this.pos;
      this._move();
    }
  };
  _prev(){
    if(this.pos > this.min){
      if(this.pos >= 100) this.pos -= 100
      else this.pos = 0;
      this._move();
    }
  };
  _move(){
    this.pos > this.min ? this.prev.classList.remove('off') : this.prev.classList.add('off');
    this.pos < this.max ? this.next.classList.remove('off') : this.next.classList.add('off');
    let percent = -Math.abs(this.pos);
    let indent = (this.pos / 100) * this.gap;
    this.box.style.transform = 'translateX(calc('+percent+'% - '+indent+'px))';
  }
}
new ItemsSlider('videos',300);
new ItemsSlider('movies',150);