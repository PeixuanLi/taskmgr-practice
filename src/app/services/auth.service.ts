import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Project, User, Auth } from "../domain/index";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthService{
    private domain = 'users';
    private headers = new Headers({
        'content-type':'application/json'
    });
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    /**
     * 构造函数用于注入服务的依赖以及进行必要的初始化
     * @param http 注入Http
     * @param config 注入基础配置
     */
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){}

    /**
     * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
     * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
     */
    register(user: User): Observable<Auth> {
        user.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .get(url,{params:{'email': user.email}})
            .switchMap(res =>{
                if(res.json().length > 0){
                    throw "email exist";
                }
                return this.http.post(url,JSON.stringify(user),{headers:this.headers})
                    .map(r =>( {token: this.token, user: r.json()}));
            });
    }
    /**
   * 使用用户名和密码登录
   *
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
    login(email: string, password: string): Observable<Auth> {
        const url = `${this.config.url}/${this.domain}`;
        return this.http
            .get(url,{params:{'email': email, 'password': password}})
            //这里要用 map 而不是 switchMap
            .map(res =>{
                if(res.json().length <= 0){
                    throw "username or password not match";
                }
                return {
                    'token': this.token,
                    'user' : res.json()[0]
                };
        });
     }
    
}