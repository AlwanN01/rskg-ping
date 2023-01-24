import Host from '../models/Host'

class Person implements HasManyAssoc<Host, 'host'> {}
