import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [NgIf, NgFor, FormsModule]
})
export class App {
  name: string = '';
  amountPaid: number | null = null;
  members: { name: string, amount: number }[] = [];
  result: string[] = [];

  addMember() {
    if (this.name && this.amountPaid !== null) {
      this.members.push({ name: this.name, amount: this.amountPaid });
      this.name = '';
      this.amountPaid = null;
    }
  }

splitAmount() {
  const total = this.members.reduce((sum, m) => sum + m.amount, 0);
  const average = total / this.members.length;
  this.result = this.members.map(m => {
    const diff = (m.amount - average).toFixed(2);
    if (parseFloat(diff) > 0) {
      return `${m.name} will get ₹${diff}`;
    } else if (parseFloat(diff) < 0) {
      return `${m.name} will pay ₹${Math.abs(parseFloat(diff)).toFixed(2)}`;
    } else {
      return `${m.name} is settled`;
    }
  });
}}