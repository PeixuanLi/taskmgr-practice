import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Task, TaskList } from "../domain/index";
import { Observable } from "rxjs/Observable";
import { reduce } from "rxjs/operator/reduce";


@Injectable()
export class TaskService{
    private domain = 'tasks';
    private headers = new Headers({
        'content-type':'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){
        
    }
    
    //post
    add(task : Task): Observable<Task>{
        task.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .post(url,JSON.stringify(task), {headers:this.headers})
            .map(res => res.json());
    }
    //update
    update(task : Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc: task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark,
        }
        return this.http
            .patch(url,JSON.stringify(toUpdate), {headers:this.headers})
            .map(res => res.json());
    }
    //del
    del(task : Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        return this.http
            .delete(url)
            .mapTo(task);
    }
     //get
     get(taskListId:string): Observable<Task[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .get(url, {params:{'taskListId':taskListId}, headers: this.headers})
            .map(res => res.json() as Task[]);
    }

    getByLists(lists:TaskList[]) : Observable<Task[]>{
        //这里直接 map 可以吗?, 
        return Observable.from(lists)
            .mergeMap(list => this.get(list.id))
            .reduce((tasks:Task[], t:Task[]) => [...tasks, ...t],[]);
            
        //mergeMap 是对流中流的操作, 可以转化成如下形式
        //lists.map(list => list.id).get()
        // return null;
    }

    //complete
    complete(task : Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        return this.http
            .patch(url,JSON.stringify({completed: !task.completed}), {headers:this.headers})
            .map(res => res.json());
    }

    move(taskId : string, taskListId): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/taskId`;
        return this.http
            .patch(url,JSON.stringify({taskListId: taskListId}), {headers:this.headers})
            .map(res => res.json());
    }
    
    moveAll(srcListId:string, targetListId:string): Observable<Task[]>{
        return this.get(srcListId)
            .mergeMap(tasks => Observable.from(tasks))
            .mergeMap(task => this.move(task.id,targetListId))
            .reduce((tasks,task) => [...tasks,task],[]);
    }

}