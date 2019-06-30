import { Injectable } from '@angular/core';
import {ConnectionService} from './connection.service';
import { EditFormModel } from '../components/edit-page/edit-page.model';
declare var RemObjects: any;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  data: any;
  loadData: any;
  service: any;

  constructor(
    public connectionService: ConnectionService,
    private router: Router
  ) {
    this.loadData = new EditFormModel();
    this.service = new RemObjects.SDK.RemoteService(this.connectionService.channel, this.connectionService.message, 'OrganizationService');
  }

  getCompanies() {
    const request = this.service.fMessage.clone();
    request.initialize(this.service.fServiceName, 'GetCompanyList');
    request.write('CompanyList', 'roCompanyList');
    request.finalize();
    this.connectionService.channel.dispatch(request, (res) => {
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.data = res.fResponseObject.result.CompanyList;
        this.data.forEach((company) => {
          if (company.CompanyData) {
            company.CompanyData = `data:image/png;base64,` + company.CompanyData;
          }
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  deleteCompany(companyIndex, arrayIndex) {
    const request = this.service.fMessage.clone();
    request.initialize(this.service.fServiceName, 'DeleteCompany');
    request.write('CompanyIndex', 'Integer', `${companyIndex}`);
    request.finalize();
    this.connectionService.channel.dispatch(request, (res) => {
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.data.splice(arrayIndex, 1);
      }
    }, (error) => {
      console.log(error);
    });
  }

  editCompany(form) {
    const request = this.service.fMessage.clone();
    request.initialize(this.service.fServiceName, 'SaveCompany');
    if (form.companyImage) {
      request.write('CompanyRecord', 'roCompanyRecord', {
        CompanyIndex: form.companyIndex,
        CompanyName: form.companyName,
        CompanyData: form.companyImage
      });
    } else {
      request.write('CompanyRecord', 'roCompanyRecord', {
        CompanyIndex: form.companyIndex,
        CompanyName: form.companyName
      });
    }
    request.finalize();
    this.connectionService.channel.dispatch(request, (res) => {
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.router.navigate([ '/main-page' ]);
      }
    }, (error) => {
      console.log(error);
    });
  }

  saveNewCompany(companyName) {
    const request = this.service.fMessage.clone();
    request.initialize(this.service.fServiceName, 'SaveCompany');
    request.write('CompanyRecord', 'roCompanyRecord', {
      CompanyIndex: this.data[this.data.length - 1].CompanyIndex + 1,
      CompanyName: companyName
    });
    request.finalize();
    this.connectionService.channel.dispatch(request, (res) => {
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.data.push({
          CompanyIndex: this.data[this.data.length - 1].CompanyIndex + 1,
          CompanyName: companyName
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  loadCompany(companyIndex): any {
    const request = this.service.fMessage.clone();
    request.initialize(this.service.fServiceName, 'LoadCompany');
    request.write('CompanyIndex', 'Integer', companyIndex);
    request.finalize();
    this.connectionService.channel.dispatch(request, (res) => {
      if (res.fResponseObject.result.Result.ResultCode === 'rtOk') {
        this.loadData.companyIndex = res.fResponseObject.result.CompanyRecord.CompanyIndex;
        this.loadData.companyName = res.fResponseObject.result.CompanyRecord.CompanyName;
        this.loadData.companyImage = res.fResponseObject.result.CompanyRecord.CompanyData;
      }
    }, (error) => {
      console.log(error);
    });
  }
}
