# Servicio Obtener Token

Para acceder a las funcionalidades protegidas que expone la Web API de SIAR, es obligatorio disponer
de un token de autenticacion. Este token identifica de forma unica al usuario, permitiendo controlar el
acceso y uso de los servicios.

La Web API proporciona una serie de metodos que permiten obtener dicho token de forma segura.
A continuacion, se describen los pasos que deben seguirse de manera secuencial.

## Pasos

1. **Cifrado del identificador del usuario**

   El usuario debe estar previamente dado de alta en el sistema REGEUS del MAPA.
   Para cifrar el identificador (por ejemplo, un NIF), se utiliza el siguiente metodo de la API:
   - Metodo HTTP: `GET`
   - Endpoint:

     ```text
     {BaseURL}/API/V1/Autenticacion/cifrarCadena?cadena={NIF}
     ```

   Este metodo devuelve una cadena cifrada del identificador que se utilizara en el paso 3.
   Devuelve la respuesta en formato texto.

2. **Cifrado de la contrasena**

   Del mismo modo, la contrasena asociada al usuario debe ser cifrada utilizando el mismo metodo del
   paso 1:
   - Metodo HTTP: `GET`
   - Endpoint:

     ```text
     {BaseURL}/API/V1/Autenticacion/cifrarCadena?cadena={password}
     ```

   Este metodo devuelve una cadena cifrada de la contrasena que se utilizara en el paso 3.

3. **Obtencion del token**

   Este metodo requiere como entrada las dos cadenas cifradas obtenidas en los pasos anteriores y, si la
   autenticacion es correcta, devuelve el token que permitira acceder a los servicios protegidos.

   Una vez cifrados el identificador (paso 1) y la contrasena asociada a dicho identificador (paso 2), se debe
   invocar el siguiente servicio para obtener el token de autenticacion:
   - Metodo HTTP: `GET`
   - Endpoint:

     ```text
     {BaseURL}/API/V1/Autenticacion/obtenerToken?Usuario={DNI_cifrado_en_paso_1}&Password={contrasena_cifrada_en_paso_2}
     ```
