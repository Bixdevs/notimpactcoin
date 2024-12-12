interface RateLimits {
  [key: string]: number;
}

class RateLimiter {
  private limits: RateLimits = {};

  canMakeRequest(key: string, cooldown: number): boolean {
    const now = Date.now();
    const lastRequest = this.limits[key] || 0;
    
    if (now - lastRequest < cooldown) {
      return false;
    }
    
    this.limits[key] = now;
    return true;
  }
}

export const rateLimiter = new RateLimiter();