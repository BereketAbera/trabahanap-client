import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { tileLayer, latLng, marker, icon, Point, LatLng } from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnonymousService } from '@app/_services/anonymous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-near-jobs',
  templateUrl: './landing-near-jobs.component.html',
  styleUrls: ['./landing-near-jobs.component.scss']
})
export class LandingNearJobsComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  faSearch = faSearch;
  ping;
  map: L.Map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 15,
        attribution: '...'
      })
    ],
    zoom: 15,
    center: latLng(14.6042, 120.9822),
    attributionControl: false
  };
  latitude: any;
  longitude: any;
  locationTracked: boolean;
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  filterHidden = true;
  filtered = false;
  tabs: any = {};
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;
  @ViewChild('jobsListAnchor') jobsListAnchor: ElementRef<HTMLElement>;
  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888' },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.3rem',
      boxShadow: '0px 1px 2px #aaa'
    },
    option: {
      fontSize: '1.5rem',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }
  };
  radiuses = [
    { value: '3', name: '3Kms' },
    { value: '5', name: '5Km' },
    { value: '10', name: '10Kms' },
    { value: '15', name: '15Kms' }
  ];
  distance = 3;
  jobs;
  markers: L.Layer[] = [];
  searchForm: FormGroup;
  loading: boolean;
  showLoader: boolean=false;
  belowScroll: boolean=true;
  manila:boolean=false;
  
  constructor(
    private anonyService: AnonymousService,
    private router: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone
  ) { }

  ngOnInit() {
    navigator.permissions.query({name:'geolocation'})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          let { latitude, longitude } = pos.coords;

          ({ latitude: this.latitude, longitude: this.longitude } = pos.coords);
          this.locationTracked = true;

          this.anonyService.searchJobByProximity(this.latitude, this.longitude, this.distance, '',0).subscribe(
            data => {
              // console.log(data)
              if (data.success) {
                this.jobs = data.jobs.rows;
                this.pager = data.jobs.pager;
                this.page = data.jobs.pager.currentPage + 1;
                if (this.pager.totalItems <= 5) {
                  this.belowScroll = false;
                  this.reachedPageEnd = true;
                } else {
                  this.loadJobs();
                }
              }
            },
            error => {
              console.log(error);
            }
          );
        },
        err => {
          let { latitude, longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          };
          ({ latitude: this.latitude, longitude: this.longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          });
          this.manila=true;
          // console.log(err);
          this.anonyService.searchJobByProximity(this.latitude, this.longitude, this.distance, '',0).subscribe(
            data => {
              // console.log(data)
              if (data.success) {
                // this.pinMarkers(data.jobs);
                this.jobs = data.jobs.rows;
                this.pager = data.jobs.pager;
                this.page = data.jobs.pager.currentPage + 1;
                if (this.pager.totalItems <= 5) {
                  this.belowScroll = false;
                  this.reachedPageEnd = true;
                } else {
                  this.loadJobs();
                }
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      );
    }

    this.searchForm = this.formBuilder.group({
      key: [''],
      radius: ['3']
    });
  } // ngOnInit Ends here

  // get the reference to the map
  onMapReady(map: L.Map) {
    this.map = map;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 300,
      autoClose: true,
      showMarker: false,
    });
    this.map.addControl(searchControl);
    searchControl.getContainer().onclick = e => { e.stopPropagation(); };
    this.map.on('geosearch/showlocation', (e) => {
      let { lat, lng } = e.marker._latlng;
      this.ping.setLatLng(new LatLng(lat, lng));
      ({ lat: this.latitude, lng: this.longitude } = e.marker._latlng);
    })
  }

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    this.ping.setLatLng(new LatLng(lat, lng));
    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  chooseRadius(rad) {
    this.searchForm.controls['radius'].setValue(rad);
  }

  // fetchJobsByKey(term: string): void {
  //   this.jobKeyTerms.next(term);
  //   this.JOBS$.subscribe(
  //     data => {
  //       if(data.success) {
  // this.pinMarkers(data.jobs);
  //       }
  //     }
  //   )
  // }

  // pinMarkers(jobs) {
  //   this.jobs = jobs;
  //   this.markers = [];
  //   this.jobs.forEach(job => {
  //     let newMarker = marker([job.latitude, job.longitude], {
  //       icon: icon({
  //         iconSize: [22, 38],
  //         iconAnchor: [13, 41],
  //         iconUrl: 'assets/img/marker-icon-2.png',
  //         shadowUrl: 'assets/marker-shadow.png'
  //       }),
  //       draggable: true
  //     });
  // newMarker.bindPopup(`<span>${job.jobTitle}</span>`);
  // newMarker.addEventListener('mouseover', (e) => {
  //   newMarker.togglePopup();
  // });
  //     newMarker.addEventListener('click', () => {
  //       this.zone.run(() => this.router.navigate([`jobs/details/${job.jobId}`]));
  //     });
  //     this.markers.push(newMarker);
  //   });
  // }

  searchJobs() {
    let { key, radius } = this.searchForm.value;
    this.loading = true;
    this.anonyService.searchJobByProximity(this.latitude, this.longitude, radius, key,0).subscribe(data => {
      this.loading = false;
      // console.log(data)
      if (data.success) {
        // this.pinMarkers(data.jobs);
        this.jobs = data.jobs.rows;
        this.pager = data.jobs.pager;
        this.page = data.jobs.pager.currentPage + 1;
       
        if (data.jobs.pager.totalItems <= 5) {
          this.belowScroll = false;
          this.reachedPageEnd = true;
        }
        else {
          this.belowScroll = true;
          this.reachedPageEnd = false;
         
          this.loadJobs();
        }
      }
    });
  }

  loadJobs() {
    let elementPositionForScroll = 0;
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
      // console.log(bottomPosition,elementPosition)
      if (elementPosition > elementPositionForScroll) {
        if (elementPositionForScroll > 0) {
          window.scrollTo(0, elementPosition - elementPosition / (this.jobs.length / 8));
        }
        elementPositionForScroll = elementPosition;
      }
      if (elementPosition > bottomPosition) {
        this.showLoader = true;
        this.shouldLoad = true;
      }
      if (bottomPosition > elementPosition && this.shouldLoad && !this.reachedPageEnd) {
        this.shouldLoad = false;
        this.showLoader = true;
        let { key, radius } = this.searchForm.value;
        this.anonyService.searchJobByProximity(this.latitude, this.longitude, radius, key,this.page).subscribe(data => {
          // console.log(data)
          if (this.jobs) {

            this.shouldLoad = data.jobs.rows.length > 0 ? true : false;

            if (data.jobs.rows.length > 0) {
              this.jobs.push(...data.jobs.rows);
              // this.shouldLoad = true;
              this.page = data.jobs.pager.currentPage + 1;
              this.pager = data.jobs.pager;
              // console.log(data.jobs.pager.totalPages,data.jobs.pager.currentPage);
              if (data.jobs.pager.totalPages == data.jobs.pager.currentPage+1) {
                this.reachedPageEnd = true;
                this.belowScroll = false;
              }
            }
          }
        });
      }
    };
  }
}
