require('ts-node/register')

import { migrate } from './umzug'
if (require.main === module) {
  migrate.runAsCLI()
}
