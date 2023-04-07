import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getUserSession, getTicket, updateTicketStatus } from '../../requests';
import { ITicket } from '../../interfaces';
import { resetUserSession } from '../../utils';

@Component({
  selector: 'app-employee-ticket-details-page',
  templateUrl: './employee-ticket-details.page.html',
})
export class EmployeeTicketDetailsPage {
  constructor(private route: ActivatedRoute, private router: Router) {}
  private userSession = getUserSession();
  isLoading = true;
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

  async onUpdateStatus(newStatus: string) {
    this.isLoading = true;
    try {
      const isSuccess = await updateTicketStatus(
        this.ticket.id,
        newStatus,
        this.userSession.sessionId
      );
      if (isSuccess) await this.fetchTicket();
      else await this.redirectToLogin();
    } catch (e) {
      await this.redirectToLogin();
    }
    this.isLoading = false;
  }

  private async redirectToLogin() {
    resetUserSession();
    return await this.router.navigateByUrl('/login');
  }
}
