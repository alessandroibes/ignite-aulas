import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/controller/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/controller/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/controller/ListCategoriesController";
import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";
import { ImportCategoryService } from "../modules/cars/services/ImportCategoryService";
import { ListCategoriesService } from "../modules/cars/services/ListCategoriesService";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const categoriesRepository = CategoriesRepository.getInstance();

// Create Category
const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

// List Categories
const listCategoriesService = new ListCategoriesService(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

// Import Categories
const importCategoryService = new ImportCategoryService();
const importCategoryController = new ImportCategoryController(
  importCategoryService
);

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
