import { AfterViewInit, Component, OnInit} from '@angular/core';
import 'leaflet';
import { MarkerService } from '../../service/marker.service';
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { icon, Marker } from 'leaflet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/service/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * leaflet object variables
 */
declare var L: any;

/**
 * icon URL 
 */
const iconRetinaUrl = 'assets/marker-icon-2x.png';

/**
 *  icon URL 
 */
const iconUrl = 'assets/marker-icon.png';

/**
 * shadow Url
 */
const shadowUrl = 'assets/marker-shadow.png';

/**
 * default icon object
 */
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

/**
 * setting icon as default icon object
 */
L.Marker.prototype.options.icon = iconDefault;

/**
 * Outdoor component
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './outdoor.component.html',
  styleUrls: ['./outdoor.component.scss']
})

/**
 * Outdoor component class
 */
export class OutdoorComponent implements OnInit,AfterViewInit{

/**
 * variables
 */
  private map:any;
  buildingsList=[]
  fromBuilding:string;
  toBuilding:string;
  
  /**
   * coordinates
   */
  fromBuildingLattitude;
  fromBuildingLongitude;
  toBuildingLattitude;
  toBuildingLongitude;

  /**
   * validation form
   */
  navigationForm: FormGroup= new FormGroup({
    fromRoom: new FormControl('',Validators.required),
    toRoom:new FormControl('',Validators.required)
  })
  
  /**
   * constructor
   */
  constructor(private _navigationService:NavigationService,private markerService: MarkerService,private router: Router) {
   // (mapboxgl as any).accessToken = environment.mapbox.accessToken ;
   }

  /**
   * after ngOnIt
   */
  ngAfterViewInit(): void {
    //
  }

   /**
   * run after constructor
   */
  ngOnInit(): void {

/**
  * loading data from DB and initialising the map and markers
  */
    this.navLoad()
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map);

  }

   /**
   * loading the map without the route
   */
  navLoad(){
    this._navigationService.getNavigation()
    .subscribe(res=>{
      this.buildingsList=res
      console.log(res)
    },
      err=>{
        console.log(err)
        if (err instanceof HttpErrorResponse){
          if(err.status===401){
            console.log(err)
          }
        }
      
      })
  }

   /**
   * drawing the path from the user choice
   */
  drawLine(){

    for(let i=0;i<this.buildingsList.length;i++){
      if(this.buildingsList[i].building_name==this.fromBuilding){
        this.fromBuildingLattitude=this.buildingsList[i].lattitude
        this.fromBuildingLongitude=this.buildingsList[i].longitude
      }
      if(this.buildingsList[i].building_name==this.toBuilding){
        this.toBuildingLattitude=this.buildingsList[i].lattitude
        this.toBuildingLongitude=this.buildingsList[i].longitude
        console.log(this.fromBuildingLattitude,this.fromBuildingLongitude)
        console.log(this.toBuildingLattitude,this.toBuildingLongitude)

      }
    }

/**
  * Routing features is used for drawing the path
  */
    L.Routing.control({
     showAlternatives: true,
     fitSelectedRoutes:true,
     show: true,
     autoRoute:true,
     routeWhileDragging: false,
     addwaypoints: true,
     collapsible: false,
     useZoomParameter:true,
     //geocoder: L.Control.Geocoder.nominatim(),
     lineOptions: {
       styles: [
         {
           color: "red",
           opacity: 1,
           weight: 4
         }
       ]
     },
     waypoints: [
       L.latLng(this.fromBuildingLattitude,this.fromBuildingLongitude),
       L.latLng(this.toBuildingLattitude,this.toBuildingLongitude)
     ]
    }).addTo(this.map)
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.8296,12.95474 ],
      zoom: 16.5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

tiles.addTo(this.map);
  }


}

