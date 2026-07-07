<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

/**
 * Redirects authenticated users to Filament when they have panel access.
 */
class LoginResponse implements LoginResponseContract
{
    /**
     * @param  Request  $request
     */
    public function toResponse($request): Response|JsonResponse
    {
        if ($request->wantsJson()) {
            return response()->json(['two_factor' => false]);
        }

        return redirect()->intended($this->redirectPath($request->user()));
    }

    /**
     * Resolve the post-login destination for the authenticated user.
     */
    private function redirectPath(mixed $user): string
    {
        if ($user instanceof User && $user->canAccessFilamentPanel()) {
            return '/'.ltrim((string) config('filament-panel.path', 'admin'), '/');
        }

        return (string) config('fortify.home', '/');
    }
}
