export interface RespuestaGeneral<T> {
  datos?: T;
  MensajeRespuesta: string | null;
  error?: {
    type: "network" | "http" | "parse";
    statusCode?: number;
    details: string;
  };
}
