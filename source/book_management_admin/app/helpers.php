<?php

if (!function_exists('saveLogCatch')) {
    /**
     * @param $exception
     *
     * @return \Illuminate\Support\Facades\Log
     */
    function saveLogCatch($exception)
    {
        \Illuminate\Support\Facades\Log::debug($exception->getMessage()
            . ' code is ' . $exception->getCode()
            . ' | File ' . $exception->getFile()
            . ' on line ' . $exception->getLine()
        );
    }
}

if (!function_exists('getJwtTokenLifeTime')) {
    /**
     * getJwtTokenLifeTime
     *
     * @return int
     */
    function getJwtTokenLifeTime()
    {
        return JWTAuth::factory()->getTTL();
    }
}

if (!function_exists('convertTimeZone')) {
    /**
     * convertTimeZone
     *
     * @param  string $time
     * @param  string $format
     * @return Carbon|null
     */
    function convertTimeZone($time, $format = 'Y-m-d H:i', $disableTimezone = false)
    {
        try {
            if (empty($time)) {
                return null;
            }

            $dt = new \DateTime($time, new \DateTimeZone('UTC'));
            $time = \Carbon\Carbon::instance($dt);
            if ($disableTimezone) {
                return $time->format($format);
            }

            return $time->setTimezone(config('app.timezone'))->format($format);
        } catch (\Throwable$th) {
            saveLogCatch($th);
            $time = null;
        }

        return $time;
    }
}