import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit, AfterViewInit {
  public name = '';
  public email = '';
  public message = '';

  public formValid = true;
  public submitButtonDisabled = false;


  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const form = document.forms[0];

    form.addEventListener('submit', event => {
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();

        this.formValid = false;

        return;
      }

      this.submitForm(form.action);
      this.formValid = true;
    }, false);
  }


  private submitForm(url: string): void {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('message', this.message);


    this.http.post(url, formData).subscribe(() => {
      this.toastr.success('Message successfully sent');
      this.submitButtonDisabled = true;
    }, () => {
      this.toastr.error('Something went wrong\nPlease consider to write an E-Mail directly');
    });
  }
}
