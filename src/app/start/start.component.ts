import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  /**
  * @ignore
  */
  constructor() { }
  cards: {title: string, subtitle: string, content: string, url: string,color:string}[] = [
    {title: 'EVENTS', subtitle: 'Subtitle', content: 'Events', url: '',color:'#5f7b9d'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: '',color:'#7aa2ff'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: '',color:'#477fff'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: '',color:'#004cf9'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: '',color:'#145cff'},
    {title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: '',color:'#0072d0'},
  ];
  ngOnInit(): void {
  }

}
