import { BASE_URL } from "../../internal/Consts.js";

/**
 * Service for obtaining authentication tokens in the SIAR Web API
 */
export class AuthenticationService {
  private baseUrl: string;

  /**
   * Service constructor
   */
  constructor() {
    this.baseUrl = BASE_URL;
  }

  /**
   * Builds the URL to encrypt a string
   * @param text String to encrypt
   * @returns Full URL for the request
   */
  private buildEncryptUrl(text: string): string {
    return `${this.baseUrl}/API/V1/Autenticacion/cifrarCadena?cadena=${encodeURIComponent(text)}`;
  }

  /**
   * Builds the URL to obtain a token
   * @param encryptedUser Encrypted user
   * @param encryptedPassword Encrypted password
   * @returns Full URL for the request
   */
  private buildTokenUrl(
    encryptedUser: string,
    encryptedPassword: string,
  ): string {
    return `${this.baseUrl}/API/V1/Autenticacion/obtenerToken?Usuario=${encodeURIComponent(encryptedUser)}&Password=${encodeURIComponent(encryptedPassword)}`;
  }

  /**
   * Encrypts a text string using the SIAR API encryption
   * @param text String to encrypt (can be user identifier or password)
   * @returns Promise that resolves with the encrypted string
   */
  encryptString(text: string): Promise<string> {
    const url = this.buildEncryptUrl(text);
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error HTTP: ${response.status} - ${response.statusText}`,
        );
      }
      return response.text();
    });
  }

  /**
   * Obtains an authentication token for accessing protected SIAR services
   * This method performs the complete authentication process:
   * 1. Encrypts the user identifier
   * 2. Encrypts the password
   * 3. Obtains the authentication token
   *
   * @param params Authentication parameters (userId and password)
   * @returns Promise that resolves with the authentication token
   */
  obtainToken(params: { userId: string; password: string }): Promise<string> {
    // Step 1: Encrypt the user identifier
    return this.encryptString(params.userId)
      .then((encryptedUser) =>
        // Step 2: Encrypt the password
        this.encryptString(params.password).then((encryptedPassword) => ({
          encryptedUser,
          encryptedPassword,
        })),
      )
      .then(({ encryptedUser, encryptedPassword }) => {
        // Step 3: Obtain the token
        const url = this.buildTokenUrl(encryptedUser, encryptedPassword);
        return fetch(url);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error HTTP: ${response.status} - ${response.statusText}`,
          );
        }
        return response.text();
      });
  }
}
