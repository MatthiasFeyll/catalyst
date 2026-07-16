<?php

namespace App\Twig;

use \Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class BirthCalculator extends AbstractExtension
{
    /**
     * birthday in seconds. Given in .env and passed through services.yaml
     *
     * @var float
     */
    private $birthday;

    /**
     * BirthCalculator constructor.
     * @param mixed $birthday
     */
    public function __construct($birthday)
    {
        $this->birthday = ($birthday !== '' ? $birthday : -1);
    }

    /**
     * @return array|TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('calculate_birthday', [$this, 'calculateBirthday']),
        ];
    }

    /**
     * Calculate age of given 'BIRTH_DATE' parameter in milliseconds
     *
     * @return float
     * @throws \Exception
     */
    public function calculateBirthday()
    {
        if (-1 === $this->birthday) {
            return -1;
        }

        $now = round(microtime(true));
        $diff = $now - $this->birthday;

        // 60 sec * 60 min * 24 hours * 365 days
        return floor($diff / 31536000);
    }
}