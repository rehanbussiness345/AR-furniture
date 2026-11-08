import "dotenv/config";
import { PRODUCTS } from "../src/lib/catalog";
import { db, pool } from "../src/db";
import { products } from "../src/db/schema";

async function main() {
  console.log(`Seeding ${PRODUCTS.length} products...`);
  await db.delete(products);
  await db.insert(products).values(PRODUCTS);
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
