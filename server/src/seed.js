import Property from "./model/Property.model.js"

const seed = async () => {
    try {
        const properties = [
            {
                name: "Property 1",
                description: "Description for Property 1",
                price: 100000,
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            },
            {
                name: "Property 2",
                description: "Description for Property 2",
                price: 150000,
                image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
            },
            {
                name: "Property 3",
                description: "Description for Property 3",
                price: 200000,
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            }
        ]

        const user = await User.findOne({ email: "admin@example.com" })
        if (!user) {
            await User.create({ email: "admin@example.com", name: "Admin", role: "admin" })
        }

        for (const prop of properties) {
            const existingProp = await Property.findOne({ name: prop.name })
            if (existingProp) {
                existingProp.description = prop.description
                existingProp.price = prop.price
                existingProp.image = prop.image
                await existingProp.save()
            } else {
                await Property.create(prop)
            }
        }
        return Propertys
    } catch (error) {
        console.log("error on seeding", error)
        throw error
    }

}
export default seed