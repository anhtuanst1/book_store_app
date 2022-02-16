// API Get Header.
const authHeader = () => {
    const dataLogin = JSON.parse(localStorage.getItem('data_login'));
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'));
    if (dataLogin && dataLogin.access_token && isAdmin) {
        return { Authorization: `${dataLogin.token_type} ${dataLogin.access_token}` };
    } else {
        return {};
    }
}

export default authHeader