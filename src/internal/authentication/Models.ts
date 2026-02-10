/**
 * Encrypted string returned by the API
 */
export interface CadenaCifrada {
  Datos: string;
  MensajeRespuesta: string | null;
}

/**
 * Authentication token returned by the API
 */
export interface TokenAutenticacion {
  Datos: string;
  MensajeRespuesta: string | null;
}
