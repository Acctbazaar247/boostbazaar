import { servicesCategory } from "@/components/dashboard/dashboardData";
import { CategorizedService, IService } from "@/types";

export function categorizeServices(services: IService[]): CategorizedService[] {
  // Create an object to store categorized services
  const categorizedServices: Record<string, CategorizedService> = {};

  // Initialize categorizedServices with empty arrays
  servicesCategory.forEach((category) => {
    categorizedServices[category.name] = {
      name: category.name,
      services: [],
    };
  });

  // Categorize the services
  services.forEach((service) => {
    let matched = false;

    for (const category of servicesCategory) {
      if (
        category.name !== "Others" &&
        service.category.toLowerCase().includes(category.name.toLowerCase())
      ) {
        categorizedServices[category.name].services.push(service);
        matched = true;
        break;
      }
    }

    // If no match found, add the service to "Others"
    if (!matched) {
      categorizedServices["Others"].services.push(service);
    }
  });

  // Convert the object to an array
  return Object.values(categorizedServices);
}
