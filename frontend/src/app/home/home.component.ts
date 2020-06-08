import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../core/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup
  users: Array<any> = [] 
  ops: string = 'Create'
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('openModal') openModal: ElementRef;

  constructor(
    private http: HttpService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.listUsers()

    this.userForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    })
  }

  listUsers() {
    this.http.Get<Array<any>>('api/v1/user/list').subscribe(_users => {
      this.users = _users
    }, _error => {
      console.log(_error)
      alert('Failed to fetch users')
    })
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if(this.userForm.invalid)
      return

    if(this.ops == 'create') {
      this.http.Post('api/v1/user/create', this.userForm.value).subscribe(_response => {
        this.closeModal.nativeElement.click();
        this.listUsers()
        this.userForm.reset()
      })
    } else {
      this.http.Put('api/v1/user/update', this.userForm.value).subscribe(_response => {
        this.closeModal.nativeElement.click();
        this.listUsers()
        this.userForm.reset()
      })
    }
  }

  editUser(user) {
    this.userForm.patchValue({
      username: user.username,
      password: user.password,
      email: user.email,
      mobile: user.mobile,
    })
    this.ops = 'update'
    this.openModal.nativeElement.click();
  }


  deleteUser(username) {
    this.http.Delete('api/v1/user/delete', { body: { username: username } }).subscribe(_response => {
      this.listUsers()
    })
  }

  setOps(ops) {
    this.ops = ops
  }

}
