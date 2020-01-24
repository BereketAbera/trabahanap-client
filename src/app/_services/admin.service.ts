import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication-service.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  fetchDashboardCounter(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/counters`)
  }
  getAllAds(page,pageSize):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/advertisement?page=${page}&pageSize=${pageSize}`);
  }
  deactivateAds(id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/advertisement/${id}`, {});
  }
  addAdvertisement(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/advertisement`, formData)
  }

  getAllEmployers(page,pageSize) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/employers?page=${page}&pageSize=${pageSize}`);
  }

  getEmployerById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/employers/${id}`);
  }

  getAllJobs(page,pageSize,companyProfileId):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/jobs/${companyProfileId}?page=${page}&pageSize=${pageSize}`);
  }

  getFilterJobs(key,industry,employtype,salaryRange,page){
    return this.http.get<any>(`${environment.apiUrl}/admin/filter/jobs?industry=${industry}&et=${employtype}&salary=${salaryRange}&search=${key}&page=${page}`);
  }

  getFilterApplications(applicantName,jobtitle,companyName,page){
    return this.http.get<any>(`${environment.apiUrl}/admin/filter/applications?applicant=${applicantName}&job=${jobtitle}&company=${companyName}&hired=&page=${page}`);
  }

  getFilterEmployers(companyName,industry,page){
    return this.http.get<any>(`${environment.apiUrl}/admin/filter/employers?companyName=${companyName}&industry=${industry}&page=${page}`);
  }
  getFilterApplicants(name,email,page){
    return this.http.get<any>(`${environment.apiUrl}/admin/filter/applicants?name=${name}&email=${email}&page=${page}`);
  }
  getCompanyLocation(page,pageSize, id) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/location/${id}?page=${page}&pageSize=${pageSize}`);
  }

  getCompanyLocationById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/location/details/${id}`);
  }

  editCompanyBranch(companyLocation, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/location/details/${id}`, companyLocation);
  }

  editCompanyBranchPicture(companyImage, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/location/details/picture/${id}`, companyImage);
  }

  getCompanyApplicant(page,pageSize, id) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/employers/applicant/${id}?page=${page}&pageSize=${pageSize}`);
  }

  getCompanyStaffs(page,pageSize, id) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/staff/${id}?page=${page}&pageSize=${pageSize}`);
  }

  getCompanyLocationsByCompanyId(companyId) : Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/location/company/${companyId}`);
  }

  addCompanyLocation(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/location`, formData)
  }

  addStaff(formData,companyProfileId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/staff/${companyProfileId}`, formData)
  }

  getAllApplicants(page) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/applicants?page=${page}`);
  }

  verfifyEmployer(id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/employers/verify/${id}`, {});
  }
  checkedReport(id):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/admin/report/check/${id}`, {});
  }
  deactivateUser(id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/applicants/${id}`, {});
  }

  deactivateAdminStaff(id):Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/admin/staff/${id}`, {});
  }
  deleteEmployerJob(id):Observable<any>{
    return this.http.put(`${environment.apiUrl}/admin/jobs/delete/${id}`,{});
  }
  addEmployer(employer): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/employers`, employer);
  }
  
  addApplicant(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/applicants`, formData)
  }

  addEmployerJob(job): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/jobs/${job.userId}`, job);
  }
   
  addCompanyJob(job,companyProfileId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/jobs/${companyProfileId}`, job);
  }

  editCompanyJob(id, job): Observable<any> {
    return this.http.put(`${environment.apiUrl}/admin/jobs/${id}`, job);
  }

  getIssueById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/issue/${id}`);
  }
  getReportById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/report/${id}`);
  }

  getIssueCounts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/issue/counts`)
  }

  getAllEmployerIssues(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/issues/employer`);
  }

  getAllApplicantIssues(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/issues/applicant`);
  }

  addIssueResponse(issueResponse): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/issue_responses`, issueResponse);
  }

  getAdminStaff(page,pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/staff?page=${page}&pageSize=${pageSize}`);
  }

  addAdminStaff(staffer): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/admin/staff/add`, staffer);
  }

  getAllApplications(page):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/applications?page=${page}`);
  }

  getApplicantById(id):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/applicant/${id}`);
  }
  getAllReportedJob(){
    return this.http.get<any>(`${environment.apiUrl}/admin/reports`);
  }
}
