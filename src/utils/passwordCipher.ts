// Password cipher - currently returns plain password
// Encryption disabled since backend uses HTTPS + localhost proxy
export async function encryptPassword(password: string): Promise<string> {
  return password
}

