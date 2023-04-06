import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getUserSession,
  resetUserSession,
  getTicket,
  deleteTicket,
  updateTicket,
} from '../../utils';
import { ITicket, ITicketUpdate } from '../../interfaces';

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

  async ngOnInit() {
    if (!this.userSession.hasSession) return await this.redirectToLogin();
    return await this.fetchTicket();
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
    this.isLoading = false;
  }

  onEditClick() {
    this.isEditing = true;
  }

  onCancelClick() {
    this.isEditing = false;
  }

  async onDeleteClick(id: number) {
    const isSuccess = await deleteTicket(this.userSession.sessionId, id);
    if (isSuccess) {
      await this.redirectToTickets();
    } else {
      await this.redirectToLogin();
    }
  }

  async onSaveClick(updatedTicket: ITicketUpdate) {
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
