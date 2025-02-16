document.addEventListener('DOMContentLoaded', function() {
  let currentStep = 1;
  
  function showStep(step) {
    document.querySelectorAll('.step').forEach(div => div.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
  }
  
  window.nextStep = function(step) {
    if(validateStep(step)){
      currentStep++;
      if(currentStep === 2){
        generateDateOptions();
      }
      if(currentStep === 5){
        updateReview();
      }
      showStep(currentStep);
    }
  }
  
  window.prevStep = function(step) {
    currentStep--;
    showStep(currentStep);
  }
  
  function validateStep(step) {
    const inputs = document.querySelectorAll('#step' + step + ' input, #step' + step + ' select');
    for(let input of inputs) {
      if(!input.checkValidity()){
        alert('Please fill out all required fields.');
        return false;
      }
    }
    return true;
  }
  
  // Update price display based on product and currency selection.
  function updatePrice() {
    const product = document.querySelector('input[name="product"]:checked');
    const currency = document.querySelector('input[name="currency"]:checked');
    let price = 0;
    if(product && currency) {
      if(product.value === 'single'){
        price = (currency.value === 'USD') ? 100 : 96;
      } else if(product.value === 'group'){
        price = (currency.value === 'USD') ? 90 : 86;
      }
      document.getElementById('priceDisplay').innerText = currency.value + ' ' + price;
    }
  }
  
  document.querySelectorAll('input[name="product"]').forEach(el => el.addEventListener('change', updatePrice));
  document.querySelectorAll('input[name="currency"]').forEach(el => el.addEventListener('change', updatePrice));
  updatePrice();
  
  // Generate date options for the next 12 available days (Thursday, Friday, Saturday).
  function generateDateOptions(){
    const select = document.getElementById('dateSelect');
    select.innerHTML = '';
    const today = new Date();
    let count = 0;
    let date = new Date(today);
    while(count < 12){
      // In JavaScript: 0=Sunday, 1=Monday, ..., 4=Thursday, 5=Friday, 6=Saturday.
      const day = date.getDay();
      if(day === 4 || day === 5 || day === 6){
        const option = document.createElement('option');
        option.value = date.toISOString().split('T')[0];
        option.text = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        select.appendChild(option);
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
  }
  
  // Update review section with all selections.
  function updateReview(){
    const product = document.querySelector('input[name="product"]:checked').value;
    const currency = document.querySelector('input[name="currency"]:checked').value;
    const price = (product === 'single') ? ((currency === 'USD') ? 100 : 96) : ((currency === 'USD') ? 90 : 86);
    const date = document.getElementById('dateSelect').value;
    const session = document.querySelector('input[name="session"]:checked').value;
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    let reviewHTML = '<p><strong>Product:</strong> ' + (product === 'single' ? 'Rock Climbing Single' : 'Rock Climbing Group') + '</p>';
    reviewHTML += '<p><strong>Price:</strong> ' + currency + ' ' + price + '</p>';
    reviewHTML += '<p><strong>Date:</strong> ' + date + '</p>';
    reviewHTML += '<p><strong>Session:</strong> ' + (session === 'sunrise' ? 'Sunrise (6-10am)' : 'Sunset (3-6pm)') + '</p>';
    reviewHTML += '<p><strong>Name:</strong> ' + name + '</p>';
    reviewHTML += '<p><strong>Email:</strong> ' + email + '</p>';
    reviewHTML += '<p><strong>Phone:</strong> ' + phone + '</p>';
    document.getElementById('reviewSection').innerHTML = reviewHTML;
  }
  
  // Handle form submission by simulating a Stripe payment.
  document.getElementById('bookingForm').addEventListener('submit', function(e){
    e.preventDefault();
    // Replace form content with a processing message
    const container = document.querySelector('.container');
    container.innerHTML = '<h1>Processing Payment...</h1><p>You will be redirected shortly.</p>';
    // Simulate a delay of 3 seconds then redirect to success.html.
    setTimeout(function() {
      window.location.href = 'success.html';
    }, 3000);
  });
});
