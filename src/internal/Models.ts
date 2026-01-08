export interface RespuestaGeneral<T> {
  Datos?: T;
  MensajeRespuesta: string | null;
  error?: {
    type: "network" | "http" | "parse";
    statusCode?: number;
    details: string;
  };
}
