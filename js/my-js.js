$(document).ready(function() {

    var emailElement = $("#email");
    var passElement = $("#password");
    var passElement2 = $("#password2");
    var firstNameElement = $("#first-name");
    var lastNameElement = $("#last-name");
    var yearsElement = $("#years");
    var monthsElement = $("#months");
    var daysElement = $("#days");
    var birthdayElement = $("#birthday");

    $('#button-check').click(function() {

        if(emailElement.val() !== '') {
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(pattern.test(emailElement.val())){
                //emailElement.css({'border' : '1px solid #569b44'});
                emailElement.removeClass();
                emailElement.addClass('acceptEmail');
                $('#valid-email').text('Верно');
            } else {
                //emailElement.css({'border' : '1px solid #ff0000'}
                emailElement.removeClass();
                emailElement.addClass('wrongEmail');
                $('#valid-email').text('Не верно');
                //return false;
            }
        } else {
            // emailElement.css({'border' : '1px solid #ff0000'});
            emailElement.removeClass();
            emailElement.addClass('wrongEmail');
            $('#valid-email').text('Поле email не должно быть пустым');
        }

        var pattern2 = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (pattern2.test(passElement.val())) {
            //passElement.css({'border': '1px solid #569b44'});
            passElement.removeClass();
            passElement.addClass('acceptPassword');
            $('#valid-password').text('Верно');
        } else {
            //passElement.css({'border': '1px solid #ff0000'});
            passElement.removeClass();
            passElement.addClass('wrongPassword');
            $('#valid-password').text('Поле password должно быть не меньше 6 символов, обязательно должна быть большая буква, цифра и спец.символ');
        }

        if (passElement.val() !== passElement2.val()) {
            //passElement2.css({'border': '1px solid #ff0000'});
            passElement2.removeClass();
            passElement2.addClass('wrongPassword');
            $('#valid-password2').text('Поле не совпадает с полем password');
        } else {
            //passElement2.css({'border': '1px solid #569b44'});
            passElement2.removeClass();
            passElement2.addClass('acceptPassword');
            $('#valid-password2').text('Верно');
        }

        if(pattern.test(emailElement.val()) && pattern2.test(passElement.val()) && (passElement.val() === passElement2.val())) {

           /* localStorage.setItem("first-name", $("#first-name").val());
            localStorage.setItem("last-name", $("#last-name").val());
            localStorage.setItem("email", emailElement.val());
            localStorage.setItem("password", passElement.val());
            localStorage.setItem("days", $("#days").val());
            localStorage.setItem("months", $("#months").val());
            localStorage.setItem("years", $("#years").val());*/
            var user = {};
            user.firstName = firstNameElement.val();
            user.lastName = lastNameElement.val();
            user.email = emailElement.val();
            user.password = passElement.val();
            //user.birthday = new Date(Date.UTC(yearsElement.val(), monthsElement.val(), daysElement.val()));
            user.birthday = convertToDate(birthdayElement);

            //console.log(convertToDate(birthdayElement).toUTCString());

            localStorage.setItem("user", JSON.stringify(user));

            for (var i = 0; i < localStorage.length; i++) {
                console.log(localStorage.getItem(localStorage.key(i))); // проверочка в консоли. порядок он сам выбирает, это не побороть
            }
            // localStorage.clear(); // чтобы не забивалось фигней )
            $('#registration').fadeOut(2000);
            $('#login').fadeIn(2000);
        } else {
            //console.log("False")
        }
        $('#button-signin').click(function() {
            if($('#email-login').val() === localStorage.getItem("email") && $('#password-login').val() === localStorage.getItem("password")) {
                //console.log("True");
                $('#login').fadeOut(2000);
                $('#user-data').fadeIn(2000);

                var user1 = new UserInfo(JSON.parse(localStorage.getItem("user")));
                user1.printUserToHTML();
            }
        });
        $('#json-example').click(function() {
            $.ajax({
                url: "https://dl.dropboxusercontent.com/u/26060640/data.json",
                success: function (data) {
                    var jsonExample, pElem;
                    jsonExample = document.getElementById("json-loaded");
                    pElem = document.createElement("p");
                    pElem.innerHTML = data;
                    jsonExample.appendChild(pElem);
                },
                error: function () {
                    window.alert("Sorry, but JSON data is cannot be loaded.");
                }
            })
        });
    });

    injectSelect(document.getElementById("months"), {
        0:"Январь", 1:"Февраль", 2:"Март", 3:"Апрель",
        4:"Май", 5:"Июнь", 6:"Июль", 7:"Август",
        8:"Сентябрь", 9:"Октябрь", 10:"Ноябрь", 11:"Декабрь"
    }); // Наполняем месяца

    injectSelect(document.getElementById("years"), makeNumbersObject(1920, 2015)); // Наполняем года
    injectSelect(document.getElementById("days"), makeNumbersObject(1, 31));// Наполняем дни

});

function convertToDate(dateElement) {
    var year, month, day;

    year = Number(dateElement.val().slice(0, 4));
    month = Number(dateElement.val().slice(5, 7));
    day = Number(dateElement.val().slice(8, 10));

    return new Date(Date.UTC(year, month, day));
}

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

function printLS (obj) {
    var opt;
    obj.innerHTML = "";
    for (var i = 0; i < localStorage.length; i++) {
        opt = document.createElement("p");
        opt.value = localStorage.key(i);
        opt.innerHTML = opt.value + ": " + localStorage.getItem(localStorage.key(i));
        obj.appendChild(opt);
    }
}

/*
 Функция injectSelect принимает объект select и ассоциативный массив.
 Select очищается, затем в него добавляются элементы option,
 значение которых устанавливают ключи массива, а текст — значения массива.
 Ничего не возвращает.
 */
function injectSelect (sel, rowsObject) {
    var opt, x;
    sel.innerHTML = "";
    for (x in rowsObject) {
        opt = document.createElement("option");
        opt.value = x;
        opt.innerHTML = rowsObject[x];
        sel.appendChild(opt);
    }
}
/*
 Функция makeNumbersObject принимает два числа. Возвращает ассоциативный массив
 ряда чисел от меньшего к большему, включительно.
 */
function makeNumbersObject (from, to) {
    var result = {}, x;
    if(from > to) { // Если from меньше to, поменять их значения друг на друга.
        var z = from;
        from = to;
        to = z;
    }
    for (x = from; x <= to; x++) {
        result[x] = x;
    }
    return result
}