<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class LocaleSubscriber implements EventSubscriberInterface
{
    private $defaultLocale;

    public function __construct(string $defaultLocale = 'de')
    {
        $this->defaultLocale = $defaultLocale;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();

        /**
         * First get locale from given parameter. If not set get Accept-Language of request header.
         * If Accept-Languages not set, fallback to @see $defaultLocale
         */
        $locale = $request->getSession()->get(
            '_locale', substr($request->headers->get(
                'Accept-Language', $this->defaultLocale), 0, 2)
        );
        $request->setLocale($locale);
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => [['onKernelRequest', 17]]
        ];
    }
}