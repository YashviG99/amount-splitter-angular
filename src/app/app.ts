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

  settlements: {
    from: string,
    to: string,
    amount: number
  }[] = [];

  addMember() {

    if (this.name && this.amountPaid !== null) {

      this.members.push({
        name: this.name,
        amount: this.amountPaid
      });

      this.name = '';
      this.amountPaid = null;

    }

  }

  splitAmount() {

    this.settlements = [];

    const total = this.members.reduce(
      (sum, m) => sum + m.amount,
      0
    );

    const average = total / this.members.length;

    let creditors: any[] = [];
    let debtors: any[] = [];

    for (let member of this.members) {

      const balance = member.amount - average;

      if (balance > 0) {

        creditors.push({
          name: member.name,
          balance: balance
        });

      }

      else if (balance < 0) {

        debtors.push({
          name: member.name,
          balance: Math.abs(balance)
        });

      }

    }

    while (debtors.length > 0 && creditors.length > 0) {

      let debtor = debtors[0];
      let creditor = creditors[0];

      let amount = Math.min(
        debtor.balance,
        creditor.balance
      );

      this.settlements.push({

        from: debtor.name,
        to: creditor.name,
        amount: Number(amount.toFixed(2))

      });

      debtor.balance -= amount;
      creditor.balance -= amount;

      if (debtor.balance < 0.01) {
        debtors.shift();
      }

      if (creditor.balance < 0.01) {
        creditors.shift();
      }

    }

  }

}