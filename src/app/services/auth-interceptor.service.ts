import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');

		request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

		if (token) {
			request = request.clone({ headers: request.headers.set('x-ov-token', token) });
		}
		return next.handle(request);
	}
}
