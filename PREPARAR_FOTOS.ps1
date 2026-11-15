#Requires -Version 5.1
param([switch]$CapturarSitios)
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Dir = Join-Path $Root 'assets\portfolio\capturas'
New-Item -ItemType Directory -Force -Path $Dir | Out-Null
Write-Host "PAZBEL - Preparando las capturas archivadas del portafolio..." -ForegroundColor Cyan
$Capturas = @(
  @{ Name='mova'; File='mova.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/mova.png' },
  @{ Name='cruzial-parfums'; File='cruzial-parfums.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/cruzial.png' },
  @{ Name='talentlens'; File='talentlens.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/talentlens.png' },
  @{ Name='murex'; File='murex.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/gym.png' },
  @{ Name='jna-fragance'; File='jna-fragance.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/jna.png' },
  @{ Name='elixia-parfum'; File='elixia-parfum.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/elixia.png' },
  @{ Name='fragance-obsession'; File='fragance-obsession.svg'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/fragance.svg' },
  @{ Name='goccta'; File='goccta.png'; Source='https://raw.githubusercontent.com/Abel-Castill0/Portafolio/main/public/previews/goccta.png' }
)
foreach($c in $Capturas) {
  $Out = Join-Path $Dir $c.File
  try {
    Invoke-WebRequest -UseBasicParsing -Uri $c.Source -OutFile $Out -TimeoutSec 35
    if ((Get-Item $Out).Length -lt 1000) { throw 'Imagen demasiado pequena' }
    Write-Host "OK ARCHIVO: $($c.Name)" -ForegroundColor Green
  } catch {
    Write-Host "NO DISPONIBLE: $($c.Name) -> se usara la imagen online o el respaldo conceptual" -ForegroundColor Yellow
    if (Test-Path $Out) { Remove-Item $Out -Force }
  }
}
if ($CapturarSitios) {
  # Chromium/Chrome no visita proyectos privados, ni inicia sesion, ni rellena formularios.
  $Browser = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
  ) | Where-Object { Test-Path $_ } | Select-Object -First 1
  if (-not $Browser) { Write-Warning 'No se encontro navegador Chromium; se conservan las capturas archivadas.' }
  else {
    Write-Host "Capturando sitios publicos en navegador: $Browser"
    $Sites = @(
      @{ Name='avila-parfums'; Url='https://www.avilaparfums.com/' },
      @{ Name='dual-ingenieria'; Url='https://www.dualingenieria.pe/' },
      @{ Name='mova'; Url='https://movaeduca.me/' },
      @{ Name='cruzial-parfums'; Url='https://cruzial.pe/' },
      @{ Name='talentlens'; Url='https://talentlens-nu.vercel.app/' },
      @{ Name='murex'; Url='https://gimnasio-murex.vercel.app/' },
      @{ Name='jna-fragance'; Url='https://jnafragance.com/' },
      @{ Name='elixia-parfum'; Url='https://elixiaparfum.com/' },
      @{ Name='dpp-control'; Url='https://dpp-pink.vercel.app/login' },
      @{ Name='fragance-obsession'; Url='https://www.fraganceobession.com/' },
      @{ Name='goccta'; Url='https://www.gocctaperu.com/' },
      @{ Name='hoppercode'; Url='https://hoppercode.vercel.app/' },
      @{ Name='dra-blue'; Url='https://dentista-three-mu.vercel.app/' }
    )
    foreach($site in $Sites) {
      # Captura primero en archivo temporal; solo reemplaza la portada archivada si se obtuvo una imagen.
      $Dest = Join-Path $Dir ($site.Name + '.png')
      $Temp = Join-Path $Dir ($site.Name + '.live-temp.png')
      try {
        & $Browser '--headless=new' '--disable-gpu' '--hide-scrollbars' '--no-first-run' '--disable-extensions' '--window-size=1440,900' '--virtual-time-budget=5000' "--screenshot=$Temp" $site.Url 2>$null | Out-Null
        if ((Test-Path $Temp) -and ((Get-Item $Temp).Length -gt 10000)) {
          Move-Item -Force $Temp $Dest
          Write-Host "CAPTURA NUEVA: $($site.Name)" -ForegroundColor Green
        } else { Write-Warning "No se pudo capturar $($site.Name)" }
      } catch { Write-Warning "Error al capturar $($site.Name): $_" }
      if (Test-Path $Temp) { Remove-Item $Temp -Force }
    }
  }
}
Write-Host 'ATENCION: Las capturas nuevas deben inspeccionarse manualmente para descartar paginas de error.' -ForegroundColor Yellow
Write-Host 'Proceso terminado. Abre index.html o actualiza el navegador para ver las imagenes.' -ForegroundColor Cyan
