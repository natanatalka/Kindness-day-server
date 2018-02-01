function logout() {
    $.ajax('/logout', {
        method: 'GET'
    }).then(response => {
        location.reload();
    })
}



$('#login-modal').submit(function(e) {
    let username = $('#login-user').val();
    let password = $('#login-pass').val();
    console.log(username);
    console.log(password);
    let data = JSON.stringify({username: username, password: password});
    $.ajax('/login', {
        dataType: 'json',
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: data
    })
        .then((response => {
            $.cookie('modal_shown', 'true');
            $('#login-modal').modal('hide');
        }))
        .catch(err => console.log(err));
    e.preventDefault();
});

function sendMail() {
    $.ajax(`/users/mails`, {
        dataType: 'json',
        method: 'GET'
    })
        .then((response => {
            // console.log(response);
            $("#success-alert").text(response.message);
            $("#success-alert").slideDown(1000).delay(3000).slideUp(600);
        }))
        .catch(err => console.log(err));
}

function changeStatus(id) {
    $.ajax(`/users/${id}/status`, {
        dataType: 'json',
        method: 'GET'
    })
        .then((response => {
            if( response.status) {
                $(`.user-${id} .user-status div`).text('Active')
            }
            else $(`.user-${id} .user-status div`).text('Inactive')
        }))
        .catch(err => console.log(err));
}

function deleteRow(id) {
    $.ajax(`/users/${id}`, {
        dataType: 'json',
        method: 'DELETE'
    })
        .then((response => {
            console.log(response);
            $('.user-' + id).remove();

        }))
        .catch(err => alert(err));
}


function addUser() {
    let name = $('#new-user-name').val();
    let email = $('#new-user-email').val();
    let data = JSON.stringify({name: name, email: email});

    $.ajax(`/users`, {
        dataType: 'json',
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: data
    }).then(response => {
        let status = response.data.status ? 'Active' : 'Inactive';
        $.ajax(`/users`, {
            method: 'GET'
        }).then(() => {
            $('#add-user-modal').modal('hide');
            location.reload();
        })
    })
        .catch(err => {
            $('#danger-alert').text(err.responseText);
        });

    return false;
}

function renderUser(user){

    // const $userHtml  = $(`
    // <tr class="user-${user.id}">
    //
    //     <td>
    //         ${  user.id }
    //     </td>
    //     <td>
    //         ${  user.name }
    //     </td>
    //     <td>
    //         ${  user.email }
    //     </td>
    //     <td>
    //         ${ user.receiver ? user.receiver.name: '' }
    //     </td>
    //     <td>
    //         ${  user.uniqueId }
    //     </td>
    //     <td class="user-status" id="1" style="width:30px;">
    //         <div onclick="changeStatus(${user.id})">
    //             ${ user.isActive ? 'Active' : 'Inactive'}
    //         </div>
    //
    //     </td>
    //     <td>
    //         <div>
    //             <button type="button" class="btn btn-primary" onclick="deleteRow(${user.id})">Delete</button>
    //         </div>
    //     </td>
    // </tr>
    // `);
    //
    //
    // $('#users > tbody').append($userHtml);

}

// function reloadUsers(){
//
//     $.ajax(`/users`, {
//         dataType: 'json',
//         method: 'GET'
//     }).then(users => {
//        if(users)
//            users.forEach(renderUser)
//     })
//         .catch(err => {
//             console.log(err);
//         });
//
// }