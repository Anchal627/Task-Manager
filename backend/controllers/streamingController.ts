import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import axios from "axios";
import Task from "../models/taskModel";
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const getTwitchAccessToken = async (): Promise<string> => {
  const { data } = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  });

  return data.access_token;
};
export const getStreamingData = asyncHandler(
  async (req: Request, res: Response) => {
    const accessToken = await getTwitchAccessToken();

    const { data } = await axios.get("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        first: 10, // Number of live streams to fetch
      },
    });

    res.json(data.data); // Send Twitch API response
  }
);
export const getStreamingDataForTask = asyncHandler(
  async (req: Request, res: Response) => {
    // 1️ Fetch the task by ID from MongoDB
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    // 2️ Get Twitch API access token
    const accessToken = await getTwitchAccessToken();

    // 3️ Make a request to Twitch API to get live streams
    const { data } = await axios.get("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        first: 10, // Get top 10 streams
        language: "en", // English streams only
      },
    });

    // 4️ Filter Twitch streams based on task title or description
    const relatedStreams = data.data.filter(
      (stream: any) =>
        stream.title.toLowerCase().includes(task.title.toLowerCase()) ||
        (task.description &&
          stream.title.toLowerCase().includes(task.description.toLowerCase()))
    );

    // 5️ If no related streams are found, pick a random one
    const streamData =
      relatedStreams.length > 0
        ? relatedStreams[0] // Use the first related stream
        : data.data[Math.floor(Math.random() * data.data.length)]; // Pick a random stream

    // 6️ Attach streaming data to the task in MongoDB
    task.streaming_data = {
      source: "twitch",
      data: streamData,
    };

    await task.save();

    // 7️ Send the response to the client
    res.json({
      task,
      streaming: streamData,
    });
  }
);
export const getTasksWithStreamingData = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await Task.find({ "streaming_data.data": { $exists: true } });
    res.json(tasks);
  }
);
