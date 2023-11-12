$config = Get-Content -Raw -Path $PSScriptRoot\environment.json | ConvertFrom-Json

try {
  [void][System.Reflection.Assembly]::LoadFrom((Join-Path $PSScriptRoot "MySql.Data.dll"))
}
catch {
  Write-Host -ForegroundColor Red "Failed to load MySql.Data.dll."
  Write-Host $_.Exception.Message
  exit 1
}

$connection = New-Object MySql.Data.MySqlClient.MySqlConnection
$connection.ConnectionString = "Server=$($config.db_host); Port=$($config.db_port); Uid=$($config.db_user); Pwd=$($config.db_pwd); Pooling=false;"
try {
  $connection.Open()
}
catch {
  Write-Host -ForegroundColor Red "Failed to connect to database server $($config.db_host)."
  Write-Host $_.Exception.Message
  exit 1
}

$command = $connection.CreateCommand()
$command.CommandText = "CREATE DATABASE IF NOT EXISTS $($config.db_name); USE $($config.db_name);"
$command.ExecuteNonQuery()

$files = Get-ChildItem -Path $PSScriptRoot\..\database\tables -Filter *.sql
foreach ($file in $files) {
  $command.CommandText = Get-Content -Raw -Path $file.FullName
  $command.ExecuteNonQuery()
}

$files = Get-ChildItem -Path $PSScriptRoot\..\database\stored-procedures -Filter *.sql
foreach ($file in $files) {
  $command.CommandText = Get-Content -Raw -Path $file.FullName
  $command.ExecuteNonQuery()
}

$connection.Close()
