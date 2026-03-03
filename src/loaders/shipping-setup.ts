// src/loaders/shipping-setup.ts
export default async function shippingSetup({ container }) {
  const shippingOptionService = container.resolve("shippingOptionService");
  const regionService = container.resolve("regionService");

  try {
    const regions = await regionService.list({ name: "Pakistan" });
    if (regions.length > 0) {
      const regionId = regions[0].id;
      
      // Check if the option already exists to avoid duplicates
      const existing = await shippingOptionService.list({ name: "Standard Delivery" });
      
      if (existing.length === 0) {
        await shippingOptionService.create({
          name: "Standard Delivery",
          region_id: regionId,
          profile_id: "sp_01KG40QCYTT7T69GJNXNP2X8R3",
          provider_id: "manual",
          price_type: "flat_rate",
          amount: 300, // PKR 300
          data: {},
          metadata: { type: "standard" }
        });
        console.log("✅ SUCCESS: Standard Delivery Shipping Option created for Pakistan.");
      }
    }
  } catch (error) {
    console.log("⚠️ Shipping loader skipped or already exists.");
  }
}