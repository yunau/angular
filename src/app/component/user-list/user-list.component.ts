import { Component, AfterViewInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {

  screenWidth: any;
  screenHeight: any;
  user: User = {
    id: 0,
    first_name: "",
    last_name: "",
    birthday: "",
    telephone: "",
    email: "",
  };

  userlist: User[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'birthday'];
  dataSource = new MatTableDataSource<User>(this.userservice.listUsers());
  selection = new SelectionModel<User>(false, []);

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
  }

  ngAfterViewInit() {}

  constructor(private router: Router, public userservice: UserService) { }

  addNewUser() {
    this.userservice.setUser(this.user); 
    this.router.navigateByUrl('/user');
  }

  editNewUser() {
    let selected_user = this.selection.selected[0];
    this.userservice.setUser(selected_user); 
    this.router.navigateByUrl('/user');
  }

}



