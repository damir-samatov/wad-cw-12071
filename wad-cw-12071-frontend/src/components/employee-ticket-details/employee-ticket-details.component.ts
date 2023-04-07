import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee, ITicket } from '../../interfaces';

@Component({
  selector: 'app-employee-ticket-details',
  templateUrl: './employee-ticket-details.component.html',
})
export class EmployeeTicketDetailsComponent {
  @Input() ticket: ITicket;
  @Input() assignedEmployee: IEmployee;
  @Output() editClick = new EventEmitter();

  onUpdateStatusClick = () => {
    this.editClick.emit();
  };

  @Input() role: 'manager' | 'employee';
}
