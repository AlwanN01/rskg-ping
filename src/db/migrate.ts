require('ts-node/register')

import { umzug } from '.'

if (require.main === module) {
  umzug.runAsCLI()
}
