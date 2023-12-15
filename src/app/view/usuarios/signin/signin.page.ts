import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private authService: AuthService) { 
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errrorControl(){
    return this.formLogar.controls;
  }

  submitForm(): boolean{
    if(!this.formLogar.valid){
      this.alertService.presentAlert("Erro", "Erro ao Preencher os Campos");
      return false;
    }else{
      this.alertService.simpleLoader();
      this.logar();
      return true;
    }
  }

  private logar(){
    this.authService.signIn(this.formLogar.value['email'], this.formLogar.value['senha'])
    .then((res) =>{
      this.alertService.dismissLoader();
      this.alertService.presentAlert("Olá", "Seja bem vindo!");
      this.router.navigate(["home"]);
    })
    .catch((error) => {
      this.alertService.dismissLoader();
      this.alertService.presentAlert("Logar", "Erro no login");
      console.log(error);
    })
  }

  logarComGoogle(): void{
    this.authService.signInWithGoogle()
    .then((res) =>{
      this.alertService.presentAlert("Olá", "Seja bem vindo!");
      this.router.navigate(["home"]);
    })
    .catch((error) => {
      this.alertService.presentAlert("Logar", "Erro no login");
      console.log(error);
    })
  }

  irParaSignUp(){
    this.router.navigate(["signup"]);
  }
}
