import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'auth-custom-submit',
  templateUrl: './custom-submit.component.html',
  styleUrls: ['./custom-submit.component.scss']
})
export class CustomSubmitComponent implements OnInit {

  @Input() text: string = "Save";
  @Input() styleObject: { btn: {} };
  @Input() loading: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
