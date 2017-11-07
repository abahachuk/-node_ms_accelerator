module.exports = (postfix) => {
    return new Promise((resolve) => {
        const delay = ~~(Math.random() * 1000000 % 1000);

        setTimeout(() => {
            resolve(delay + postfix);
        }, delay);
    });
}
