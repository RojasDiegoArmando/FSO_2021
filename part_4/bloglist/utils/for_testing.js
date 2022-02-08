const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    return array.length === 0
        ? 0
        : array.reduce((acc, cur) => acc + cur) / array.length
}

module.exports = {
    palindrome,
    average
}