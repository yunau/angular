import { Injectable } from '@angular/core';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User =  {
    id: 0,
    first_name: "",
    last_name: "",
    birthday: "",
    telephone: "",  
    email: ""
  };

  //test data
  private userList:User[] = [
    { id: 1, first_name: 'John1', last_name: 'Angular1', birthday: "25/06/1982", telephone: "0403847581", email: "test1.cooper@gmail.com"},
    { id: 2, first_name: 'John2', last_name: 'Angular2', birthday: "26/07/1983", telephone: "0403847582", email: "test2.cooper@gmail.com"},
    { id: 3, first_name: 'John3', last_name: 'Angular3', birthday: "27/08/1984", telephone: "0403847583", email: "test3.cooper@gmail.com"},
    { id: 4, first_name: 'John4', last_name: 'Angular4', birthday: "28/11/1985", telephone: "0403847584", email: "test4.cooper@gmail.com"},
    { id: 5, first_name: 'John5', last_name: 'Angular5', birthday: "29/12/1986", telephone: "0403847585", email: "test5.cooper@gmail.com"}
  ];

  dbrainStorage = window.localStorage;

  constructor() {
      //use api to list data from database
      let user_data = this.dbrainStorage.getItem('table_user') || "";
      if (user_data != "") {
        this.userList = JSON.parse(user_data);
      }
  }

  addUser(user: User) {
      this.userList.push(user);
      let user_data = JSON.stringify(this.userList);
      this.dbrainStorage.setItem('table_user', user_data);
  }

  editUser(user: User) {
    if (this.userList.length > 0) {
      this.userList.forEach( (userdb) => {
        if (user.id == user.id) {
          userdb = user;
          //use api to update database
          let user_data = JSON.stringify(this.userList);
          this.dbrainStorage.setItem('table_user', user_data);
        }
      });
    }
  }

  setUser(user: User) {
     this.user = user;
  }

  getUser(): User {
      return this.user;
  }

  listUsers(): User[] {
     return this.userList;
  }
}
