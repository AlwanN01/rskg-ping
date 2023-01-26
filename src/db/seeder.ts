require('ts-node/register')

import { seed } from './umzug'
if (require.main === module) {
  seed.runAsCLI()
}
