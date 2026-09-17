import { setStudentActive } from "@/lib/actions/mentor";
import { Button } from "@/components/ui/Button";

export function ToggleActiveButton({
  studentId,
  isActive,
}: {
  studentId: string;
  isActive: boolean;
}) {
  return (
    <form action={setStudentActive}>
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="isActive" value={(!isActive).toString()} />
      <Button type="submit" variant={isActive ? "ghost" : "secondary"}>
        {isActive ? "Deactivate" : "Reactivate"}
      </Button>
    </form>
  );
}
