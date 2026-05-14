<?php

declare(strict_types=1);

use App\Support\Cms\ContentBlockRegistry;

it('strips empty timeline callouts during sanitize', function (): void {
    $out = ContentBlockRegistry::sanitize('legacy', 'timeline', [
        'sections' => [
            [
                'year' => '1984',
                'title' => 'Chapter',
                'paragraphs' => [],
                'callout' => ['title' => '  ', 'body' => "\n"],
            ],
        ],
    ]);

    expect($out['sections'][0])->not()->toHaveKey('callout');
});

it('merges le mans event payload over the json-ld shell', function (): void {
    $out = ContentBlockRegistry::sanitize('le-mans', 'event_schema', [
        'name' => 'Race week',
    ]);

    expect($out['name'])->toBe('Race week');
    expect($out['@context'])->toBe('https://schema.org');
});
