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
                emailElement.removeClass();
                emailElement.addClass('acceptEmail');
                $('#valid-email').text('Верно');
            } else {
                emailElement.removeClass();
                emailElement.addClass('wrongEmail');
                $('#valid-email').text('Не верно');
                //return false;
            }
        } else {
            emailElement.removeClass();
            emailElement.addClass('wrongEmail');
            $('#valid-email').text('Поле email не должно быть пустым');
        }

        var pattern2 = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (pattern2.test(passElement.val())) {
            passElement.removeClass();
            passElement.addClass('acceptPassword');
            $('#valid-password').text('Верно');
        } else {
            passElement.removeClass();
            passElement.addClass('wrongPassword');
            $('#valid-password').text('Поле password должно быть не меньше 6 символов, обязательно должна быть большая буква, цифра и спец.символ');
        }

        if (passElement.val() !== passElement2.val()) {
            passElement2.removeClass();
            passElement2.addClass('wrongPassword');
            $('#valid-password2').text('Поле не совпадает с полем password');
        } else {
            passElement2.removeClass();
            passElement2.addClass('acceptPassword');
            $('#valid-password2').text('Верно');
        }

        if(pattern.test(emailElement.val()) && pattern2.test(passElement.val()) && (passElement.val() === passElement2.val())) {

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

    });

    $('#json-example').click(function() {
        $.ajax({
            url: "https://dl.dropboxusercontent.com/u/26060640/data.json",
            success: function (data) {
                var jsonData, jsonElement, appendData;

                jsonData = JSON.parse(data);
                jsonElement = $('#json-loaded');
                appendData = '';

                for(var i= 0, k = jsonData.length; i < k; i++) {
                    //jsonElement.append(createHTMLfromJSON(jsonData[i]));
                    appendData +=  createHTMLfromJSON(jsonData[i]);
                }
                jsonElement.append(appendData);

                searching(jsonData, jsonElement);
                masonryTest();
            },
            error: function () {
                window.alert("Sorry, but JSON data is cannot be loaded.");
            }
        })
    });

    injectSelect(document.getElementById("months"), {
        0:"Январь", 1:"Февраль", 2:"Март", 3:"Апрель",
        4:"Май", 5:"Июнь", 6:"Июль", 7:"Август",
        8:"Сентябрь", 9:"Октябрь", 10:"Ноябрь", 11:"Декабрь"
    }); // Наполняем месяца
    injectSelect(document.getElementById("years"), makeNumbersObject(1920, 2015)); // Наполняем года
    injectSelect(document.getElementById("days"), makeNumbersObject(1, 31));// Наполняем дни
});

function searching(jsonData, appendElem) {
    var searchElement = $('#search-text');
    var result = '';

    $('#search').click(function() {

        $('#json-loaded > div').fadeOut(2000, function() { $(this).remove(); } );

        for(var i= 0, k = jsonData.length; i < k; i++) {
            if(isSearchingHasMatches(jsonData[i], searchElement.val())) {
                //appendElem.append(createHTMLfromJSON(jsonData[i]));
                result += createHTMLfromJSON(jsonData[i]);
            }
        }

        appendElem.append(result);
        result = '';
    })
}

function masonryTest() {
    var container = document.getElementById('json-loaded');
    var msnry = new Masonry(container, {
        columnWidth: 175,
        gutter: 10,
        itemSelector: '.inline-block'
    });
}

function createHTMLfromJSON(userObj) {

    var imgElem = '<div class="float-left"><img src="' + userObj.picture + '"></div>';
    var otherInfo = '<div class="float-left" class="other-info">';
    var tags = '';

    //otherInfo += '<b>Name: </b>'+ userObj.name + '<br>';
    otherInfo += '<b>Name: </b>'+ checkExisting(userObj, 'name') + '<br>';
    //otherInfo += '<b>Age: </b>' + userObj.age + '<br>';
    otherInfo += '<b>Age: </b>' + checkExisting(userObj, 'age') + '<br>';
    //otherInfo += '<b>Gender: </b>' + userObj.gender + '<br>';
    otherInfo += '<b>Gender: </b>' + checkExisting(userObj, 'gender') + '<br>';
    //otherInfo += '<b>Company: </b>' + userObj.company + '<br>';
    otherInfo += '<b>Company: </b>' + checkExisting(userObj, 'company') + '<br>';
    //otherInfo += '<b>Phone: </b>' + userObj.phone + '<br>';
    otherInfo += '<b>Phone: </b>' + checkExisting(userObj, 'phone') + '<br>';
    //console.log(userObj.tags.join());

    if(checkExisting(userObj, 'tags') != 'Not found')
    {
        tags = userObj['tags'].join(', ') + '<br></div>';
    } else {
        tags += 'Tags are not found <br></div>';
    }

    return '<div class="inline-block">' + imgElem + otherInfo  + tags + '</div>';
}




