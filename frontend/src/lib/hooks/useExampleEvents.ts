import { createEvents } from '../util/createEvents'

export const { useEvents: useExampleEvents } = createEvents<{
    'foo': (bar: string) => void
}>()
