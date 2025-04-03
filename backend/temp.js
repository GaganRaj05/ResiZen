const bcryptjs = require('bcryptjs');

const password = "doggy547";

async function hash(password) {
    return await bcryptjs.hash(password, await bcryptjs.genSalt(10));
}

async function main() {
    const hashedPassword = await hash(password);
    console.log(hashedPassword);
}

main(); 