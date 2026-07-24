import { Router, type Request, type Response } from "express";
import {
  zCourseId,
  zCoursePostBody,
  zCoursePutBody,
  zStudentId,
} from "../libs/zodValidators.js";

import type { Student, Course } from "../libs/types.js";

// import database
import { courses, enrollments, students } from "../db/db.js";

const router = Router();

// /api/v2/enrollments
router.delete("/", (req: Request, res: Response) => {
  try {
    const studentId = req.body.studentId;
    const courseId = req.body.courseId;

    const idx = enrollments.findIndex((e) => e.courseId == Number(courseId) && e.studentId == studentId);

    if (idx != -1) {
      enrollments.splice(idx, 1);
      return res.status(200).json({
        ok: true,
        message: "Enrollment has been deleted",
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: "Enrollment does not exist",
      });
    }
  } catch (e) {
    return res.status(500).json({
      ok: false,
      message: "Something is wrong, please try again",
    });
  }
});

export default router;