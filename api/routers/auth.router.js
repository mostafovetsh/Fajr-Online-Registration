import { Router } from "express";

import {
    CreateUser,
    Admin_LogIn,
    C_GetCourseGroups,
    EnrolUser
} from "../controllers/users.controller.js";

const router = Router();

router.post("/api/register", CreateUser);

router.post("/api/admin-login", Admin_LogIn);

router.post("/api/get-course-groups", C_GetCourseGroups);

router.post("/api/enroluser", EnrolUser);

export default router;