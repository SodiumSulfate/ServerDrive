$url = "https://file.sodium.ren/MySoftwareResource/CPP-FakePlayer/fakeplayer.exe"
$dest = Join-Path $env:TEMP "fakeplayer.exe"

try {
    # 强制使用 TLS 1.2 以防止较旧系统的网络连接报错
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    if (Test-Path $dest) {
        Start-Process -FilePath $dest
    }
} catch {
    Write-Warning "运行失败: $_"
}