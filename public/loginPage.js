'use strict';
const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, function(response) {
        // console.log(response);
        if (response.success) {
            location.reload();
        } else {
            alert(response.error);
        }
    });
};

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, function(response) {
        // console.log(response);
        if (response.success) {
            location.reload();
        } else {
            alert(response.error);
        }
    });
};