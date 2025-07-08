# Script PowerShell para agregar páginas de plataforma de servicios
# Proyecto ID: 686c3e7eeef6dc7a76a5252d

# Configuración
$BASE_URL = "http://localhost:3001/api"
$PROJECT_ID = "686c3e7eeef6dc7a76a5252d"
$ENDPOINT = "$BASE_URL/projects/$PROJECT_ID/add-service-platform-pages"

# IMPORTANTE: Reemplaza este token con uno válido
# Puedes obtenerlo del localStorage de tu navegador: localStorage.getItem('token')
$AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZjM2RmZGVlZjZkYzdhNzZhNTI1MTQiLCJpYXQiOjE3NTE5MjQyNTksImV4cCI6MTc1MjUyOTA1OX0.L7yuBeHR5IGf6P6MsNyJgInVOTZrrGwqq9PnEbyzVzs"

Write-Host "🔧 Script para agregar páginas de plataforma de servicios" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📋 Proyecto ID: $PROJECT_ID" -ForegroundColor Yellow
Write-Host "🌐 Endpoint: $ENDPOINT" -ForegroundColor Yellow

if ($AUTH_TOKEN -eq "TU_TOKEN_AQUI") {
    Write-Host "⚠️  IMPORTANTE: Debes reemplazar AUTH_TOKEN con un token válido" -ForegroundColor Red
    Write-Host "   Pasos para obtener el token:" -ForegroundColor Yellow
    Write-Host "   1. Abre tu navegador y ve a la aplicación" -ForegroundColor White
    Write-Host "   2. Abre las herramientas de desarrollador (F12)" -ForegroundColor White
    Write-Host "   3. Ve a la consola y ejecuta: localStorage.getItem('token')" -ForegroundColor White
    Write-Host "   4. Copia el token y reemplázalo en este script" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Páginas que se agregarán:" -ForegroundColor Green
    Write-Host "   1. Página de Registro/Login (/auth)" -ForegroundColor White
    Write-Host "   2. Home pública (/)" -ForegroundColor White
    Write-Host "   3. Página de Búsqueda (/search)" -ForegroundColor White
    Write-Host "   4. Ficha de Profesional (/professional/:id)" -ForegroundColor White
    Write-Host "   5. Página de Reserva (/booking/:professionalId)" -ForegroundColor White
    Write-Host "   6. Página de Pago (/payment/:bookingId)" -ForegroundColor White
    exit 1
}

Write-Host "🚀 Enviando petición para agregar páginas..." -ForegroundColor Green

try {
    # Crear headers
    $headers = @{
        "Authorization" = "Bearer $AUTH_TOKEN"
        "Content-Type" = "application/json"
    }
    
    # Hacer la petición POST
    $response = Invoke-RestMethod -Uri $ENDPOINT -Method Post -Headers $headers
    
    Write-Host "✅ ¡Éxito! Respuesta del servidor:" -ForegroundColor Green
    Write-Host "=" * 40 -ForegroundColor Green
    
    # Mostrar información de la respuesta
    Write-Host "📄 Mensaje: $($response.message)" -ForegroundColor Yellow
    Write-Host "📊 Total solicitado: $($response.totalRequested)" -ForegroundColor White
    Write-Host "✅ Total agregado: $($response.totalAdded)" -ForegroundColor Green
    Write-Host "❌ Total errores: $($response.totalErrors)" -ForegroundColor Red
    
    if ($response.addedPages -and $response.addedPages.Count -gt 0) {
        Write-Host ""
        Write-Host "📋 Páginas agregadas exitosamente:" -ForegroundColor Green
        for ($i = 0; $i -lt $response.addedPages.Count; $i++) {
            $page = $response.addedPages[$i]
            Write-Host "   $($i + 1). $($page.name) ($($page.route))" -ForegroundColor White
        }
    }
    
    if ($response.errors -and $response.errors.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠️ Errores encontrados:" -ForegroundColor Red
        for ($i = 0; $i -lt $response.errors.Count; $i++) {
            $error = $response.errors[$i]
            Write-Host "   $($i + 1). $($error.error)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Proceso completado exitosamente!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error al realizar la petición:" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        try {
            $errorResponse = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorResponse)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Detalles: $errorBody" -ForegroundColor Red
        } catch {
            Write-Host "No se pudo obtener más detalles del error" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")