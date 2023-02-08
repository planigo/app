module.exports = {
    locales: ['fr'],
    defaultLocale: 'fr',
    localePath: typeof window === 'undefined'
        ? require('path').resolve('./public/locales')
        : '/locales',
}