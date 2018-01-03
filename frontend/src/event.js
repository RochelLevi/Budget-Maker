class Event {

  static handlers() {
    document.getElementsByClassName('login')[0].addEventListener('submit', Event.login);
  }

  static login(event) {
    event.preventDefault();
    const firstname = event.target.firstname.value ;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;

    document.getElementsByClassName('login')[0].style.display = 'none';
  }
}
