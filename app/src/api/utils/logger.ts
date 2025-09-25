// Sistema de logging para debugging de API
// Importar Platform para el logger
import { Platform } from 'react-native';

export class ApiLogger {
  private static isEnabled = true;

  static enable() {
    this.isEnabled = true;
  }

  static disable() {
    this.isEnabled = false;
  }

  static logRequest(method: string, url: string, data?: any, headers?: any) {
    if (!this.isEnabled) return;

    console.log('🚀 ===== PETICIÓN API =====');
    console.log(`📡 Método: ${method}`);
    console.log(`🌐 URL: ${url}`);
    console.log(`📦 Datos:`, data);
    console.log(`📋 Headers:`, headers);
    console.log('============================');
  }

  static logResponse(status: number, data: any, url: string) {
    if (!this.isEnabled) return;

    console.log('✅ ===== RESPUESTA API =====');
    console.log(`📡 URL: ${url}`);
    console.log(`📊 Status: ${status}`);
    console.log(`📦 Datos:`, data);
    console.log('=============================');
  }

  static logError(error: any, url: string) {
    if (!this.isEnabled) return;

    console.log('❌ ===== ERROR API =====');
    console.log(`📡 URL: ${url}`);
    console.log(`🚨 Error:`, error);
    console.log(`📊 Status: ${error.status || 'N/A'}`);
    console.log(`📦 Data:`, error.data);
    console.log(`💬 Message:`, error.message);
    console.log('========================');
  }

  static logNetworkInfo() {
    if (!this.isEnabled) return;

    console.log('🌐 ===== INFORMACIÓN DE RED =====');
    console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    console.log(`📱 Platform: ${Platform.OS}`);
    console.log(`🔗 Base URL: http://localhost:5000/api/v1`);
    console.log('==================================');
  }
}
