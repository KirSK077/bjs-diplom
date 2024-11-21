const logout = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из личного кабинета
logout.action = function() {
    ApiConnector.logout(function(response) {
        if (response.success) {
            location.reload();
        } else {
            alert(response.error);
        }
    });
};

// Получение информации о пользователе
ApiConnector.current(function(response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        alert(response.error);
    }
});

// Получение текущих курсов валюты
function getRates() {
    ApiConnector.getStocks(function(response) {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            alert(response.error);
        }
    });
}
getRates();
setInterval(getRates, 60000);

// Операции с деньгами
// Пополнение баланса
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Ваш баланс пополнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

// Конвертация валюты
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

// Перевод денег
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, function(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод прошел успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

// Работа с избранным
// Получение списка избранных контактов
function getFavorites() {
    ApiConnector.getFavorites(function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}
getFavorites();

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'В избранное добавлен новый пользователь');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = function(id) {
    ApiConnector.removeUserFromFavorites(id, function(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален из избранного');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}