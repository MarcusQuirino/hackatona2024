import { db } from "./index";
import { Organization, Task } from "./schema";
import crypto from "crypto";

function uuidv4() {
  return crypto.randomUUID();
}

async function seed() {
  const organizations = [
    { name: "Organization A" },
    { name: "Organization B" },
    { name: "Organization C" },
  ];

  for (const org of organizations) {
    const orgId = uuidv4();

    // Insert organization
    await db.insert(Organization).values({
      organizationId: orgId,
      name: org.name,
    });

    // Insert a task for the organization
    await db.insert(Task).values({
      organizationId: orgId,
      taskId: uuidv4(),
      name: `Task for ${org.name}`,
      description: `This is a sample task for ${org.name}`,
      qualities: "Sample qualities",
      urgency: 1,
      status: 1,
      city: "Sample City",
      state: "Sample State",
    });
  }

  console.log("Seed data inserted successfully");
}

seed().catch((error) => {
  console.error("Error seeding data:", error);
  process.exit(1);
});
