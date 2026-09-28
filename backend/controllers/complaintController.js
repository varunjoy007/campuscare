const Complaint = require("../models/Complaint");
const { execFile } = require("child_process");
const path = require("path");


/* =========================================================
   AI CATEGORY PREDICTION
========================================================= */

const predictCategory = (text) => {
  return new Promise((resolve) => {

    const pythonPath = path.join(
  __dirname,
  "..",
  "..",
  "ml",
  "venv",
  "Scripts",
  "python.exe"
);

    const scriptPath = path.join(
  __dirname,
  "..",
  "..",
  "ml",
  "predict.py"
);

    execFile(
      pythonPath,
      [scriptPath, text],
      (error, stdout, stderr) => {

        if (error) {

          console.error(
            "AI prediction error:",
            error.message
          );

          return resolve({
            category: null,
            confidence: null,
          });

        }

        console.log(
          "AI prediction output:",
          stdout
        );

        const categoryMatch =
          stdout.match(
            /Predicted Category:\s*(.+)/
          );

        const confidenceMatch =
          stdout.match(
            /Confidence:\s*([\d.]+)/
          );

        resolve({
          category:
            categoryMatch
              ? categoryMatch[1].trim()
              : null,

          confidence:
            confidenceMatch
              ? parseFloat(
                  confidenceMatch[1]
                )
              : null,
        });

      }
    );

  });
};


/* =========================================================
   CREATE COMPLAINT
========================================================= */

const createComplaint = async (req, res) => {
  try {

    const {
      title,
      category,
      description,
      location,
      priority,
    } = req.body;


    /* =========================
       VALIDATION
    ========================= */

    if (
      !title ||
      !category ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }


    /* =========================
       IMAGE
    ========================= */

    let imagePath = null;


    if (req.file) {
  imagePath = req.file.path;
}


    /* =========================
       AI PREDICTION
    ========================= */

    const aiPrediction =
      await predictCategory(
        `${title}. ${description}`
      );


    console.log(
      "AI Category:",
      aiPrediction.category
    );

    console.log(
      "AI Confidence:",
      aiPrediction.confidence
    );


    /* =========================
       CREATE COMPLAINT
    ========================= */

    const complaint =
      await Complaint.create({

        title,

        category,

        description,

        location,

        priority:
          priority || "Medium",

        // Use the logged-in user's ID
        // instead of trusting the request body
        student:
          req.user.id,

        image:
          imagePath,

        aiPredictedCategory:
          aiPrediction.category,

        aiConfidence:
          aiPrediction.confidence,
      });


    /* =========================
       RESPONSE
    ========================= */

    res.status(201).json({

      message:
        "Complaint submitted successfully",

      complaint,
    });


  } catch (error) {

    console.error(
      "Create complaint error:",
      error
    );

    res.status(500).json({

      message:
        "Failed to submit complaint",

      error:
        error.message,
    });
  }
};



/* =========================================================
   GET MY COMPLAINTS
========================================================= */

const getMyComplaints = async (
  req,
  res
) => {

  try {

    const {
      studentId,
    } = req.params;


    // Check that the logged-in student
    // is requesting their own complaints
    if (req.user.id !== studentId) {

      return res.status(403).json({
        message: "You can only view your own complaints",
      });

    }


    const complaints =
      await Complaint.find({
        student: studentId,
      })
        .sort({
          createdAt: -1,
        });


    res.status(200).json({
      complaints,
    });


  } catch (error) {

    res.status(500).json({

      message:
        "Failed to fetch complaints",

      error:
        error.message,
    });
  }
};



/* =========================================================
   GET COMPLAINT BY ID
========================================================= */

const getComplaintById = async (
  req,
  res
) => {

  try {

    const {
      id,
    } = req.params;


    const complaint =
      await Complaint.findById(id)
        .populate(
          "student",
          "name email studentId department"
        );


    if (!complaint) {

      return res.status(404).json({

        message:
          "Complaint not found",
      });
    }


    // Students can only view their own complaints
    if (
      req.user.role !== "admin" &&
      complaint.student._id.toString() !== req.user.id
    ) {

      return res.status(403).json({

        message:
          "You can only view your own complaint",
      });
    }


    res.status(200).json({

      complaint,
    });


  } catch (error) {

    res.status(500).json({

      message:
        "Failed to fetch complaint",

      error:
        error.message,
    });
  }
};



/* =========================================================
   GET ALL COMPLAINTS - ADMIN
========================================================= */

const getAllComplaints = async (
  req,
  res
) => {

  try {

    const complaints =
      await Complaint.find()
        .populate(
          "student",
          "name email studentId department"
        )
        .sort({
          createdAt: -1,
        });


    res.status(200).json({

      complaints,
    });


  } catch (error) {

    res.status(500).json({

      message:
        "Failed to fetch complaints",

      error:
        error.message,
    });
  }
};



/* =========================================================
   UPDATE COMPLAINT - ADMIN
========================================================= */

const updateComplaint = async (
  req,
  res
) => {

  try {

    const {
      id,
    } = req.params;


    const {
      status,
      assignedDepartment,
      adminRemark,
    } = req.body;


    const complaint =
      await Complaint.findById(id);


    if (!complaint) {

      return res.status(404).json({

        message:
          "Complaint not found",
      });
    }


    /* =========================
       UPDATE STATUS
    ========================= */

    if (
      status !== undefined
    ) {
      complaint.status =
        status;
    }


    /* =========================
       UPDATE DEPARTMENT
    ========================= */

    if (
      assignedDepartment !==
      undefined
    ) {
      complaint.assignedDepartment =
        assignedDepartment;
    }


    /* =========================
       UPDATE ADMIN REMARK
    ========================= */

    if (
      adminRemark !== undefined
    ) {
      complaint.adminRemark =
        adminRemark;
    }


    await complaint.save();


    /* =========================
       GET UPDATED COMPLAINT
    ========================= */

    const updatedComplaint =
      await Complaint.findById(id)
        .populate(
          "student",
          "name email studentId department"
        );


    res.status(200).json({

      message:
        "Complaint updated successfully",

      complaint:
        updatedComplaint,
    });


  } catch (error) {

    res.status(500).json({

      message:
        "Failed to update complaint",

      error:
        error.message,
    });
  }
};



/* =========================================================
   EXPORT
========================================================= */

module.exports = {

  createComplaint,

  getMyComplaints,

  getComplaintById,

  getAllComplaints,

  updateComplaint,

};