import { resetStudentBaseline } from "@/lib/actions/mentor";
import { Button } from "@/components/ui/Button";

export function ResetBaselineButton({ studentId }: { studentId: string }) {
  return (
    <form action={resetStudentBaseline}>
      <input type="hidden" name="studentId" value={studentId} />
      <Button type="submit" variant="ghost">
        Reset baseline
      </Button>
    </form>
  );
}
