import * as dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config();

export const PUPPETEER_TIMEOUT = get('PUPPETEER_TIMEOUT').default(30000).asIntPositive();
