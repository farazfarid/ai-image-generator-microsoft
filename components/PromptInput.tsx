"use client";

import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    console.log("Submitted prompt: ", inputPrompt);

    // p is the prompt to be submitted to the API
    const p = useSuggestion ? suggestion : inputPrompt;

    let count = 8;
    const notification = setInterval(() => {
      if (count > 0) {
        toast(
          `DALL·E 3 is creating! Please refresh the page after ${count} seconds.`,
          { duration: 1000 }
        );
        count--;
      } else {
        clearInterval(notification);
      }
    }, 1000);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: p }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(`Error: ${data.error}`);
    } else {
      toast.success(`Your AI Art has been generated!`);
    }

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  const loading = isLoading || isValidating;

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "FarazGPT is thinking of a suggestion ...") ||
            suggestion ||
            "Enter a prompt ..."
          }
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          type="submit"
          className={`p-4 font-bold ${
            input
              ? "bg-sky-400 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="p-4 bg-sky-300 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
          disabled={isLoading || isValidating}
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-sky-200 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-sky-300" onClick={() => setInput(suggestion)}>
            {loading ? "FarazGPT is thinking of a suggestion ..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
