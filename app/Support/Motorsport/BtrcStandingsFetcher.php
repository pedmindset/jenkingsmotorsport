<?php

declare(strict_types=1);

namespace App\Support\Motorsport;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * Fetches published BTRC standings HTML over HTTP or from a local snapshot file.
 */
class BtrcStandingsFetcher
{
    /**
     * Retrieve standings HTML, preferring the WordPress REST API when enabled.
     *
     * @return array{html: string, source: string}
     *
     * @throws RuntimeException When every remote source fails.
     */
    public function fetchStandingsHtml(?string $htmlUrl = null): array
    {
        $errors = [];

        if ((bool) config('btrc_import.use_wordpress_api', true)) {
            $apiUrl = (string) config('btrc_import.standings_api_url');

            try {
                return [
                    'html' => $this->fetchFromWordPressApi($apiUrl),
                    'source' => $apiUrl,
                ];
            } catch (RuntimeException $exception) {
                $errors[] = $exception->getMessage();
            }
        }

        $htmlUrl ??= (string) config('btrc_import.standings_url');

        try {
            return [
                'html' => $this->fetchFromUrl($htmlUrl),
                'source' => $htmlUrl,
            ];
        } catch (RuntimeException $exception) {
            $errors[] = $exception->getMessage();
        }

        throw new RuntimeException(implode(PHP_EOL.PHP_EOL, $errors));
    }

    /**
     * Retrieve standings HTML from the configured remote URL.
     *
     * @throws RuntimeException When the HTTP response is not successful.
     */
    public function fetchFromUrl(string $url): string
    {
        $response = $this->request($url, 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');

        usleep((int) config('btrc_import.request_delay_seconds') * 1_000_000);

        if (! $response->successful()) {
            throw new RuntimeException($this->formatHttpFailureMessage($response, $url));
        }

        return $response->body();
    }

    /**
     * Retrieve rendered standings HTML from the BTRC WordPress REST API.
     *
     * @throws RuntimeException When the HTTP response is not successful or HTML is missing.
     */
    public function fetchFromWordPressApi(string $url): string
    {
        $response = $this->request($url, 'application/json,text/plain,*/*');

        usleep((int) config('btrc_import.request_delay_seconds') * 1_000_000);

        if (! $response->successful()) {
            throw new RuntimeException($this->formatHttpFailureMessage($response, $url));
        }

        /** @var array<int, array<string, mixed>>|array<string, mixed>|null $payload */
        $payload = $response->json();

        $html = $this->extractWordPressRenderedHtml($payload);
        if ($html === null) {
            throw new RuntimeException("WordPress API response did not include standings HTML ({$url}).");
        }

        return $html;
    }

    /**
     * Read standings HTML from a local file (useful when remote hosts block server IPs).
     *
     * @throws RuntimeException When the file cannot be read.
     */
    public function readFromFile(string $path): string
    {
        if (! is_file($path) || ! is_readable($path)) {
            throw new RuntimeException("Standings HTML file not found or not readable: {$path}");
        }

        $contents = file_get_contents($path);

        if ($contents === false || $contents === '') {
            throw new RuntimeException("Standings HTML file is empty: {$path}");
        }

        return $contents;
    }

    /**
     * @return array<string, string>
     */
    public function requestHeaders(): array
    {
        /** @var array<string, string> $configured */
        $configured = config('btrc_import.http_headers', []);

        return array_merge([
            'User-Agent' => (string) config('btrc_import.user_agent'),
            'Accept-Language' => 'en-GB,en;q=0.9',
        ], $configured);
    }

    /**
     * @param  array<int, array<string, mixed>>|array<string, mixed>|null  $payload
     */
    private function extractWordPressRenderedHtml(?array $payload): ?string
    {
        if ($payload === null) {
            return null;
        }

        if (isset($payload[0]) && is_array($payload[0])) {
            $payload = $payload[0];
        }

        if (! isset($payload['content']) || ! is_array($payload['content'])) {
            return null;
        }

        $rendered = $payload['content']['rendered'] ?? null;

        if (! is_string($rendered) || trim($rendered) === '') {
            return null;
        }

        return $rendered;
    }

    private function request(string $url, string $accept): Response
    {
        return Http::timeout((int) config('btrc_import.timeout'))
            ->withHeaders(array_merge($this->requestHeaders(), [
                'Accept' => $accept,
            ]))
            ->get($url);
    }

    private function formatHttpFailureMessage(Response $response, string $url): string
    {
        $status = $response->status();
        $message = "HTTP request failed: {$status} ({$url})";

        if ($status === 401 || $status === 403) {
            $message .= PHP_EOL.PHP_EOL
                .'The BTRC site often blocks requests from datacenter/server IP addresses (common on Ploi, Forge, AWS, etc.). '
                .'Try one of these workarounds:'.PHP_EOL
                .'  1. Save the page locally and import with --html=/path/to/standings.html'.PHP_EOL
                .'  2. Ensure BTRC_IMPORT_USE_WORDPRESS_API=true (default) so the command tries the WordPress JSON API'.PHP_EOL
                .'  3. Run the import from a machine/network that is not blocked, then deploy or sync standings';
        }

        return $message;
    }
}
