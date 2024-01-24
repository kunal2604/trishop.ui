import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";

export const authInterceptorService: HttpInterceptorFn = (req, next) => {
    console.log("Request is on its way");
    const userAuthSerce = inject(UserAuthService);
    const router = inject(Router);

    if(req.headers.get('No-Auth') === 'True') {
        return next(req.clone());
    }

    const token = userAuthSerce.getToken();
    req = addToken(req, token !== null ? token : '');

    return next(req).pipe(
        catchError(
            (err: HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401) {
                    router.navigate(['/login']);
                }
                else if(err.status == 403) {
                    router.navigate(['/forbidden']);
                }
                return throwError("Some thing went wrong.");
            }
        )
    );
};

export const addToken = (request: HttpRequest<any>, token:string) => {
    return request.clone({
        setHeaders : {
            Authorization: `Bearer ${token}`
        }
    });
};