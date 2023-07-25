import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-image',
  templateUrl: './svg-image.component.html',
  styleUrls: ['./svg-image.component.scss']
})
export class SvgImageComponent{

  @Input() width:string = '20px';
  @Input() height:string = '20px';
  @Input() iconName:string = 'angle-double-right';
  @Input() color:string = '';
}
