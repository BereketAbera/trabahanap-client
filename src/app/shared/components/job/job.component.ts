import { JobService } from './../../../_services/jobs.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../_services/authentication-service.service';
import { Job } from '../../../_models/Job';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @Input() Job: Job;
  @Input() isBookMarked: boolean;
  userRole;
  booking: string = '';
  bookmarked: boolean = false;
  // imageUrl = `assets/img/pseudo/Logo${Math.floor(Math.random() * 10) + 1}.png`;

  constructor(private authService: AuthenticationService, private router: Router, private jobsService: JobService) {}

  ngOnInit() {
    this.bookmarked = this.isBookMarked;
    let currentUser = this.authService.currentUserValue;
    currentUser ? (this.userRole = currentUser.role) : (this.userRole = '');
    this.Job = {...this.Job, jobTitle: this.Job.jobTitle.match(/.{1,40}/g)[0]}
  }

  bookmarkJob(event) {
    event.stopPropagation();
    let auth = this.authService.currentUserValue;
    if (auth === null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/applicant/jobs/details/${this.Job.jobId}` } });
      return false; // to prevent reload
    } else if (!auth.hasFinishedProfile) {
      return false;
    } else {
      this.booking = this.Job.jobId;
      this.jobsService.toggleSaveJob(this.Job.jobId).subscribe(
        data => {
          this.booking = '';
          if (data.success) {
            this.bookmarked = !this.bookmarked;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
