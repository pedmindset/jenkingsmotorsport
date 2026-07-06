<?php

declare(strict_types=1);

namespace App\Support\Motorsport;

/**
 * Parses published BTRC standings HTML (podium blocks + NAME/POS/POINTS table) per division tab.
 */
class BtrcStandingsHtmlParser
{
    /**
     * @return list<array{name: string, rank: int, points: int}>
     */
    public function parse(string $html, int $division = 1): array
    {
        [$document, $xpath] = $this->loadDocument($html);

        $scope = $this->resolveDivisionScope($xpath, $division);
        if ($scope === null) {
            return [];
        }

        return $this->mergeStandings(
            $this->parsePodium($xpath, $scope),
            $this->parseTable($xpath, $scope),
        );
    }

    /**
     * @return array{0: \DOMDocument, 1: \DOMXPath}
     */
    private function loadDocument(string $html): array
    {
        libxml_use_internal_errors(true);
        $document = new \DOMDocument;
        $document->loadHTML('<?xml encoding="utf-8" ?>'.$html, LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();

        return [$document, new \DOMXPath($document)];
    }

    private function resolveDivisionScope(\DOMXPath $xpath, int $division): ?\DOMNode
    {
        $tabId = 'fusion-tab-division'.$division;
        $panel = $xpath->query(
            "//*[@role='tabpanel' and @aria-labelledby='{$tabId}']"
        );

        if ($panel !== false && $panel->length > 0) {
            return $panel->item(0);
        }

        $panes = $xpath->query("//*[@role='tabpanel']");
        if ($panes === false || $panes->length === 0) {
            return $xpath->document;
        }

        $index = max(0, $division - 1);
        if ($index >= $panes->length) {
            return null;
        }

        return $panes->item($index);
    }

    /**
     * @return list<array{name: string, rank: int, points: int}>
     */
    private function parsePodium(\DOMXPath $xpath, \DOMNode $scope): array
    {
        $parsedRows = [];
        $columns = $xpath->query(".//div[contains(concat(' ', normalize-space(@class), ' '), ' podium-column ')]", $scope);

        if ($columns === false || $columns->length === 0) {
            return [];
        }

        foreach ($columns as $columnNode) {
            if (! $columnNode instanceof \DOMElement) {
                continue;
            }

            $nameNode = $xpath->query(".//*[contains(concat(' ', normalize-space(@class), ' '), ' driver-name ')]", $columnNode);
            $rankNode = $xpath->query(".//*[contains(concat(' ', normalize-space(@class), ' '), ' rank ')]", $columnNode);
            $pointsNode = $xpath->query(".//*[contains(concat(' ', normalize-space(@class), ' '), ' points-pill ')]", $columnNode);

            $name = trim($nameNode !== false && $nameNode->length > 0 ? ($nameNode->item(0)?->textContent ?? '') : '');
            $rankRaw = strtoupper(trim($rankNode !== false && $rankNode->length > 0 ? ($rankNode->item(0)?->textContent ?? '') : ''));
            $pointsRaw = strtoupper(trim($pointsNode !== false && $pointsNode->length > 0 ? ($pointsNode->item(0)?->textContent ?? '') : ''));

            $rank = $this->parseRankDigits($rankRaw);
            $points = $this->parsePointsDigits($pointsRaw);

            if ($name === '' || $rank === null || $points === null) {
                continue;
            }

            $parsedRows[] = [
                'name' => $name,
                'rank' => $rank,
                'points' => $points,
            ];
        }

        return $parsedRows;
    }

    /**
     * @return list<array{name: string, rank: int, points: int}>
     */
    private function parseTable(\DOMXPath $xpath, \DOMNode $scope): array
    {
        $tables = $xpath->query('.//table', $scope);
        if ($tables === false) {
            return [];
        }

        foreach ($tables as $tableNode) {
            if (! $tableNode instanceof \DOMElement) {
                continue;
            }

            $headerCells = $xpath->query('.//thead//tr/th', $tableNode);
            if ($headerCells === false || $headerCells->length === 0) {
                continue;
            }

            $headers = [];
            foreach ($headerCells as $thNode) {
                $headers[] = strtoupper(trim($thNode->textContent));
            }

            if ($headers !== ['NAME', 'POS', 'POINTS']) {
                continue;
            }

            $parsedRows = [];
            $bodyRows = $xpath->query('.//tbody/tr', $tableNode);
            if ($bodyRows === false) {
                continue;
            }

            foreach ($bodyRows as $trNode) {
                if (! $trNode instanceof \DOMElement) {
                    continue;
                }

                $cells = $xpath->query('./td', $trNode);
                if ($cells === false || $cells->length < 3) {
                    continue;
                }

                $nameCell = $cells->item(0);
                if (! $nameCell instanceof \DOMElement) {
                    continue;
                }

                $name = $this->extractPlayerName($xpath, $nameCell);
                if ($name === '') {
                    continue;
                }

                $rankRaw = strtoupper(trim($cells->item(1)?->textContent ?? ''));
                $pointsRaw = strtoupper(trim($cells->item(2)?->textContent ?? ''));

                $rank = $this->parseRankDigits($rankRaw);
                $points = $this->parsePointsDigits($pointsRaw);

                if ($rank === null || $points === null) {
                    continue;
                }

                $parsedRows[] = [
                    'name' => $name,
                    'rank' => $rank,
                    'points' => $points,
                ];
            }

            if ($parsedRows !== []) {
                return $parsedRows;
            }
        }

        return [];
    }

    private function extractPlayerName(\DOMXPath $xpath, \DOMElement $nameCell): string
    {
        $playerName = $xpath->query(".//*[contains(concat(' ', normalize-space(@class), ' '), ' player-name ')]", $nameCell);
        if ($playerName !== false && $playerName->length > 0) {
            $fromSpan = trim($playerName->item(0)?->textContent ?? '');
            if ($fromSpan !== '') {
                return $fromSpan;
            }
        }

        return trim($nameCell->textContent);
    }

    private function parseRankDigits(string $raw): ?int
    {
        $digits = preg_replace('/\D+/', '', $raw) ?? '';
        if ($digits === '') {
            return null;
        }

        return (int) $digits;
    }

    private function parsePointsDigits(string $raw): ?int
    {
        $digits = preg_replace('/\D+/', '', $raw) ?? '';
        if ($digits === '') {
            return null;
        }

        return (int) $digits;
    }

    /**
     * @param  list<array{name: string, rank: int, points: int}>  $podiumRows
     * @param  list<array{name: string, rank: int, points: int}>  $tableRows
     * @return list<array{name: string, rank: int, points: int}>
     */
    private function mergeStandings(array $podiumRows, array $tableRows): array
    {
        /** @var array<int, array{name: string, rank: int, points: int}> $byRank */
        $byRank = [];

        foreach ([...$podiumRows, ...$tableRows] as $row) {
            $byRank[$row['rank']] = $row;
        }

        if ($byRank === []) {
            return [];
        }

        ksort($byRank);

        return array_values($byRank);
    }
}
