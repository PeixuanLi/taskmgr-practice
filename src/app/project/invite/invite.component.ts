import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  items = [
    {
      id:1,
      name:"Lee"
    },
    {
      id:2,
      name:"Wang"
    },
    {
      id:3,
      name:"Zhou"
    },
  ];

  constructor() { }

  ngOnInit() {
  }
  onClick(){
    
  }
  displayUser(user: {id:number;name:string}) : string{
    return user.name;
  }
}
