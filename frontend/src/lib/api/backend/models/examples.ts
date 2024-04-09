import { Collection } from '..'

export interface ExampleAttributes {
    foo: string
}

class Examples extends Collection<ExampleAttributes> {
    constructor () {
        super('examples')
    }
}

export const examples = new Examples()
