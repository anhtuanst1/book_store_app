<?php
namespace App\AppBase\Support;

use Throwable;

/**
 * @method static string|bool encrypt(string $str, string $key)
 * @method static string|bool decrypt(string $str, string $key)
 */
class BlowfishCrypt extends BaseSupport
{
    /**
     * encrypt
     *
     * @param  string $str
     * @param  string $key
     * @return string
     */
    protected function encrypt($str, $key, $addPad = true)
    {
        $cipherMethod = 'BF-CBC';
        $blockSize = openssl_cipher_iv_length($cipherMethod);
        $pad = $blockSize - (strlen($str) % $blockSize);
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cipherMethod));

        if ($addPad) {
            $str = $iv . $str . str_repeat(chr($pad), $pad);
        } else {
            $str = $iv . $str;
        }

        $encryptToken = openssl_encrypt(
            $str,
            $cipherMethod,
            $this->makeKey($key),
            OPENSSL_RAW_DATA,
            $iv
        );

        unset($pad, $str, $cipherMethod, $iv);

        return bin2hex($encryptToken);
    }

    /**
     * decrypt
     *
     * @param  string $str
     * @param  string $key
     * @return string
     */
    protected function decrypt($str, $key)
    {
        try {
            $cipherMethod = 'BF-CBC';
            $ivSize = openssl_cipher_iv_length($cipherMethod);
            $decodeToBin = hex2bin($str);
            $iv = substr($decodeToBin, 0, $ivSize);
            $finalStringCrypt = substr($decodeToBin, $ivSize);

            $decryptToken = openssl_decrypt(
                $finalStringCrypt,
                $cipherMethod,
                $this->makeKey($key),
                OPENSSL_RAW_DATA,
                $iv
            );

            unset($finalStringCrypt, $decodeToBin, $str, $cipherMethod, $iv);

            return rtrim($decryptToken, "\x00..\x1F");
        } catch (Throwable $th) {
            saveLogCatch($th);

            return false;
        }
    }

    /**
     * makeKey
     *
     * @param  string $key
     * @return string
     */
    private function makeKey($key)
    {
        $l = strlen($key);
        if ($l < 16) {
            $key = str_repeat($key, ceil(16 / $l));
        };

        return $key;
    }
}
