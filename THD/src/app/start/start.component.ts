import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../service/event.service';
import { NewsService } from '../service/news.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  myControl = new FormControl();
  data={"access":"public"}
  events=[]
  news=[]
  temp_events=[]
  temp_news=[]
  lang_sel:any;
  options: any[]=['All Events and News']
  filteredOptions: Observable<string[]>;

  /**
  * @ignore
  */
  constructor(private _eventService:EventService,private _newsService:NewsService) { }
  ngOnInit(): void {

    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
    this._eventService.getPublicEvents(this.data)
    .subscribe(
      res=>{
        this.events=res;
        this.temp_events=this.events;
        for (var index1 in this.events) {
          this.options.push(this.events[index1].event_name_en)
        }

      },
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            // ;
          }
        }
      
      })

      this._newsService.getPublicNews(this.data)
      .subscribe(
        res=>{
          this.news=res;
          this.temp_news=this.news;
          for (var index1 in this.news) {
            this.options.push(this.news[index1].news_name_en)
          }
  
        },
        err=>{
          console.log(err)
          if (err instanceof HttpErrorResponse){
            if(err.status===401){
              // ;
            }
          }
        
        })

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
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

}
