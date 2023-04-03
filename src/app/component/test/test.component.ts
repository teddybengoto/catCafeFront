import { Component } from '@angular/core';
import { Direction } from 'src/app/model/esp';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {


  espaces=Object.keys(Direction);
  //keys = Object.keys;


}
