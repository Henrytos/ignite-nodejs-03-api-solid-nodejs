import type { Environment } from 'vitest'

export default <Environment>{
    name: 'custom',
    transformMode: 'ssr',
    setup() {
        console.log('setup environment')
        return {
            teardown() {
                console.log('teardown environment')
            }
        }
    }
}