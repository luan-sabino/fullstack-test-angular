import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
  
})
export class PaginaComponent implements OnInit {

  public apiGreeting = '';
  public timeNow = '';
  public responsePost = '';
  public isLoading = false;
  
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    ) { }

  loremForm = this.formBuilder.group({
    inputContent: '',
  })

  onSubmit(): void {
    const formData = new FormData();
    formData.append('inputContent', this.loremForm.get('inputContent').value);

    this.apiService.sendText(formData).pipe(
      catchError((err) => {
        this.responsePost = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.responsePost = response.textoEnviado;
      }
    });
  }
    
  ngOnInit(): void {
    this.isLoading = true;

    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });

    this.apiService.timeNow().pipe(
      catchError((err) => {
        this.timeNow = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.timeNow = response.horaAtual;
        this.isLoading = false;
      }
    });
  }

}
