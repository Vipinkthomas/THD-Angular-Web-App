
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../service/event.service';
import { NewsService } from '../service/news.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

/**
 * Home Component accesible to both Guest and Registered users
 */
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

/**
 * StartComponent Class
 */
export class StartComponent implements OnInit {

/**
 * Variables
 */
  myControl = new FormControl();
  data:any;
  events:any;
  news:any;
  temp_events=[]
  temp_news=[]
  lang_sel:any;
  options: any[]=['All Events and News']
  filteredOptions: Observable<string[]>;

  UpdateFullNews={
    "_id":"",
  "UpdateNews": {
    "_id":"",
    "numLike":0,
    "numDisLike":0

  }
  };

  UpdateFullEvent={
  "_id":"",
  "UpdateEvent": {
  "_id":"",
  "numLike":0,
  "numDisLike":0
  }
  };

  /**
    * a constructor to create instance of the class
    * Services used:
    * EventService
    * NewsService
    * AuthService
    */
  constructor(private _eventService:EventService,private _newsService:NewsService,private _authService:AuthService) { }

  /**
   * Component Initialisation executed after constructor
   */
  ngOnInit(): void {

    if(this._authService.loggedIn()){
      this.data={}
    }
    else{
      this.data={"access":"public"}
    }

    /**
      * language switch
      * @param {boolean} lang_sel EN/DE:True/False {@link Todo}
      */
    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
 
    /**
     * Load events and news
     */
    this.publicEventsLoad()
    this.publicNewsLoad()
    
    /**
     * Search bar options
     */
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith('All Events and News'),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.temp_news=[];
    this.temp_events=[];

    if(filterValue.toLowerCase()=="all events and news")
    {
      this.temp_news=this.news;
      this.temp_events=this.events;
    }

    else{

      for(var i=0;i<this.news.length;i++){

          if(this.news[i].news_name_en.toLowerCase().includes(filterValue.toLowerCase()))   
            {
              this.temp_news.push(this.news[i])
            }
      }

      for(var i=0;i<this.events.length;i++){

          if(this.events[i].event_name_en.toLowerCase().includes(filterValue.toLowerCase()))
            {
              this.temp_events.push(this.events[i])
            }
      }
    }

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);  
    
    
  }

  eventLike(id:any,numLike:any,numDisLike:any){

    this.UpdateFullEvent.UpdateEvent.numLike=numLike+1
    this.UpdateFullEvent.UpdateEvent.numDisLike=numDisLike
    this.UpdateFullEvent._id=id;
    this.UpdateFullEvent.UpdateEvent._id=id

    this._eventService.updateEvents(this.UpdateFullEvent)
     .subscribe(res=>this.news=res,
       err=>{
         if (err instanceof HttpErrorResponse){
           if(err.status===401){
             //
           }
         }
       
       })

    this.publicEventsLoad()

  }

  eventDisLike(id:any,numLike:any,numDisLike:any){

    this.UpdateFullEvent.UpdateEvent.numLike=numLike
    this.UpdateFullEvent.UpdateEvent.numDisLike=numDisLike+1
    this.UpdateFullEvent._id=id;
    this.UpdateFullEvent.UpdateEvent._id=id

    this._eventService.updateEvents(this.UpdateFullEvent)
     .subscribe(res=>this.news=res,
       err=>{
         if (err instanceof HttpErrorResponse){
           if(err.status===401){
             //
           }
         }
       
       })

    this.publicEventsLoad()
  
  }

  newsLike(id:any,numLike:any,numDisLike:any){

    this.UpdateFullNews.UpdateNews.numLike=numLike+1
    this.UpdateFullNews.UpdateNews.numDisLike=numDisLike
    this.UpdateFullNews._id=id;
    this.UpdateFullNews.UpdateNews._id=id

    this._newsService.updateNews(this.UpdateFullNews)
    .subscribe(res=>this.news=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            //
          }
        }
      
      })

    this.publicNewsLoad()
 
   }

  newsDisLike(id:any,numLike:any,numDisLike:any){

    this.UpdateFullNews.UpdateNews.numLike=numLike
    this.UpdateFullNews.UpdateNews.numDisLike=numDisLike+1
    this.UpdateFullNews._id=id;
    this.UpdateFullNews.UpdateNews._id=id;

    this._newsService.updateNews(this.UpdateFullNews)
      .subscribe(res=>this.news=res,
        err=>{
          if (err instanceof HttpErrorResponse){
            if(err.status===401){
              //
            }
          }
        
        })
    this.publicNewsLoad()

  }


  publicEventsLoad(){
    
    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
    this._eventService.getPublicEvents()
    .subscribe(
      res=>{
        this.events=res;
        this.temp_events=this.events;
        for (var index1 in this.events) {
          this.options.push(this.events[index1].event_name_en)
        }
      },
      err=>{
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            // ;
          }
        }
      })
  }

  publicNewsLoad(){

    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
    this._newsService.getPublicNews()
      .subscribe(
        res=>{
          this.news=res;
          this.temp_news=this.news;
          for (var index1 in this.news) {
            this.options.push(this.news[index1].news_name_en)
          }
  
        },
        err=>{
          if (err instanceof HttpErrorResponse){
            if(err.status===401){
              // ;
            }
          }
        
        })
      }

}
