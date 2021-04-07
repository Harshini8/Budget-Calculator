import { Component } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import {EditComponent} from './edit/edit.component';
import {MatButton} from '@angular/material/button';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularDemo';
  budget:number=0;
  incomeList:Array<object>=[];
  expensesList:Array<object>=[];
  valid:boolean=false;
  ngDoCheck()
  {
    this.budget=0;
    this.incomeList = JSON.parse(localStorage.getItem('income') || '[]');
    this.expensesList=JSON.parse(localStorage.getItem('expenses') || '[]');
    for(let i=0;i<this.incomeList.length;i++)
    {
      this.budget += parseInt(this.incomeList[i]['amount']);
    }
    for(let i=0;i<this.expensesList.length;i++)
    {
      this.budget += parseInt(this.expensesList[i]['amount']);
    }
  }
  constructor(private dialog:MatDialog)
  {
    this.incomeList = JSON.parse(localStorage.getItem('income') || '[]');
    this.expensesList=JSON.parse(localStorage.getItem('expenses') || '[]');
    
  }
  calculateBudget(amount,name:string)
  {
    if(amount!=''&&name!='')
    {
      this.valid=true;
    }
    console.log(amount,name)
    if(amount>0 && this.valid)
    {
      const income={
        amount:amount,
        description:name
      }
      this.budget=this.budget+parseInt(amount);
      this.incomeList = JSON.parse(localStorage.getItem('income') || '[]');
      this.incomeList.push(income)
      localStorage.setItem('income',JSON.stringify(this.incomeList))
    }
    if(amount<0 && this.valid){
      const expenses={
        amount:amount,
        description:name
      }
      this.budget=this.budget+parseInt(amount)
      this.expensesList = JSON.parse(localStorage.getItem('expenses')|| '[]');
      this.expensesList.push(expenses);
      localStorage.setItem('expenses',JSON.stringify(this.expensesList))
    }
  }
  removeIncome(i)
  {
    console.log(i)
    this.incomeList = JSON.parse(localStorage.getItem('income') || '[]');
      this.incomeList.splice(i,1);
      localStorage.setItem('income',JSON.stringify(this.incomeList))
  }
  removeExpense(i)
  {
    this.expensesList = JSON.parse(localStorage.getItem('expenses')|| '[]');
      this.expensesList.splice(i,1)
      localStorage.setItem('expenses',JSON.stringify(this.expensesList))
  }
  openEdit(amount,name,i)
  {
    const income={
      amount:amount,
      description:name,
      index:i
    }
    console.log(amount,name,"clickedit")
    const dialogref = new MatDialogConfig();
    dialogref.width = "500px";
    dialogref.height = "110px";
    dialogref.closeOnNavigation = true;
    dialogref.disableClose = false;
    dialogref.autoFocus = true;
    dialogref.data = income;
    this.dialog.open(EditComponent,dialogref);
  }
}
