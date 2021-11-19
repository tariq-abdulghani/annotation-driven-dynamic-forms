import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'decorator-driven-forms';
  date = new FormControl(new Date().toISOString());

  form = new FormGroup({
    date: this.date
  })

  submit(){
    console.log(this.form.value, this.form);
  }
}
