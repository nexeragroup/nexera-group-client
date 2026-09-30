import { HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { SKIP_AUTH } from '../../../core/context/auth-http.context';
import { ApiService } from '../../../core/services/api.service';
import {
  ContactInquiry,
  ContactInquiryResponse,
  CsrfBootstrapResponse,
} from '../interfaces/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly api = inject(ApiService);

  submitInquiry(inquiry: ContactInquiry): Observable<ContactInquiryResponse> {
    return this.api
      .get<CsrfBootstrapResponse>('auth/csrf', {
        context: new HttpContext().set(SKIP_AUTH, true),
      })
      .pipe(
        switchMap(({ token }) =>
          this.api.post<ContactInquiryResponse, ContactInquiry>('inquiries', inquiry, {
            headers: { 'X-XSRF-TOKEN': token },
            context: new HttpContext().set(SKIP_AUTH, true),
          }),
        ),
      );
  }
}
