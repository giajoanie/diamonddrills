import { setMentorActive } from "@/lib/actions/mentor-accounts";
import { Button } from "@/components/ui/Button";

export function ToggleMentorActiveButton({
  mentorId,
  isActive,
}: {
  mentorId: string;
  isActive: boolean;
}) {
  return (
    <form action={setMentorActive}>
      <input type="hidden" name="mentorId" value={mentorId} />
      <input type="hidden" name="isActive" value={(!isActive).toString()} />
      <Button type="submit" variant={isActive ? "ghost" : "secondary"}>
        {isActive ? "Deactivate" : "Reactivate"}
      </Button>
    </form>
  );
}
