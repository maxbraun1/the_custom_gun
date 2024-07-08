import { Separator } from "@/components/ui/separator";
import PasswordResetForm from "./components/passwordResetForm";
import ProfileInfoForm from "./components/profileInfoForm";
import DefaultBillingForm from "./components/defaultBillingForm";
import DefaultFFL from "./components/defaultFFL";
import NotificationSettings from "./components/notifications";

export default async function Settings() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl mb-6">Settings</h1>

      <ProfileInfoForm />
      <Separator className="my-7" />
      <PasswordResetForm />
      <Separator className="my-7" />
      <DefaultBillingForm />
      <Separator className="my-7" />
      <DefaultFFL />
      <Separator className="my-7" />
      <NotificationSettings />
    </div>
  );
}
