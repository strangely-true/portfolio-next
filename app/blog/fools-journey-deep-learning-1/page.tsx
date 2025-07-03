"use client";

import React from "react";
import { BlogPostLayout } from "@/components/ui/blog-post-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FoolQuote from "@/components/ui/fool-quote";
import JargonBuster from "@/components/ui/jargon-buster";
import GeminiQuery from "@/components/ui/GeminiQuery";

const FoolsJourneyPost = () => {
  const post = {
    title: "A Fool's Journey into Deep Learning: Part 1",
    date: "July 2, 2025",
    readTime: 15,
    tags: ["Deep Learning", "Journey"],
    author: "Sabittwa Banerjee",
  };

  return (
    <BlogPostLayout post={post}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            You might be wondering why I&apos;m writing this blog. I&apos;m not
            an expert in deep learning, or much else for that matter. So, why
            start a blog? It might not seem to make sense at first glance.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Honestly, the main reason is that I&apos;ve found teaching and
            writing about topics to be incredibly beneficial for my own learning
            and memory retention. I find that I grasp concepts more easily when
            I have to explain them to someone else.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            So, here I am, documenting my journey. I plan for this to be a
            continuing series, and it probably won&apos;t be limited to just
            deep learning. I&apos;ve also heard that a blog can be more
            impactful than a resume, as it showcases my learning process and
            provides tangible proof of my work.
          </p>
        </section>

        {/* Misconceptions */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            Misconceptions I Had
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-rose-500">Math is a Must</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                This was debunked when I started reading up and asking people.
                Basic high school math is enough, especially if you have
                calculus. You can look up Linear Algebra and Statistics as you
                go. I would highly recommend the courses by Khan Academy and
                3blue1brown&apos;s YouTube playlists.
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-rose-500">
                  No Money, High Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                This is also not true. The bar for entry is very low nowadays,
                and hundreds of thousands of students are getting into deep
                learning because it has so many applications. Neural nets are
                the foundation of LLMs, which are all the craze now.
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-rose-500">PhD Required</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                I&apos;m not confident about this, but I definitely know people
                like Sayak Paul who are doing great in this field without a PhD.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Prerequisites */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            The Only Prerequisite
          </h2>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                  width={48}
                  height={48}
                  className="flex-shrink-0"
                />
                <div>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    The only real prerequisite is knowing how to program in
                    Python.
                  </p>
                  <Button asChild className="mt-2">
                    <a
                      href="https://www.python.org/about/gettingstarted/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn Python
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        {/* Resources */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            A Note on Resources
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            I will provide the resources after I finish a few of them myself,
            because I am not qualified to guide anyone just yet—at least not
            until I have finished a resource (book, course) myself.
          </p>
        </section>

        {/* Jupyter Notebooks */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            On Jupyter Notebooks
          </h2>
          <FoolQuote>
            I thought Jupyter notebooks were stupid when I first got to know
            about them. Why not just run the models on my own PC?
          </FoolQuote>
          <p className="text-xl text-gray-300 leading-relaxed mt-6 mb-6">
            Turns out, Jupyter is one of the most useful pieces of software
            there is. It received the highest honor in software, the ACM System
            Award, and it is the most widely used piece of software for deep
            learning and data science.
          </p>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg"
                  alt="Jupyter"
                  width={48}
                  height={48}
                  className="flex-shrink-0 bg-white rounded-full p-1"
                />
                <div>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Jupyter Notebooks provide an interactive environment to
                    write and run code, visualize data, and share your work.
                    They are perfect for data exploration and experimentation.
                  </p>
                  <Button asChild className="mt-2">
                    <a
                      href="https://jupyter.org/try"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try Jupyter
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Asking Questions */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            The Power of Asking <span className="text-rose-500">Foolish</span>{" "}
            Questions
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            A great help that I got was from emailing and contacting various
            people in my field. I never shy away from asking foolish
            questions—hence the name &quot;A Fool’s Journey.&quot; I asked every
            single doubt I could to ChatGPT or Gemini, and when I wasn&apos;t
            satisfied, I emailed professionals.
          </p>
          <Card className="bg-red-900/30 border-red-500/50">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                Warning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-red-300">
              Professionals are very busy, and disturbing them is a really bad
              idea. I ask them politely to merely point me in the right
              direction when I have a genuine doubt.
            </CardContent>
          </Card>
        </section>

        {/* Email Example */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">A Real Example</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Here&apos;s an actual email exchange I had with Sayak Paul, showing
            how professionals in the field are willing to help when approached
            respectfully:
          </p>

          <Card className="bg-white border-gray-300 text-black max-w-4xl mx-auto">
            <CardContent className="p-0">
              {/* Gmail Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://sayak.dev/posts/carted_headshot.jpg"
                    alt="Sayak Paul"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-black">
                        Sayak Paul
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">to me</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Sun 29 Jun, 18:46 (3 days ago)
                  </span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6 ">
                <div className="mb-4">
                  <a
                    href="https://bit.ly/sayak-faqs"
                    className="text-blue-600 hover:underline"
                  >
                    bit.ly/sayak-faqs
                  </a>
                  <span className="text-gray-600 ml-2">might help.</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">
                    Sayak Paul |{" "}
                    <a
                      href="https://sayak.dev"
                      className="text-blue-600 hover:underline"
                    >
                      sayak.dev
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What is ML? */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            What is Machine Learning, Anyway?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Think of it like this: instead of writing explicit, step-by-step
            instructions for a computer to solve a problem, you give it a lot of
            examples and let it figure out the rules on its own. It&apos;s like
            teaching a child to recognize a cat by showing them pictures of
            cats, rather than describing a cat in minute detail.
          </p>
        </section>

        {/* What is a Neural Network? */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            And a Neural Network?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            A Neural Network is a specific type of machine learning model
            that&apos;s loosely inspired by the human brain. It has
            interconnected nodes, or “neurons,” that work together to find
            patterns in data. Deep Learning just means using a really big,
            complex neural network with many layers.
          </p>
          <FoolQuote>
            It&apos;s like a team of tiny robots in your computer, each looking
            for one very specific thing. When they all raise their hands at the
            same time, they&apos;ve found a pattern!
          </FoolQuote>
        </section>

        {/* Jargon Buster */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Jargon Buster</h2>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-rose-500">Key Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                <strong>Model:</strong> The “brain” that you train. It’s the
                output of the training process and what you use to make
                predictions.
              </p>
              <p>
                <strong>Training:</strong> The process of teaching the model by
                showing it data. The model adjusts its internal parameters to
                make better predictions.
              </p>
              <p>
                <strong>Inference:</strong> Using the trained model to make
                predictions on new, unseen data.
              </p>
              <p className="text-yellow-400">
                I will not manually put a Jargon Buster in every post, however
                there will a mega Jargon Buster attached in places throughout
                the post where you can look up every jargon
              </p>
            </CardContent>
          </Card>
        </section>
        <JargonBuster></JargonBuster>
        {/* Classification and Regression */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            Classification vs. Regression
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Most of the problems you&apos;ll encounter in supervised learning
            fall into two categories:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-rose-500">Classification</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Predicting a category. Is this email spam or not spam? Is this
                picture a cat, a dog, or a bird?
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-rose-500">Regression</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Predicting a continuous value. What will the temperature be
                tomorrow? How much will this house sell for?
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Overfitting */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            The Danger of Overfitting
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Overfitting is a common trap. It’s when your model learns the
            training data too well, including the noise and quirks. It becomes
            like a student who memorizes the answers to a practice test but
            can&apos;t answer any questions on the real exam because they
            didn&apos;t learn the underlying concepts.
          </p>
        </section>

        {/* Training and Validation Sets */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">
            Training and Validation Sets
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            To avoid overfitting, we split our data. We use the{" "}
            <strong>training set</strong> to teach the model, and the{" "}
            <strong>validation set</strong> to check its performance on data it
            hasn&apos;t seen before. This helps us see if the model is actually
            learning or just memorizing.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Test Sets</h2>
          <FoolQuote>
            I couldn&apos;t understand the importance of having a test set
            beyond another validation set. It seems a bit redundant no? The
            concept is still not clear to me. So I did ask a good
            &lsquo;friend&rsquo;, Gemini. Here is what it had to say. TRY it
            out. That&apos;s a fun component, no?
          </FoolQuote>
          <GeminiQuery question="Why do we need a test set in machine learning? Isn't it just another validation set?" />
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            &quot;The validation set helps you build a good model, while the
            test set tells you how good the model you built actually is, on
            completely unseen data.&quot; <br />
            That basically summarizes it. The test set is hidden even from the
            person training the model. It may also mean that you are able to
            validate the accuracy of a third person&apos;s model without having
            to trust them blindly. So, if we are a senior at any organization
            defining a test set may avoid the biggest single point of failure
            that we have historically observed.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            For example, here is a time series:
          </p>

          <div className="flex flex-col items-center my-8">
            <Image
              src="https://raw.githubusercontent.com/fastai/fastbook/refs/heads/master/images/timeseries1.png"
              alt="A time series"
              width={600}
              height={0}
              style={{ height: "auto", width: "100%", maxWidth: 600 }}
              className="rounded shadow-lg h-auto w-full max-w-[600px]"
            />
            <span className="text-gray-400 mt-2 italic">A time series</span>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Suppose we just use a random split of the data into training and
            validation sets. We end up with a horrible model because it is too
            easy to fill in the gaps.
          </p>
          <div className="flex flex-col items-center my-8">
            <Image
              src="https://raw.githubusercontent.com/fastai/fastbook/refs/heads/master/images/timeseries2.png"
              alt="A poor subset"
              width={600}
              height={0}
              style={{ height: "auto", width: "100%", maxWidth: 600 }}
              className="rounded shadow-lg h-auto w-full max-w-[600px]"
            />
            <span className="text-gray-400 mt-2 italic">
              A poor training subset
            </span>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Instead, use the earlier data as your training set (and the later
            data for the validation set), as shown below. This way, the model
            has to learn to predict future values based on past data, which is
            the essence of time series forecasting.
          </p>
          <div className="flex flex-col items-center my-8">
            <Image
              src="https://raw.githubusercontent.com/fastai/fastbook/refs/heads/master/images/timeseries3.png"
              alt="A good subset"
              width={600}
              height={0}
              style={{ height: "auto", width: "100%", maxWidth: 600 }}
              className="rounded shadow-lg h-auto w-full max-w-[600px]"
            />
            <span className="text-gray-400 mt-2 italic">
              A good training subset
            </span>
          </div>

          <p className="text-yellow-400 font-bold mt-6">
            This is a very important concept in time series forecasting, and it
            applies to many other domains as well. Always ensure that your
            training data precedes your validation data in time. Thanks to{" "}
            <a
              href="https://github.com/fastai/fastbook"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              fastai fastbook
            </a>{" "}
            for the graphs and source!
          </p>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Conclusion</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            This is all I learned in the first week of my deep learning journey.
            I hope this post has been helpful to you, it certainly has to me. If
            you read this far, I want to thank you for taking the time to read
            my thoughts and experiences. This is just the beginning of my
            journey into deep learning. I hope to share more insights and
            experiences in future posts. Stay tuned! I would love to hear your
            thoughts, questions, or any topics you would like me to cover in
            this series. Feel free to reach out to me on my social media or
            through my email. I&apos;m always open to suggestions and
            discussions.
          </p>
          <p>- sabittwa.work@gmail.com</p>
        </section>
      </div>
    </BlogPostLayout>
  );
};

export default FoolsJourneyPost;
