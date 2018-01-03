class Event{

  static handlers() {
    document.getElementById('login-form').addEventListener('submit', Event.login);
    document.getElementById("form-div").addEventListener('submit', Event.formListener)
  }

  static formListener(event){

    event.preventDefault()
    let form = event.target
    handleSubmit(form)
  }

  static login(event) {
    event.preventDefault();
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;

    User.findOrCreateUser(firstname, lastname, email).then(function(user) {
      document.getElementById('user').innerHTML = `Hi, ${firstname} ${lastname}!`
      document.getElementById('login-form').style.display = 'none';
    })
  }


}
