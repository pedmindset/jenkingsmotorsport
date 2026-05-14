<?php

declare(strict_types=1);

namespace App\Support\Cms;

use Illuminate\Validation\ValidationException;
use JsonException;

/**
 * Bridges {@see ContentBlockRegistry} authoring rules into Filament form state (JSON fallback vs structured fields).
 */
final class ContentBlockFormAdapter
{
    /**
     * Parses manual JSON for unstructured blocks; used by Filament validation and {@see self::finalizeForSave()}.
     *
     * @return array<string, mixed>
     *
     * @throws ValidationException
     */
    public static function parseUnstructuredPayloadFromString(string $raw): array
    {
        $trimmed = trim($raw);

        if ($trimmed === '') {
            return [];
        }

        try {
            $decoded = json_decode($trimmed, true, flags: JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw ValidationException::withMessages([
                'json_payload_fallback' => ['Payload must be valid JSON.'],
            ]);
        }

        if (! is_array($decoded)) {
            throw ValidationException::withMessages([
                'json_payload_fallback' => ['Payload JSON must decode to an array.'],
            ]);
        }

        return $decoded;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function hydrateForForm(array $data): array
    {
        $page = isset($data['page_slug']) ? trim((string) $data['page_slug']) : '';
        $key = isset($data['block_key']) ? trim((string) $data['block_key']) : '';

        if (ContentBlockRegistry::supportsStructured($page, $key)) {
            unset($data['json_payload_fallback']);

            return $data;
        }

        /** @var array<string, mixed> $payload */
        $payload = is_array($data['payload'] ?? null) ? $data['payload'] : [];

        $encoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $data['json_payload_fallback'] = $encoded !== false ? $encoded : '{}';
        unset($data['payload']);

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     *
     * @throws ValidationException
     */
    public static function finalizeForSave(array $data): array
    {
        unset($data['block_preset']);

        $page = isset($data['page_slug']) ? trim((string) $data['page_slug']) : '';
        $key = isset($data['block_key']) ? trim((string) $data['block_key']) : '';

        if (ContentBlockRegistry::supportsStructured($page, $key)) {
            unset($data['json_payload_fallback']);
            /** @var array<string, mixed> $incoming */
            $incoming = is_array($data['payload'] ?? null) ? $data['payload'] : [];
            $data['payload'] = ContentBlockRegistry::sanitize($page, $key, $incoming);

            return $data;
        }

        unset($data['payload']);

        $raw = $data['json_payload_fallback'] ?? '';
        unset($data['json_payload_fallback']);

        if (! is_string($raw)) {
            $data['payload'] = [];

            return $data;
        }

        $trimmed = trim($raw);

        if ($trimmed === '') {
            $data['payload'] = [];

            return $data;
        }

        $data['payload'] = self::parseUnstructuredPayloadFromString($trimmed);

        return $data;
    }
}
