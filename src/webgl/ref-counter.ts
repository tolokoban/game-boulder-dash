/**
 * This reference counter is used to know when we need to
 * remove some resource from WebGL memory.
 * This way, we can 
 */
export class ReferenceCounter<T> {
    private counters = new Map<WebGL2RenderingContext, Map<T, number>>()

    /**
     * @returns The number of references to this object.
     */
    public add(gl: WebGL2RenderingContext, obj: T): number {
        const map = this.getMap(gl)
        const count = (map.get(obj) ?? 0) + 1
        map.set(obj, count)
        return count
    }

    /**
     * @returns The number of remaining references to this object.
     */
    public remove(gl: WebGL2RenderingContext, obj: T): number {
        const map = this.getMap(gl)
        const count = map.get(obj) ?? 0
        if (count < 1) return 0

        if (count === 1) {
            map.delete(obj)
            return 0
        }

        map.set(obj, count - 1)
        return count - 1
    }

    private getMap(gl: WebGL2RenderingContext): Map<T, number> {
        const map = this.counters.get(gl)
        if (map) return map

        const newMap = new Map<T, number>()
        this.counters.set(gl, newMap)
        return newMap
    }
}
