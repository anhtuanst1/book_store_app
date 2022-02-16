// All Endpoints.
export const domainEndPoint = `http://bookmanagement-admin-dev.com/api/v1/`;

export const endPoints = {
    get_list_books: {
        method: 'get',
        path: 'books',
    },
    get_book_detail: {
        method: 'get',
        path: 'books/__bookId',
    },
    dashboard: {
        method: 'get',
        path: 'dashboard',
    },
    get_user_login: {
        method: 'get',
        path: 'get-user-login',
    },
    login: {
        method: 'post',
        path: 'login',
    },
    refresh_token: {
        method: 'post',
        path: 'refresh-token',
    },
    logout: {
        method: 'post',
        path: 'logout',
    },
    book_create: {
        method: 'post',
        path: 'books',
    },
    book_update: {
        method: 'put',
        path: 'books/__bookId',
    },
    book_delete: {
        method: 'delete',
        path: 'books/__bookId',
    },
    book_restore: {
        method: 'put',
        path: 'books/__bookId/restore',
    },
    book_views: {
        method: 'put',
        path: 'books/__bookId/views',
    },
}