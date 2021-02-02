import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

/**
 * marker for navigation map
 */
@Injectable({
  providedIn: 'root'
})

/**
 * marker for navigation class
 */
export class MarkerService {

/**
 * buildings info-geojson
 */
  buildings: string = '../../assets/data/buildings.geojson';

  /**
 * constructor
 */
  constructor(private http: HttpClient,private popupService: PopUpService) { }


  /**
  * @example
  * to add markers to the map
  * makeCapitalCircleMarkers(map: L.Map)
  *
  * @param {Map} map  map{@link Todo}
  * @returns void
  */
  makeCapitalCircleMarkers(map: L.Map): void {

  /**
  * http get request
  */
    this.http.get(this.buildings).subscribe((res: any) => {
      for (const c of res.features) {
        /**
         * coordinates
        */
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
         
        /**
         * circle marker
        */
        const circle = L.circleMarker([lon, lat],{radius:5,fill:true})

        /**
         * pop service
        */
        circle.bindPopup(this.popupService.makeCapitalCirclePopup(c.properties));

        /**
         * adding to map
        */
        circle.addTo(map);
      }
    });

  }
}
