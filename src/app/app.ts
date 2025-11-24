import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvestmentList } from './investment-list/investment-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,InvestmentList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
//  protected readonly title = signal('my-app1');
title=signal<string>('Title1');

//Declare a title using signals and intialize it




}
