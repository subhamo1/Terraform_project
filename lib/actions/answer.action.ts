"use server"

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    })

    // TODO: Add interaction...

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 })

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

    let updatequery = {}
    if (hasupVoted) {
      updatequery = { $pull: { upvotes: userId } }
    }
    else if (hasdownVoted) {
      updatequery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updatequery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId, updatequery, { new: true }
    )

    if (!answer) {
      throw new Error("Answer not found")
    }

    revalidatePath(path)
    // increment author reputation by +10 for upvoting the question
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

    let updatequery = {}
    if (hasdownVoted) {
      updatequery = { $pull: { downvotes: userId } }
    }
    else if (hasupVoted) {
      updatequery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updatequery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(
      answerId, updatequery, { new: true }
    )

    if (!answer) {
      throw new Error("Answer not found")
    }

    revalidatePath(path)
    // increment author reputation by +10 for upvoting the question
  } catch (error) {
    console.log(error);
    throw error;
  }
}
