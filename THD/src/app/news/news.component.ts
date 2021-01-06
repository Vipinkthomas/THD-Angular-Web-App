import { NewsService } from '../service/news.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


  myControl = new FormControl();
  data={"access":"public"}
  isCreateButton=false;
  isUpdateButton=false;
  createNewsForm: FormGroup;
  updateNewsForm: FormGroup;
  deleteNewsForm: FormGroup;
  lang_sel:any;
  news=[]
  temp_news=[]
  options: any[]=['All News']
  filteredOptions: Observable<string[]>;

  CreateNews={
    "news_name_en": "",
    "news_desc_en": "",
    "news_name_de": "",
    "news_desc_de": "",
    "news_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon",
    createdby: "",
    "numLike":0,
    "numDisLike":0,
    "numShare":0

  };
  UpdateFullNews={
    "_id":"",
  "UpdateNews": {
    "_id":"",
    "news_name_en": "",
    "news_desc_en": "",
    "news_name_de": "",
    "news_desc_de": "",
    "news_date": "",
    "access": "public",
    "imageURL": "image",
    "iconName": "icon"
  }
};

  DeleteNews={
    "_id":""
  };
  constructor(private _newsService:NewsService,private router:Router,private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.createNewsForm = this.formBuilder.group({
      newsname: ['', Validators.required],
      newsdesc: ['', Validators.required],
      newsdate: ['', Validators.required]
    });

    this.updateNewsForm = this.formBuilder.group({
      newsname: ['', Validators.required],
      newsdesc: ['', Validators.required],
      newsdate: ['', Validators.required]
    });

      this.newsLoad()

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }




  createNews(){

    this._newsService.createNews(this.CreateNews)
    .subscribe(res=>this.news=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      this.isCreateButton=false;
      this.newsLoad()
  }

  
  updateNews(){
    this._newsService.updateNews(this.UpdateFullNews)
    .subscribe(res=>this.news=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      this.isUpdateButton=false;
      this.newsLoad()
  }


  deleteNews(data: any){
    this.DeleteNews._id=data;
    console.log(this.DeleteNews._id);
    this._newsService.deleteNews(this.DeleteNews)
    .subscribe(res=>this.news=res,
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
      this.newsLoad()
  }

  isCreate(){
    if(this.isCreateButton){
      this.isCreateButton=false;
    } 
    else{
      this.isCreateButton=true;
      this.isUpdateButton=false;
    }
  }

  isUpdate(data: any){
    if(this.isUpdateButton){
      this.isUpdateButton=false;
    } 
    else{
      this.isUpdateButton=true;
      this.isCreateButton=false;
    }
    this.UpdateFullNews._id=data;
    this.UpdateFullNews.UpdateNews._id=data;
    console.log(this.UpdateFullNews._id);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.temp_news=[]
    if(filterValue.toLowerCase()=="all news")
    {
      

          this.temp_news=this.news      

    }
    else{
  for(var i=0;i<this.news.length;i++){

    if(this.news[i].news_name_en.toLowerCase().includes(filterValue.toLowerCase())||this.news[i].news_name_de.toLowerCase().includes(filterValue.toLowerCase()))   
    {
      this.temp_news.push(this.news[i])

    }
    

  }
}
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);  
    
  }

  newsLoad(){
    this.lang_sel=(localStorage.getItem('lang')=='en') ? true:false;
    this._newsService.getNews(this.data)
    .subscribe(
      res=>{
        this.news=res;
        this.temp_news=this.news;
        for (var index1 in this.news) {
          if(this.lang_sel)
          this.options.push(this.news[index1].news_name_en)
          else
          this.options.push(this.news[index1].news_name_de)
        }

      },
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      
      })
  }

}
