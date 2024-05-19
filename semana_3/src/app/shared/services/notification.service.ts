import { Injectable } from "@angular/core";

import { MessageService } from "primeng/api";

@Injectable()
export class NotificationService {
  constructor(private readonly _messageService: MessageService) {}

  public showSuccess(message: string): void {
    this._messageService.add({
      severity: "success",
      summary: "Sucesso!",
      detail: message,
    });
  }

  public showError(message: string): void {
    this._messageService.add({
      severity: "error",
      summary: "Erro!",
      detail: message,
    });
  }
}
