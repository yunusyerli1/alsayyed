import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit{

  emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}";
  namePattern = "^((?:[A-Za-zğüşöçıİĞÜŞÖÇ]+ ?){1,2})$";

  isSubmitted: boolean = false;

  contactForm = new FormGroup({
    name: new FormControl<string | null>('', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])),
    email: new FormControl<string | null>('', Validators.compose([Validators.required, Validators.maxLength(250), Validators.pattern(this.emailPattern)])),
    message: new FormControl(<string | null>'', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
  });



  ngOnInit(): void {
    console.log("for", this.contactForm)
  }

  sendMessage() {
    this.isSubmitted = true;
    if(this.contactForm.valid) {
      console.log(this.contactForm.value);
      console.log(this.contactForm.valid);
    }

  }

}
