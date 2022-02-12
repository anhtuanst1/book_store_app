<?php

return [
    'jwt' => [
        'ERROR_00001' => 'Certification failed. The verification code is invalid.',
        'ERROR_00002' => 'Certification failed. The verification code has expired.',
        'ERROR_00003' => 'Authentication failed. Authentication code is not correct.',
    ],
    'book' => [
        'ERROR_00001' => 'The book not found.',
        'ERROR_00002' => 'Create book failed.',
        'ERROR_00003' => 'Update book failed.',
        'ERROR_00004' => 'Delete book failed.',
        'ERROR_00005' => 'Restore book failed.',
    ],
    'login' => [
        'ERROR_00001' => 'Login failed. The information entered in the form below is incorrect.',
        'ERROR_00002' => 'Account usage has been suspended because the number of login failures has exceeded the limit.',
        'ERROR_00003' => 'Login failed. The email address or password is incorrect.',
        'ERROR_00004' => 'User information not found.'
    ],
];
