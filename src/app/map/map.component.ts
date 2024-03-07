import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public options: MapOptions | undefined;
  public map: Map | undefined;
  public zoom: number | undefined;

  constructor() {}

  ngOnInit() {
    this.options = this.createMapOptions();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.clearAllEventListeners;
      this.map.remove();
    }
  }

  onMapReady(map: Map) {
    this.map = map;

    this.addMarker(new L.LatLng(47.39923, 8.45365));

    this.addLine();

    this.addPolygon();
  }

  private createMapOptions(): MapOptions {
    const baseLayer = tileLayer(
      'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
      { maxNativeZoom: 18, maxZoom: 19, opacity: 1 }
    );

    return {
      layers: [baseLayer, this.addBauzonenLayer()],
      zoom: 16,
      maxZoom: 19,
      minZoom: 8,
      center: { lat: 47.39923, lng: 8.45365 },
    };
  }

  private addBauzonenLayer() {
    return L.tileLayer.wms('http://wms.geo.admin.ch/?', {
      layers: 'ch.are.bauzonen',
      format: 'image/png',
      transparent: true,
      opacity: 0.3,
    });
  }

  private addMarker(pos: L.LatLng) {
    const defaultIcon: L.Icon = L.icon({
      iconUrl: 'assets/locationMarker.svg',
      iconSize: [40, 75],
      iconAnchor: [20, 50],
      className: 'marker-icon',
    });

    if (this.map) {
      L.marker(pos, { icon: defaultIcon }).addTo(this.map);
    }
  }

  private addLine() {
    const geojsonLine: GeoJSON.LineString = {
      type: 'LineString',
      coordinates: [
        [8.44789, 47.39921],
        [8.45253, 47.39951],
      ],
    };
    const lineGeom = L.geoJSON(geojsonLine, {
      style: {
        weight: 8,
        opacity: 1,
        color: 'blue',
        dashArray: '12',
      },
    });

    if (this.map) {
      lineGeom.addTo(this.map);
    }
  }

  private addPolygon() {
    const geojsonPolygon: GeoJSON.Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [8.45253, 47.39951],
          [8.45455, 47.39964],
          [8.45457, 47.39886],
          [8.45262, 47.39863],
          [8.45253, 47.39951],
        ],
      ],
    };
    var polygonGeom = L.geoJSON(geojsonPolygon, {
      style: {
        fillColor: '#FC4E08',
        weight: 3,
        opacity: 1,
        color: 'blue',
        fillOpacity: 0.7,
      },
    });

    if (this.map) {
      polygonGeom.addTo(this.map);
    }
  }

  onMapClick(e: any) {
    const defaultIcon: L.Icon = L.icon({
      iconUrl: 'assets/locationMarker.svg',
      iconSize: [40, 75],
      iconAnchor: [20, 50],
      className: 'marker-icon',
    });

    if (this.map) {
      L.marker(e.latlng, { icon: defaultIcon }).addTo(this.map);
    }
  }
}
