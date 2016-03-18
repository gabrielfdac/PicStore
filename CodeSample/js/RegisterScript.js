$(document).ready(function () {
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $("#cphSlider__txtPhone").mask(SPMaskBehavior, spOptions);
    $("#cphSlider__txtCPF").mask('000.000.000-00');
    $("#cphSlider__txtCNPJ").mask('00.000.000/0000-00', { reverse: true });
    $("#cphSlider__txtRG").mask("000000000");
    $("#cphSlider__txtPrice").mask("0,000,000.00", { reverse: true });
    $("#cphConteudo__txtPriceModal").mask("0,000,000.00", { reverse: true });
    $("#cphSlider__txtCEP").mask("00000-000");
    $("#cphSlider__txtNumber").mask("00000");

    $('[data-toggle="tooltip"]').tooltip();

    $(".doc-label").click(function (e) {
        if (!$(e.target).hasClass("active-field")) {
            $(e.target).toggleClass("active-field");
            $(e.target).siblings("label").toggleClass("active-field");
            if ($(e.target).text() == "CNPJ") {
                $("#cphSlider__txtRG").parent().addClass("hide");
                $("#cphSlider__txtCPF").addClass("hide");
                $("#cphSlider__txtCPF").val("");
                $("#cphSlider__txtCNPJ").removeClass("hide");
            }
            else {
                $("#cphSlider__txtRG").parent().removeClass("hide");
                $("#cphSlider__txtCPF").removeClass("hide");
                $("#cphSlider__txtCNPJ").val("");
                $("#cphSlider__txtCNPJ").addClass("hide");
            }
            removeFeedback($("#cphSlider__txtCPF"));
            removeFeedback($("#cphSlider__txtCNPJ"));
        }
    });

    $("#cphSlider__txtCEP")
        .focusout(function (e) {
            if ($(e.target).val().length == 9) {
                var cep = $(e.target).val().replace('-', '');
                $.getJSON("http://cep.correiocontrol.com.br/" + cep + ".json")
                    .done(function (data) {
                        if (data.bairro != "") {
                            $("#cphSlider__txtBairro").val(data.bairro);
                            //$("#cphSlider__txtBairro").prop({ disabled: true });
                            removeFeedback($("#cphSlider__txtBairro"));
                        }
                        if (data.localidade != "") {
                            $("#cphSlider__txtCity").val(data.localidade);
                            //$("#cphSlider__txtCity").prop({ disabled: true });
                            removeFeedback($("#cphSlider__txtCity"));
                        }
                        if (data.uf != "") {
                            changeSelection(data.uf);
                            //$("#cphSlider__ddlUF").prop({ disabled: true });
                            removeFeedback($("#cphSlider__ddlUF"));
                        }
                        if (data.bairro != "") {
                            $("#cphSlider__txtAddress").val(data.logradouro);
                            //$("#cphSlider__txtAddress").prop({ disabled: true });
                            removeFeedback($("#cphSlider__txtAddress"));
                        }
                    });
            }
        });
    $("#_btnClear").click(function (e) {
        var elementos1 = $("#formdiv>div>input");
        clearElements(elementos1);
        var elementos2 = $("#formdiv>div>div>input");
        clearElements(elementos2);
        var elementos3 = $("#formdiv>div>div>select");
        $(elementos3).prop("selectedIndex", 0);
        $(elementos3).prop({ disabled: false });
    });
});

function changeSelection(uf) {
    var boxOptions = $("#cphSlider__ddlUF>option")
    debugger;
    for (var i = 0; i < boxOptions.length; i++) {
        if ($(boxOptions)[i].text == uf) {
            $("#cphSlider__ddlUF").prop("selectedIndex", i);
            break;
        }
    }
}

function removeFeedback(element) {
    $(element).parent().removeClass("has-success");
    $(element).parent().removeClass("has-error");
    $(element).next("span").removeClass("glyphicon-ok");
    $(element).next("span").removeClass("glyphicon-remove");
    $(element).nextAll(".message").removeClass("hide");
    $(element).nextAll(".message").text("");
}

function clearElements(element) {
    for (var i = 0; i < element.length; i++) {
        if($(element[i]).val() == "+")
            break;
        $(element[i]).val("");
        $(element[i]).prop({ disabled: false });
        removeFeedback(element[i]);
    }
}