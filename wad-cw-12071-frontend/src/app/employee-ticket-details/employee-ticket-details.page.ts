import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserSession, getTicket } from '../../requests';
import { IEmployee, ITicket } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-employee-ticket-details-page',
  templateUrl: './employee-ticket-details.page.html',
})
export class EmployeeTicketDetailsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
  isEditing = false;
  ticket: ITicket;

  async ngOnInit() {
    if (!this.userSession.hasSession) return await this.redirectToLogin();

    await this.fetchTicket();

    this.isLoading = false;

    return;
  }

  async fetchTicket() {
    try {
      this.ticket = await getTicket(
        this.userSession.sessionId,
        this.route.snapshot.params.id,
        false
      );
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

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }

  private async redirectToTickets() {
    return await this.router.navigateByUrl('/manager/tickets');
  }
}
