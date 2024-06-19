let expensesForm=document.getElementById('expenses-form');
        let filter=document.getElementById('filterDate');
        let clearFilters=document.getElementById('clearFilters');
        let expenses=JSON.parse(localStorage.getItem("expenses")) || [];
        // expenses.reverse();
        expensesForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            let date=new Date(expensesForm.elements['date'].value);
            let amount=expensesForm.elements['amount'].value;
            let remarks=expensesForm.elements['remarks'].value;
            let obj={date,amount,remarks}; 
            expenses.push(obj); 
            localStorage.setItem("expenses",JSON.stringify(expenses)); 
            document.getElementById('success-alert').style.display='block';  
            setTimeout(()=>{
                document.getElementById('success-alert').style.display='none';  
            },3000);
            expensesForm.elements['date'].value='';
            expensesForm.elements['amount'].value='';
            expensesForm.elements['remarks'].value='';
            LoadExpenses(expenses);          
        });
        filter.addEventListener("change",(e)=>{
            e.preventDefault();
            let filterDate=new Date(e.target.value).toLocaleDateString();
            let filteredData=expenses.filter((data)=>{
                let date=new Date(data.date);
                if(date.toLocaleDateString()==filterDate){
                    return true;
                }
            });
            LoadExpenses(filteredData);  
        });
        clearFilters.addEventListener("click",()=>{
            LoadExpenses(expenses); 
            filter.value=''; 
        });
        function UpdateTable(obj,index){
            let tbody=document.getElementById('expenses-list-body');
            let tr=document.createElement('tr');
            let date=new Date(obj.date);
            tr.innerHTML=`
            <td class="text-center">${index+1}</td>
            <td>${date.toLocaleDateString()}</td>
            <td class="text-end">₹${obj.amount}</td>
            <td>${obj.remarks||''}</td>
            <td class="text-center"><a href="javascript:void(0);" class="btn btn-outline-danger" Onclick="RemoveExpenses(${index});"><i class="bi bi-trash3"></i></a></td>`;
            tbody.appendChild(tr);
        }
        
        function LoadExpenses(expenses) {             
                    
            if(expenses.length>0){
                document.getElementById('expenses-list-table').style.display="";
                document.getElementById('expenses-list-body').innerHTML='';
                let totalAmount=0;
                expenses.forEach((element,index)=> { 
                    UpdateTable(element,index);
                    totalAmount +=parseInt(element.amount);
                });
                document.getElementById('expenses-total').textContent=`₹${totalAmount}`;                 

            }else{
                document.getElementById('expenses-list-table').style.display="none";
            }

        }
        function RemoveExpenses(i){ 
            expenses.splice(i,1);
            localStorage.setItem("expenses",JSON.stringify(expenses)); 
            LoadExpenses(expenses);
        }
        document.addEventListener('DOMContentLoaded',()=>{
            LoadExpenses(expenses);
        });