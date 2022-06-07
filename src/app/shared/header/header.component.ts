import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this._userService.logout();
  }

}
