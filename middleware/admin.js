export default function({app, store}) {
    // Здесь я проверяю на существование куку 
    const cooks = app.$cookies.get('cookie-is-admin')
    //  Если кука есть то меняем серез диспач стейт 
    if(cooks !== undefined || null) {
        store.dispatch('auth/auth')
    } 
}