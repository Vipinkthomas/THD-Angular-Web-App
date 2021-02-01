import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

/**
 * News service for for creating/getting/updating/deleting news
 * to extract public news for guest users
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /**
  * api urls for news-get
  */
  private newsUrl="http://localhost:3000/api/news"
  
  /**
  * api urls for public news
  */
  private publicNewsUrl="http://localhost:3000/api/publicnews"

  /**
  * api urls for create news
  */
  private createNewsUrl="http://localhost:3000/api/addnews"

  /**
  * api urls for update news
  */
  private updateNewsUrl="http://localhost:3000/api/updatenews"

  /**
  * api urls for delete news
  */
  private deleteNewsUrl="http://localhost:3000/api/deletenews"

  /**
  * constructor
  */
  constructor(private _http:HttpClient) { }

  /**
  * @example
  * to get newss {both public and protected}
  * getNews(data))
  *
  * @param {JSON} data  access details info{@link Todo}
  * @returns response from server
  */
  getNews(data){
    return this._http.get<any>(this.newsUrl,data)
  }

  /**
  * @example
  * to get public news alone
  * getPublicNews()
  *
  * @param {} null
  * @returns response from server
  */
  getPublicNews(){
    return this._http.get<any>(this.publicNewsUrl)
  }

  /**
  * @example
  * to create new news
  * createNews(data)
  *
  * @param {JSON} data  new news info{@link Todo}
  * @returns response from server
  */
  createNews(data){
    return this._http.post<any>(this.createNewsUrl,data)
  }

  /**
  * @example
  * to update existing news
  * updateNews(data)
  *
  * @param {JSON} data  updated news info{@link Todo}
  * @returns response from server
  */
  updateNews(data){
    return this._http.post<any>(this.updateNewsUrl,data)
  }

  /**
  * @example
  * to delete news
  * deleteNews(data)
  *
  * @param {JSON} data  delete news info{@link Todo}
  * @returns response from server
  */
  deleteNews(data){
    return this._http.post<any>(this.deleteNewsUrl,data)
  }
}