class EventHandler <Events extends Record<string, (...args: any[]) => void>> {
    private handlers: { [Property in keyof Events]: ((...args: any[]) => void)[] } = {} as any

    on <E extends keyof Events> (event: E, handler: Events[E]) {
        const handlers = this.handlers[event] || []
        handlers.push(handler)
        this.handlers[event] = handlers

        return handler
    }

    off <E extends keyof Events> (event: E, handler: Events[E]) {
        const handlers = this.handlers[event] || []
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
        this.handlers[event] = handlers
    }

    trigger <E extends keyof Events> (event: E, data?: Parameters<Events[E]>[0]): any[] {
        const handlers = this.handlers[event] || []
        return handlers.map((handler) => handler(data))
    }
}

export function createEvents <Events extends Record<string, (...args: any[]) => void>> () {
    const events = new EventHandler<Events>()

    const useEvents = () => {
        return events
    }

    return {
        useEvents,
    }
}
