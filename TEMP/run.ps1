# 设置输出编码为 UTF-8，防止错误信息显示为乱码
$OutputEncoding = [System.Text.Encoding]::UTF8

$url = "https://file.sodium.ren/MySoftwareResource/CPP-FakePlayer/fakeplayer.exe"
$dest = Join-Path $env:TEMP "fakeplayer.exe"

try {
    # 强制启用当前系统支持的所有安全传输协议 (TLS 1.1, 1.2, 1.3)
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls11 -bor [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13
    
    # 绕过服务器可能存在的 SSL 证书信任链错误
    [Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
    
    # 执行下载，使用模拟的 User-Agent 避免被服务器防火墙拦截
    $userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -UserAgent $userAgent
    
    if (Test-Path $dest) {
        Start-Process -FilePath $dest
    }
} catch {
    Write-Warning "下载或启动失败，详细原因: $_"
    if ($_.Exception -and $_.Exception.InnerException) {
        Write-Warning "内部错误原因: $($_.Exception.InnerException.Message)"
    }
}
