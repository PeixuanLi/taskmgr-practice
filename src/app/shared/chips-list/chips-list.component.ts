import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl, FormBuilder,FormGroup  } from '@angular/forms';
import { User } from '../../domain/index';
import { Observable } from 'rxjs/Observable';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent implements OnInit,  ControlValueAccessor, OnInit, OnDestroy {
  // @ViewChild('autoMember') autoMember;
  // autoMember = "test";
  
  @Input() multi = true;
  @Input() label = 'Add/Edit Member';
  @Input() placeholderText = 'type email of the member';
  
  form: FormGroup;
  items: User[];
  memberResults$:Observable<User[]>;
  constructor(private fb: FormBuilder, private service: userService) {
    this.items = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch : [''],
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(e => e && e.length > 1)
      .switchMap(str =>this.service.searchUsers(str));
  }
  ngOnDestroy() {
    
  }

  private propagateChange = (_: any) => {};
  // 提供值的写入方法
  public writeValue(obj: User[]) {
    if (obj&& this.multi) {
      const userEntities = obj.reduce((es,user) => ({...es, [user.id]:user}), {} );
      
      if(this.items){
        const remain = this.items.filter(e => !userEntities[e.id]);
        this.items = [...remain, ...obj]
      }
    }
    if(obj && !this.multi){
      this.items = [...obj]
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} {
    return this.items? null:{
      chipListInvalid:true
    }
  }

  private removeMember(member: User){
    if(this.multi){
      const ids = this.items.map(user => user.id);
      const index = ids.indexOf(member.id);
      this.items = [...this.items.slice(0,index), ...this.items.slice(index+1)];
    }else{
      this.items = [];
    }
    this.form.patchValue({memberSearch:''});
    this.propagateChange(this.items);
  }

  private handleMemberSelection(member: User){
    if(this.items.map(u => u.id).indexOf(member.id) !== -1){
      return;
    }
    this.items =  this.multi? [...this.items, member]: [member];
    this.form.patchValue({memberSearch:member.name});
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }
  
  get displayInput(){
    return this.multi || this.items.length === 0;
  }
  
}
