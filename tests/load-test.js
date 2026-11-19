import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 }, // Ramp-up to 20 users
    { duration: '20s', target: 50 }, // Sustained load at 50 users
    { duration: '10s', target: 0 },  // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<250', 'p(99)<500'], // 95% under 250ms, 99% under 500ms
    http_req_failed: ['rate<0.01'],                 // Under 1% errors
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  // 1. Browse Homepage
  const resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'home status is 200': (r) => r.status === 200,
    'home contains brand': (r) => r.body.includes('Resoline Techbis'),
    'has security headers': (r) => r.headers['X-Content-Type-Options'] === 'nosniff',
  });

  sleep(1);

  // 2. Health Monitoring Ping
  const resHealth = http.get(`${BASE_URL}/api/health`);
  check(resHealth, {
    'health status is 200': (r) => r.status === 200,
    'health json status is ok': (r) => JSON.parse(r.body).status === 'ok',
  });

  sleep(1);

  // 3. Subpage Exploration
  const resSub = http.get(`${BASE_URL}/automation.html`);
  check(resSub, {
    'automation page is 200': (r) => r.status === 200,
  });

  sleep(2);
}
