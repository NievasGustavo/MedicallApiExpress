import { Router } from "express";
import * as controller from "../../controllers/accounts/patients.controllers.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *     Patient:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *              description: Patient id
 *          first_name:
 *              type: string
 *              description: Patient name
 *          last_name:
 *              type: string
 *              description: Patient last name
 *          id_number:
 *              type: int
 *              description: Patient identification number
 *          birthdate:
 *              type: string
 *              description: Patient birthdate
 *          country:
 *              type: string
 *              description: Patient country
 *          phone_number:
 *              type: int
 *              description: Patient phone number
 *          gender:
 *              type: string
 *              description: Patient gender
 *          email:
 *              type: string
 *              description: Patient email that is also used as username
 *          password:
 *              type: string
 *              description: Patient password
 *     example:
 *       first_name: Maria
 *       last_name: Hernandez
 *       id_number": 12121233
 *       birthdate: 01/10/2001
 *       country: Argentina
 *       phone_number: 3512212235
 *       gender: Female
 *       email: maria@gmail.com
 *       password: maria123
 *
 */

/**
 * @swagger
 * /api/accounts/patients/:
 *  get:
 *     summary: Get all patients
 *     description: Get all pets
 *     responses:
 *      200:
 *         description: Success
 *      500:
 *         description: Internal Server Error
 */
router.get("/api/accounts/patients/", controller.getPatients);

/**
 * @swagger
 * /api/accounts/patients/{id}:
 *  get:
 *     summary: Get patient by id
 *     description: Get patient by id
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *      200:
 *         description: Success
 *      404:
 *         description: Patient not found
 *      500:
 *         description: Internal Server Error
 */
router.get("/api/accounts/patients/:id", controller.getPatient);

/**
 * @swagger
 * /api/accounts/patients/:
 *  post:
 *     summary: Create patient
 *     description: Create patient
 *     parameters:
 *      - in: body
 *            first_name: 
 *               sMaria
 *            last_name: 
 *               Hernandez
 *            id_number: 
 *               12121233
 *            birthdate: 
 *               01/10/2001
 *            country: 
 *               Argentina
 *            phone_number: 
 *               3512212235
 *            gender: 
 *               Female
 *            email: 
 *               maria@gmail.com
 *            password: 
 *               maria123
 *     responses:
 *      200:
 *         description: Success
 *      400:
 *         description: Invalid request body
 *      500:
 *         description: Internal Server Error
 */
router.post("/api/accounts/patients/", controller.createPatient);

router.put("/api/accounts/patients/:id", controller.updatePatient);
router.delete("/api/accounts/patients/:id", controller.deletePatient);

export default router;
