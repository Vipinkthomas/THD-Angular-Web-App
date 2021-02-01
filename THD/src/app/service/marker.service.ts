import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  buildings: string = '../../assets/data/buildings.geojson';

  constructor(private http: HttpClient,private popupService: PopUpService) { }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.buildings).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const circle = L.circleMarker([lon, lat],{radius:5,fill:true})
        circle.bindPopup(this.popupService.makeCapitalCirclePopup(c.properties));
        circle.addTo(map);
      }
    });

  //    }
  //  });

  }
}
