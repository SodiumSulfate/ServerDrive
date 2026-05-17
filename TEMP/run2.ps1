$url = "https://file.sodium.ren/MySoftwareResource/CPP-FakePlayer/fakeplayer.exe"
$dest = Join-Path $env:TEMP "fakeplayer.exe"

try {
    # 使用 Windows 自带的 curl.exe 进行下载 (-L 跟踪重定向, -s 静默模式)
    curl.exe -L -s -o $dest $url
    
    if (Test-Path $dest) {
        Start-Process -FilePath $dest
    } else {
        Write-Warning "文件未成功下载，请检查 URL 是否有效。"
    }
} catch {
    Write-Warning "执行失败: $_"
}