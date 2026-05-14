<?php

declare(strict_types=1);

use App\Support\Cms\ContentBlockFormAdapter;
use Illuminate\Validation\ValidationException;

it('decodes unstructured JSON into an associative payload', function (): void {
    expect(ContentBlockFormAdapter::parseUnstructuredPayloadFromString('{"k": 1}'))->toMatchArray(['k' => 1]);
});

it('throws when JSON is malformed', function (): void {
    ContentBlockFormAdapter::parseUnstructuredPayloadFromString('{"a":');
})->throws(ValidationException::class);

it('throws when JSON resolves to a non-array root', function (): void {
    ContentBlockFormAdapter::parseUnstructuredPayloadFromString('"string-root"');
})->throws(ValidationException::class);
