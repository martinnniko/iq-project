const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');

navItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    //Removing the active classes
    navItems.forEach(nav => nav.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("js-page-section"));
    this.classList.add("active");
    const text = this.textContent.trim();
    switch (text) {
      case "Home":
        document.getElementById("home").classList.add("js-page-section");
        break;
      case "About":
        document.getElementById("about").classList.add("js-page-section");
        break;
      case "Programs":
        document.getElementById("programs").classList.add("js-page-section");
        break;
      case "Instructors":
        document.getElementById("instructors").classList.add("js-page-section");
        break;
      case "Contact":
        document.getElementById("contact").classList.add("js-page-section");
        break;  case "Blog":
        document.getElementById("blog").classList.add("js-page-section");
        break;

      default:
        document.getElementById("home").classList.add("js-page-section");
    }
  })  
})