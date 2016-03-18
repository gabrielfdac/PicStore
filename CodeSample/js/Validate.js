$(document).ready(function () {
    $(".has-feedback")
        .focusout(function (e) {
            var elements = [e.target];
            validate(elements);
        });
    $("#_btnSignup").click(function () {
        debugger;
        var elements = $("#formdiv").children(".form-group").children("input").add($("#formdiv").children(".row").children(".form-group").children("input")).add($("#formdiv").children(".form-group").children("select")).add($("#formdiv").children(".row").children(".form-group").children("select"));
        if (validate(elements)) {
            $("#cphSlider_hiddenBtn").click();
        }
    });

    $("#_btnUpdateChanges").click(function () {
        var elements = $("#updateValues").children(".row").children(".form-group").children("input").add($("#updateValues").children(".form-group").children("select")).add($("#updateValues").children(".row").children(".form-group").children("select"));
        if (validate(elements)) {
            $("#cphConteudo__SaveModal").click();
        }
    })
});

function hasError(element, msg) {
    $(element).parent().removeClass("has-success");
    $(element).parent().addClass("has-error");
    $(element).next("span").removeClass("glyphicon-ok");
    $(element).next("span").addClass("glyphicon-remove");
    $(element).nextAll(".message").removeClass("hide");
    $(element).nextAll(".message").text(msg);
}

function hasSuccess(element) {
    $(element).parent().removeClass("has-error");
    $(element).parent().addClass("has-success");
    $(element).next("span").removeClass("glyphicon-remove");
    $(element).next("span").addClass("glyphicon-ok");
    $(element).nextAll(".message").addClass("hide");
    $(element).nextAll(".message").text("");
}

function validate(elements) {
    debugger;
    var valid = true;

    for (var x = 0; x < elements.length; x++) {
        if ($(elements[x]).hasClass("hide")) {

        }
        else if ($(elements[x]).attr("id") == "cphSlider__txtCPF") {
            if(!validarCPF($(elements[x]).val()))
            {
                valid = false;
                hasError(elements[x], "Invalid CPF, please enter a valid CPF");
            }
            else
            {
                hasSuccess(elements[x]);
            }
        }
        else if ($(elements[x]).attr("id") == "cphSlider__txtPassword") {
            if ($(elements[x]).val().length < 6) {
                valid = false;
                hasError(elements[x], "Password must be at least 6 characters long");
            }
            else {
                hasSuccess(elements[x]);

                if ($("#cphSlider__txtConfirmPassword").val() != "") {
                    if ($(elements[x]).val() == $("#cphSlider__txtConfirmPassword").val()) {
                        hasSuccess($("#cphSlider__txtConfirmPassword"));
                    }
                    else {
                        valid = false;
                        hasError($("#cphSlider__txtConfirmPassword"), "Both passwords must match");
                    }
                }
            }
        }
        else if ($(elements[x]).attr("id") == "cphSlider__txtConfirmPassword") {
            if ($(elements[x]).val() == "") {
                valid = false;
                hasError(elements[x], "Mandatory field");
            }
            else if ($(elements[x]).val() == $("#cphSlider__txtPassword").val()) {
                hasSuccess(elements[x]);
            }
            else {
                valid = false;
                hasError(elements[x], "Both passwords must match");
            }
        }
        else {
            if ($(elements[x]).val() == "") {
                valid = false;
                hasError(elements[x], "Mandatory field");
            }
            else {
                hasSuccess(elements[x]);
            }
        }
    }

    return valid;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito 
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito 
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}