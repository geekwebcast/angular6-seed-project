import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    @ViewChild('swalInternet') private swalInternet: SwalComponent;
    constructor(private authService:AuthService,public toastr: ToastrService , vcr: ViewContainerRef,private router: Router){
     
    }
    login(data){
      let dummy={
        "email": "peter@klavekn",
        "password": "cityslicka"
    }
      this.authService.login(dummy).subscribe(resp=>{
        this.toastr.success('You are awesome!', 'Success!');
        this.router.navigate(['/feature/home']);
      },
      error=>{
        this.toastr.error('This is not good!', 'Oops!');
      }
    )}
}
