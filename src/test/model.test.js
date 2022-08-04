import Model from '../mvc/model.js'
import { add, getData } from '../mvc/model.js'

describe("model", () => {
    const model = new Model()

    it("says hello pass example", () => {
        expect(model.hello()).toBe("Hello, I am the model")
    })

    it("adds two numbers", () => {
        expect(add(2,2)).toBe(4)
    })

    it("gets 1", async () => {
        const data = await getData()
        expect(data).toBe(1)
    })
})
