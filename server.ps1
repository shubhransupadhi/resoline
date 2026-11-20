param([int]$Port = 8080, [string]$Path = $PSScriptRoot)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "Server running at http://localhost:$Port/ serving $Path"

$serverStartTime = Get-Date

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".pdf"  = "application/pdf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $reqTimer = [System.Diagnostics.Stopwatch]::StartNew()
        $reqId = "req_" + [System.Guid]::NewGuid().ToString("N").Substring(0, 8)

        try {
            $request = $context.Request
            $response = $context.Response

            # Structured Request ID Header
            $response.AddHeader("X-Request-Id", $reqId)

            # Production security headers
            $response.AddHeader("X-Content-Type-Options", "nosniff")
            $response.AddHeader("X-Frame-Options", "SAMEORIGIN")
            $response.AddHeader("Referrer-Policy", "strict-origin-when-cross-origin")
            $response.AddHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

            $urlPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($urlPath)) { $urlPath = "index.html" }
            $urlPath = [System.Uri]::UnescapeDataString($urlPath)

            # Health check endpoint
            if ($urlPath -eq "api/health" -or $urlPath -eq "health") {
                $uptimeSec = [int]((Get-Date) - $serverStartTime).TotalSeconds
                $healthData = '{"status":"ok","uptime_seconds":' + $uptimeSec + ',"service":"resoline-web","request_id":"' + $reqId + '"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($healthData)
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.Close()

                $reqTimer.Stop()
                Write-Host "[$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss.fff'))] [$reqId] $($request.HttpMethod) /$urlPath -> 200 ($($reqTimer.ElapsedMilliseconds)ms)"
                continue
            }

            $filePath = Join-Path $Path $urlPath
            if (-not (Test-Path $filePath -PathType Leaf) -and (Test-Path "$filePath.html" -PathType Leaf)) {
                $filePath = "$filePath.html"
            }
            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                }
            }

            $reqTimer.Stop()
            Write-Host "[$((Get-Date).ToString('yyyy-MM-dd HH:mm:ss.fff'))] [$reqId] $($request.HttpMethod) /$urlPath -> $($response.StatusCode) ($($reqTimer.ElapsedMilliseconds)ms)"
        } catch {
            # Catch individual request socket / pipe errors and keep running
        } finally {
            try { $context.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
