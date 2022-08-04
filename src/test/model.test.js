import Model from '../mvc/model.js'

describe("model", () => {
    const model = new Model()

    it("says hello pass example", () => {
        expect(model.hello()).toBe("Hello, I am the model")
    })

    it("says hello fail example", () => {
        expect(model.hello()).toBe("Yo") // how uncouth
    })
})
