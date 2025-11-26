import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InvestmentList } from './investment-list/investment-list';
import { HttpClient } from '@angular/common/http';
import { GetSpecificInfo } from './get-specific-info/get-specific-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
//  protected readonly title = signal('my-app1');
title=signal<string>('Investment Management System');

//Declare a title using signals and intialize it


}
