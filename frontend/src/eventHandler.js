let counter = 1; //need to clear on submit
const limit = 8;


  function handleAddInput(divName, className){

       if (counter == limit)  {
            alert("You have reached the limit of adding " + counter + " inputs");
       } else {
          const wrapper = document.createElement('div');
          wrapper.innerHTML=
            `<label for="category">Category: </label>
            <select class="${className}-${counter}"></select>
            <label for="cost">Cost: </label>
            <input id="cost-${counter}" type="text" class="cost"><br>`

          const formDiv = document.getElementById(divName)
          formDiv.appendChild(wrapper)
          const lastSelect = formDiv.getElementsByClassName(`${className}-${counter}`)[0]
          let categories
          className === "category" ? categories = Category.all() : categories = current_user.categories
          Category.addCategoriesToDropdown(lastSelect, categories)
          counter++;
       }
  }


function handleSubmit(form){
  counter = 1;
  console.log('im from handle submit')
  let formResults = {}
  let formPrices = Array.from(form.getElementsByClassName("cost"))
  let i = 0
  form.querySelectorAll("select").forEach((option) => {
      formResults[option.value] = formPrices[i].value
      i++
  })


  switch(form.id) {
  case "add-transaction-form":
    for (cat_id in formResults) {
      let fields = {"category_id": cat_id, "user_id": current_user.id, "purchase": formResults[cat_id]}
      if (fields["purchase"]){
        Adapter.createPurchase(fields)
          .then(function(data) {
            current_user.purchases.push(data);
            Event.display("other");
          });
        }
      }

    break;
  case "create-proposed-budget-form":
    for (cat_id in formResults) {
      let fields = {"category_id": cat_id, "user_id": current_user.id, "budget": formResults[cat_id]}
      if (fields["budget"]){
        Adapter.createProposed(fields)
          .then(data => {
            current_user.proposeds.push(data)
              Event.display("other");
          });
      }
    }
    const times = document.querySelectorAll('#add-budget-item-input div').length;
    for(let i = 1; i <= times; i++) {
      document.querySelectorAll('#add-budget-item-input div')[0].remove()
    }
    break;
  case "edit-proposed-budget-form":
    for (cat_id in formResults) {
      fields = {"category_id": cat_id, "user_id": current_user.id, "budget": formResults[cat_id]}
      Adapter.updateProposed(current_user.getProposedIdByCatId(cat_id), fields)
        .then(data => {
          current_user.editProposed(cat_id, data.budget)
          Event.display("other");
        })
    }
      break;
  default:
  }

  Event.display("Home")

}
