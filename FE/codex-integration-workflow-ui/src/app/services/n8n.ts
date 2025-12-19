import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIS } from '../enums/apis';

@Injectable({
  providedIn: 'root',
})
export class N8NAPI {
  readonly #http = inject(HttpClient);

  triggerWebhook(data: any) {
    return this.#http.post(APIS.n8n.webhook, data);
  }
}
