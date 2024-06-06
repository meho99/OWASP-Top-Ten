import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'my-secret';

/**
 * Service responsible for generating and verifying tokens.
 * It contains two methods to generate and verify tokens
 * @security-risk:
 * - Security risk here is that application is using broken version of JWT library
 * - The jsonwebtoken library version 8.5.1 has known vulnerabilities, such as a critical issue with JWT secret key handling. Attackers can exploit these vulnerabilities to forge JWT tokens, leading to unauthorized access.
 *
 * @solution:
 * - Update Dependencies to their latest secure versions.
 * - - "jsonwebtoken": "^9.0.0", // Updated version of jsonwebtoken library in package.json
 * - Regular Dependency Checks: Use tools like npm audit, snyk, or dependabot to regularly check for and update vulnerable dependencies.
 */
@Injectable()
export class VulnerableAndOutdatedComponentsService {
  generateToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
