$config = Get-Content -Raw -Path .\database.json | ConvertFrom-Json

try {
  [void][System.Reflection.Assembly]::LoadFrom((Join-Path $PSScriptRoot "MySql.Data.dll"))
}
catch {
  Write-Host -ForegroundColor Red "Failed to load MySql.Data.dll."
  Write-Host $_.Exception.Message
  exit 1
}

$connection = New-Object MySql.Data.MySqlClient.MySqlConnection
$connection.ConnectionString = "Server=$($config.host); Port=$($config.port); Uid=$($config.user); Pwd=$($config.password); Pooling=false; SslMode=none;"
try {
  $connection.Open()
}
catch {
  Write-Host -ForegroundColor Red "Failed to connect to database server $($config.host)."
  Write-Host $_.Exception.Message
  exit 1
}

$command = $connection.CreateCommand()
$command.CommandText = "CREATE DATABASE IF NOT EXISTS $($config.database); USE $($config.database);"
$command.ExecuteNonQuery()

$files = Get-ChildItem -Path .\tables -Filter *.sql
foreach ($file in $files) {
  $command.CommandText = Get-Content -Raw -Path $file.FullName
  $command.ExecuteNonQuery()
}

$files = Get-ChildItem -Path .\stored-procedures -Filter *.sql
foreach ($file in $files) {
  $command.CommandText = Get-Content -Raw -Path $file.FullName
  $command.ExecuteNonQuery()
}

$connection.Close()
