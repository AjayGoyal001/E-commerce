import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { NgIf } from '@angular/common';
import { SignUp } from '../../data-type';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  showLogin = false;
  authError = '';

  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    console.log(data);
    this.seller.userSignUp(data);
  }

  login(data: SignUp): void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email and Password doesn't match";
      }
    });
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
