import Homefilters from "@/components/Home/Homefilters";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1", // Change to a string
    title: "What is React, and why is it commonly used for web development?",
    tags: [
      { _id: "1", name: "python" }, // Change _id to a string
      { _id: "2", name: "sql" }, // Change _id to a string
    ],
    author: {
      _id: 1, // Keep as a number
      name: "John Doe",
      picture: "url/to/picture",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"), // Parse the date string
  },
  {
    _id: "2", // Change to a string
    title: "How to center a Div ?",
    tags: [
      { _id: "3", name: "html" }, // Change _id to a string
      { _id: "4", name: "css" }, // Change _id to a string
    ],
    author: {
      _id: 2, // Keep as a number
      name: "Jane Smith",
      picture: "url/to/picture",
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date("2021-09-02T09:30:00.000Z"), // Parse the date string
  },
  {
    _id: "1", // Change to a string
    title: "What is React, and why is it commonly used for web development?",
    tags: [
      { _id: "1", name: "python" }, // Change _id to a string
      { _id: "2", name: "sql" }, // Change _id to a string
    ],
    author: {
      _id: 1, // Keep as a number
      name: "John Doe",
      picture: "url/to/picture",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"), // Parse the date string
  },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link href="/ask-question" className="flex justify-end  max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <Homefilters />
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {/* looping through question  */}

        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              tags={question.tags}
              title={question.title}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show "
            description="   Be the first one to break the silence! Ask a question and kickstart the
          discussion . Our query coule be the next bigh thing"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
}
