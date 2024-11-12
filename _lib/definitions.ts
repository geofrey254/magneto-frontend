// @/app/lib/definitions.ts
import { JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  roles?: string[];
  expiresAt: Date;
}
