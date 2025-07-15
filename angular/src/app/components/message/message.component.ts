import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  saveSuccess:boolean;
  @Input()
  saveError:boolean;
  @Input()
  showMessage:boolean;

  @Input()
  showResult: boolean;

  @Input()
  resultMessage: string;

  constructor() {}

  ngOnInit() {
  }


  getResultMessage(): string{
    console.log(JSON.stringify(this.resultMessage));
    return JSON.stringify(this.resultMessage)
  }
}
