  let counter = 1; //need to clear on submit
  const limit = 8;

  function handleAddInput(divName){
       if (counter == limit)  {
            alert("You have reached the limit of adding " + counter + " inputs");
       }
       else {
          const wrapper = document.createElement('div');
          wrapper.innerHTML=
            `<label for="category">Category: </label>
            <select class="category-${counter}" name=""></select>
            <label for="cost">Cost: </label>
            <input id="cost-${counter}" type="text" name="" value="" class="cost"><br>`

          const formDiv = document.getElementById(divName)
          formDiv.appendChild(wrapper)
          const lastSelect = formDiv.getElementsByClassName(`category-${counter}`)[0]
          Category.addCategoriesToDropdown(lastSelect)
          counter++;
       }
  }

  function handleSubmit(form){
    counter = 1;

    let formResults = {}
    let formPrices = Array.from(form.getElementsByClassName("cost"))
    let i = 0
    form.querySelectorAll("select").forEach((option) => {
        formResults[option.value] = formPrices[i].value
        i++
    })

    form.reset()

    switch(form.id) {
    case "add-transaction-form":
      for (cat_id in formResults) {
        fields = {"category_id": cat_id, "user_id": current_user.id, "purchase": formResults[cat_id]}
        Adapter.createPurchase(fields)
          .then(data => current_user.purchases.push(data))
        }
      break;
    case "create-proposed-budget-form":
      for (cat_id in formResults) {
        fields = {"category_id": cat_id, "user_id": current_user.id, "budget": formResults[cat_id]}
        Adapter.createProposed(fields)
          .then(data => current_user.proposeds.push(data))
      }
      break;
    // case "edit-proposed-budget-form":
    //   for (cat_id in formResults) {
    //     fields = {"category_id": cat_id, "user_id": current_user.id, "purchase": formResults[cat_id]}
    //     Adapter.updateProposed(fields)
    //       //this is a bit harder
    //       // .then(data => user.proposeds.push(data))
    //   }
    //     break;
    default:
        console.log(form.id)
    }

  }
