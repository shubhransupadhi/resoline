# Resoline Techbis Native Verification & Integration Test Suite
param([string]$BaseUrl = "http://localhost:8080")

$ErrorActionPreference = "Stop"
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Resoline Techbis — Production Hardening Verification Suite" -ForegroundColor Cyan
Write-Host "  Target URL: $BaseUrl" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$passed = 0
$failed = 0

function Assert-Test([string]$name, [scriptblock]$condition) {
    try {
        $result = &$condition
        if ($result) {
            Write-Host "  [PASS] $name" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Host "  [FAIL] $name" -ForegroundColor Red
            $script:failed++
        }
    } catch {
        Write-Host "  [FAIL] $name - Exception: $($_.Exception.Message)" -ForegroundColor Red
        $script:failed++
    }
}

# 1. Server Reachability
Assert-Test "1. Homepage returns HTTP 200 OK" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    return $res.StatusCode -eq 200
}

# 2. Security Headers
Assert-Test "2. HTTP response contains X-Content-Type-Options: nosniff" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    return $res.Headers["X-Content-Type-Options"] -eq "nosniff"
}

Assert-Test "3. HTTP response contains X-Frame-Options: SAMEORIGIN" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    return $res.Headers["X-Frame-Options"] -eq "SAMEORIGIN"
}

Assert-Test "4. HTTP response contains Referrer-Policy" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    return $res.Headers["Referrer-Policy"] -eq "strict-origin-when-cross-origin"
}

# 3. Health Endpoint
Assert-Test "5. /api/health returns valid JSON with uptime" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/api/health" -UseBasicParsing -MaximumRedirection 5
    if ($res.StatusCode -ne 200) { return $false }
    $json = $res.Content | ConvertFrom-Json
    return ($json.status -eq "ok" -and $json.service -eq "resoline-web")
}

# 4. API Service Layer
Assert-Test "6. api-service.js is served and contains Idempotency logic" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/api-service.js" -UseBasicParsing -MaximumRedirection 5
    return ($res.StatusCode -eq 200 -and $res.Content.Contains("generateIdempotencyKey") -and $res.Content.Contains("submitQuoteLead"))
}

# 5. Multi-page Subroutes (Supporting Clean URLs)
Assert-Test "7. Subpages (/what-we-do, /automation, /instrumentation, /electrical-utilities) return 200" {
    $subpages = @("what-we-do", "automation", "instrumentation", "electrical-utilities")
    foreach ($sp in $subpages) {
        $res = Invoke-WebRequest -Uri "$BaseUrl/$sp" -UseBasicParsing -MaximumRedirection 5
        if ($res.StatusCode -ne 200) { return $false }
    }
    return $true
}

# 6. Core HTML & Schema Checks
Assert-Test "8. Canonical URL and Schema.org JSON-LD exist in HTML" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    $html = $res.Content
    return ($html.Contains('<link rel="canonical" href="https://resoline.in/"/>') -and $html.Contains('"@type": "Organization"') -and $html.Contains('"@type": "LocalBusiness"'))
}

Assert-Test "9. Reviews River and Client Review Modal are present in DOM" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    $html = $res.Content
    return ($html.Contains('id="reviewsRiver"') -and $html.Contains('id="clientReviewModal"') -and $html.Contains('data-review-client="tata"'))
}

Assert-Test "10. Honeypot anti-spam field and sliding rate-limiter exist in RFQ form" {
    $res = Invoke-WebRequest -Uri "$BaseUrl/" -UseBasicParsing -MaximumRedirection 5
    $html = $res.Content
    return ($html.Contains('id="quoteHp"') -and $html.Contains('checkQuoteRateLimit') -and $html.Contains('id="quoteError"'))
}

Assert-Test "11. Sitemap & Robots.txt are reachable" {
    $sitemapRes = Invoke-WebRequest -Uri "$BaseUrl/sitemap.xml" -UseBasicParsing -MaximumRedirection 5
    $robotsRes = Invoke-WebRequest -Uri "$BaseUrl/robots.txt" -UseBasicParsing -MaximumRedirection 5
    return ($sitemapRes.StatusCode -eq 200 -and $robotsRes.StatusCode -eq 200)
}

# 7. Architecture & Operations Documentation
Assert-Test "12. Architecture, Runbook, and Caching documentation verified" {
    return (Test-Path "$PSScriptRoot\docs\ARCHITECTURE.md") -and
           (Test-Path "$PSScriptRoot\docs\RUNBOOK.md") -and
           (Test-Path "$PSScriptRoot\docs\PLAN.md") -and
           (Test-Path "$PSScriptRoot\docs\CACHING.md")
}

# 8. AI Agent, MCP Server & Infrastructure References
Assert-Test "13. AI Sizing Agent, MCP schema, and Kubernetes starter manifests verified" {
    return (Test-Path "$PSScriptRoot\ai-sizing-agent.js") -and
           (Test-Path "$PSScriptRoot\mcp-server\resoline-mcp.json") -and
           (Test-Path "$PSScriptRoot\infra\k8s\deployment.yaml") -and
           (Test-Path "$PSScriptRoot\Dockerfile")
}

Write-Host "----------------------------------------------------------" -ForegroundColor Cyan
$resultColor = if ($failed -eq 0) { "Green" } else { "Red" }
Write-Host "Test Results: $passed Passed, $failed Failed" -ForegroundColor $resultColor
Write-Host "==========================================================" -ForegroundColor Cyan

if ($failed -gt 0) {
    exit 1
} else {
    exit 0
}
