$(document).ready(function() {

    $("#flip").click(function() {
        $("#panel").slideToggle("slow");
    });

    $("#addUser").click(function() {
        addUtilisateur();
    });

    $("#saveEdit").click(function() {
        editUtilisateur();
    });

});

function addUtilisateur() {

    var utilisateur = {
        nom: $('#nom').val(),
        prenom: $('#prenom').val(),
        mail: $('#mail').val(),
        age: $('#age').val()
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/adduser",
        data: JSON.stringify(utilisateur),
        success: function(data) {
            console.log('ajout avec succes !');
            $("#tabUsers").load(window.location.href + " #listUsers");
            $('#panel').hide(1000, function() {
                $("#panelContainer").load(window.location.href + " #panel");
            });
        },
        error: function(e) {
            console.log('erreur d ajout !');
        }
    });

}


function supprimerUtilisateur(userId) {
    console.log('userId = ' + userId);

    $.ajax({
        type: "GET",
        url: "/delete?id=" + userId,
        success: function(data) {
            console.log('suppression avec succes !');
            $("#tabUsers").load(window.location.href + " #listUsers");
        },
        error: function(e) {
            console.log('erreur de suppression !');
        }
    });
}


function afficherInfoUtilisateur(idUser) {
    console.log('idUser = ' + idUser);
    var user = {
        id: idUser
    };
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/userInfo?id=" + idUser,
        success: function(data) {
            console.log('data = ' + data);
            $('#idEdit').val(data.id);
            $('#nomEdit').val(data.nom);
            $('#editPrenom').val(data.prenom);
            $('#editMail').val(data.mail);
            $('#editAge').val(data.age);
            $('.myForm #exampleModal').modal();
        },
        error: function(e) {
            console.log('erreur de récupération utilisateur !');
        }
    });
}

function editUtilisateur() {
    var utilisateur = {
        id: $('#idEdit').val(),
        nom: $('#nomEdit').val(),
        prenom: $('#editPrenom').val(),
        mail: $('#editMail').val(),
        age: $('#editAge').val()
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/update",
        data: JSON.stringify(utilisateur),
        success: function(data) {
            console.log('edit avec succes !');
            $('.myForm #exampleModal').modal('hide');
            $("#tabUsers").load(window.location.href + " #listUsers");
        },
        error: function(e) {
            console.log('erreur d edit !');
        }
    });
}