import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-number-edit',
  template: '<input [(ngModel)]="value" (ngModelChange)="onInputChange()">',
  standalone: true,
  imports: [],
  templateUrl: './number-edit.component.html',
  styleUrl: './number-edit.component.css',
})
export class NumberEditComponent {
  @Input()
  value: number = 0;
  @Output()
  valueChange = new Subject<number>();
  onInputChange() {
  this.valueChange.next(this.value);
  }
}
