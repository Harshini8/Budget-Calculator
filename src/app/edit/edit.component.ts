import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
  amount;
  description;
  incomeList;
  expensesList;
  index;
  amount1;
  constructor(private dialogref:MatDialogRef<EditComponent>,@Inject(MAT_DIALOG_DATA) data) { 
    console.log(data,"dilog")
    this.amount1=parseInt(data["amount"]);
    this.amount=parseInt(data["amount"]);
    this.description=data["description"];
    this.index = data["index"];
  }
  save()
  {
    if(this.amount1>0)
    {
      const income={
        amount:this.amount,
        description:this.description
      }
      console.log(income)
      if(income.amount<0){
        console.log("hello",income.amount)
        this.expensesList = JSON.parse(localStorage.getItem("expenses")|| '[]')
        this.expensesList.push(income);
        localStorage.setItem('expenses',JSON.stringify(this.expensesList));
        this.incomeList = JSON.parse(localStorage.getItem('income')||'[]')
        console.log(this.incomeList[this.index])
        this.incomeList.splice(this.index,1);
        localStorage.setItem('income',JSON.stringify(this.incomeList))
        this.dialogref.close()
      }
      else{
      this.incomeList = JSON.parse(localStorage.getItem("income")||'[]')
      this.incomeList[this.index]=income;
      console.log(this.incomeList[this.index])
      console.log(this.incomeList)
      localStorage.setItem('income',JSON.stringify(this.incomeList))
      this.dialogref.close()
      }
    }
    if(this.amount1<0)
    {
      const income={
        amount:this.amount,
        description:this.description
      }
      if(income.amount>0)
      {
        this.incomeList = JSON.parse(localStorage.getItem("income")||'[]')
        this.incomeList.push(income);
        localStorage.setItem('income',JSON.stringify(this.incomeList))
        this.expensesList=JSON.parse(localStorage.getItem('expenses') || '[]')
        this.expensesList.splice(this.index,1);
        localStorage.setItem('expenses',JSON.stringify(this.expensesList))
        this.dialogref.close()
      }
      else{
        this.expensesList=JSON.parse(localStorage.getItem('expenses')|| '[]')
        this.expensesList[this.index]=income;
        localStorage.setItem('expenses',JSON.stringify(this.expensesList))
        this.dialogref.close()
      }
    }
  }
}
