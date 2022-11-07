import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  isModalOpen:boolean = false;
  showPassword:object={password:false, repeatPassword:false}

  private form : FormGroup;

  constructor(public formBuilder: FormBuilder,private http: HttpClient,private loadingCtrl: LoadingController ) {
    this.setOpen(true)
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]],
      fullName:['',[Validators.required, Validators.minLength(7), Validators.maxLength(10) ]],
      country:['Venezuela'],
      password: ['',[Validators.required]],
      password_repeat: ['',[Validators.required]],
    });

     this.form.get('password_repeat').setValidators(
       this.equalsValidator(this.form.get('password'))
     )
     this.form.get('password').setValidators(
      this.validatorsRegex()
     )
  
  }

  equalsValidator(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value: any = control.value;
      const otherValue: any = otherControl.value;
      return otherValue === value ? null : { 'notEquals': { value, otherValue } };
    };
  }

  validatorsRegex(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value: any = control.value;
      const errors: object= { 'length':null,'signs':null,'uppercase':null }
      if(!/^[\s\S]{8,20}$/.test(value)){
        errors['length'] = value
      }
      if(!/^(?=.*?[$%&@?*_|<>#])/.test(value)){
        errors['signs'] = value
      }
      if(!/^(?=.*?[A-Z])/.test(value)){
        errors['uppercase'] = value
      }
      if(errors['length'] || errors['signs'] || errors['uppercase']){
        return errors
      }
      return null
    };
  }
  

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  };

  logForm(){
    if(this.form.valid){
      this.showLoading().then(()=>{
        this.form.reset()
      })
      /* >>>>>> Post Example  <<<<<<<< */
      // this.http.post('urlExample',this.form).toPromise().then(resJson=>{
        // console.log(resJson)
        // this.form.reset()
      // }).catch(errorMessages=>{
        // console.log(errorMessages)
        // this.form.reset()
      // }).finally()
    
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 2000,
      cssClass: 'custom-loading',
    });
    loading.present() ;
  }

  changePasswordVisibility(key, idName){
      this.showPassword[key] = !this.showPassword[key]
      let input = document.getElementById(idName) as HTMLIonInputElement;
      if(this.showPassword[key]){
          return input.type = 'text' 
      }
      return input.type = 'password'
  }

  
}
