import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { TaskList, Project} from "../domain/index";
import { Observable } from "rxjs/Observable";


@Injectable()
export class TaskListService{
    private domain = 'taskLists';
    private headers = new Headers({
        'content-type':'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){
        
    }
    
    //post
    add(taskList : TaskList): Observable<TaskList>{
        // taskList.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .post(url,JSON.stringify(taskList), {headers:this.headers})
            .map(res => res.json());
    }
    //update
    update(taskList : TaskList): Observable<TaskList>{
        const url = `${this.config.url}/${this.domain}/${taskList.id}`;
        const toUpdate =  {
            name: taskList.name,
            // projectId: taskList.projectId,
            // order: taskList.order
          }
          
        return this.http
            .patch(url,JSON.stringify(toUpdate), {headers:this.headers})
            .map(res => res.json());
    }
    //del
    del(taskList : TaskList): Observable<TaskList>{
        const url = `${this.config.url}/${this.domain}/${taskList.id}`;
        return this.http.delete(url).mapTo(taskList);
    }
     //get 
     get(projectId:string): Observable<TaskList[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .get(url, {params:{'projectId':projectId}, headers: this.headers})
            .map(res => res.json() as TaskList[]);
    }
    swap(src: TaskList, target: TaskList): Observable<TaskList[]>{
        const dragUrl = `${this.config.url}/${this.domain}/${src.id}`;
        const dropUrl = `${this.config.url}/${this.domain}/${target.id}`;

        const drag$ = this.http.patch(dragUrl,JSON.stringify({order: target.order}),{headers:this.headers})
                .map(res => res.json());
        const drop$ = this.http.patch(dropUrl,JSON.stringify({order: src.order}),{headers:this.headers})
                .map(res => res.json());
        return Observable.concat(drag$,drop$).reduce((arrs,tasklist)=>[...arrs,tasklist],[]);
    }
    initializeTaskLists(prj: Project): Observable<Project> {
        const id = prj.id;
        return Observable.merge(
          this.add({name: 'To do', projectId: id, order: 1}),
          this.add({name: 'Working on', projectId: id, order: 2}),
          this.add({name: 'Completed', projectId: id, order: 3}))
          .reduce((r, x) => {
            return [...r, x];
          }, [])
          //map 中是一个 tasklist 数组
          .map(tls => ({...prj, tasklists: tls.map(tl => tl.id)}));
      }
}