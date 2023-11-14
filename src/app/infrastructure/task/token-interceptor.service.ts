import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_KEY = 'b019a05d117db6aee5e5a627439f701e';
const API_TOKEN = 'ATTA7ae4e8abb166f0698ddc19146e486eb7a3722997853ab4d245972ff8b0003b2c356006E0';

@Injectable({providedIn: "root"})
export class TokenInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders : {
                Accept: 'aplication/json',
                'Authorization': 'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="' + API_TOKEN + '"'

            }
        });
        return next.handle(req);
    }
}