/**
 * Created by Fatal1ty on 13.06.2015.
 */

function UserInfo(usrObj) {
    this.firstName = usrObj.firstName;
    this.lastName = usrObj.lastName;
    this.email = usrObj.email;
    this.password = usrObj.password;
    this.birthday = usrObj.birthday;

    UserInfo.prototype.printUserToHTML = function() {

        var usrInf, firstName, lastName, email, birthday;

        usrInf = document.getElementById("user-information");

        firstName = document.createElement("p");
        firstName.innerHTML = "First name: " + this.firstName;
        usrInf.appendChild(firstName);

        lastName = document.createElement("p");
        lastName.innerHTML = "Last name: " + this.lastName;
        usrInf.appendChild(lastName);

        email = document.createElement("p");
        email.innerHTML = "Email: " + this.email;
        usrInf.appendChild(email);

        birthday = document.createElement("p");
        birthday.innerHTML = "Birthday: " + new Date(this.birthday).toUTCString();
        usrInf.appendChild(birthday);
    }
}