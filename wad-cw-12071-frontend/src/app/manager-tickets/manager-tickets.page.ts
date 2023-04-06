import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createTicket,
  getEmployees,
  getTickets,
  getUserSession,
} from '../../requests';
import { IEmployee, ITicket, ITicketCreate } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-manager-tickets-page',
  templateUrl: './manager-tickets.page.html',
})
export class ManagerTicketsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  isCreating: boolean = false;
  tickets: ITicket[];
  employees: IEmployee[];

  async ngOnInit() {
    return await this.fetchAll();
  }

  async fetchAll() {
    this.isLoading = true;
    if (!this.userSession.hasSession) return await this.redirectToLogin();
    try {
      await Promise.all([this.fetchTickets(), this.fetchEmployees()]);
      this.isLoading = false;
    } catch {
      await this.redirectToLogin();
    }
  }

  async onCreate(newTicket: ITicketCreate) {
    this.isLoading = true;
    try {
      const isSuccess = await createTicket(
        newTicket,
        this.userSession.sessionId
      );
      if (!isSuccess) await this.redirectToLogin();
      await this.fetchAll();
    } catch {
      await this.redirectToLogin();
    }
    this.isCreating = false;
  }

  async fetchTickets() {
    this.tickets = await getTickets(this.userSession.sessionId, true);
  }

  async fetchEmployees() {
    this.employees = await getEmployees(this.userSession.sessionId);
  }

  onOpenCreate() {
    this.isCreating = true;
  }

  onCancelCreate() {
    this.isCreating = false;
  }

  private async redirectToLogin() {
    resetUserSession();
    await this.router.navigateByUrl('/login');
  }
}
