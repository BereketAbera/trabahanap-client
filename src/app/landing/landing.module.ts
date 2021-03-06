import { AnonymousJobSkeletonComponent } from './components/anonymous-job-skeleton/anonymous-job-skeleton.component';
import { AnonymousJobComponent } from './components/anonymous-job/anonymous-job.component';
import { AnonymousJobsListComponent } from './components/anonymous-jobs-list/anonymous-jobs-list.component';
import { AnonymousCustomSelectComponent } from './components/anonymous-custom-select/anonymous-custom-select.component';
import { AnonymousCustomInputFieldComponent } from './components/anonymous-custom-input-field/anonymous-custom-input-field.component';
import { HomeComponent } from './components/home/home.component';
import { HomeSectionThreeComponent } from './components/home-section-three/home-section-three.component';
import { HomeSectionTwoComponent } from './components/home-section-two/home-section-two.component';
import { HomeSectionOneComponent } from './components/home-section-one/home-section-one.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { AnonymousFooterComponent } from './components/anonymous-footer/anonymous-footer.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LandingNearJobsComponent } from './components/landing-near-jobs/landing-near-jobs.component';
import { LandingJobDetailComponent } from './components/landing-job-detail/landing-job-detail.component';
import { LandingJobListComponent } from './components/landing-job-list/landing-job-list.component';
import { JobDetailResolverService } from '@app/_resolvers/job-detail-resolver.service';
import { SimpleJobSearchResolveService } from '@app/_resolvers/simple-job-search-resolve.service';
import { JobService } from '@app/_services/jobs.service';
import { AnonymousService } from '@app/_services/anonymous.service';
import { FeatureJobComponent } from './components/feature-job/feature-job.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { FeatureJobListComponent } from './components/feature-job-list/feature-job-list.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { TermsComponent } from './components/terms/terms.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@app/pipes/pipes.module';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';
import { HomeSectionFourComponent } from './components/home-section-four/home-section-four.component';
import { StateService } from '@app/_services/state.service';
import { LandingCustomSubmitComponent } from './components/landing-custom-submit/landing-custom-submit.component';
import { AdvertisementService } from '@app/_services/advertisement.service';
// import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    AnonymousFooterComponent,
    HomeComponent,
    HomeSectionOneComponent,
    HomeSectionTwoComponent,
    HomeSectionThreeComponent,
    LandingNearJobsComponent,
    LandingJobDetailComponent,
    LandingJobListComponent,
    AnonymousCustomInputFieldComponent,
    AnonymousCustomSelectComponent,
    AnonymousJobsListComponent,
    AnonymousJobComponent,
    AnonymousJobSkeletonComponent,
    FeatureJobListComponent,
    AdvertisementComponent,
    FeatureJobComponent,
    PrivacyComponent,
    AboutusComponent,
    TermsComponent,
    CustomNotificationComponent,
    HomeSectionFourComponent,
    LandingCustomSubmitComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    LeafletModule,
    MatProgressBarModule,
    MatButtonModule,
    PipesModule,
    // AdsenseModule.forRoot({
    //   adClient: 'ca-pub-1753822621737307',
    // })
  ],
  providers: [
    JobDetailResolverService,
    SimpleJobSearchResolveService,
    JobService,
    AnonymousService,
    StateService,
    AdvertisementService
  ]
})
export class LandingModule {}
