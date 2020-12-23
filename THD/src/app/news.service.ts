import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl="http://localhost:3000/api/news"
  private createNewsUrl="http://localhost:3000/api/addnews"
  private updateNewsUrl="http://localhost:3000/api/updatenews"
  private deleteNewsUrl="http://localhost:3000/api/deletenews"

  constructor(private _http:HttpClient) { }

  getNews(data){
    return this._http.post<any>(this.newsUrl,data)
  }

  createNews(data){
    return this._http.post<any>(this.createNewsUrl,data)
  }
  updateNews(data){
    return this._http.post<any>(this.updateNewsUrl,data)
  }

  deleteNews(data){
    return this._http.post<any>(this.deleteNewsUrl,data)
  }
}