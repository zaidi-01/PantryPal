$config = Get-Content -Raw -Path $PSScriptRoot\environment.json | ConvertFrom-Json
$configKeys = $config.PSObject.Properties | Select-Object -ExpandProperty Name

# Replace environment variables in all the config files
$configFiles = Get-ChildItem -Path $PSScriptRoot\..\server\Config -Filter *.json -Recurse
foreach ($file in $configFiles) {
  $content = Get-Content -Raw -Path $file.FullName
  foreach ($key in $configKeys) {
    $content = $content.Replace("`${{$key}}", $config.$key)
  }
  $content | Set-Content -Path $file.FullName -NoNewline
  Write-Host "Updated $file"
}
