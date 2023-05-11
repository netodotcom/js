
/*
    PROMISES

    PENDING: Initial state. Not finished and not rejected yet.
    FULFILLED: Conclused.
    REJECTED: Rejected.
*/

const util = require('util');
const getAddressAsync = util.promisify(getAddressByUserId)

function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            return resolve({
                id: 1,
                name: 'John Doe',
                email: 'upchh@example.com',
                phone: '1234567890',
                address: '123 Main Street',
                birthday: new Date()
            })
        }, 1000);
        // return reject(new Error('User not found'))
    })
}

function getPhoneByUserId(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            return resolve({
                phone: '1234567890'
            })
        }, 1000);
    })
}

function getAddressByUserId(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            address: '123 Main Street'
        })
    }, 4000)
}



getUser()
    .then((user) => {
        return getPhoneByUserId(user.id).then((result) => {
            return {
                user,
                phone: result.phone
            }
        });
    })
    .then((result) => {
        const address = getAddressAsync(result.user.id);
        return address.then((resultAddress) => {
            return {
                user: result.user,
                phone: result.phone,
                address: resultAddress.address
            }
        });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log("Bad: " + error);
})
 