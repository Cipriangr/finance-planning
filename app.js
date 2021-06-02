$(function () {
  const year = [JSON.parse(localStorage.getItem('year'))];
  const month = [JSON.parse(localStorage.getItem('month'))];
  const currency = [JSON.parse(localStorage.getItem('currency'))];
  const budget = [JSON.parse(localStorage.getItem('budget'))];
  const list = document.querySelector('.costs-list');
  const getNewItem = document.querySelector('.new-item');
  const activities = JSON.parse(localStorage.getItem('items')) || ['accomodation', 'food', 'invoices', 'subscriptions'];
  let totalCosts = [] || [0]


  $("#year").on('input', inputEvt => {
    //get the text that user introduced and transform to string
    const item = JSON.stringify(inputEvt.currentTarget.innerText)
    //push the new text to year array
    year.push(item)
    //push the key and value in local storage
    localStorage.setItem("year", item)
  })

  $("#month").on('input', inputEvt => {
    const item = JSON.stringify(inputEvt.currentTarget.innerText)
    month.push(item)
    localStorage.setItem("month", item)
  })

  // $('#year').keyup(function(){
  //   $(this).removeClass('visible')
  // })
  // $('#month').keyup(function(){
  //   $(this).removeClass('visible')
  // })

  $("#year").html(year)
  $("#month").html(month)


  $('#year').keyup(function (e) {
    var textValue = $(this).text();
    if (textValue.length > 0) {
      $(this).removeClass('visible')
    }
  })

  $('#month').keyup(function (e) {
    var textValue = $(this).text();
    if (textValue.length > 0) {
      $(this).removeClass('visible')
    }
  })

  $('.set').each(function () {
    if ($(this).text().trim().length) {
      $(this).removeClass("visible");
    }
  })

  //get input value form currency
  $('.currency').on('input keyup', function () {
    // var x = e.currentTarget.value.toUpperCase();
    var value = this.value.toUpperCase();
    $.get('https://openexchangerates.org/api/currencies.json', function (data) {
      // console.log(Object.keys(data));
      if (data.hasOwnProperty(value)) {
        $('.assignCurrency').text(value)
        currency.push(value)
        localStorage.setItem('currency', JSON.stringify(value))
      }
    });
  })
  $('.assignCurrency').text(currency)
  $('.currency').val(currency)

  $('.budget').on('change keyup', (e) => {
    const budgetValue = JSON.stringify(e.currentTarget.value)
    budget.push(budgetValue)
    localStorage.setItem('budget', budgetValue)
  })

  $('.budget').val(budget)
  //restrict characters on input
  const budgetinput = document.querySelector('.budget')
  budgetinput.onkeydown = function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        return false;
    }
}

  $('.fa-question').on('click', () => {
    $('.project-info').toggle('fadein')
  })

  $('.close').on('click', function () {
    $(this.parentElement).css('display', 'none');
  })

  function newItem() {
    let valueToAdd;
    if(getNewItem.value.length > 2){
      valueToAdd = getNewItem.value.toLowerCase()
      activities.push(valueToAdd)
      populateList(activities, list)
      localStorage.setItem('items', JSON.stringify(activities));
    }
    getNewItem.value = '';
  }

  function populateList(items = [], itemsList){
    itemsList.innerHTML = items.map((item, i)=>{
      return `
      <li data-set=${i}>
        <p class="type"><i class="fas fa-trash"></i>${item}</p>
        <div class="info">
          <input class="value" type="number" value="0" placeholder="0" data-type="${item}">
          <label for="value" class="assignCurrency">${currency}</label>
        </div>
      </li>
      `
    }).join("")
  }

  populateList(activities, list)
  const arrayList = list.querySelectorAll('li input')
  arrayList.forEach(item=>{
    item.addEventListener('input', function(e){
      $('.value').text(e.target.value)
      const datatype = e.target.dataset.type
      localStorage.setItem(datatype, JSON.stringify(e.target.value))
    })
    if(localStorage.getItem(item.dataset.type)){
      item.value = JSON.parse(localStorage.getItem(item.dataset.type))
      item.textContent = JSON.parse(localStorage.getItem(item.dataset.type))
    }else{
      item.value = 0
    }
    totalCosts.push(parseInt(item.value))// parse all values to array so I can calculate 
  })

  //GET total from array
  let newTotal = totalCosts.reduce((total, current) => total + current, 0);
  
  const newBtn = document.querySelector('.new-category button')
  newBtn.addEventListener('click', newItem)

  $('.total').html(newTotal)
  $('.chosen-currency').html(currency)
  let budgestatus = budget.toString() - newTotal;
  $('.budget-status').html(budgestatus)

  $('.reset-btn').on('click', () => {
    localStorage.clear()
  })

  const trash = document.querySelectorAll('.fa-trash')
  trash.forEach(item=>{
    item.addEventListener('click', (e)=>{
    e.target.parentElement.parentElement.remove()
    const itemData = e.target.parentElement.textContent
    let storageValues = JSON.parse(localStorage.getItem("items"))
    //daca exista item-ul in array-ul din key-ul localstorage, il voi sterge
    //apoi voi face update la key
      if(storageValues.includes(itemData)){
        // storageValues.remove(itemData)
        console.log(storageValues.indexOf(itemData))
        let theIndex = storageValues.indexOf(itemData)
        storageValues.splice(theIndex, 1)
        console.log(storageValues)
        localStorage.setItem('items', JSON.stringify(storageValues) )
      }

    })
  })

})















