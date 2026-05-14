<?php

use App\Support\PublicMediaUrl;

uses(Tests\TestCase::class);

it('prefixes paths on the public storage disk', function (): void {
    expect(PublicMediaUrl::browserPath('partners/logos/x.webp'))->toBe('/storage/partners/logos/x.webp');
});

it('percent-encodes spaces and special characters in storage-relative paths', function (): void {
    expect(PublicMediaUrl::browserPath('drivers/RYAN SMITH.png'))->toBe('/storage/drivers/RYAN%20SMITH.png');
    expect(PublicMediaUrl::browserPath("drivers/TOM O'ROURKE.jpg"))->toBe('/storage/drivers/TOM%20O%27ROURKE.jpg');
});

it('preserves absolute URLs and root-relative paths', function (): void {
    expect(PublicMediaUrl::browserPath('https://example.com/a.png'))->toBe('https://example.com/a.png');
    expect(PublicMediaUrl::browserPath('/images/legacy.jpg'))->toBe('/images/legacy.jpg');
    expect(PublicMediaUrl::browserPath('/storage/foo/bar.png'))->toBe('/storage/foo/bar.png');
});

it('returns empty string for blank stored values', function (): void {
    expect(PublicMediaUrl::browserPath(null))->toBe('');
    expect(PublicMediaUrl::browserPath(''))->toBe('');
});

it('resolves absolute URLs for meta and previews', function (): void {
    $u = PublicMediaUrl::absoluteUrl('blog-images/z.jpg');
    expect($u)->toBeString()->toContain('/storage/blog-images/z.jpg');
});
