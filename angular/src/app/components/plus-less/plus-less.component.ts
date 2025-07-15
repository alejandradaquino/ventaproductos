import { CommonModule } from '@angular/common';
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plus-less',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plus-less.component.html',
  styleUrls: ['./plus-less.component.css']
})
export class PlusLessComponent implements OnInit {

  @Input()
  quantity: number;

  @Output()
  plusClicked :EventEmitter<number> = new EventEmitter();

  @Output()
  lessClicked :EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPlusClicked(){
    this.quantity ++;
    this.plusClicked.emit(this.quantity);
  }

  onLessClicked(){
    this.quantity --;
    this.lessClicked.emit(this.quantity);
  }
}
