import request from 'supertest';
import { ExpressApp } from '../../src/app'

const app = new ExpressApp().exec()

describe("App healthcheck", () => {
  it("Should return status code 200 for a healthy application", async () => {
    await request(app)
      .get("/health")
      .expect(200)
  })
})

describe("List Products", () => {
  it("Should list products, each with correct properties. When any query is provided, [res.body.data] length should be 20. Status code should be 200", async () => {
    await request(app)
      .get("/products")
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('meta')
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect((res.body.data as any[]).every((product) => {
          expect(Array.isArray(res.body.data)).toBeTruthy()
          expect(typeof product.id).toBe("number")
          expect(typeof product.attributes.updatedAt).toBe("string")
          expect(typeof product.attributes.title).toBe("string")
          expect(typeof product.attributes.image).toBe("string")
          expect(product.attributes).toHaveProperty("price_from")
          expect(typeof product.attributes.price).toBe("string")
          expect(typeof product.attributes.link).toBe("string")
          expect(typeof product.attributes.uuid).toBe("string")
          expect(typeof product.attributes.createdAt).toBe("string")
          expect(typeof product.attributes.seller).toBe("string")
          expect(typeof product.attributes.highlight).toBe("boolean")
          expect(typeof product.attributes.free_shipping_prime).toBe("boolean")
          expect(product.attributes).toHaveProperty("coupon")
          expect(typeof product.attributes.hidePrice).toBe("boolean")
          expect(product.attributes).toHaveProperty("extraInfo")
          expect(product.attributes).toHaveProperty("shipping")
          expect(product.attributes).toHaveProperty("installment")
          expect(product.attributes).toHaveProperty("updatedAt_timestamp")
          expect(typeof product.attributes.updatedAt_unixTimestamp).toBe("number")
          expect(product.attributes).toHaveProperty("initial_link")
        }))
      })
      .expect((res) => {
        expect(res.body.data.length).toBe(20)
      })
  })

  it("Should return only one product with correct properties if query param [limit=1]. Status code should be 200", async () => {
    await request(app)
      .get("/products?limit=1")
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(1)
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('meta')
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect(typeof res.body.data[0].id).toBe("number")
        expect(typeof res.body.data[0].attributes.updatedAt).toBe("string")
        expect(typeof res.body.data[0].attributes.title).toBe("string")
        expect(res.body.data[0].attributes).toHaveProperty("price_from")
        expect(typeof res.body.data[0].attributes.price).toBe("string")
        expect(typeof res.body.data[0].attributes.link).toBe("string")
        expect(typeof res.body.data[0].attributes.uuid).toBe("string")
        expect(typeof res.body.data[0].attributes.createdAt).toBe("string")
        expect(typeof res.body.data[0].attributes.seller).toBe("string")
        expect(typeof res.body.data[0].attributes.highlight).toBe("boolean")
        expect(typeof res.body.data[0].attributes.free_shipping_prime).toBe("boolean")
        expect(res.body.data[0].attributes).toHaveProperty("coupon")
        expect(typeof res.body.data[0].attributes.hidePrice).toBe("boolean")
        expect(res.body.data[0].attributes).toHaveProperty("extraInfo")
        expect(res.body.data[0].attributes).toHaveProperty("shipping")
        expect(res.body.data[0].attributes).toHaveProperty("installment")
        expect(res.body.data[0].attributes).toHaveProperty("updatedAt_timestamp")
        expect(typeof res.body.data[0].attributes.updatedAt_unixTimestamp).toBe("number")
        expect(res.body.data[0].attributes).toHaveProperty("initial_link")
      })
  })

})

describe("Get products by name", () => {

  it("Should list products with correct properties when search for products based on a existing name. Status code should be 200", async () => {
    await request(app)
      .get("/products/controle")
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data')
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect((res.body.data as any[]).every((product) => {
          expect(Array.isArray(res.body.data)).toBeTruthy()
          expect(typeof product.id).toBe("number")
          expect(typeof product.attributes.updatedAt).toBe("string")
          expect(typeof product.attributes.title).toBe("string")
          expect(typeof product.attributes.image).toBe("string")
          expect(product.attributes).toHaveProperty("price_from")
          expect(typeof product.attributes.price).toBe("string")
          expect(typeof product.attributes.link).toBe("string")
          expect(typeof product.attributes.uuid).toBe("string")
          expect(typeof product.attributes.createdAt).toBe("string")
          expect(typeof product.attributes.seller).toBe("string")
          expect(typeof product.attributes.highlight).toBe("boolean")
          expect(typeof product.attributes.free_shipping_prime).toBe("boolean")
          expect(product.attributes).toHaveProperty("coupon")
          expect(typeof product.attributes.hidePrice).toBe("boolean")
          expect(product.attributes).toHaveProperty("extraInfo")
          expect(product.attributes).toHaveProperty("shipping")
          expect(product.attributes).toHaveProperty("installment")
          expect(product.attributes).toHaveProperty("updatedAt_timestamp")
          expect(typeof product.attributes.updatedAt_unixTimestamp).toBe("number")
          expect(product.attributes).toHaveProperty("initial_link")
        }))
      })

  })

  it("Should return an ampty array if search for a non-existent product name. Status should be 200", async () => {
    await request(app)
      .get("/products/bola-quadrada-do-kiko")
      .expect(200)
      .expect(res => expect(Array.isArray(res.body)).toBeTruthy())
      .expect(res => expect(res.body.length).toBe(0))
  })

})

describe("List coupons", () => {

  it("Should list coupons with correct properties and 10 coupons given a simples request without query params. Status should be 200", async () => {
    await request(app)
      .get("/coupons")
      .expect(200)
      .expect((res) => expect(res.body.data.length).toBe(10))
      .expect((res) => {
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('meta')
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect((res.body.data as any[]).every((product) => {
          expect(Array.isArray(res.body.data)).toBeTruthy()
          expect(typeof product.id).toBe("number")
          expect(typeof product.attributes.updatedAt).toBe("string")
          expect(typeof product.attributes.seller).toBe("string")
          expect(typeof product.attributes.code).toBe("string")
          expect(typeof product.attributes.discount).toBe("string")
          expect(typeof product.attributes.title).toBe("string")
          expect(typeof product.attributes.description).toBe("string")
          expect(typeof product.attributes).toHaveProperty("link")
          expect(typeof product.attributes.featured).toBe("boolean")
          expect(typeof product.attributes.createdAt).toBe("string")
          expect(typeof product.attributes.discount_type).toBe("string")
        }))
      })

  })

  it("Should return only one coupon with correct properties given the query param [limit=1]. Status should be 200", async () => {
    await request(app)
      .get("/coupons?limit=1")
      .expect(200)
      .expect((res) => expect(res.body.data.length).toBe(1))
      .expect((res) => {
        expect(res.body).toHaveProperty('data')
        expect(res.body).toHaveProperty('meta')
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect((res.body.data as any[]).every((product) => {
          expect(Array.isArray(res.body.data)).toBeTruthy()
          expect(typeof product.id).toBe("number")
          expect(typeof product.attributes.updatedAt).toBe("string")
          expect(typeof product.attributes.seller).toBe("string")
          expect(typeof product.attributes.code).toBe("string")
          expect(typeof product.attributes.discount).toBe("string")
          expect(typeof product.attributes.title).toBe("string")
          expect(typeof product.attributes.description).toBe("string")
          expect(typeof product.attributes).toHaveProperty("link")
          expect(typeof product.attributes.featured).toBe("boolean")
          expect(typeof product.attributes.createdAt).toBe("string")
          expect(typeof product.attributes.discount_type).toBe("string")
        }))
      })
  })


})