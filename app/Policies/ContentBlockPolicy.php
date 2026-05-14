<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ContentBlock;
use App\Models\User;

/**
 * Authorizes edits to routed CMS blocks ({@see ContentBlock}); panel access stays config-driven via {@see User::canAccessFilamentPanel()}.
 */
class ContentBlockPolicy
{
    public function viewAny(User $user): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function view(User $user, ContentBlock $contentBlock): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function create(User $user): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function update(User $user, ContentBlock $contentBlock): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function delete(User $user, ContentBlock $contentBlock): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function restore(User $user, ContentBlock $contentBlock): bool
    {
        return $this->authenticatedForPanel($user);
    }

    public function forceDelete(User $user, ContentBlock $contentBlock): bool
    {
        return false;
    }

    private function authenticatedForPanel(User $user): bool
    {
        return $user->canAccessFilamentPanel();
    }
}
