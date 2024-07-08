import axios, { AxiosError } from "axios";
import NothingFound from "@/components/nothingFound";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import FeedbackItem from "@/components/feedback/feedbackItem";
import { feedback } from "@/lib/types/feedback";
import UserListings from "./components/userListings";
import { user } from "@/lib/types/user";

async function getUser(username: string) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/users/public/" + username)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      return null;
    });
}

async function getUserFeedback(username: string) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/feedback/" + username)
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
      return null;
    });
}

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user: user = await getUser(params.username);
  const feedback = await getUserFeedback(params.username);

  if (!user) {
    return <NothingFound message="User not found." />;
  }

  const joinDate = new Date(user.account_created_date);

  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <div className="text-lg font-semibold flex items-center gap-1">
            {user.verified && (
              <Image
                src="/assets/icons/verified.png"
                width={20}
                height={20}
                alt=""
              />
            )}
            <p>
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-500 mt-0">({user.username})</p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-3">
          <div className="flex gap-1">
            <p className="text-sm">Seller Rating: </p>
            {user.rating > 0 ? (
              <p className="text-sm flex items-center">
                {user.rating.toFixed(1)}{" "}
                <Image
                  className="inline-block"
                  src="/assets/icons/star.png"
                  width={15}
                  height={15}
                  alt=""
                />
              </p>
            ) : (
              "No Feedback"
            )}
          </div>

          <p className="text-sm">
            Member Since:{" "}
            {joinDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
          {user.company && <p className="text-sm">Company: {user.company}</p>}
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader className="p-3 text-lg font-semibold">Feedback</CardHeader>
        <Separator />
        <CardContent className="p-3">
          {feedback ? (
            feedback.feedback.length > 0 ? (
              // show feedback
              feedback.feedback.map((feedback: feedback, index: number) => (
                <FeedbackItem key={index} feedback={feedback} />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                {user.username} does not have any feedback yet
              </p>
            )
          ) : (
            <p className="text-sm text-gray-500">User feedback not found</p>
          )}
        </CardContent>
      </Card>

      <UserListings user={user} />
    </>
  );
}
