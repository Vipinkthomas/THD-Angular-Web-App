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
        for (var index1 in this.events) {
          this.options.push(this.events[index1].event_name)
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
          for (var index1 in this.news) {
            this.options.push(this.news[index1].news_name)
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
    console.log(filterValue)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
