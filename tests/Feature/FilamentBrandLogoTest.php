<?php

/**
 * Ensures Filament branding loads assets from public paths that exist in the repo.
 */
it('renders the Filament login page with the Jenkins logo from public images', function (): void {
    $response = $this->get('/admin/login');

    $response->assertSuccessful();
    $response->assertSee('/images/Jenkins_logo_with_text_color_white.png', false);
});
