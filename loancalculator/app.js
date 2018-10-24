//Listening for a submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    //hide the loading image
    document.getElementById('loading').style.display = 'block';
    //set timeout for the calculate result function
    setTimeout (calculateResults, 2000);

    e.preventDefault();
});


function calculateResults(){
    console.log('calculating..');

    //Getting UI elements and storing them as UI variables

    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlypayment = document.getElementById('monthly-payment');
    const UItotalpayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/100/12;
    const calculatedPayments = parseFloat(UIyears.value)*12;

    //compute monthly payments
    const  x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    //hide the results
    document.getElementById('results').style.display = 'block';
    //hide the loading image
    document.getElementById('loading').style.display = 'none';

    if(isFinite(monthly)){
        UImonthlypayment.value = monthly.toFixed(2);
        UItotalpayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    }else {
        showError("Please check values");
    }



}

function showError(error){
    //hide the results layoutt
    document.getElementById('results').style.display = 'none';
    //hide the loader
    document.getElementById('loading').style.display = 'none';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create a div element 
    const errorMess = document.createElement('div');

    //Give it a class name
    errorMess.className = ('alert alert-danger');

    //Give it a textnode
    errorMess.appendChild(document.createTextNode(error));

    //inserting the error message right at the top
    card.insertBefore(errorMess, heading);

    //setting a time limit for the error
    setTimeout(clearError, 3000);

}

//setting up the clear error function
function clearError(){
    document.querySelector('.alert').remove();
}