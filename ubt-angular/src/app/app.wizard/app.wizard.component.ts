import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './app.wizard.component.html',
  styleUrls: ['./app.wizard.component.css']
})
export class WizardComponent implements OnInit {
  @Output() WizardEmitter = new EventEmitter();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit() {
  }

  OmitWizard(event) {
    this.WizardEmitter.emit(event);
  }

}
