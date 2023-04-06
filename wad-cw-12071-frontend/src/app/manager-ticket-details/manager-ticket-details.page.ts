import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getUserSession,
  getTicket,
  deleteTicket,
  updateTicket,
  getEmployees,
} from '../../requests';
import { IEmployee, ITicket, ITicketUpdate } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-manager-ticket-details-page',
  templateUrl: './manager-ticket-details.page.html',
})
export class ManagerTicketDetailsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  isEditing = false;
  ticket: ITicket;
  employees: IEmployee[];
  assignedEmployee: IEmployee;

  async ngOnInit() {
    if (!this.userSession.hasSession) return await this.redirectToLogin();

    await Promise.all([this.fetchTicket(), this.fetchEmployees()]);

    this.assignedEmployee = this.employees.find(
      (employee) => employee.id === this.ticket.employeeId
    )!;

    this.isLoading = false;

    return;
  }

  async fetchTicket() {
    try {
      this.ticket = await getTicket(
        this.userSession.sessionId,
        this.route.snapshot.params.id,
        true
      );
    } catch (e) {
      await this.redirectToLogin();
    }
  }

  async fetchEmployees() {
    try {
      this.employees = await getEmployees(this.userSession.sessionId);
    } catch (e) {
      await this.redirectToLogin();
    }
  }

  onEditOpen() {
    this.isEditing = true;
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  async onDelete(id: number) {
    const isSuccess = await deleteTicket(this.userSession.sessionId, id);
    if (isSuccess) {
      await this.redirectToTickets();
    } else {
      await this.redirectToLogin();
    }
  }

  async onSaveEdit(updatedTicket: ITicketUpdate) {
    const isSuccess = await updateTicket(
      updatedTicket,
      this.userSession.sessionId
    );
    if (isSuccess) return await this.redirectToTickets();
    return await this.redirectToLogin();
  }

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  private async redirectToTickets() {
    return await this.router.navigateByUrl('/manager/tickets');
  }
}
