# 열두동물 한글 수비대 - Typecast AI 녹음 키트 (Windows PowerShell 5.1 / PowerShell 7)
#   voices  : Typecast 목소리 목록을 받고, 역할마다 목소리를 자동으로 고른 뒤(casting.csv) 고르기 화면을 엽니다
#   samples : 역할마다 첫 대사 1줄씩 만들어 들어 볼 수 있게 합니다
#   record  : 모든 대사를 한 줄씩 MP3로 만듭니다(이미 만든 줄은 건너뜀). -Priority 1 이면 캐릭터 대사만
#   status  : 남은 줄 수와 필요한 크레딧(글자 수)을 보여 줍니다
# API 키는 key.txt 에만 넣습니다. 이 파일을 다른 사람이나 대화창에 보내지 마세요.
param([Parameter(Position = 0)][string]$Mode = 'help', [int]$Priority = 0)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
try { [Console]::OutputEncoding = [Text.Encoding]::UTF8 } catch {}
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}

$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Api = if ($env:TYPECAST_API) { $env:TYPECAST_API.TrimEnd('/') } else { 'https://api.typecast.ai' }
$Model = 'ssfm-v31'
$OutDir = Join-Path $Here 'out'
$DataDir = Join-Path $Here 'data'
$CastPath = Join-Path $Here 'casting.csv'
$Utf8Bom = New-Object System.Text.UTF8Encoding $true
foreach ($d in @($OutDir, $DataDir)) { if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d | Out-Null } }

function Say($t, $c = 'Gray') { Write-Host $t -ForegroundColor $c }
function Open-It($p) { try { Start-Process $p } catch { Say ('열기: ' + $p) } }
function Read-Table($p) { if (Test-Path $p) { @(Import-Csv -Path $p -Encoding UTF8) } else { @() } }
function Write-Table($rows, $p) { $txt = ($rows | ConvertTo-Csv -NoTypeInformation) -join "`r`n"; [IO.File]::WriteAllText($p, $txt + "`r`n", $Utf8Bom) }
function Write-Js($name, $obj, $p) { $json = ConvertTo-Json -InputObject $obj -Depth 6 -Compress; [IO.File]::WriteAllText($p, "window.$name=$json;`n", $Utf8Bom) }
function Get-Key {
  $p = Join-Path $Here 'key.txt'
  if (-not (Test-Path $p)) { throw 'key.txt 파일이 없어요. 키트 폴더에 key.txt를 만들고 Typecast API 키를 붙여 넣으세요.' }
  $k = ((Get-Content -Path $p -Encoding UTF8) -join '').Trim()
  if (-not $k -or $k -match '\s' -or $k -match '여기') { throw 'key.txt에 Typecast API 키만 붙여 넣고 저장하세요. (지금은 비어 있거나 안내 문구가 그대로 있어요)' }
  return $k
}
function Status-Of($err) { try { return [int]$err.Exception.Response.StatusCode } catch { return 0 } }
function Body-Of($err) { try { if ($err.ErrorDetails -and $err.ErrorDetails.Message) { return $err.ErrorDetails.Message } } catch {}; return $err.Exception.Message }

function Import-DownloadedCasting {
  # pick.html 에서 내려받은 casting.csv 가 다운로드 폴더에 더 새것으로 있으면 가져옵니다
  if (-not $env:USERPROFILE) { return }
  $dl = Join-Path $env:USERPROFILE 'Downloads'
  if (-not (Test-Path $dl)) { return }
  $new = Get-ChildItem -Path $dl -Filter 'casting*.csv' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $new) { return }
  $cur = if (Test-Path $CastPath) { (Get-Item $CastPath).LastWriteTime } else { [datetime]::MinValue }
  if ($new.LastWriteTime -gt $cur) {
    if (Test-Path $CastPath) { Copy-Item $CastPath (Join-Path $DataDir ('casting_backup_' + (Get-Date -Format 'yyyyMMdd_HHmmss') + '.csv')) }
    Copy-Item $new.FullName $CastPath -Force
    Say ("다운로드 폴더의 새 캐스팅표를 가져왔어요: " + $new.Name) 'Cyan'
  }
}

function Get-Voices($key) {
  Say '목소리 목록을 받는 중...'
  try { $v = Invoke-RestMethod -Uri "$Api/v3/voices?model=$Model" -Headers @{ 'X-API-KEY' = $key } -Method Get -TimeoutSec 60 }
  catch {
    $s = Status-Of $_
    if ($s -eq 401) { throw 'API 키가 맞지 않아요(401). key.txt의 키를 다시 복사해 넣으세요.' }
    throw ("목소리 목록을 받지 못했어요 ($s): " + (Body-Of $_))
  }
  $list = @($v | Where-Object { $_.voice_id -like 'tc_*' -or $_.voice_id -like 'uc_*' })
  if (-not $list.Count) { throw '목소리 목록이 비어 있어요.' }
  $flat = foreach ($x in $list) {
    $ko = ''; $en = ''
    try { $ko = $x.voice_name.kor } catch {}
    try { $en = $x.voice_name.eng } catch {}
    $emo = @()
    foreach ($m in @($x.models)) { if ($m.version -eq $Model) { $emo = @($m.emotions) } }
    [pscustomobject]@{ voice_id = $x.voice_id; name = $(if ($ko) { $ko } else { $en }); name_eng = $en; gender = "$($x.gender)"; age = "$($x.age)";
      use_cases = (@($x.use_cases) -join ', '); emotions = ($emo -join ', '); preview_url = "$($x.preview_url)" }
  }
  $flat = @($flat)
  Write-Table $flat (Join-Path $Here 'voices.csv')
  Write-Js 'TC_VOICES' $flat (Join-Path $DataDir 'voices.js')
  Say ("목소리 " + $flat.Count + "개를 받았어요 (voices.csv).") 'Green'
  return $flat
}

function Auto-Cast($voices) {
  $roles = Read-Table (Join-Path $Here 'roles.csv')
  $old = @{}; foreach ($c in (Read-Table $CastPath)) { if ($c.voice_id) { $old[$c.'화자ID'] = $c } }
  $byId = @{}; foreach ($v in $voices) { $byId[$v.voice_id] = $v }
  $usage = @{}; foreach ($c in $old.Values) { if ($byId[$c.voice_id]) { $usage[$c.voice_id] = 1 + [int]$usage[$c.voice_id] } }
  $kw = @{ '이야기' = 'audiobook|story|narrat|kid|child|educat'; '고양이 악당' = 'anim|game|cartoon|character'; '수비대 영웅' = 'anim|kid|child|game|character'; '사건 친구' = 'anim|kid|child|character'; '동화 속 인물' = 'anim|kid|child|story' }
  $out = foreach ($r in $roles) {
    $id = $r.'화자ID'
    if ($old[$id] -and $byId[$old[$id].voice_id]) { $o = $old[$id]; $o; continue }
    $ages = @($r.'나이' -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    $pool = @($voices | Where-Object { -not $r.'성별' -or $_.gender -eq $r.'성별' })
    if (-not $pool.Count) { $pool = @($voices) }
    $pat = $kw[$r.'그룹']
    $score = { param($v) $s = 0; $i = [array]::IndexOf($ages, $v.age); if ($i -ge 0) { $s += 100 - 20 * $i }; if ($pat -and $v.use_cases -match $pat) { $s += 10 }; $s -= 60 * [int]$usage[$v.voice_id]; $s }
    $best = $pool | Sort-Object @{ Expression = { & $score $_ }; Descending = $true }, @{ Expression = { $_.name } } | Select-Object -First 1
    $pitch = [int]$r.'높낮이'
    if ([int]$usage[$best.voice_id] -gt 0) { $pitch += $(if ([int]$usage[$best.voice_id] % 2) { 2 } else { -2 }) }  # same voice twice: shift pitch so they sound different
    $usage[$best.voice_id] = 1 + [int]$usage[$best.voice_id]
    [pscustomobject][ordered]@{ '화자ID' = $id; '캐릭터' = $r.'캐릭터'; 'voice_id' = $best.voice_id; '목소리' = $best.name; '성별' = $best.gender; '나이' = $best.age;
      '속도' = $r.'속도'; '높낮이' = $pitch; '감정' = $r.'감정'; '세기' = '1.0'; '설명' = $r.'설명' }
  }
  $out = @($out)
  Write-Table $out $CastPath
  Say ("역할 " + $out.Count + "개에 목소리를 골랐어요 (casting.csv). pick.html에서 들어 보고 바꿀 수 있어요.") 'Green'
  return $out
}

function Write-PageData {
  $cast = @(Read-Table $CastPath); $roles = @(Read-Table (Join-Path $Here 'roles.csv'))
  Write-Js 'TC_CAST' $cast (Join-Path $DataDir 'casting.js')
  Write-Js 'TC_ROLES' $roles (Join-Path $DataDir 'roles.js')
  $first = [ordered]@{}; foreach ($l in (Read-Table (Join-Path $Here 'lines.csv'))) { if (-not $first.Contains($l.'화자ID')) { $first[$l.'화자ID'] = @{ file = $l.'파일명'; text = $l.'대사' } } }
  Write-Js 'TC_FIRST' $first (Join-Path $DataDir 'first.js')
  $made = Load-Made; Write-Js 'TC_MADE' $made (Join-Path $DataDir 'made.js')
}
function Load-Made { $p = Join-Path $DataDir 'made.json'; $h = @{}; if (Test-Path $p) { $o = Get-Content -Raw -Encoding UTF8 $p | ConvertFrom-Json; foreach ($n in $o.PSObject.Properties) { $h[$n.Name] = $n.Value } }; return $h }
function Save-Made($h) { [IO.File]::WriteAllText((Join-Path $DataDir 'made.json'), (ConvertTo-Json -InputObject $h -Depth 3), $Utf8Bom) }
function Sig($c, $text) { return ($c.voice_id + '|' + $c.'속도' + '|' + $c.'높낮이' + '|' + $c.'감정' + '|' + $c.'세기' + '|' + $text) }

function Make-Line($key, $line, $c) {
  $tempo = [double]$(if ($c.'속도') { $c.'속도' } else { 1 }); if ($tempo -lt 0.5) { $tempo = 0.5 }; if ($tempo -gt 2) { $tempo = 2 }
  $pitch = [int]$(if ($c.'높낮이') { $c.'높낮이' } else { 0 }); if ($pitch -lt -12) { $pitch = -12 }; if ($pitch -gt 12) { $pitch = 12 }
  $emo = if ($c.'감정') { $c.'감정'.Trim().ToLower() } else { 'smart' }
  $body = [ordered]@{ voice_id = $c.voice_id; text = $line.'대사'; model = $Model; language = 'kor' }
  if ($emo -eq 'smart') {
    $p = [ordered]@{ emotion_type = 'smart' }
    if ($line.'앞대사') { $p.previous_text = $line.'앞대사' }
    if ($line.'뒷대사') { $p.next_text = $line.'뒷대사' }
    $body.prompt = $p
  } elseif ($emo -ne 'none') {
    $int = [double]$(if ($c.'세기') { $c.'세기' } else { 1 })
    $body.prompt = [ordered]@{ emotion_type = 'preset'; emotion_preset = $emo; emotion_intensity = $int }
  }
  $body.output = [ordered]@{ target_lufs = -18; audio_pitch = $pitch; audio_tempo = $tempo; audio_format = 'mp3' }
  $dest = Join-Path $OutDir $line.'파일명'; $tmp = $dest + '.part'
  for ($try = 1; $try -le 6; $try++) {
    $json = ConvertTo-Json -InputObject $body -Depth 5 -Compress
    try {
      Invoke-WebRequest -Uri "$Api/v1/text-to-speech" -Method Post -Headers @{ 'X-API-KEY' = $key } -ContentType 'application/json; charset=utf-8' `
        -Body ([Text.Encoding]::UTF8.GetBytes($json)) -OutFile $tmp -UseBasicParsing -TimeoutSec 120 | Out-Null
      if ((Get-Item $tmp).Length -lt 400) { throw '응답이 너무 짧아요' }
      Move-Item -Path $tmp -Destination $dest -Force
      return $true
    } catch {
      if (Test-Path $tmp) { Remove-Item $tmp -Force }
      $s = Status-Of $_
      if ($s -eq 401) { throw 'API 키가 맞지 않아요(401). key.txt를 확인하세요.' }
      if ($s -eq 402) { throw 'CREDITS' }
      if ($s -eq 422 -and $body.prompt -and $body.prompt.emotion_type -ne 'smart') { $body.prompt = [ordered]@{ emotion_type = 'smart' }; continue }
      if ($s -eq 429 -or $s -ge 500 -or $s -eq 0) { Start-Sleep -Seconds ([Math]::Min(30, 3 * $try)); continue }
      Say ("   실패 " + $line.'파일명' + " ($s): " + (Body-Of $_)) 'Red'
      return $false
    }
  }
  Say ("   실패 " + $line.'파일명' + ': 여러 번 다시 해도 안 돼요') 'Red'
  return $false
}

function Run-Lines($key, $lines, $label) {
  $cast = @{}; foreach ($c in (Read-Table $CastPath)) { $cast[$c.'화자ID'] = $c }
  $made = Load-Made
  $todo = @($lines | Where-Object { $c = $cast[$_.'화자ID']; $c -and $c.voice_id -and (-not (Test-Path (Join-Path $OutDir $_.'파일명')) -or $made[$_.'파일명'] -ne (Sig $c $_.'대사')) })
  $nochar = @($lines | Where-Object { -not $cast[$_.'화자ID'] -or -not $cast[$_.'화자ID'].voice_id } | ForEach-Object { $_.'화자ID' } | Sort-Object -Unique)
  if ($nochar.Count) { Say ('목소리가 정해지지 않은 역할: ' + ($nochar -join ', ') + ' (casting.csv의 voice_id를 채우세요)') 'Yellow' }
  $chars = 0; foreach ($l in $todo) { $chars += $l.'대사'.Length }
  Say ("$label : 만들 줄 " + $todo.Count + "개, 약 " + $chars + "자(크레딧)") 'Cyan'
  $ok = 0; $bad = 0; $i = 0
  foreach ($l in $todo) {
    $i++; $c = $cast[$l.'화자ID']
    Write-Host ("[{0}/{1}] {2} {3}: {4}" -f $i, $todo.Count, $l.'파일명', $l.'캐릭터', $l.'대사')
    try { $r = Make-Line $key $l $c } catch {
      if ($_.Exception.Message -eq 'CREDITS') { Save-Made $made; Say '크레딧이 부족해요(402). 다음 달에 다시 실행하거나 요금제를 올리면, 이미 만든 줄은 건너뛰고 이어서 만듭니다.' 'Yellow'; break }
      Save-Made $made; throw
    }
    if ($r) { $made[$l.'파일명'] = (Sig $c $l.'대사'); $ok++; if ($ok % 10 -eq 0) { Save-Made $made } } else { $bad++ }
    Start-Sleep -Milliseconds 250
  }
  Save-Made $made
  Say ("완료: 새로 만든 줄 $ok 개, 실패 $bad 개. 파일은 out 폴더에 있어요.") 'Green'
}

function Make-Zip {
  $files = @(Get-ChildItem -Path $OutDir -Filter '*.mp3')
  if (-not $files.Count) { return }
  $zip = Join-Path $Here 'hangul_voices.zip'
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $OutDir '*.mp3') -DestinationPath $zip
  Say ("묶음 파일을 만들었어요: hangul_voices.zip (" + $files.Count + "개). 이 파일을 Claude 대화에 올리거나, Claude에게 이 폴더를 열어 달라고 하세요.") 'Green'
}

switch ($Mode.ToLower()) {
  'voices' { $k = Get-Key; $v = Get-Voices $k; Auto-Cast $v | Out-Null; Write-PageData; Open-It (Join-Path $Here 'pick.html') }
  'samples' {
    $k = Get-Key; Import-DownloadedCasting
    $first = @{}; foreach ($l in (Read-Table (Join-Path $Here 'lines.csv'))) { if (-not $first.ContainsKey($l.'화자ID')) { $first[$l.'화자ID'] = $l } }
    Run-Lines $k @($first.Values) '역할별 첫 대사'; Write-PageData; Open-It (Join-Path $Here 'pick.html')
  }
  'record' {
    $k = Get-Key; Import-DownloadedCasting
    $all = @(Read-Table (Join-Path $Here 'lines.csv'))
    if ($Priority -gt 0) { $all = @($all | Where-Object { [int]$_.'우선순위' -le $Priority }) }
    $all = @($all | Sort-Object @{ Expression = { [int]$_.'우선순위' } }, @{ Expression = { $_.'파일명' } })
    Run-Lines $k $all '전체 녹음'; Write-PageData; Make-Zip; Open-It $Here
  }
  'status' {
    Import-DownloadedCasting
    $cast = @{}; foreach ($c in (Read-Table $CastPath)) { $cast[$c.'화자ID'] = $c }; $made = Load-Made
    $all = @(Read-Table (Join-Path $Here 'lines.csv')); $left = @($all | Where-Object { $c = $cast[$_.'화자ID']; -not $c -or -not (Test-Path (Join-Path $OutDir $_.'파일명')) -or $made[$_.'파일명'] -ne (Sig $c $_.'대사') })
    $chars = 0; foreach ($l in $left) { $chars += $l.'대사'.Length }
    Say ("전체 " + $all.Count + "줄 중 남은 줄 " + $left.Count + "개, 약 " + $chars + "자(크레딧)") 'Cyan'
  }
  default { Say '사용법: 1_voices.bat → 2_samples.bat → 3_record_main.bat → 4_record_rest.bat 순서로 두 번 클릭하세요. 자세한 설명은 README_KO.txt' 'Cyan' }
}
