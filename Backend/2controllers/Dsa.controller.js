import DSASchema from "../2models/Dsa.model.js";

export const DsaController = async (req, res) => {
  try {
    const { topic, subTopic, content } = req.body;

    if (!topic?.trim() || !subTopic?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Topic, subTopic, and content are all required.",
        success: false,
      });
    }

    const exists = await DSASchema.findOne({
      topic: topic.trim(),
      subTopic: subTopic.trim(),
      userId: req.id,
    });

    if (exists) {
      return res.status(400).json({
        message: "This topic and subTopic already exist.",
        success: false,
      });
    }

    const newTopic = await DSASchema.create({
      topic: topic.trim(),
      subTopic: subTopic.trim(),
      content: content.trim(),
      userId: req.id,
    });

    return res.status(201).json({
      message: "DSA topic created successfully.",
      data: newTopic,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};
export const getAllDSA = async (req, res) => {
  try {
    const topics = await DSASchema.find(); // ← No filter

    if (topics.length === 0) {
      return res.status(404).json({
        message: "No content found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Content retrieved successfully.",
      data: topics,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};
