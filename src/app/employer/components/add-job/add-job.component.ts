import { LocationService } from './../../../_services/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { faCheck, faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '@app/_services/state.service';
import _ from 'lodash';
import { JobService } from '@app/_services/jobs.service';
import { OtherService } from '@app/_services/other.service';

@Component({
  selector: 'employer-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  faCheck = faCheck;
  faEyeDropper = faEyeDropper;
  isEditMode = false;
  submitted = false;
  addJob: FormGroup;
  invalidFields: string[] = [];
  locations = [];
  industries = [];
  salaryRange = [
    { name: 'Below 18,000', value: '<18000' },
    { name: '18,000-25,000', value: '18000-25000' },
    { name: '25,001-40,000', value: '25001-40000' },
    { name: '40,001-60,000', value: '40001-60000' },
    { name: '60,001-80,000', value: '60001-80000' },
    { name: '>80,000', value: '>80000' }
  ];
  educationAttainment = [
    { name: 'High School Undergraduate', value: 'High School Undergraduate' },
    { name: 'High School Diploma', value: 'High School Diploma' },
    { name: 'Vocational School', value: 'Vocational School' },
    { name: 'College Undergraduate', value: 'College Undergraduate' },
    { name: 'College Graduate', value: 'College Graduate' },
    { name: 'Post Graduate Study', value: 'Post Graduate Study' }
  ];

  // location = [
  //   {name: 'High School', value: 'Highschool'},
  //   {name: 'College', value: 'College'},
  //   {name: 'University', value: 'University'},
  //   {name: 'Degree', value: 'Deploma'}
  // ]
  employmentType = [
    { name: 'Part Time', value: 'Part-Time' },
    { name: 'Full Time', value: 'Full-Time' },
    { name: 'Work From Home', value: 'Work-from-home' },
    { name: 'Project Based', value: 'Project-Based' },
    { name: 'Permanent', value: 'PERMANENT' },
    { name: 'Temporary', value: 'TEMPORARY' },
    { name: 'Internship/OJT', value: 'INTERNSHIP/OJT' },
    { name: 'Freelance', value: 'Freelance' }
  ];
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
  defaultLimit = { max: '40', min: '0' };
  numberRange = { max: '20', min: '10' };
  bigLimit = { max: '100', min: '6' };
  job: any;
  previousJobs: any = [];
  jobAdded: boolean;
  jobEditted: boolean;
  currentDate = new Date();
  // validDate =  new Date();
  validDate =
    this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth() + 1) + '-' + this.currentDate.getDate();

  defaultDate1 = '';
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private router: Router,
    private jobService: JobService
  ) {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.defaultDate1 = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() +
      1}-${this.currentDate.getDate()}`;
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.jobService.getJobById(params.id).subscribe(
            success => {
              this.job = success.job;
              this.job.applicationStartDate = this.job.applicationStartDate.split('T')[0];
              this.job.applicationEndDate = this.job.applicationEndDate.split('T')[0];
              this.populateFields();
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.route.data.subscribe(
      success => {
        if (success.data && success.data.locations && success.data.industries) {
          const data = success.data;
          this.fillLocations(success.data.locations);
          this.fillIndustries(success.data.industries);
          // this.industries = data.industries;
        }
      },
      error => console.log(error)
    );

    this.jobService.getCompanyJobs(1, 5).subscribe(
      success => {
        if (success.success == true) {
          this.previousJobs = success.jobs.rows;
        }
      },
      err => console.log(err)
    );

    this.addJob = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.compose([Validators.required, Validators.maxLength(1500)])],
      industry: ['', Validators.required],
      pwd: [false],
      position: [''],
      educationAttainment: ['', Validators.required],
      salaryRange: ['', Validators.required],
      employmentType: ['', Validators.required],
      vacancies: ['', Validators.required],
      additionalQualifications: [''],
      applicationStartDate: [''],
      applicationEndDate: [''],
      locationId: ['', Validators.required]
    });
  }

  get f() {
    return this.addJob.controls;
  }

  onSubmit() {
    if (!this.isEditMode && this.job) {
      return;
    }
    this.submitted = true;
    this.checkValidOnValueChange();
    let StartDate = new Date(this.addJob.value.applicationStartDate);
    let endDate = new Date(this.addJob.value.applicationEndDate);
    let dateValid = new Date(`'${this.validDate}'`);
    if (this.addJob.invalid) {
      return;
    }

    this.loading = true;
    this.jobEditted = false;
    this.jobAdded = false;

    var val = this.addJob.value;

    if (this.job) {
      this.employerService.editEmployerJob(this.job.id, val).subscribe(
        success => {
          this.loading = false;
          if (success.success) {
            this.jobEditted = true;
          }
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
      return;
    }
    this.loading = false;

    if (StartDate.getTime() <= dateValid.getTime() || (StartDate == null && !this.job)) {
      this.f.applicationStartDate.setErrors({ rangeOut: true });
      return;
    } else if (endDate.getTime() <= dateValid.getTime() || (endDate == null && !this.job)) {
      this.f.applicationEndDate.setErrors({ rangeOut: true });
      return;
    }

    this.loading = true;
    this.employerService.addEmployerJob({ ...val }).subscribe(
      success => {
        this.loading = false;
        if (success.success) {
          this.jobAdded = true;
        }
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  customValueChanged(value, name) {
    this.invalidFields = [];
    this.addJob.controls[name].setValue(value);
    this.checkValidOnValueChange();
  }

  showDetail($event) {
    //this.router.navigate(['/jobs/${$event.id}' ,${$event.id}]);
    this.router.navigate([`../${$event.id}`], { relativeTo: this.route });
  }

  populateFields() {
    _.map(this.job, (value, key) => {
      this.addJob.controls[key] ? this.addJob.controls[key].setValue(value) : null;
    });

    this.disableEdit();
  }

  checkValidOnValueChange() {
    this.invalidFields = [];
    var specialInputs = [
      { value: 'applicationEndDate', name: 'Application End Date' },
      { value: 'applicationStartDate', name: 'Application Start Date' },
      { value: 'educationAttainment', name: 'Education Attainment' },
      { value: 'employmentType', name: 'Employment Type' },
      { value: 'locationId', name: 'Location' },
      { value: 'salaryRange', name: 'Salary Range' },
      { value: 'industry', name: 'Industry' }
    ];
    specialInputs.map(sp => {
      if (this.addJob.controls[sp.value].invalid) {
        this.invalidFields.push(sp.name);
      }
    });
  }

  enableEdit() {
    this.isEditMode = true;
    _.map(this.job, (value, key) => {
      if (this.addJob.controls[key]) {
        this.addJob.controls[key].enable();
      }
    });
  }

  disableEdit() {
    this.isEditMode = false;
    _.map(this.job, (value, key) => {
      if (this.addJob.controls[key]) {
        this.addJob.controls[key].disable();
      }
    });
  }

  fillIndustries(industries) {
    industries.map(industry => {
      this.industries.push({
        name: industry.industryName,
        value: industry.industryName
      });
    });
  }

  fillLocations(locations) {
    locations.map(locations => {
      this.locations.push({
        name: locations.locationName,
        value: locations.id
      });
    });
  }
}
