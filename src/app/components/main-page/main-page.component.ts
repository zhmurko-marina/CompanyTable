import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [ './main-page.component.scss' ]
})
export class MainPageComponent implements OnInit {
  form: any;
  showAddNewCompanyBlock: boolean;

  constructor(
    public companiesService: CompaniesService
  ) {
    this.form = {
      companyName: ''
    };
    this.showAddNewCompanyBlock = false;
  }

  ngOnInit() {
    this.companiesService.getCompanies();
  }

  public deleteCompany(companyIndex, arrayIndex) {
    this.companiesService.deleteCompany(companyIndex, arrayIndex);
  }

  public createNewCompany() {
    this.companiesService.saveNewCompany(this.form.companyName);
    this.form.companyName = '';

  }

  public toggleBlock() {
    this.showAddNewCompanyBlock = !this.showAddNewCompanyBlock;
  }

  public closeAddNewCompanyBlock() {
    this.showAddNewCompanyBlock = false;
  }
}
