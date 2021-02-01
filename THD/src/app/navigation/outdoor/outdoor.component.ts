import { AfterViewInit, Component, OnInit} from '@angular/core';
import 'leaflet';
import { MarkerService } from '../../service/marker.service';
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { icon, Marker } from 'leaflet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { buildingsArray } from '../../../assets/navigation/buildingsCoordinates';


declare var L: any;
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
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

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-navigation',
  templateUrl: './outdoor.component.html',
  styleUrls: ['./outdoor.component.scss']
})
export class OutdoorComponent implements OnInit,AfterViewInit{

  private map:any;
  buildingsList=[]
  fromBuilding:string;
  toBuilding:string;
  

  fromBuildingCoordinateX;
  fromBuildingCoordinateY;
  toBuildingCoordinateX;
  toBuildingCoordinateY;

  navigationForm: FormGroup= new FormGroup({
    fromRoom: new FormControl('',Validators.required),
    toRoom:new FormControl('',Validators.required)
  })
  
  constructor(private markerService: MarkerService) {
    this.buildingsList=buildingsArray;
   // (mapboxgl as any).accessToken = environment.mapbox.accessToken ;
   }
  ngAfterViewInit(): void {
    //
  }
  ngOnInit(): void {
    this.initMap();
  this.markerService.makeCapitalCircleMarkers(this.map);

  }

  findRoute(){
    for(let i=0;i<this.buildingsList.length;i++){
      if(this.buildingsList[i].name==this.fromBuilding){
        this.fromBuildingCoordinateX=this.buildingsList[i].coordinateX
        this.fromBuildingCoordinateY=this.buildingsList[i].coordinateY
      }
      if(this.buildingsList[i].name==this.toBuilding){
        this.toBuildingCoordinateX=this.buildingsList[i].coordinateX
        this.toBuildingCoordinateY=this.buildingsList[i].coordinateY
      }
    }

    
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
       L.latLng(this.fromBuildingCoordinateX,this.fromBuildingCoordinateY),
       L.latLng(this.toBuildingCoordinateX,this.toBuildingCoordinateY)
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

