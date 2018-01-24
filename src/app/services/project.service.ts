import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Project, User } from "../domain/index";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';
  

@Injectable()
export class ProjectService{
    private domain = 'projects';
    private headers = new Headers({
        'content-type':'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){
        
    }
    
    //post
    add(project : Project): Observable<Project>{
        project.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .post(url,JSON.stringify(project), {headers:this.headers})
            .map(res => res.json());
    }
    //update
    update(project : Project): Observable<Project>{
        const url = `${this.config.url}/${this.domain}/${project.id}`;
        const toUpdate = {
            name : project.name,
            desc : project.desc,
            coverImg: project.coverImg
        }
        return this.http
            .patch(url,JSON.stringify(toUpdate), {headers:this.headers})
            .map(res => res.json());
    }
    //del
    del(project : Project): Observable<Project>{
        const delTask$ = Observable.from(project.tasklists? project.tasklists : [])
            .mergeMap(listId => this.http.delete(`${this.config.url}/tasklists/${listId}`))
            .count();
        return delTask$.switchMap(_ => this.http.delete(`${this.config.url}/${this.domain}/${project.id}`))
            .mapTo(project);
    }
     //get
     get(userId:string): Observable<Project[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .get(url, {params:{'members_like':userId}, headers: this.headers})
            .map(res => res.json() as Project[]);
    }
    updateTaskLists(project: Project): Observable<Project> {
        const url = `${this.config.url}/${this.domain}/${project.id}`;
        const toUpdate = {
            tasklists: project.tasklists
          };
        return this.http
            .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
            .map(res => res.json() as Project);
    }
    inviteMembers(projectId : string, members : User[]): any {
        const url = `${this.config.url}/${this.domain}/${projectId}`;
        console.log(url);
        return this.http
            .get(url)
            .map(r => r.json())
            .switchMap(project =>{
                const old_ids = project.members;
                const invite_ids = members.map(member => member.id)
                const new_ids = _.union(old_ids,invite_ids);
                return this.http.patch(url,JSON.stringify({members:new_ids}),{headers: this.headers})
            })
            .map(res =>res.json());
        
      }
}