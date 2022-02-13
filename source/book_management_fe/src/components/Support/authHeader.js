// API Get Header.
const authHeader = () => {
    const dataLogin = JSON.parse(localStorage.getItem('data_login'));
    if (dataLogin && dataLogin.access_token) {
        return { Authorization: `${dataLogin.token_type} ${dataLogin.access_token}` };
    } else {
        return {};
    }
}

export default authHeader