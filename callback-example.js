function getUser(callback) {
    setTimeout(function () {
        return callback(null,{
            id: 1,
            name: 'John Doe',
            email: 'upchh@example.com',
            phone: '1234567890',
            address: '123 Main Street',
            birthday: new Date()
        })
    }, 5000);
}

function getPhoneByUserId(userId, callback) {
    setTimeout(function () {
        return callback(null, {
            phone: '1234567890'
        })
    }, 1000)
}

function getAddressByUserId(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            address: '123 Main Street'
        })
    }, 4000)
}

getUser((error, user) => {
    if (error) {
        console.log("(USER) Error: " + error)
        return;
    }
    getPhoneByUserId(user.id, function resolvePhone(error1, phone) {
        if (error1) {
            console.error("(PHONE) Error: " + error1)
            return;   
        }
        getAddressByUserId(user.id, function resolveAddress(error2, address) {
            if (error2) {
                console.error("(ADDRESS) Error: " + error2)
                return;
            }
        console.log(`User: ${user.name} - Phone: ${phone.phone} - Address: ${address.address}`)
        })
    })
});