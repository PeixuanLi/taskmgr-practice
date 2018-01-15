import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Project } from "../domain/index";
import { User } from "../domain/index";
import { Observable } from "rxjs/Observable";


@Injectable()
export class userService{
    private domain = 'users';
    private headers = new Headers({
        'content-type':'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){
        
    }
    searchUsers(email: string): Observable<User[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .get(url,{params:{'email_like':email}})
        .map(a =>a.json() as User[])
        //为什么可以直接使用.map(a =>a.json() as User[]) 而不是如下形式?
        // .map(res => res.json() as User)
        // .reduce((u1,u2) => [...u1,u2],[]);
        // 因为返回的是一个集合而不是单个的对象

    }
    //通过projectId获取对应 project 中所有用户
    //@待优化
    getUsersByProject(projectId: string) : Observable<User[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .get(url,{params:{'projectId':projectId}})
        .map(res => res.json() as User[]);
    }

    addProjectRef(user: User,projectId: string): Observable<User>{
        const url = `${this.config.url}/${this.domain}/${user.id}`;

        const projectIds = user.projectIds? user.projectIds:[];
        if(projectIds.indexOf(projectId) === -1){
            return this.http
                .patch(url,{'projectIds':[...user.projectIds, projectId]},{headers: this.headers})
                .map(res =>res.json() as User);
        }
        return Observable.of(user);
    }
    removeProjectRef(user: User,projectId: string): Observable<User>{
        const url = `${this.config.url}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds? user.projectIds:[];
        const index = projectIds.indexOf(projectId);
        if(index > -1){
            return this.http
                .patch(url,
                    {'projectIds':[...user.projectIds.slice(0,index), ...user.projectIds.slice(index+1)]},
                    {headers: this.headers}
                ).map(res =>res.json() as User);
        }
        return Observable.of(user);
    }

    batchUpdateProjectRef(project:Project):Observable<User[]>{
        const projectId = project.id;
        const memberIds = project.member;
        const url = `${this.config.url}/${this.domain}`;
        //批量更改 projectId 
        //选出对应project 的 user, 将现在的 projectId 更新至 user.projectId
        return Observable.from(memberIds)
            .switchMap(id =>{
                const url = `${this.config.url}/${this.domain}/${id}`;
                return this.http.get(url).map(res => res.json() as User)
            }).filter(user => user.projectIds.indexOf(projectId) === -1)
            .switchMap(user =>this.addProjectRef(user,projectId))
            .reduce((users,user) => [...users,user], []);
    }
    
    
}