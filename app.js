$(function(){
  const year = [JSON.parse(localStorage.getItem('year'))];
  const month = [JSON.parse(localStorage.getItem('month'))];
  const currency = [JSON.parse(localStorage.getItem('currency'))];
  const budget = [JSON.parse(localStorage.getItem('budget'))];
  const accomodation = [JSON.parse(localStorage.getItem('accomodation'))];
  const food = [JSON.parse(localStorage.getItem('food'))];
  const invoices = [JSON.parse(localStorage.getItem('invoices'))];
  const subscriptions = [JSON.parse(localStorage.getItem('subscriptions'))];



  $("#year").on('input', inputEvt=>{
    //get the text that user introduced and transform to string
    const item= JSON.stringify(inputEvt.currentTarget.innerText)
    //push the new text to year array
    year.push(item)
    //push the key and value in local storage
    localStorage.setItem("year", item)
  })

  $("#month").on('input', inputEvt=>{
    const item= JSON.stringify(inputEvt.currentTarget.innerText)
    month.push(item)
    localStorage.setItem("month", item)
  })
  $("#year").html(year)
  $("#month").html(month)


  //get input value form currency
  $('.currency').on('input keyup', function(){
      // var x = e.currentTarget.value.toUpperCase();
      var value = this.value.toUpperCase();
      $.get('https://openexchangerates.org/api/currencies.json', function(data) {
        // console.log(Object.keys(data));
        if(data.hasOwnProperty(value)){
          $('.assignCurrency').text(value)
          currency.push(value)
          localStorage.setItem('currency', JSON.stringify(value))
        }
    });
  })
  $('.assignCurrency').text(currency)
  $('.currency').val(currency)

  $('.budget').on('change keyup', (e)=>{
    const budgetValue = JSON.stringify(e.currentTarget.value)
    budget.push(budgetValue)
    localStorage.setItem('budget', budgetValue)
  })

  $('.budget').val(budget)

  $('.fa-question').on('click', ()=>{
    $('.project-info').toggle('fadein')
  })

  $('.close').on('click', function(){
    $(this.parentElement).css('display', 'none');
  })

  // ------------------------------------------------------------
  //Here i need to find a way to make only one function, not 4
  // ------------------------------------------------------------


  $('.value').on('input keyup', function(){
    // var x = e.currentTarget.value.toUpperCase();
    var value = this.value.toUpperCase();
    $('.value').text(value)
    accomodation.push(value)
    console.log(`${this.dataset.type}`)
    localStorage.setItem(`${this.dataset.type}`, JSON.stringify(value))
  })

  $('.value').on('input keyup', function(){
    // var x = e.currentTarget.value.toUpperCase();
    var value = this.value.toUpperCase();
    $('.value').text(value)
    food.push(value)
    console.log(`${this.dataset.type}`)
    localStorage.setItem(`${this.dataset.type}`, JSON.stringify(value))
  })

  $('.value').on('input keyup', function(){
    // var x = e.currentTarget.value.toUpperCase();
    var value = this.value.toUpperCase();
    $('.value').text(value)
    invoices.push(value)
    console.log(`${this.dataset.type}`)
    localStorage.setItem(`${this.dataset.type}`, JSON.stringify(value))
  })

  $('.value').on('input keyup', function(){
    // var x = e.currentTarget.value.toUpperCase();
    var value = this.value.toUpperCase();
    $('.value').text(value)
    subscriptions.push(value)
    console.log(`${this.dataset.type}`)
    localStorage.setItem(`${this.dataset.type}`, JSON.stringify(value))
  })

  $('*[data-type="accomodation"]').val(accomodation)
  $('*[data-type="food"]').val(food)
  $('*[data-type="invoices"]').val(invoices)
  $('*[data-type="subscriptions"]').val(subscriptions)

})















