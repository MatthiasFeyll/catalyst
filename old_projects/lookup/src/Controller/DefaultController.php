<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('pages/home/index.html.twig');
    }

    /**
     * @Route("/changeLocale", name="changeLocale")
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function changeLocale(Request $request)
    {
        if ($locale = $request->get('_locale')) {
            $request->getSession()->set('_locale', $locale);
        }

        return $this->redirectToRoute($request->get('route', 'home'));
    }
}