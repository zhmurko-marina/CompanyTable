import { Component, OnInit } from '@angular/core';
import {CompaniesService} from '../../services/companies.service';
import {EditFormModel} from './edit-page.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public form: EditFormModel;
  imgUrl: any = '';

  constructor(
    public companiesService: CompaniesService,
    private router: ActivatedRoute
  ) {
    console.log(88888888, this.router.snapshot);
  }

  ngOnInit() {
    this.companiesService.loadCompany(this.router.snapshot.params.id);
    this.form = this.companiesService.loadData;
    console.log(this.companiesService.loadData);
  }

  save() {
    console.log(this.form);
    this.companiesService.editCompany(this.form);
    // this.companiesService.loadCompany(this.form.model.companyIndex);
  }

  onFilesAdded(files: File[]) {
    this.imgUrl = null;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content: any = (e.target as FileReader).result;
        this.form.companyImage = window.btoa(content);
        this.imgUrl = `data:${file.type};base64,` + this.form.companyImage;
      };
      reader.readAsBinaryString(file);
    });
  }
}
