/**
 * Created by Fatal1ty on 13.06.2015.
 */

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

function convertToDate(dateElement) {
    var year, month, day;

    year = Number(dateElement.val().slice(0, 4));
    month = Number(dateElement.val().slice(5, 7));
    day = Number(dateElement.val().slice(8, 10));

    return new Date(Date.UTC(year, month, day));
}

function checkExisting(obj, key) {
    if(!obj.hasOwnProperty(key)) {
        return 'Not found';
    } else {
        return obj[key];
    }
}

function isSearchingHasMatches(jsonObj, search) {

    for (var x in jsonObj) {
        if (typeof(jsonObj[x]) === 'object') {
            return isSearchingHasMatches(jsonObj[x], search)
        } else {
            //console.log(jsonObj[x]);
            if(String(jsonObj[x]).search(search) !== -1) return true;
        }
    }
}