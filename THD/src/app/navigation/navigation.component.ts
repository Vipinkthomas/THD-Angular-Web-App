import { AfterViewInit, Component} from '@angular/core';
import 'leaflet';
import { MarkerService } from '../service/marker.service';
import "leaflet-routing-machine";
//import "mapbox";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

declare var L: any;

//import { icon, Marker } from 'leaflet';
//import { antPath } from 'leaflet-ant-path';

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
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit{

  private map:any;
  
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap()
    this.markerService.makeCapitalCircleMarkers(this.map);
    //antPath([[48.82878,12.95546], [48.82982,12.95435]], {color: '#FF0000', weight: 5, opacity: 0.6}).addTo(this.map);
    
    const options = { profile: "mapbox/walking", polylinePrecision: 6,language: 'en' };


    L.Routing.control({
      //router: L.Routing.mapbox(L.mapbox.accessToken, options),
      waypoints: [
          L.latLng(48.82878, 12.95546),
          L.latLng(48.82982, 12.95435)
      ],
      fitSelectedRoutes: true,
      routeWhileDragging: true,
      collapsible: true,
      lineOptions: {
        styles: [
          {
            color: "red",
            opacity: 1,
            weight: 4
          }
        ]
      }
  }).addTo(this.map);
  //L.Routing.control._container.style.display= "block";
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.8296,12.95474 ],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

tiles.addTo(this.map);
  }

}

