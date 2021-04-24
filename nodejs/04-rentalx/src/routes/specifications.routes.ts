import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/controller/CreateSpecificationController";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

// Create Specification
const createSpecificationService = new CreateSpecificationService(
  specificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
