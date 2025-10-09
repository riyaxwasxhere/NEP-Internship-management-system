import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function StudentStatsCard({ title, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-gray-500">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold text-black-500">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default StudentStatsCard;
