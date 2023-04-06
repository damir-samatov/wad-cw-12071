import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee, ITicketCreate } from '../../interfaces';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
})
export class TicketCreateComponent {
  @Input() employees: IEmployee[];
  @Output() saveClick = new EventEmitter<ITicketCreate>();
  @Output() cancelClick = new EventEmitter();
  newTicket: ITicketCreate;
  hasValidationError = false;

  ngOnInit() {
    this.newTicket = {
      employeeId: this.employees[0].id,
      title: '',
      description: '',
      priority: 'Medium',
      status: 'TO DO',
    };
  }

  onSaveClick() {
    if (
      this.newTicket.title.trim() === '' ||
      this.newTicket.description.trim() === ''
    ) {
      this.hasValidationError = true;
      return;
    }
    this.saveClick.emit(this.newTicket);
    this.hasValidationError = false;
  }

  onCancelClick() {
    this.cancelClick.emit();
  }
}
