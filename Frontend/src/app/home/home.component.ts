import { Component, ViewContainerRef, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { Injectable } from '@angular/core';
import { RelativeTimeFilterPipe } from '../relative-time-filter.pipe';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MatExpansionModule, AccordionItem } from '@angular/material';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import 'rxjs/Rx';
import { MatRadioModule } from '@angular/material';

interface BufferTweet {
  text?: string;
  bufferToAccount?: string;
  postNow?: string;
  scheduled?: string;
  photoUrl?: string;
  scheduledAt?: number;
}
interface Dates {
  textId?: string;
  createdAt?: string;
}
interface Schedule {
  DD?: number;
  MM?: number;
  YYYY?: number;
  hh?: number;
  mm?: number;
}

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchquery = '';
  tweetBuffer: BufferTweet = {};
  editTweet: BufferTweet = {};
  dates = [];
  profiles;
  color = "gray";
  extendedtimeline = [];
  extended = false;
  postNow;
  scheduled: boolean = false;
  schedule: Schedule = {};
  type;

  bufferUrl = 'http://localhost:7777';
  twitterAPIUrl = this.twitterAPIUrl + ''

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  constructor(private http: Http, public dialog: MatDialog, ) {
    this.dates = [];

  }
  ngOnInit() {
    this.makecall();
    this.fetchProfiles();
  }
  setDefaultSch() {
    var today = new Date();
    var DD = today.getDate();
    var MM = today.getMonth() + 1;
    var YYYY = today.getFullYear();
    var hh = today.getHours();
    var mm = today.getMinutes();

    this.schedule = {
      DD: DD,
      MM: MM,
      YYYY: YYYY,
      hh: hh,
      mm: mm,
    };
  }
  checkbox(event) {
    this.type = event.srcElement.id;
    if (this.type == "schedule") {
      this.scheduled = true;
      this.postNow = false;
      this.setDefaultSch();
    }
    else if (this.type == "postNow") {
      this.postNow = true;
      this.scheduled = false;
      this.schedule = {};
    }
    else {
      this.postNow = false;
      this.scheduled = false;
      this.schedule = {};
    }
  }

  makecall() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post(this.twitterAPIUrl + '/authorize', { headers: headers }).subscribe((res) => {
    });
  }

  fetchProfiles() {
    var headers = new Headers();
    headers.append('Accept', 'application/json; charset=utf8');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append("Access-Control-Allow-Headers", "*");


    this.http.post(this.bufferUrl + '/getProfiles', { headers: headers })
      .subscribe((res) => {
        this.profiles = res.json();
      }, err => { 
        alert(err)
      });
  }

  bufferTweet(account: string, text: string, photoUrl: string, postNow: boolean, scheduled: boolean, schedule: Schedule) {

    var headers = new Headers();
    headers.append('Accept', 'application/json; charset=utf8');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append("Access-Control-Allow-Headers", "*");


    this.tweetBuffer.text = text;
    this.tweetBuffer.bufferToAccount = account;
    this.tweetBuffer.postNow = postNow ? 'true' : 'false';
    this.tweetBuffer.photoUrl = photoUrl;
    this.tweetBuffer.scheduled = scheduled ? 'true' : 'false';
    if (scheduled) {
      this.tweetBuffer.scheduledAt = this.toTimestamp(schedule);
    }
    else
      this.tweetBuffer.scheduledAt = undefined;

    var tweetJSON = JSON.stringify(this.tweetBuffer);
    this.http.post(this.bufferUrl + '/buffer', tweetJSON, { headers: headers })
      .subscribe((res) => {
      }, err => { alert(err) }
      );
  }

  fetchExtendedTweets(username, maxid) {
    this.makecall();
    var headers = new Headers();
    var searchterm = 'screenname=' + username;

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post(this.twitterAPIUrl + '/user', searchterm, { headers: headers }).subscribe((res) => {
      for (let dataitem of res.json().data)
        this.extendedtimeline.push(dataitem);
      this.extended = true;
      for (let x of this.extendedtimeline) {
        var date = new Date(x.created_at);
        this.dates.push(date);
      }
    });
  }

  fetchList(listname, maxid) {
    this.makecall();

    var headers = new Headers();
    var searchterm;
    if (listname) {
      searchterm = 'screenname=' + listname.substring(0, listname.indexOf('/')) + '&slug=' + listname.substring(listname.indexOf('/') + 1, listname.length)
    }
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post(this.twitterAPIUrl + '/list', searchterm, { headers: headers }).subscribe((res) => {
      this.extended = true;
      for (let dataitem of res.json().data)
        this.extendedtimeline.push(dataitem);
      for (let x of this.extendedtimeline) {
        var date = new Date(x.created_at);
        this.dates.push(date);
      }
    }, err => console.log(err));
  }

  fetchFavs(username, maxid) {
    this.makecall();

    var headers = new Headers();
    var searchterm = 'screenname=' + this.searchquery;
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post(this.twitterAPIUrl + '/favs/', searchterm, { headers: headers }).subscribe((res) => {
      this.extended = true;
      for (let dataitem of res.json().data)
        this.extendedtimeline.push(dataitem);
      for (let x of this.extendedtimeline) {
        var date = new Date(x.created_at);
        this.dates.push(date);
      }
    });
  }

  fetchById() {
    this.makecall();
    var headers = new Headers();
    var searchterm = 'id=' + this.searchquery;
    if(this.searchquery.includes('status'))
    {
      this.searchquery = this.searchquery.substring(this.searchquery.lastIndexOf('/')+1);
    }
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post(this.twitterAPIUrl + '/id/', searchterm, { headers: headers }).subscribe((res) => {
      this.extended = true;
      this.extendedtimeline = [res.json().data];
      for (let x of this.extendedtimeline) {
        var date = new Date(x.created_at);
        this.dates.push(date);
      }
    });
  }

  clearTL() {
    this.extendedtimeline = [];
  }
  removeUrl() {
    this.editTweet.photoUrl = null;
  }
  clearTweet() {
    this.editTweet.text = null;
  }
  toTimestamp(schedule: Schedule) {
    var datum = new Date(Date.UTC(schedule.YYYY, schedule.MM - 1, schedule.DD, schedule.hh, schedule.mm, 59));
    var offset = new Date().getTimezoneOffset() * 60;
    return (datum.getTime() / 1000 + offset);
  }
}